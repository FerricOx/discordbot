export const Tribes = ['Danian', 'Mipedian', "M'arrillian", 'OverWorld', 'UnderWorld', 'Frozen'];
const _Tribes = ['Danian', 'Mipedian', "M'arrillian", 'OverWorld', 'UnderWorld', 'Frozen'] as const;

export const CreatureTribes = Tribes.concat('Tribeless');
export const MugicTribes = Tribes.concat('Generic')

export type Tribe = typeof _Tribes[number];
export type CreatureTribe = Tribe | 'Tribeless';
export type MugicTribe = Tribe | 'Generic';

export type CardTypes = ['Attacks', 'Battlegear', 'Creatures', 'Locations', 'Mugic'];
const _Types = ['Attacks', 'Battlegear', 'Creatures', 'Locations', 'Mugic'] as const;

export type CardType = typeof _Types[number];

export function parseTribe(input: string, type?: 'Creatures' | 'Mugic') {
  switch (input.toLowerCase()) {
    case 'danian':
    case 'danians':
      return 'Danian'
    case 'marrillian':
    case 'marrillians':
    case 'm\'arrillian':
    case 'm\'arrillians':
      return "M'arrillian";
    case 'mipedian':
    case 'mipedians':
      return 'Mipedian';
    case 'overworld':
    case 'overworlders':
      return 'OverWorld';
    case 'underworld':
    case 'underworlders':
      return 'UnderWorld';
    case 'tribeless':
      if (type === 'Mugic') return 'Generic';
      return 'Tribeless';
    case 'generic':
      if (type === 'Creatures') return 'Tribeless';
      return 'Generic';
  }
}

export function generify(tribe: CreatureTribe | MugicTribe, type: 'Mugic'): MugicTribe
export function generify(tribe: CreatureTribe | MugicTribe, type: 'Creatures'): CreatureTribe
export function generify(tribe: CreatureTribe | MugicTribe, type: 'Creatures' | 'Mugic') {
  if (type === 'Creatures') {
    if (tribe === 'Generic') tribe = 'Tribeless';
    return tribe;
  }
  else if (type === 'Mugic') {
    if (tribe === 'Tribeless') tribe = 'Generic';
    return tribe;
  }
}

export function parseType(input: string): CardType | undefined {
  switch (input.toLowerCase()) {
    case 'attack':
    case 'attacks':
      return 'Attacks';
    case 'battlegear':
      return 'Battlegear';
    case 'creature':
    case 'creatures':
      return 'Creatures';
    case 'location':
    case 'locations':
      return 'Locations';
    case 'mugic':
      return 'Mugic';
  }
}
