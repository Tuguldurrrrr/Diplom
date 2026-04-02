const API = '/api';

const byId = (id) => document.getElementById(id);
const token = () => localStorage.getItem('token');
const user = () => JSON.parse(localStorage.getItem('user') || 'null');

function showFlash(msg, isError = false) {
  const el = byId('flash');
  if (!el) return;
  el.style.display = 'block';
  el.style.background = isError ? '#fee2e2' : '#dbeafe';
  el.style.color = isError ? '#991b1b' : '#1e3a8a';
  el.textContent = msg;
}

async function api(url, method = 'GET', body, isForm = false) {
  const headers = {};
  if (token()) headers.Authorization = `Bearer ${token()}`;

  const options = { method, headers };
  if (body && !isForm) {
    headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }
  if (body && isForm) options.body = body;

  const res = await fetch(url, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Алдаа гарлаа');
  return data;
}

function goByRole(role) {
  if (role === 'Admin') location.href = 'admin.html';
  else if (role === 'Operator') location.href = 'operator.html';
  else location.href = 'dashboard.html';
}

function statusBadge(status) {
  const map = {
    Pending: 'pending',
    Confirmed: 'confirmed',
    Assigned: 'confirmed',
    'In Progress': 'progress',
    Completed: 'done',
    Rejected: 'pending'
  };
  const c = map[status] || 'pending';
  return `<span class="badge ${c}">${status}</span>`;
}

async function renderServices() {
  const root = byId('services');
  if (!root) return;
  const list = await api(`${API}/services`);
  byId('svcCount').textContent = list.length;
  root.innerHTML = list.map(s => `<div class="card"><strong>${s.title}</strong><p>${s.description || ''}</p><p>₮${Number(s.price).toLocaleString()}</p>${statusBadge(s.status)}</div>`).join('');
}

async function renderDashboardBookings() {
  const root = byId('bookings');
  if (!root) return;
  const list = await api(`${API}/bookings`);
  const me = user();
  const mine = list.filter(b => b.customer_id === me?.id);
  byId('myCount').textContent = mine.length;
  byId('doneCount').textContent = mine.filter(b => b.status === 'Completed').length;
  root.innerHTML = mine.map(b => `<div class="card">#${b.id} | ${b.service_title} | ${statusBadge(b.status)}</div>`).join('');
}

async function renderAdminBookings() {
  const root = byId('adminBookings');
  if (!root) return;
  const list = await api(`${API}/bookings`);
  root.innerHTML = list.map(b => `
    <tr>
      <td>${b.id}</td><td>${b.customer_name || '-'}</td><td>${b.service_title}</td><td>${statusBadge(b.status)}</td>
      <td>
        <button class="btn-outline" onclick="updateStatus(${b.id},'Confirmed')">Confirm</button>
        <button class="btn-primary" onclick="assignOperator(${b.id})">Assign</button>
      </td>
    </tr>
  `).join('');
}

async function renderOperatorBookings() {
  const root = byId('operatorBookings');
  if (!root) return;
  const list = await api(`${API}/bookings`);
  root.innerHTML = list.map(b => `
    <tr>
      <td>${b.id}</td><td>${b.service_title}</td><td>${statusBadge(b.status)}</td>
      <td><button class="btn-primary" onclick="updateStatus(${b.id},'In Progress')">Start</button></td>
    </tr>
  `).join('');
}

window.updateStatus = async (id, status) => {
  await api(`${API}/bookings/${id}/status`, 'PATCH', { status });
  if (byId('adminBookings')) renderAdminBookings();
  if (byId('operatorBookings')) renderOperatorBookings();
};

window.assignOperator = async (id) => {
  const opId = Number(prompt('Оператор ID оруулна уу:'));
  if (!opId) return;
  await api(`${API}/bookings/${id}/status`, 'PATCH', { status: 'Assigned', operator_id: opId });
  renderAdminBookings();
};

function bindLogout() {
  const btn = byId('logoutBtn');
  if (!btn) return;
  btn.onclick = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    location.href = 'login.html';
  };
}

function bindLogin() {
  const form = byId('loginForm');
  if (!form) return;
  form.onsubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      const res = await api(`${API}/auth/login`, 'POST', payload);
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      goByRole(res.user.role);
    } catch (err) {
      showFlash(err.message, true);
    }
  };
}

function bindRegister() {
  const form = byId('registerForm');
  if (!form) return;
  form.onsubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      await api(`${API}/auth/register`, 'POST', payload);
      showFlash('Бүртгэл амжилттай. Нэвтэрнэ үү.');
      setTimeout(() => (location.href = 'login.html'), 900);
    } catch (err) {
      showFlash(err.message, true);
    }
  };
}

function bindBookingForm() {
  const form = byId('bookingForm');
  if (!form) return;
  form.onsubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      await api(`${API}/bookings`, 'POST', payload);
      showFlash('Захиалга амжилттай үүслээ');
      form.reset();
    } catch (err) {
      showFlash(err.message, true);
    }
  };
}

function bindUpload() {
  const form = byId('uploadForm');
  if (!form) return;
  form.onsubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData(form);
      await api(`${API}/upload`, 'POST', payload, true);
      alert('Файл upload амжилттай');
      form.reset();
    } catch (err) {
      alert(err.message);
    }
  };
}

function bindReport() {
  const btn = byId('loadReport');
  if (!btn) return;
  btn.onclick = async () => {
    const rows = await api(`${API}/reports/monthly`);
    byId('reportOut').textContent = JSON.stringify(rows, null, 2);
  };
}

(async function init() {
  bindLogin();
  bindRegister();
  bindBookingForm();
  bindUpload();
  bindReport();
  bindLogout();

  if (byId('meLabel') && user()) byId('meLabel').textContent = `${user().name} (${user().role})`;
  if (byId('services')) await renderServices();
  if (byId('bookings')) await renderDashboardBookings();
  if (byId('adminBookings')) await renderAdminBookings();
  if (byId('operatorBookings')) await renderOperatorBookings();
})();
