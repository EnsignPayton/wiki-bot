import { Client } from 'discord.js';
import { parseMessage } from './msgProc';
import { callbacks } from './callbacks';

const prefix = process.env.BOT_PREFIX || '!';
const token = process.env.BOT_TOKEN;
const client = new Client();

client.on('ready', () => {
  console.log('Ready');
});

client.on('message', async (message) => {
  const command = parseMessage(prefix, message.content);
  if (!command) return;

  const handler = callbacks[command.name];
  if (!handler) return;

  console.log(`${message.author.username}: ${message.content}`);

  try {
    const result = await handler(command.text);
    message.channel.send(result);
  } catch (err) {
    console.error(err);
  }
});

client.login(token);
