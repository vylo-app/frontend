import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const PUBLIC_URL = process.env.PUBLIC_URL;

bot.start((ctx) =>
  ctx.reply('👋 Welcome. Open the app:', {
    reply_markup: {
      inline_keyboard: [[{ text: '🚀 Launch App', web_app: { url: PUBLIC_URL } }]],
    },
  })
);

bot.launch().then(() => console.log(`🤖 Bot running. Web app at: ${PUBLIC_URL}`));
