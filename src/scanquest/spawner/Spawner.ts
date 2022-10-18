import { Client, Message, Snowflake, TextChannel, RichEmbed, Guild } from 'discord.js';
import moment, { Moment } from 'moment';
import { WithId } from 'mongodb';

import { msgCatch } from '../../common';
import debug, { formatTimestamp, handleError } from '../../common/debug';
import ScanQuestDB, { ActiveScan, Server } from '../database';

import config from './config';
import custom from './CustomSpawner';
import handleActivity from './handleActivity';
import Select, { Selection } from './Select';

/**
 * @param timeout A javascript timer
 * @param duration A numberical representation in miliseconds of the remaining time for the timer
 */
interface Timer {
  timeout: NodeJS.Timeout
  endTime: Moment
}

/**
 * @param amount The number of miliseconds to reduce a timer by
 */
interface Amount {
  amount: number
}

/**
 * This is used for calculating activity "density"
 */
interface Activity {
  timestamp: Moment
  amount: number
}

export default class Spawner {
  protected readonly timers: Map<Snowflake, Timer> = new Map();
  protected readonly debouncer: Map<Snowflake, Amount> = new Map();
  protected readonly activity: Map<Snowflake, Activity[]> = new Map();
  protected readonly last_sent: Map<Snowflake, Moment> = new Map();

  readonly bot: Client;
  readonly db: ScanQuestDB;
  readonly select: Select;
  public tick: (m: Message) => Promise<void>;

  constructor(bot: Client, db: ScanQuestDB) {
    this.bot = bot;
    this.db = db;
    this.select = new Select(db);
    this.tick = handleActivity.call(this);
  }

  async start() {
    // get timers from database
    const servers = this.db.servers.find({ disabled: false });
    await servers.forEach(this.startTimer.bind(this));
  }

  async stop() {
    // write timers to database
    for (const [id, timer] of this.timers) {
      const { endTime, timeout } = timer;

      clearTimeout(timeout);
      this.timers.delete(id);

      const amount = (this.debouncer.get(id)?.amount ?? 0);
      endTime.subtract(amount, 'milliseconds');

      await this.db.servers.updateOne(
        { id },
        { $set: { remaining: endTime.toDate() } }
      );
    }
  }

  protected handleError(e: any, arg1: Server | Guild) {
    let source;
    if (arg1 instanceof Server) {
      source = this.bot.guilds.find((g) => g.id === arg1.id).name;
    }
    else if (arg1 instanceof Guild) {
      source = arg1.name;
    }
    handleError(this.bot, e, source);
  }

  public clearTimeout(server: WithId<Server>) {
    if (this.timers.has(server.id)) {
      clearTimeout(this.timers.get(server.id)!.timeout);
    } else {
      debug(this.bot, `Could not clear timer for <#${server.send_channel}>`);
    }
  }

  public expiresToDate(active: number): Date {
    return moment().add(active, 'hours').toDate();
  }

  public setSendTimeout(server: WithId<Server>, endTime: Moment, clear = true) {
    if (clear) this.clearTimeout(server);
    debug(this.bot, `<#${server.send_channel}>: Setting timer for ${formatTimestamp(endTime)}`);
    const timeout = setTimeout(() => {
      debug(this.bot, `<#${server.send_channel}>: Timer expired, generating now`);
      this.addActivity(server);
      this.debouncer.delete(server.id);
      this.newSpawn(server).catch(e => this.handleError(e, server));
    }, endTime.diff(moment()));
    this.timers.set(server.id, { timeout, endTime });
  }

  public startTimer(server: WithId<Server>) {
    if (server.remaining) {
      const endTime = moment(server.remaining);
      const remaining = endTime.diff(moment(), 'milliseconds');
      if (remaining > config.debounce) {
        this.setSendTimeout(server, endTime, false);
      }
      else {
        debug(this.bot, `When starting scanquest for <#${server.send_channel}>, existing spawn timer had already expired`);
        this.newSpawn(server, { clear: false }).catch(e => this.handleError(e, server));
      }
    }
  }

  public async reroll(message: Message) {
    const { id } = message.guild;
    const server = await this.db.servers.findOne({ id });
    if (server) {
      if (server.disabled) {
        message.channel.send('Scanquest is disabled on this server').catch(msgCatch);
        return;
      }
      debug(this.bot, `${message.author.username} has issued a reroll`);
      this.addActivity(server);
      this.debouncer.delete(server.id);
      await this.newSpawn(server, { force: true }).catch(e => this.handleError(e, server));
    }
  }

  public async spawn(message: Message, args: string[], options: string[]) {
    await custom.call(this, message, args, options).catch(e => this.handleError(e, message.guild));
  }

