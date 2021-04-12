/* eslint-disable max-len */
// File is js until I remove all the comments, then can revert to json
module.exports = {
    "card": {
        "cmd": "!card <card-name|> [;<card-name>...]", 
        "list": "Returns a card; has many options", 
        "details": "Provide a card name and I'll return the card's text as well as its picture.\nWithout a card name, I'll return a random card. You can ask for multiple cards using a semi-colon\nYou can use ``--type=`` for card type or ``--tribe=`` for a Tribe (no space after the = ).\nAdditional options are ``--min``, ``--max``, ``--detailed``, ``--text``, ``--stats``, ``--ability``, ``--image``"
    },
    "cards": {
        "cmd": "!cards [<card-name>] [;<card-name>]...",
        "alias": "card"
    },
    "ability": {
        "cmd": "!ability [<card-name>] [;<card-name>]...",
        "details": "I only show the ability, subtypes, and stats of a card. Equivalent to ``!card --ability``"
    },
    "text": {
        "cmd": "!text [<card-name>] [;<card-name>]...",
        "details": "I'll show all the card information without the card image. Equivalent to ``!card --text``"
    },
    "stats": {
        "cmd": "!stats [<card-name>] [;<card-name>]...",
        "details": "I'll only show the stats of a card. Equivalent to ``!card --stats``"
    },
    "image": {
        "cmd": "!image [<card-name>] [;<card-name>]...",
        "details": "I'll only show the card image. Equivalent to ``!card --image``"
    },
    "fullart": {
        "cmd":"!fullart [<card-name>]", 
        "list": "", 
        "details": "You provide a card name, I'll look for its full art.\nSome pieces have alternative, which you can access via ``--alt`` or ``--alt2``"
    },
    "full": {
        "cmd": "!full [<card-name>]",
        "alias": "fullart"
    },
    "cutout": {
        "cmd": "!cutout [<card-name>]",
        "details": "I'll show you a cutout art of a Creature card"
    },
    "avatar": {
        "cmd": "!avatar [<card-name>]",
        "alias": "cutout"
    },
    "find": {
        "cmd": "!find <input>", 
        "list": "Returns card names that contain supplied input", 
        "details": "I'll search for card names that contain the letters you provide."
    },
    "rate": {
        "cmd":"!rate <Creature> <Courage> <Power> <Wisdom> <Speed> <Energy>", 
        "list": "I'll rate a Creature based on its stats",
        "details": "I have three methods ``--metal``, ``--king``, or ``--smildon`` (default metal).\n--king has additional options:\n``--nocheck --noweight`` (this is equivalent to smildon's in percent)\n``--pure`` has no weights at all\n``--nocheck`` ignores any stat check modifiers\n``--noweight`` ignores any comparison between stats (e.g. having 2 max 2 min is worth more than all average)"
    },
    "readthecard": {
        "cmd": "!readthecard <card-name>",
        "details": "I have discord read the card's ability using text to speech.\nUse ``--brainwashed`` for brainwashed text.",
        "mod": true
    },
    "parasite": {
        "cmd": "!parasite ['token'] 'orange'|'blue' ['1'|'2']",
        "details": "Returns the specified parasite token"
    },
    "token": {
        "cmd": "!token 'orange'|'blue' ['1'|'2']",
        "alias": "parasite"
    },
    "faq": {
        "cmd": "!faq <phrase>",
        "list": "Answers to some of the common questions"
    },
    "rule": {
        "cmd": "!rule <rule>",
        "list": "Returns the definition of the rule"
    },
    "keyword": {
        "cmd": "!keyword <rule>",
        "alias": "rule"
    },
    "documents": {
        "cmd": "!rulebook, !cr, !errata, !guide", 
        "list": "The important documents. Use any of these commands"
    },
    "rulebook": {
        "cmd":"!rulebook <language|> <set|>", 
        "details": "You can ask for a different different rulebooks. If you don't tell me otherwise, I'll return the equivalent of ``!rulebook EN AU``\nFor a list of all rulebooks I have, type ``!rulebook --list``"
    },
    "rulebooks": {
        "cmd": "!rulebooks",
        "details": "I show a list of rulebooks I have. Equivalent to ``!rulebook --list``"
    },
    "cr": {
        "cmd": "!cr [<section>]",
        "details": "I'll give you the Comphrensive Rules document, or just the section specified"
    },
    "comprehensive": {
        "cmd": "!comprehensive",
        "details": "I'll give you the Comphrensive Rules document"
    },
    "errata": {
        "cmd": "!errata",
        "details": "I'll give you the official errata document"
    },
    "guide": {
        "cmd": "!guide",
        "details": "It's a player made guide that provides a more thorough explaination of the basic rules"
    },
    "starters": {
        "cmd":"!starters", 
        "list": "Player made starter decks", 
        "details": "I'll provide a list of starter decks. Default are Metal's old recode starter decks, but you can add ``--king`` or ``--ivan`` for different ones."
    },
    "starter": {
        "alias": "starters"
    },
    "formats": {
        "cmd": "!formats",
        "details": "Shows a list of the community formats and their definitions"
    },
    "banlist": {
        "cmd": "!banlist\n!ban, !whyban <card-name>",
        "list":"You can use `!format` for the list of formats", 
        "details": "Ask me about the banlist or why a card is or could be banned ``!whyban <card>``.\nThere are different ``!formats`` with their own banlists."
    },
    "standard": {
        "details": "Use ``!banlist standard``"
    },
    "legacy": {
        "details": "Use ``!banlist legacy``"
    },
    "modern": {
        "details": "Use ``!banlist modern``"
    },
    "pauper": {
        "details": "Use ``!banlist pauper``"
    },
    "noble": {
        "details": "Use ``!banlist noble``"
    },
    "ban": {
        "alias": "whyban"
    },
    "whyban": {
        "cmd": "!whyban <card>",
        "details": "Explains why a card is be banned, or why people think it should be banned.\nSome of the cards with serious reasons also have joke reaons why they should be banned ``--joke``"
    },
    "strong": {
        "alias": "good"
    },
    "good": {
        "cmd": "!good <type|tribe> < bp|type >", 
        "list": "Returns a list of good cards", 
        "details": "Asking about good cards? What'cha looking for?\nI can give by type, or if you need something more specific: by build point or tribe.\n``!good M'arrillian Creatures``\n ``!good Attacks 1``"
    },
    "goodstuff": {
        "alias": "good"
    },
    "deck": {
        "alias": "decks"
    },
    "decks": {
        "cmd": "!decks <tribe|type|teir|keyword|creature>",
        "list": "Sends a list of community curated decks based on user input",
        "details": "Specify a tribe, tier, deck type, keyword, or Creature to search for decks.\nYou can use ``!deck types`` to see an explaination on how types are defined."
    },
    "decklist": {
        "alias": "decks"
    },
    "tier": {
        "cmd": "!tier <tier>",
        "details": "Sends a list of the specific tier decks"
    },
    "tierlist": {
        "list": "Returns the tierlist. Or acts as an alias to ``!decks`` if input is provided"
    },
    "tiers": {
        "alias": "tierlist"
    },
    "cupid": {
        "alias": "lf"
    },
    "if": {
        "alias": "lf"
    },
    "lf": {
        "cmd": "!lf [<type>]",
        "list": "Adds a specific match making roles"
    },
    "lookingfor": {
        "alias": "lf"
    },
    "match": {
        "alias": "lf"
    },
    "cancel": {
        "cmd": "!cancel",
        "list": "Remove all matchmaking roles"
    },
    "donate": {
        "details": "Sends the donation link. Thanks for supporting my development!"
    },
    "collection": {
        "details": "Sends a link to the collection"
    },
    "portal": {
        "details": "Sends a link to the portal"
    },
    "recode": {
        "cmd": "!recode ['tutorial|missing']",
        "details": "Sends a link to Chaotic Recode, a video tutorial, or the list of missing cards"
    },
    "forum": {
        "cmd": "!forum ['decks']",
        "details": "Sends a link to the forum, or specifically the deck building subforum"
    },
    "fun": {
        "alias": "agame"
    },
    "funstuff": {
        "alias": "agame"
    },
    "agame": {
        "details": "Sends a list of cards that A-Game considers fun to play with"
    },
    "menu": {
        "details": "What's on the menu in the Port Court? Let's find out!"
    },
    "order": {
        "cmd": "!order <item>",
        "details": "Order's something I have on the menu"
    },
    "make": {
        "alias": "cook"
    },
    "cook": {
        "cmd": "!cook <food>",
        "details": "I'll share you a emoji recipe. Not to be confused with ``!order``"
    },
    "speak": {
        "alias": "language"
    },
    "speaker": {
        "alias": "language"
    },
    "speakers": {
        "alias": "language"
    },
    "language": {
        "cmd": "!language <language> 'join|leave|list'",
        "list": "Connect with other players of the same language!",
        "details": "I'll add a language role to you if it exists on the sever.\nTo find out what languages you can join use ``!language list``"
    },
    "languages": {
        "alias": "language"
    },
    "region": {
        "cmd": "!region 'list'\n!region <region name> ['join|leave|ping|list']",
        "details": "",
        "mod": "!region 'add|remove' <region name>\n!region 'rename' <region name> <new name>\n!region <region name> 'add|remove' <@guildMember>"
    },
    "regions": {
        "alias": "region"
    },
    "tribe": {
        "cmd": "!tribe 'join|leave' [<tribe>]", 
        "list": "You can join your favorite tribe (or lack thereof)", 
        "details": "Here are the tribes you can join:\n <:Dan:294942889337683968> Danian, <:Mip:294941790052679690> Mipedian, <:Mar:294942283273601044> M'arrillian, <:OW:294939978897555457> OverWorld, <:UW:294943282943885313> UnderWorld, <:TL:294945357392248833> Tribeless\nYou can only be loyal to one... but you can always switch."
    },
    "bw": {
        "alias": "brainwash"
    },
    "brainwash": {
        "cmd": "!brainwash",
        "details": "Adds the brainwashed role to a user",
        "mod": "If you mention a user, I'll brainwash that user"
    },
    "colour": {
        "alias": "color"
    },
    "color": {
        "cmd": "!color 'set|remove' <color>",
        "details": "In servers with color roles, I can be used to set colors"
    },
    "never": {
        "cmd": "!never <card>",
        "details": "Shows a Chaotic: Now or Never card, or a random one if none specified. Note: I don't have all of the cards."
    },
    "nowornever": {
        "alias": "never"
    },
    "non": {
        "alias": "never"
    },
    "gone": {
        "alias": "fan"
    },
    "fan": {
        "cmd": "!fan [<card>]",
        "details": "Sends a card from one of our community acclaimed unsets"
    },
    "unset": {
        "alias": "fan"
    },
    "flirt": {
        "alias": "compliment"
    },
    "compliment": {
        "cmd":"!compliment [<name|@name>]", 
        "details": "I'll try to lift your spirits or let me know if there's someone specific you had in mind."
    },
    "burn": {
        "alias": "insult"
    },
    "roast": {
        "alias": "insult"
    },
    "insult": {
        "cmd":"!insult [<name|@name>]", 
        "details": "I'll cook up a smoldering burn. Let me know if there's someone specific you had in mind."
    },
    "joke": {
        "list": "I'll tell you a Chaotic joke"
    },
    "whistle": {
        "cmd": "!whistle",
        "details": "If you're the host of a trivia this signals that the answer period is over",
        "mod": true
    },
    "trivia": {
        "cmd": "!trivia",
        "details": "If an existing trivia is not being hosted, you are now a host! Please use again to stop the trivia",
        "mod": true
    },
    "answer": {
        "cmd": "!answer <text>",
        "details": "Message me the answer to a trivia question. When the host whistles, I'll collect all the answers"
    },
    "happy": {
        "cmd": "!happy borth-day",
        "details": "Did I hear that it's someone's birthday?!"
    },
    "watch": {
        "cmd":"!watch <language> [<season>]", 
        "details": "You can watch Chaotic in various languages!\nIf a season number is followed by SD it isn't high definition.\nFor a list of all episodes I have, type ``!watch --list``"
    },
    "perim": {
        "cmd": "!perim protector",
        "list": "Sends the 'Perim Protector' boss sprites.\nFor all commands related to the scanquest use ``!perim help``"
    },
    "map": {
        "cmd": "```md\n!map <OverWorld | UnderWorld>\n```",
        "details": "Sends a map of the OverWorld or UnderWorld"
    },
    "help": {
        "details": "**Command Help Syntax Explaination**\n> < > notate a user input paramater (these are order dependant)\n> a parmater in single quotes ' ' means that literal text(s) is required\n> a pipe | notates that either option within ' ' or < > can be used\n> a paramater in brackets [] means that it is optional\n> [] with ellipses ... notates that any number of that paramater can be used\n> command options that have -- can be used anywhere within the syntax and are not order dependant"
    },
    "cmd": {
        "alias": "commands"
    },
    "command": {
        "alias": "commands"
    },
    "commands": {
        "cmd": "!commands [<command>]", 
        "details": "This is for when you need help with my help. You might be looking for ``!command help``"
    },
    "banhammer": {
        "cmd": "!banhammer",
        "details": "Sends 'The Doomhammer' card image"
    },
    "rm": {
        "cmd": "!rm",
        "details": "Removes the last bot message sent in the channel",
        "mod": "If a number is provided, this is an alias for ``!delete``"
    },
    "clear": {
        "alias": "delete",
        "mod": true
    },
    "clean": {
        "alias": "delete",
        "mod": true
    },
    "delete": {
        "cmd": "!delete <number> [@user]",
        "details": "Deletes the specified number of messages. If a user mention is provided, deletes that many messages from the user instead.",
        "mod": true
    },
    "haxxor": {
        "cmd": "!haxxor",
        "details": "Resets the bot's card database and restarts the bot",
        "mod": true
    },
    "logs": {
        "cmd": "!logs",
        "details": "Sends a list of bot logs",
        "mod": true
    }
}
