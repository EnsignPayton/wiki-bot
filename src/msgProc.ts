export interface Command {
  name: string;
  text: string;
}

export function parseMessage(prefix: string, message: string): Command | undefined {
  if (!message.startsWith(prefix)) return undefined;

  const split = message.substr(prefix.length).split(' ');
  const name = split[0];

  if (!name) return undefined;

  const text = split.slice(1).join(' ');

  return { name, text };
}