  public async list(message: Message) {
    const s = await this.db.servers.findOne({ id: message.guild.id });

    let res = 'Not a configured scanquest server';
    if (s) {
      const activeScans = await this.db.getActiveScans(s);
      if (activeScans.length > 0) {
        res = activeScans.map(sc => `${sc.scan.name} (${formatTimestamp(moment(sc.expires))}) #${sc.msg_id}`).join('\n');
      } else {
        res = 'No active scans';
      }
    }
    return res;
  }

  protected addActivity(server: WithId<Server>) {
    const { id } = server;

    const now = moment();

    let activities = this.activity.get(id) ?? [];

    activities = activities.filter(value => now.diff(value.timestamp, 'minutes') <= config.activity_window);

    const amount = (this.debouncer.get(id)?.amount ?? 0);
    activities.push({ timestamp: now, amount });

    this.activity.set(id, activities);
  }

  protected async newSpawn(server: WithId<Server>, options: { force?: boolean, clear?: boolean } = {}) {
    const { force = false, clear = false } = options;
    const { activescan_ids, send_channel, disabled, id } = server;
    if (disabled) {
      debug(this.bot, `<#${send_channel}>: Scanquest is disabled on this server`);
      return;
    }

    if (!force && activescan_ids.length > 0 && this.last_sent.has(id)) {
      const d = moment().diff(moment(this.last_sent.get(id)), 'minutes');
      if (d < config.safety) {
        debug(this.bot, `<#${send_channel}>: Recently generated a scan for server. Trying again in ${config.safety} minutes`);
        this.setSendTimeout(server, moment().add(config.safety, 'minutes'), clear);
        return;
      }
    }

    debug(this.bot, `<#${send_channel}>: Attempting to generate a scan at ${formatTimestamp(moment())}`);

    this.last_sent.set(id, moment());

    let amount = 0;
    if (this.activity.has(id)) {
      this.activity.get(id)!.forEach(v => { amount += v.amount; });
    }

    // TODO can be removed after determining weight
    debug(this.bot, `Amount of value in the previous interval: ${amount}`);

    try {
      const selection = await this.select.card(server, amount);
      // note: this is done after generating a new one so that a recently generated scan doesn't get regenerated
      await this.cleanOldScans(server);
      const endTime = await this.spawnCard(server, selection);
      this.setSendTimeout(server, endTime);
      await this.db.servers.updateOne(
        { id: server.id },
        { $set: { remaining: endTime.toDate() } }
      );
    }
    catch (e) {
      this.handleError(e, server);
    }
  }

  /**
   * Sends a card image to the configed channel
  */
  protected async spawnCard(server: WithId<Server>, selection: Selection) {
    const { send_channel } = server;
    const { active, scannable, image } = selection;

    const expires = this.expiresToDate(active);

    return await (this.bot.channels.get(send_channel) as TextChannel)
    .send(new RichEmbed().setDescription('Spawning...'))
    .then(async (message) => {
      debug(this.bot, `<#${send_channel}>: Generated ${scannable.card.name} active until ${formatTimestamp(moment(expires))} at ${formatTimestamp(moment())}`);

      const scanRes = await this.db.scans.insertOne(
        new ActiveScan({ scan: scannable.card, expires, msg_id: message.id })
      );

      if (!scanRes.acknowledged) {
        throw new Error('DB could not create new scan');
      }

      const serverRes = await this.db.servers.updateOne(
        { id: server.id },
        { $push: { activescan_ids: scanRes.insertedId } }
      );

      if (!serverRes.acknowledged) {
        throw new Error('DB could not update server active scans');
      }

      // Update the message to reflect the spawned instance
      await message.edit(image).catch(msgCatch);

      // Min time is to ensure longer spawns don't take too long and no inactive scans for short ones
      return moment().add(selection.next, 'hours');
    })
    .catch((e) => {
      debug(this.bot, e, 'errors');
      return moment().add(config.safety, 'minutes');
    });
  }

  protected async cleanOldScans(server: WithId<Server>) {
    const { send_channel } = server;

    const activescan_ids = (await this.db.getActiveScans(server))
    .filter(({ expires, scan, msg_id }) => {
      const s = moment(expires).isSameOrAfter(moment().subtract(config.debounce, 'milliseconds'));
      if (!s) {
        debug(this.bot, `${scan.name} expired (${formatTimestamp(moment(expires))})`);
        if (msg_id) {
          (this.bot.channels.get(send_channel) as TextChannel)
          .fetchMessage(msg_id)
          .then(async (message) => {
            if (message?.editable && message.embeds.length > 0) {
              const embed = new RichEmbed(message.embeds[0]);
              this.select.setTitle(embed, 0);
              await message.edit(embed);
            }
          })
          .catch(msgCatch);
        }
      }
      return !!s;
    })
    .map(scan => scan._id);

    const res = await this.db.servers.updateOne(
      { id: server.id },
      { $set: { activescan_ids } }
    );
    if (!res.acknowledged) {
      debug(this.bot, 'Unable to save cleaned activescans', 'errors');
    }
  }
}
