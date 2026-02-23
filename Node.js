// server.js
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
app.use(express.json());

const TOKEN = '8167621736:AAFWBeHQKIZ3AWiTDeqXUfaVTDhZb9FOtuY';
const CHAT_ID = '7143093332'; // куда бот отправляет уведомления
const bot = new TelegramBot(TOKEN, { polling: true });

app.post('/order', (req, res) => {
  const { username, steam, amount } = req.body;
  if (!username || !steam || !amount) return res.status(400).send('Missing data');

  const message = `Новый заказ!\nПользователь: ${username}\nНик Steam: ${steam}\nСумма: ${amount} ₽`;
  bot.sendMessage(CHAT_ID, message);

  res.status(200).send({ ok: true });
});

app.listen(3000, () => console.log('Server started on port 3000'));