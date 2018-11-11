import { RichEmbed } from 'discord.js';
import { MediaWikiSearchResult } from './dataSources/mediaWiki';
import { getWikipediaSearchLink, searchWikipedia } from './dataSources/wikipedia';

async function ping(): Promise<string> {
  return 'pong';
}

async function search(messageText: string): Promise<RichEmbed> {
  const result = await searchWikipedia(messageText);

  const embed = new RichEmbed()
    .setTitle(`Wikipedia Search: **${messageText}**`)
    .setURL(getWikipediaSearchLink(messageText))
    .setColor(0x56789A);

  const newEmbed = result.reduce((e: RichEmbed, s: MediaWikiSearchResult) => {
    return e.addField(s.title, s.snippet);
  }, embed);

  return newEmbed;
}

async function lore(messageText: string): Promise<string> {
  return 'Under Construction...';
}

export type MessageCallback = (messageText: string) => Promise<string> | Promise<RichEmbed>;

export interface MessageCallbackDictionary {
  [key: string]: MessageCallback;
}

export const callbacks: MessageCallbackDictionary = {
  ping,
  search,
  lore,
};
