import { Client, Message } from 'discord.js';

import { flatten } from '../common';
import parseCommand from '../common/parseCommand';
import users from '../common/users';

import { API } from '../database';
import { SendFunction } from '../definitions';
import logger from '../logger';

import ScanQuestDB from './database';
import perim from './database/config';
import loadScan from './loader/Loader';
import { balance, listScans, rate } from './player';
import Scanner from './scanner/Scanner';
import Spawner from './spawner/Spawner';
import Trader from './trader/Trader';

const development = (process.env.NODE_ENV === 'development');

export default class ScanQuest {
  private readonly db: ScanQuestDB;
  readonly bot: Client;
  private timeout: NodeJS.Timeout;
  private spawner: Spawner;
  private scanner: Scanner;
  private trader: Trader;
  private init: boolean = false;

  constructor(bot: Client) {
    this.bot = bot;
    this.db = new ScanQuestDB();
  }

  start() {
    // Check to see if database has been initialized
    if (!API.data) {
      // Try again in a second
      this.timeout = setTimeout(() => { this.start(); }, 1000);
      return;
    }
    if (API.data === 'local') {
      logger.info('ScanQuest cannot start. Database is down');
      return;
    }

    // Initialize components
    this.db.start().then(() => {
      this.spawner = new Spawner(this.bot, this.db);
      this.scanner = new Scanner(this.bot, this.db);
      this.trader = new Trader(this.bot, this.db);

      logger.info('ScanQuest has started');
      this.init = true;
    }).catch(() => {
      logger.info('ScanQuest did not start');
    });
  }

  async stop() {
    clearTimeout(this.timeout);
    this.spawner.stop();
    return await this.db.close();
  }

  async monitor(message: Message): Promise<void> {
    if (!this.init || this.bot === undefined || message.author.bot) return;

    // Prevents sending an empty message
    const send: SendFunction = async (msg, options) => {
      if (msg || options) {
        return await message.channel.send(msg, options)
          .catch(error => { logger.error(error.stack); });
      }
    };

    const content = message.content;
    const mentions: string[] = Array.from(message.mentions.users.keys());

    if (!API.data) {
      if (content.charAt(0) === '!') await send('Scanner has not started');
      return;
    }
    else if (API.data === 'local') {
      if (content.charAt(0) === '!') await send('Error with bot database');
      return;
    }

    if (
      (development && content.substring(0, 2) === 'd!') ||
      (!development && (content.charAt(0) === '!' || content.substring(0, 2).toLowerCase() === 'c!'))
    ) {
      const { cmd, args, options } = parseCommand(content);
      switch (cmd) {
        case 'scanlist':
          const s = this.db.servers.findOne({ id: message.guild.id });
          await send(s?.activescans.map(sc => `${sc.scan.name}`).concat('\n'));
          break;
        case 'skon':
        case 'scan':
          if (message.guild && this.db.is_receive_channel(message.guild.id, message.channel.id)) {
            await this.scanner.scan(message, flatten(args), send)
            .then(async (m) => {
              if (m && cmd === 'skon') await m.react('728825180763324447');
            });
          }
          return;
        case 'list':
        case 'scans':
        case 'skons':
          return await listScans(this.db, message, options, send);
        case 'rate':
          return await send(rate(this.db, message, args, options, this.bot));
        case 'balance':
        case 'coins':
          return await balance(this.db, message, options, send);
        case 'trade':
          if (message.guild) {
            await this.trader.trade(args, mentions, message);
          }
          return;

        /* Admin functions */
        case 'reroll':
          if (message.guild && message.member.hasPermission('ADMINISTRATOR')) {
            this.spawner.reroll(message);
          }
          return;
        case 'load':
          if (message.author.id === users('daddy') || message.author.id === users('bf')) {
            await send(loadScan(this.db, args));
          }
          return;
        case 'spawn':
          if (message.author.id === users('daddy') || message.author.id === users('bf')) {
            this.spawner.spawn(message, args, options);
          }
          return;
        case 'perim':
          return await perim(this.db, message, args, mentions, send);
      }
    }
    else if (message.guild) {
      this.spawner.tick(message);
    }
  }
}
