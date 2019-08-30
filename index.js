const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config()

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_API_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/motesrummet/, (msg) => {
  const chatId = msg.chat.id;
  const date = new Date(msg.date*1000);
  const bookings = [
    '*12:30 - 13:00*\n_Castor Köhler_\nNågo jätteviktigt möte',
    '*14:00 - 17:00*\n_TF-IC (Thomas Langenskiöld)_\nStörsta giffelfeasten någonsin',
    '*17:00 - 18:00*\n_Julius Caesar_\nLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque pen',
    '*20:00 - 23:59*\n_Cooooookiieeee_\nÄta kex'
  ];

  const resp_msg = `*The bookings for today, ${date.toDateString()}, are:*\n———————————————\n${bookings.join("\n\n")}`;
  bot.sendMessage(chatId, resp_msg, {"parse_mode":"Markdown"});
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, `Received your message: ${msg.text}`);
});