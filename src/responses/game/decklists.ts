import { RichEmbed } from 'discord.js';
import { cleantext } from '../../common';
import { parseTribe } from '../../common/card_types';
import { API } from '../../database';
import { tierlist, decklist, axes, isTier, isType, tiers } from './config/decklists';

function _tiers(input: string) {
  input = input.toUpperCase();

  if (input === 'CM') input = 'S';

  if (isTier(input)) {
    let message = '';

    tierlist[input].forEach((deck: string) => {
      message += `[${deck}](${decklist[deck].url})\n`;
    });
    return (new RichEmbed()).addField(`${input} Decks`, message, true);
  }
}

function _types(input: string) {
  let _type = input.charAt(0).toUpperCase() + input.slice(1);

  if (input.toLowerCase() === 'aggrocontrol') _type = 'Aggro-Control';
  else if (input.toLowerCase() === 'controlaggro') _type = 'Midrange';
  else if (input.toLowerCase() === 'antimeta' || input.toLowerCase() === 'meta') _type = 'Anti-Meta';

  if (isType(_type)) {
    const deck_list = [] as string[];
    for (const deck in decklist) {
      const { type, url } = decklist[deck];
      if (type.includes(_type)) deck_list.push(`[${deck}](${url})`);
    }

    let message = `**${_type} Decks:**\n(${axes[_type]})\n\u200B\n`;
    message += deck_list.join('\n');
    return (new RichEmbed()).setDescription(message);
  }
}

function _tribes(input: string) {
  const _tribe = (input === 'frozen') ? 'Mixed' : parseTribe(input, 'Mixed');

  if (_tribe !== undefined) {
    const deck_list = [] as string[];
    for (const deck in decklist) {
      const { tribe, url } = decklist[deck];
      if (_tribe === tribe) deck_list.push(`[${deck}](${url})`);
    }

    let message = `**${_tribe} Decks:**\n`;
    message += deck_list.join('\n');
    return (new RichEmbed()).setDescription(message);
  }
}

function _tags(input: string) {
  const deck_list: string[] = [];

  for (const deck in decklist) {
    const { tags, url } = decklist[deck];

    tags.forEach(tag => {
      if (cleantext(tag).includes(input)) {
        deck_list.push(`[${deck}](${url})`);
      }
    });
  }

  if (deck_list.length > 0) {
    let output = deck_list.join('\n');
    if (output.length > 2000) output = output.slice(0, 1999);
    return (new RichEmbed()).setDescription(output);
  }
}

function _creatures(input: string) {
  const results = API.find_cards_ignore_comma(input);

  if (results.length === 0) return undefined;

  const card = results[0];

  const deck_list: string[] = [];

  for (const deck in decklist) {
    const { creatures, url } = decklist[deck];

    if (creatures.includes(card.gsx$name)) {
      deck_list.push(`[${deck}](${url})`);
    }
  }

  if (deck_list.length > 0) {
    let message = `${card.gsx$name} Decks:\n`;
    message += deck_list.join('\n');
    if (message.length > 2000) message = message.slice(0, 1999);
    return (new RichEmbed()).setDescription(message);
  }
}

function _axes() {
  let rsp = '';

  for (const [key, value] of Object.entries(axes)) {
    rsp += `**${key}**: ${value}\n`;
  }

  return rsp;
}

function _decklist(input: string): RichEmbed | string {
  let output: RichEmbed | undefined;
  input = cleantext(input);

  if (input.length < 1) {
    return 'Specify a tribe, tier, or keyword to search for decks';
  }

  if (input === 'types') {
    return _axes();
  }

  if (input.length <= 2 && (output = _tiers(input)) instanceof RichEmbed) {
    return output;
  }

  if ((output = _types(input)) instanceof RichEmbed) {
    return output;
  }

  if (input === 'generic' || input === 'tribeless') {
    return _tags('tribeless')!;
  }

  if ((output = _tribes(input)) instanceof RichEmbed) {
    return output;
  }

  if (input.length > 3) {
    if ((output = _tags(input)) instanceof RichEmbed) {
      return output;
    }

    if ((output = _creatures(input)) instanceof RichEmbed) {
      return output;
    }
  }

  return "I'm unable to find decks that match your search";
}

function _tierlist() {
  const output = new RichEmbed()
    // eslint-disable-next-line max-len
    .setDescription('Disclaimer: This tierlist does not always accurately reflect the meta but is rather a guide to what deck types are strong.');
  for (const key of tiers) {
    let message = '';
    tierlist[key].forEach((deck: string) => {
      message += `[${deck}](${decklist[deck].url})\n`;
    });
    output.addField(key, message, true);
  }

  return output;
}

export {
  _tierlist as tierlist,
  _decklist as decklist
};
