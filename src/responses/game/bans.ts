import { Guild } from 'discord.js';
import { can_send, is_channel, rndrsp, uppercase } from '../../common';
import { Channel } from '../../definitions';
import servers from '../../common/servers';
import { API } from '../../database';

import ban_lists from './config/bans.json';
const { formats, watchlist, detailed, reasons, jokes } = ban_lists;

function f() {
  let message = 'Community Formats:\n';

  for (const format in formats) {
    message += `**${uppercase(format)}**: ${formats[format]}\n`;
  }

  return message;
}

export { f as formats };

export function banlist(channel: Channel, guild?: Guild, options: string[] = []) {
  if (guild && guild.id === servers('main').id) {
    if ((is_channel(channel, 'gen_1') || is_channel(channel, 'gen_2'))) {
      // eslint-disable-next-line max-len
      return (`I'm excited you want to follow the ban list, but to keep the channel from clogging up, can you ask me in <#${servers('main').channel('bot_commands')}>?`);
    }
  }

  let message = '';

  const title = (_format: string) => {
    message = `**${uppercase(_format)}:**\n${formats[_format]}`;
  };

  const list_bans = (_format: string) => {
    message += '\n==Banned Cards==';
    ban_lists[_format].forEach((key: string) => {
      message += `\n${key}`;
    });
  };

  const format = (options.length === 0) ? 'standard' : options[0].toLowerCase();

  switch (format) {
    // Standard
    case 'standard': {
      title('standard');
      list_bans('standard');
      message += '\n=====\n**Watchlist:** (not banned)';
      watchlist.forEach((key: string) => {
        message += `\n${key}`;
      });
      message += '\n=====\nYou can ask why a card was banned with "!whyban *card name*"';
      break;
    }
    // Legacy
    case 'legacy': {
      title('legacy');
      break;
    }
    // Pauper
    case 'pauper': {
      title('pauper');
      list_bans('pauper');
      break;
    }
    // Noble
    case 'peasant':
    case 'noble': {
      title('noble');
      list_bans('noble');
      break;
    }
    // Modern
    case 'rotation':
    case 'modern': {
      title('modern');
      list_bans('modern');
      break;
    }
    // Advanced Apprentice
    case 'advanced apprentice':
    case 'aap': {
      message = `**Advanced Apprentice (AAP):**\n${formats.aap}`;
      list_bans('aap');
      break;
    }
    default: {
      message = 'Not a supported format';
    }
  }

  return message;
}

export function whyban(
  name: string, channel: Channel, guild?: Guild, options: string[] = []
): string | undefined {
  if (!name) return 'Please provide a card or use !banlist';

  const card = API.find_cards_by_name(name)[0] ?? null;

  if (!card) return 'Not a valid card name';

  const cardName = card.gsx$name;

  // Check if long explanation requested
  if (options.includes('detailed')) {
    if (!Object.keys(reasons).includes(cardName)) {
      return `${cardName} isn't banned`;
    }

    if (guild && !can_send(guild, channel)) return;

    if (Object.keys(detailed).includes(cardName)) {
      return `*${cardName}*:\n${detailed[cardName]}`;
    }

    if (Object.keys(reasons).includes(cardName)) {
      return `${cardName} doesn't have a more detailed explanation`;
    }
  }

  if (Object.keys(reasons).includes(cardName)) {
    if (options.includes('joke')) {
      if (reasons[cardName].length > 1) {
        return `*${cardName}*:\n${rndrsp(reasons[cardName].slice(1, reasons[cardName].length), cardName)}`;
      }
      else {
        return `Sorry ${cardName} doesn't have a joke entry`;
      }
    }
    else {
      if (!guild || can_send(guild, channel))
        return `*${cardName}*:\n${reasons[cardName][0]}`;
    }
  }

  if (Object.keys(jokes).includes(cardName)) {
    return `*${cardName}*:\n${rndrsp(jokes[cardName], cardName)}`;
  }

  return rndrsp(["That card isn't banned", `Oh lucky you, ${cardName} isn't banned`]);
}
