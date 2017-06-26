const TelegramBot = require('node-telegram-bot-api');
const EddystoneBeaconScanner =  require('eddystone-beacon-scanner') // if installed from npm
var send = false;

// replace the value below with the Telegram token you receive from @BotFather
const token = '';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
const telegram_id = '';

bot.on('message', function (msg){
  const chatId = msg.chat.id;
  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});


EddystoneBeaconScanner.on('found', function(beacon) {
  console.log('found Eddystone Beacon:\n', JSON.stringify(beacon, null, 2));
  bot.sendMessage(telegram_id, 'Washing machine cycle is started');
});

//EddystoneBeaconScanner.on('updated', function(beacon) {
//  console.log('updated Eddystone Beacon:\n', JSON.stringify(beacon, null, 2));
//});

EddystoneBeaconScanner.on('lost', function(beacon) {
  console.log('lost Eddystone beacon:\n', JSON.stringify(beacon, null, 2));
  bot.sendMessage(telegram_id, 'Washing machine cycle is completed');
});

EddystoneBeaconScanner.startScanning(true);
