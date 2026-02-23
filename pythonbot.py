import telebot

TOKEN = "8167621736:AAFWBeHQKIZ3AWiTDeqXUfaVTDhZb9FOtuY"  # выдаёт @BotFather
bot = telebot.TeleBot(TOKEN)

# Команда /start
@bot.message_handler(commands=['start'])
def start(message):
    bot.send_message(message.chat.id, f"Привет, {message.from_user.first_name}!")

# Команда /orders — бот покажет все заказы с сайта
@bot.message_handler(commands=['orders'])
def orders(message):
    try:
        # читаем локальный файл заказов, который сайт пишет
        with open("steam_orders.json", "r", encoding="utf-8") as f:
            orders = f.read()
        bot.send_message(message.chat.id, f"Заказы:\n{orders}")
    except FileNotFoundError:
        bot.send_message(message.chat.id, "Файл заказов пустой или не найден.")
        
print("Бот запущен...")
bot.infinity_polling()