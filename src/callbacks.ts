import { RichEmbed } from 'discord.js';
import { MediaWikiSearchResult, mediaWikiSources, Source } from './dataSources/mediaWiki';

function searchEmbed({name, search, link, color}: Source) {
  return async (messageText: string) => {
    const result = await search(messageText);

    const embed = new RichEmbed()
      .setTitle(`${name} Search: **${messageText}**`)
      .setURL(link(messageText))
      .setColor(color);

    return result.reduce((e: RichEmbed, s: MediaWikiSearchResult) => {
      return e.addField(s.title, s.snippet);
    }, embed);
  };
}

const sourceCallbacks = Object.keys(mediaWikiSources)
  .reduce((result: MessageCallbackDictionary, key: string) => {
  result[key] = searchEmbed(mediaWikiSources[key]);
  return result;
}, {});

async function help(): Promise<string> {
  return `\`\`\`
Usage: !<command> <parameters>
Wiki Search Commands:
  uesp      - Elder Scrolls
  wikipedia - Wikipedia
\`\`\``;
}

export type MessageCallback = (messageText: string) => Promise<string> | Promise<RichEmbed>;

export interface MessageCallbackDictionary {
  [key: string]: MessageCallback;
}

export const callbacks: MessageCallbackDictionary = {
  ...sourceCallbacks,
  help,
};
