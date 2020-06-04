import { RichEmbed } from 'discord.js';

import { API } from '../../database';
import Scannable from '../scanner/Scannable';
import { Server } from '../scan_db';
import Battlegear from './Battlegear';
import Creature from './Creature';
import Location from './Location';

export default class Select {
  private readonly scan_battlegear: Battlegear;
  private readonly scan_creature: Creature;
  private readonly scan_locations: Location;

  constructor() {
    this.scan_battlegear = new Battlegear();
    this.scan_creature = new Creature();
    this.scan_locations = new Location();
  }

  /**
   * Picks a new card and duration to send
   * @param server The server that we're picking a card for
   */
  public card(server: Server) {
    const [scannable, image] = this.select(server);

    const card = API.find_cards_by_name(scannable.card.name)[0];

    const duration =
      (() => {
        switch (card.gsx$type) {
          case 'Attacks': return 0;
          case 'Battlegear': return 3;
          case 'Creatures': return 2;
          case 'Locations': return 4;
          case 'Mugic': return 0;
          default: return 0;
        }
      })()
      *
      (() => {
        switch (card.gsx$rarity.toLowerCase()) {
          case 'ultra rare': return 4.5;
          case 'super rare': return 4;
          case 'rare': return 3;
          case 'uncommon': return 2;
          case 'common': return 2;
          case 'promo': return 5;
          default: return 2;
        }
      })();

    image.setTitle(`Scan expires in ${duration} hours`);

    return { scannable, image, duration };
  }

  // Creatures spawn more often than locations and battlegear
  // TODO more complex spawn logic
  private select(server: Server): [Scannable, RichEmbed] {
    let scannable: Scannable;
    let image: RichEmbed;

    const rnd = Math.floor(Math.random() * 20);
    if (rnd < 4) {
      [scannable, image] = this.scan_locations.generate();
    }
    else if (rnd < 5) {
      [scannable, image] = this.scan_battlegear.generate();
    }
    else {
      [scannable, image] = this.scan_creature.generate();
    }

    // Don't resend existing scan
    if (server.activescans.find(scan => scan.scan.name === scannable.card.name)) {
      return this.select(server);
    }

    return [scannable, image];
  }
}
