import { GuildMember, Snowflake } from 'discord.js';
import Loki, { Collection } from 'lokijs';
import path from 'path';
import db_path from '../../database/db_path';
const LokiFSStructuredAdapter = require('lokijs/src/loki-fs-structured-adapter');

export class Region {
  public name: string;
  public members: Member[];
}

export class Member {
  public id: Snowflake;

  constructor(member: GuildMember) {
    this.id = member.id;
  }
}

class MeetupsAPI {
  private regions: Collection<Region>;

  constructor() {
    const db = new Loki(path.resolve(db_path, 'regions.db'), {
      autosave: true,
      autoload: true,
      autosaveInterval: 4000,
      adapter: new LokiFSStructuredAdapter(),
      autoloadCallback: () => {
        const regions = db.getCollection('regions') as Collection<Region>;
        if (regions === null) {
          this.regions = db.addCollection('regions');
        }
        else {
          this.regions = regions;
        }
      }
    });
  }

  addRegion = async (regionName: string) => {
    const region = this.regions.findOne({ name: regionName });
    if (region) return Promise.reject(new Error(`Region "${region}" already exists`));
    this.regions.insert({ name: regionName, members: [] });
  }

  getRegion = async (regionName: string): Promise<Region> => {
    const region = this.regions.findOne({ name: regionName });
    if (!region) return Promise.reject((`Region "${regionName}" does not exist`));
    return Promise.resolve(region);
  }

  removeRegion = async (region: Region) => {
    this.regions.remove(region);
    return Promise.resolve();
  }

  getRegionList = async (): Promise<Region[]> => {
    return Promise.resolve(this.regions.chain().simplesort('name').data());
  }

  renameRegion = async (region: Region, newName: string) => {
    this.regions.findAndUpdate({ name: region.name }, (rg: Region) => {
      rg.name = newName;
    });
    return Promise.resolve();
  }

  convertGuildMember = (member: GuildMember): Member => {
    return new Member(member);
  }

  getMembersInRegion = (region: Region): Member[] => {
    return region.members;
  }

  findMemberRegionIndex = async (member: GuildMember, region: Region): Promise<number> => {
    const members: Member[] = this.getMembersInRegion(region);
    return Promise.resolve(members.findIndex((mb) => mb.id === member.id));
  }

  addMemberToRegion = async (member: GuildMember, region: Region) => {
    return this.findMemberRegionIndex(member, region).then((i: number) => {
      if (i >= 0) {
        throw new Error(`${member.displayName} is already in ${region.name}`);
      }

      this.regions.findAndUpdate({ name: region.name }, (rg: Region) => {
        rg.members.push(this.convertGuildMember(member));
      });
    });
  }

  removeMemberFromRegionByIndex = async (i: number, region: Region) => {
    this.regions.findAndUpdate({ name: region.name }, (rg: Region) => {
      rg.members.splice(i, 1);
    });
    return Promise.resolve();
  }

  removeMemberFromRegion = async (member: GuildMember, region: Region) => {
    return this.findMemberRegionIndex(member, region).then(async (i: number) => {
      if (i < 0) {
        throw new Error(`${member.displayName} is not a member of ${region.name}`);
      }
      return this.removeMemberFromRegionByIndex(i, region);
    });
  }
}

export const MeetupsDB = new MeetupsAPI();
