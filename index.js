const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config()

function bookingToString(booking) {
  var bookingStr = `*${booking.start_time} - ${booking.end_time}*\n_${booking.booker}_\n${booking.description}`;
  return bookingStr;
}

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_API_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

const fakeData = [
  {
    'booker': 'John Doe',
    'start_time': '12:30',
    'end_time': '13:00',
    'description': 'A very important but short meeting'
  },
  {
    'booker': 'Jane Doe',
    'start_time': '14:00',
    'end_time': '17:00',
    'description': 'Brainstorming for where to eat'
  },
  {
    'booker': 'Julius Caesar',
    'start_time': '17:00',
    'end_time': '18:00',
    'description': 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque pen'
  },
  {
    'booker': 'Cookiemonster',
    'start_time': '20:00',
    'end_time': '23:59',
    'description': 'Coookiiiiiiies'
  }
]

bot.onText(/\/help/, (msg) => {
  const helpMsg = "\
Hello, I'm a bot for easy access to FARS booking system. These are my availble commands:\n\n\
_help_\nDisplays this message\n\n\
_bookable_\nDisplays all available bookables\n\n\
_[bookable]_\nDisplays the bookings for the bookable today\n\n\
_[bookable] [YYYY-MM-DD]_\nDisplays all bookings for the given date for the given bookable"

  bot.sendMessage(msg.chat.id, helpMsg, {"parse_mode": "Markdown"});
});

bot.onText(/\/((?!help).+)/, (msg, params) => {
  const chatId = msg.chat.id;
  const date = new Date(msg.date*1000);
  const bookable = params[1];

  // Make query from FARS api for bookings of bookable today
  const bookings = fakeData;

  const bookingsStr = bookings.map( b => bookingToString(b) ).join("\n\n");

  const resp_msg = `*The bookings for today, ${date.toDateString()}, are:*\n———————————————\n${bookingsStr}`;
  bot.sendMessage(chatId, resp_msg, {"parse_mode":"Markdown"});
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, `Received your message: ${msg.text}`);
});