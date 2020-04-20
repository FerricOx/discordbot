import { Guild, GuildMember, Role } from 'discord.js';
import { hasPermission } from '../../common';
import { Channel } from '../../definitions';
import servers from '../../common/servers';

const types = ['untap', 'tts'];

function canMatch(guild: Guild, channel: Channel): boolean {
  if (!(guild && hasPermission(guild, 'MANAGE_ROLES'))) return false;
  if (guild.id === servers('main').id && channel.id !== servers('main').channel('match_making')) return false;
  return true;
}

export function lookingForMatch(type: string, channel: Channel, guild: Guild, member: GuildMember) {
  if (!canMatch(guild, channel)) return;

  if (!type) type = 'untap';
  else if (types.indexOf(type) === -1) {
    type = 'untap';
  }

  const role = guild.roles.find((role: Role) => role.name === `${type}_match`);
  if (role) {
    member.addRole(role).catch(() => {});
    if (role.mentionable) {
      return `You are looking for a <@&${role.id}>`;
    }
    return `You are looking for a ${type} match`;
  }
}

export function cancelMatch(channel: Channel, guild: Guild, member: GuildMember) {
  if (!canMatch(guild, channel)) return;

  for (let i = 0; i < types.length; i++) {
    const role = guild.roles.find((role: Role) => role.name === `${types[i]}_match`);
    if (member.roles.find((r) => role === r)) {
      member.removeRole(role).catch(() => {});
    }
  }

  return 'You are no longer looking for a match';
}
