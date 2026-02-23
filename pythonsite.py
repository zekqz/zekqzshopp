import json

order = {"steam": "user123", "amount": 100, "status": "pending"}

# сохраняем заказ
try:
    with open("steam_orders.json", "r", encoding="utf-8") as f:
        orders = json.load(f)
except FileNotFoundError:
    orders = []

orders.append(order)

with open("steam_orders.json", "w", encoding="utf-8") as f:
    json.dump(orders, f, ensure_ascii=False, indent=4)