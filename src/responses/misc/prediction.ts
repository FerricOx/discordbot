export default function prediction() {
  var bannedCards = [
    "Ramarhvir, the Danian Hivebringer",
    "Neekwin",
    "Primal Smash",
    "Bodal, Flamedrill Researcher",
    "Mock'adyn",
    "Song of Resistance",
    "Cadence Clash",
    "Lore, Ancestral Caller",
    "Melody of the Meek",
    "Prexxor Chasm, the Blight",
    "Prexxor Chasm",
    "Strain of Infection",
    "Lord van Bloot, Servant of Aa'une",
    "Imaginary Walls",
    "Vial of Liquid Thought",
    "Bi-Mowercycle",
    "Dror'niq",
    "Hune Paltanin",
    "Chaac",
    "Deadwater Devastation",
    "Supercooled Rain",
    "Zamool, Lord van Bloot's Enforcer",
    "Aerdak",
    "Enre-hep, High Muge of the Desert"
  ];
  var unbannedCards = [
    "Inner Flood",
    "Ursis",
    "Carnivore's Keening",
    "Ulmquad",
    "Aa'une the Oligarch",
    "Rhyme of the Reckless",
    "Melody of Mirage",
    "Xerium Armor",
    "Fortissimo",
    "Twister of Elements",
    "Illexia, the Danian Queen",
    "Malvadine, the King's Herald",
    "Makanaz",
    "Kiru City Tunnels",
    "Garv",
    "Gan'trak",
    "Kebna",
    "Olkiex",
    "Gigantroper",
    "Interlude of Interuption",
    "Interlude of Consequence",
    "Mipedim Mirage",
    "Ailav",
    "Fliandar",
    "Hiadrom, Rock Ripper",
    "Najarin's Tower of Song",
    "Lanker",
    "Headmaster Ankhyja, Seeker of the Art",
    "Elemental Elegy",
    "Hifdaan",
    "Ikkatosh, the Aich King",
    "Kopond, High Muge of the Hearth",
    "Ulmar, Perithon Racer",
    "Na-inna",
    "Jaal",
    "Xelfe",
    "Tarterek, Psi Overloader",
    "Unbalancing Battlesong",
    "Literally every ultra",
    "Literally every common"
  ];
  var banReasons = [
    "to balance out Fivarth OTK",
    "because it's inherently unfair",
    "because of the potential interactions with Etalla",
    "because we learned our lesson with Dror'niq",
    "because it's stupid OP",
    "because it was degenerate and allowed too many FTKs",
    "so we don't have another 8 hour argument",
    "because Metal won a tournament with it",
    "because what are *you* gonna do about it?",
    "so we can remember what happiness feels like",
    "because it was too pure for this world",
    "because we hate fun",
    "because it was datamined from the Chaotic VR fishing game",
    "because Chaotic is never coming back",
    "because it was part of a tax-evasion scheme",
    "because it's a rulings nightmare",
    "for spamming the same link too many times",
    "to push the M'arrillian agenda",
    "to honor democracy",
    "for crimes against The Party",
    "because if you use this card you deserve to be in jail",
    "because.",
    "because Gannon slipped us a $20",
    "because Chaotic players can't read",
    "to make *you* mad specifically",
    "because the OverWorld has had it too good for too long",
    "because it was used to kidnap people",
    "because TCD won't let us have nice things",
    "in case we want to unban Drorniq",
    "for 'balance'",
    "because I deem it so",
    "because you could not withstand its power",
    "because they are canonically destroyed",
    "because the people will it",
    "to spite the codemasters",
    "to lengthen the banlist",
    "to bring peace to Perim",
    "because it was ~problematic~ in Now or Never",
    "so the player base would stop complaining",
    "because #YOLO",
    "because why not?",
    "because it crashed Recode",
    "to encourage format diversity",
    "because Danians ruined the game",
    "to spice up the meta"
  ];
  var unbanReasons = [
    "because Chaotic is never coming back",
    "because the revival is tomorrow",
    "to remind players what fear is",
    "to push the M'arrillian agenda",
    "to get my deck out of C-tier",
    "because.",
    "to honor democracy",
    "because Gannon slipped us a $20",
    "because games were too slow",
    "to make *you* mad specifically",
    "because the people will it",
    "because what's the worst that could happen?",
    "to hasten the end of days",
    "because the OverWorld has had it too good for too long",
    "in case we want to unban Drorniq",
    "to shorten the banlist",
    "for 'balance'",
    "because Astrum gave it a pardon",
    "so that Neekwin can come off",
    "to bring back the good ol' days",
    "because Nicole wills it",
    "to spite the codemasters",
    "so the player base would stop complaining",
    "because #YOLO",
    "because why not?",
    "to encourage format diversity",
    "because Danians ruined the game",
    "to spice up the meta"
  ];
  var isbanned = Math.floor((10 * Math.random()));
  var random_card;
  var reason;
  var prediction;
  if (isbanned >= 7) {
    random_card = bannedCards[Math.floor(Math.random() * bannedCards.length)];
    reason = unbanReasons[Math.floor(Math.random() * unbanReasons.length)];
    prediction = random_card.concat(" is unbanned ", reason);
  } else {
    random_card = unbannedCards[Math.floor(Math.random() * unbannedCards.length)];
    reason = banReasons[Math.floor(Math.random() * banReasons.length)];
    prediction = random_card.concat(" is banned ", reason);
  }
  return prediction;
}