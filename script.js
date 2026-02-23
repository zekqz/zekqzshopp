// === Открытие модалки заказа ===
document.querySelectorAll('.order-btn').forEach(button => {
  button.addEventListener('click', () => {
    const service = button.getAttribute('data-service');
    document.getElementById('modal-service').textContent = `Вы выбрали: ${getServiceName(service)}`;
    document.getElementById('orderModal').style.display = 'block';
  });
});

document.querySelectorAll('.close').forEach(el => {
  el.addEventListener('click', () => {
    document.getElementById('orderModal').style.display = 'none';
  });
});

window.addEventListener('click', (e) => {
  const modal = document.getElementById('orderModal');
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

document.getElementById('orderForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const steam = document.getElementById('steamUsername').value.trim();
  const amount = parseFloat(document.getElementById('amount').value);
  
  if (!steam || !amount || amount < 20) {
    alert('Введите корректный ник и сумму (от 20 ₽)');
    return;
  }

  // Добавляем наценку 5%
  const finalAmount = Math.round(amount * 1.05);

  const orders = JSON.parse(localStorage.getItem("steam_orders") || "[]");
  orders.push({
    steam: steam,
    amount: finalAmount,
    status: "pending",
    date: new Date().toISOString()
  });
  localStorage.setItem("steam_orders", JSON.stringify(orders));

  alert(`Заказ отправлен! Сумма с наценкой: ${finalAmount} ₽`);
  document.getElementById('orderForm').reset();
  document.getElementById('orderModal').style.display = 'none';
});

// === Админ-панель ===
function loadSteamOrders() {
  const orders = JSON.parse(localStorage.getItem("steam_orders") || "[]");
  const container = document.getElementById("admin-orders-list");
  container.innerHTML = '';

  orders.forEach((order, idx) => {
    const div = document.createElement("div");
    div.className = "ticket";
    div.innerHTML = `
      <h4>Заказ #${idx+1}</h4>
      <p>Ник: ${order.steam}</p>
      <p>Сумма: ${order.amount} ₽</p>
      <p>Статус: <span id="status-${idx}">${order.status}</span></p>
      <button onclick="confirmOrder(${idx})">Подтвердить</button>
    `;
    container.appendChild(div);
  });
}

function confirmOrder(idx) {
  let orders = JSON.parse(localStorage.getItem("steam_orders") || "[]");
  if (!orders[idx]) return;
  orders[idx].status = "completed";
  localStorage.setItem("steam_orders", JSON.stringify(orders));
  document.getElementById("status-"+idx).textContent = "completed";
  alert("Заказ подтверждён!");
}

function showAdminPanel() {
  document.getElementById('adminPanel').style.display = 'block';
  document.getElementById('userDashboard').style.display = 'none';
  document.getElementById('shopView').style.display = 'none';
  document.getElementById('nav-dashboard').style.display = 'none';
  document.getElementById('nav-admin').style.display = 'none';
  document.getElementById('nav-logout').style.display = 'inline';

  loadSteamOrders();
}

// === Служебная функция для названия услуг ===
function getServiceName(code) {
  const names = {
    'скины': 'Скины и донат',
    'рост': 'Рост рейтинга',
    'аккаунт': 'Топ-аккаунты',
    'ремонт': 'Ремонт аккаунтов'
  };
  return names[code] || code;
}

fetch('https://твойсервер.com/order', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: user.username,
    steam: steamUsername,
    amount: finalAmount
  })
});