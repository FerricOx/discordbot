const {reload, rndrsp, cleantext} = require('./shared.js');

export function banlist(options) {
  if (options.includes("small") || options.includes("short")) {
    return small();
  }
  
  const {bans, watchlist} = reload('../config/bans.json');
  let message = "**April Fools Ban List:**\n=====";
  for (var key in bans) {
    message += "\n" + key;
  }
  message += "\n=====\n**Watchlist:** (Also Banned)"
  for (var key in watchlist) {
    message += "\n" + key;
  }
  return message;
}

function small() {
  const {small} = reload('../config/bans.json');
  let message = "**Short Banlist:**\n(Removes the minimum amount of game breaking cards)";
  small.forEach((key) => {
    message += "\n" + key;
  });
  return message;
}

export function whyban(card, options) {
  card = cleantext(card);

  const {bans, watchlist, hidden} = reload('../config/bans.json');

  let merge = Object.assign({}, bans, watchlist, hidden);
  for (var key in merge) {
    if (cleantext(key).indexOf(card) === 0) {
      if (options.includes("serious")) {
        return `*${key}*:\n${merge[key][0]}`;
      }
      else {
        return `*${key}*:\n${rndrsp(merge[key], 'bans')}`;
      }
    }
  }

  return rndrsp(["That card isn't banned. :D", `Oh lucky you, ${card} isn't banned`]);
}

export function limited() {
  const {limited} = reload('../config/bans.json');
  let message = "**Limited Format:**\n(1 copy of each of the following in addition to the banlist)";
  limited.forEach((key) => {
    message += "\n" + key;
  });
  return message;
}

export function shakeup() {
  const {shakeup} = reload('../config/bans.json');
  let message = "The **Shake Up** list aims to widen the meta";
  
  message += "\n``The following are limited (unique):``";
  shakeup.limited.forEach((key) => {
    message += "\n" + key;
  });
  
  message += "\n``The following are banned:``";
  shakeup.bans.forEach((key) => {
    message += "\n" + key;
  });

  return message;
}
