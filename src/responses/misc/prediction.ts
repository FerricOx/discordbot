const bannedCards = [
  'Ramarhvir, the Danian Hivebringer',
  'Neekwin',
  'Primal Smash',
  'Bodal, Flamedrill Researcher',
  'Cadence Clash',
  'Prexxor Chasm, the Blight',
  'Prexxor Chasm',
  "Lord van Bloot, Servant of Aa'une",
  'Imaginary Walls',
  'Mipedim Mirage',
  'Bi-Mowercycle',
  'Vial of Liquid Thought',
  'Elemental Elegy',
  'Talisman of Mandiblor',
  "Dror'niq",
  'Hune Paltanin',
  'Chaac',
  'Deadwater Devastation',
  'Supercooled Rain',
  "Zamool, Lord van Bloot's Enforcer",
  'Aerdak',
  'All of the element hate',
  'Every FTK',
  'Rhyme of the Reckless',
  'Inner Flood',
  "Ulmquad",
  'Enre-hep, High Muge of the Desert'
];
const unbannedCards = [
  'Ursis',
  "Carnivore's Keening",
  'Before the Storm',
  'Ulmar, Perithon Racer',
  "Malvadine, the King's Herald",
  "Melody of the Meek",
  "Strain of Infection",
  "Royal Mipedian Academy of Melee Arts",
  "Na-inna",
  "Mock'adyn",
  'Phoenix Belt',
  'Drabe',
  'Ifjann',
  "Aa'une the Oligarch",
  "Olkiex' Apron",
  'Lake Ken-i-Po',
  'Melody of Mirage',
  'Xerium Armor',
  'Fortissimo',
  'Twister of Elements',
  'Illexia, the Danian Queen',
  'Makanaz',
  'Kiru City Tunnels',
  'Garv',
  "Gan'trak",
  'Kebna',
  "Em'swa",
  'Olkiex',
  'Gigantroper',
  'Interlude of Interuption',
  'Interlude of Consequence',
  'Lore, Ancestral Caller',
  'Ailav',
  'Fliandar',
  'Hiadrom, Rock Ripper',
  "Najarin's Tower of Song",
  'Lanker',
  'Headmaster Ankhyja, Seeker of the Art',
  'Hifdaan',
  'Kopond, High Muge of the Hearth',
  'Jaal',
  'Xelfe',
  'Tarterek, Psi Overloader',
  'Unbalancing Battlesong',
  'Half of the cardpool',
  'Literally every ultra',
  'The OverWorld',
  'The UnderWorld',
  'Every Mipedian',
  'Every Danian',
  "Each and every M'arrillian",
  'Every fluidmorpher',
  'Every Tribeless creature',
  'Every attack with build points',
  'Every card in Dawn of Perim',
  'Literally every common'
];
const banReasons = [
  'to balance out Fivarth OTK',
  'because Chio wills it',
  "because it's inherently unfair",
  'because of the potential interactions with Etalla',
  "because we learned our lesson with Dror'niq",
  'for being confusing to new players',
  'because it was degenerate and allowed too many FTKs',
  "so we don't have another 8 hour argument",
  'for being furbait',
  'because Metal won a tournament with it',
  'because what are *you* gonna do about it?',
  'so we can remember what happiness feels like',
  'because Danians ruined the game',
  'because why not?',
  'for spamming the same link too many times',
  "to push the M'arrillian agenda",
  "because it's stupid OP",
  'because it was too pure for this world',
  'because we hate fun',
  'because it was datamined from the Chaotic VR fishing game',
  'because Chaotic is never coming back',
  'because it was part of a tax-evasion scheme',
  "because it's a rulings nightmare",
  'to honor democracy',
  'for crimes against The Party',
  'because if you use this card you deserve to be in jail',
  'because.',
  'because Gannon slipped us a $20',
  "because Chaotic players can't read",
  'to make *you* mad specifically',
  'because the OverWorld has had it too good for too long',
  'because it was used to kidnap people',
  "because TCD won't let us have nice things",
  "because Chio won't let us have nice things",
  'in case we want to unban Drorniq',
  'because you could not withstand its power',
  'because they are canonically destroyed',
  'because the people will it',
  'to spite the codemasters',
  'to lengthen the banlist',
  'to bring peace to Perim',
  'because it was ~problematic~ in Now or Never',
  'so the player base would stop complaining',
  'because #YOLO',
  'to tank the price',
  'because it crashed Recode',
  'as part of a complex seven card trade deal',
  'to make show decks playable',
  'because it seemed like a good idea at the time',
  'because we can always undo it, who cares',
  'to force people to play unrestricted',
  'to encourage format diversity',
  'to prevent the Doors of the Deepmines from reopening',
  'to lower the power level of the meta',
  'because you people just will not shut up about it',
  'to spice up the meta'
];
const unbanReasons = [
  'because Chaotic is never coming back',
  'because the revival is tomorrow',
  'because Chio wills it',
  'to remind players what fear is',
  "to push the M'arrillian agenda",
  'because it seemed like a good idea at the time',
  'to get my deck out of C-tier',
  'but only in Pauper',
  'because.',
  'because you people just will not shut up about it',
  'to honor democracy',
  'as part of a complex seven card trade deal',
  'because Gannon slipped us a $20',
  'because we are all gonna die one day anyways',
  'because games were too slow',
  'to make *you* mad specifically',
  'because the people will it',
  "because what's the worst that could happen?",
  'to hasten the end of days',
  'because the OverWorld has had it too good for too long',
  'in case we want to unban Drorniq',
  'to shorten the banlist',
  'to make show decks playable',
  'because we can always undo it, who cares',
  "for 'balance'",
  'because Chio gave it a pardon',
  'so that Neekwin can come off',
  "to bring back the good ol' days",
  'because Chio made a typo while editing the banlist',
  'because King has bought 20 copies of it.',
  'because Nicole wills it',
  'to spite the codemasters',
  'so the player base would stop complaining',
  'because #YOLO',
  'because why not?',
  'to encourage format diversity',
  'to raise the power level of the meta',
  'because Danians ruined the game',
  'to spice up the meta'
];

export default function prediction() {
  const isbanned = Math.floor((10 * Math.random()));
  const islimited = Math.floor((10 * Math.random()));

  let random_card;
  let reason;
  let prediction;
  if (isbanned >= 7) {
    random_card = bannedCards[Math.floor(Math.random() * bannedCards.length)];
    reason = unbanReasons[Math.floor(Math.random() * unbanReasons.length)];
    if (islimited >= 8) {
      prediction = random_card.concat(' is limited ', reason);
    }
    else {
      prediction = random_card.concat(' is unbanned ', reason);
    }
  }
  else {
    random_card = unbannedCards[Math.floor(Math.random() * unbannedCards.length)];
    reason = banReasons[Math.floor(Math.random() * banReasons.length)];
    if (islimited >= 8) {
      prediction = random_card.concat(' is limited ', reason);
    }
    else {
      prediction = random_card.concat(' is banned ', reason);
    }
  }
  return prediction;
}
