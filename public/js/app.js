const API = '/api';

function token() { return localStorage.getItem('token'); }
function authHeader() { return token() ? { Authorization: `Bearer ${token()}` } : {}; }

async function request(url, method='GET', body, isForm=false) {
  const options = { method, headers: { ...authHeader() } };
  if (body && !isForm) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }
  if (body && isForm) options.body = body;
  const res = await fetch(url, options);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'API error');
  return data;
}

const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.onsubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(loginForm);
    const data = await request(`${API}/auth/login`, 'POST', Object.fromEntries(fd.entries()));
    localStorage.setItem('token', data.token);
    if (data.user.role === 'Admin') location.href = 'admin.html';
    else if (data.user.role === 'Operator') location.href = 'operator.html';
    else location.href = 'dashboard.html';
  };
}

const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.onsubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(registerForm);
    await request(`${API}/auth/register`, 'POST', Object.fromEntries(fd.entries()));
    alert('Бүртгэл амжилттай');
    location.href = 'login.html';
  };
}

async function loadBookings(targetId) {
  const root = document.getElementById(targetId);
  if (!root) return;
  const rows = await request(`${API}/bookings`, 'GET');
  root.innerHTML = rows.map(r => `<div>${r.id} | ${r.service_title} | <b>${r.status}</b></div>`).join('');
}

async function loadServices() {
  const root = document.getElementById('services');
  if (!root) return;
  const rows = await request(`${API}/services`, 'GET');
  root.innerHTML = rows.map(r => `<div>${r.id}. ${r.title} - ${r.price}</div>`).join('');
}

const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.onsubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(bookingForm);
    await request(`${API}/bookings`, 'POST', Object.fromEntries(fd.entries()));
    alert('Захиалга үүслээ');
    location.href = 'dashboard.html';
  };
}

const uploadForm = document.getElementById('uploadForm');
if (uploadForm) {
  uploadForm.onsubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(uploadForm);
    await request(`${API}/upload`, 'POST', fd, true);
    alert('Файл upload амжилттай');
  };
}

const reportBtn = document.getElementById('loadReport');
if (reportBtn) {
  reportBtn.onclick = async () => {
    const out = document.getElementById('reportOut');
    const rows = await request(`${API}/reports/monthly`, 'GET');
    out.textContent = JSON.stringify(rows, null, 2);
  };
}

loadServices();
loadBookings('bookings');
loadBookings('adminBookings');
loadBookings('operatorBookings');
