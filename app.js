const landingPage = document.getElementById("landingPage");
const authShell = document.getElementById("authShell");
const appShell = document.getElementById("appShell");
const menuList = document.getElementById("menuList");
const view = document.getElementById("view");
const roleBadge = document.getElementById("roleBadge");
const profileName = document.getElementById("profileName");
const pageTitle = document.getElementById("pageTitle");
const pageSubtitle = document.getElementById("pageSubtitle");
const sidebar = document.getElementById("sidebar");
const toast = document.getElementById("toast");
const backendBadge = document.getElementById("backendBadge");

const appState = {
  currentRole: "customer",
  activePage: "dashboard",
  currentUser: { name: "B. User", email: "customer@dronehub.mn" },
  filters: { query: "", location: "all", sort: "none" },
  services: [],
  bookings: [],
  users: []
};

const statusClassMap = {
  "Хүлээгдэж байна": "pending",
  "Баталгаажсан": "confirmed",
  "Гүйцэтгэж байна": "progress",
  "Дууссан": "done",
  pending: "pending",
  confirmed: "confirmed",
  rejected: "rejected"
};

const menus = {
  customer: [["dashboard", "fa-chart-line", "Хянах самбар"], ["services", "fa-camera", "Үйлчилгээ хайх"], ["bookings", "fa-list-check", "Миний захиалга"]],
  operator: [["dashboard", "fa-chart-line", "Хянах самбар"], ["my-services", "fa-rectangle-list", "Миний зар"], ["orders", "fa-file-signature", "Ирсэн захиалга"]],
  manager: [["dashboard", "fa-chart-line", "Хянах самбар"], ["reviews", "fa-shield-halved", "Контент шалгалт"]],
  admin: [["dashboard", "fa-chart-line", "Хянах самбар"], ["users", "fa-users", "Хэрэглэгчид"], ["all-bookings", "fa-clipboard-list", "Бүх захиалга"], ["reports", "fa-chart-pie", "Тайлан"]]
};

const roleDisplay = {
  customer: "Customer",
  operator: "Service Provider",
  manager: "Content Manager",
  admin: "Admin"
};

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 2200);
}

function showAuth() {
  landingPage.classList.add("hidden");
  appShell.classList.add("hidden");
  authShell.classList.remove("hidden");
}

function showLanding() {
  authShell.classList.add("hidden");
  appShell.classList.add("hidden");
  landingPage.classList.remove("hidden");
}

function showApp() {
  landingPage.classList.add("hidden");
  authShell.classList.add("hidden");
  appShell.classList.remove("hidden");
}

function setBackendBadge() {
  const isOnline = window.DroneHubApi.online;
  backendBadge.textContent = isOnline ? "MySQL connected" : "Offline demo";
  backendBadge.className = `badge ${isOnline ? "confirmed" : "pending"}`;
}

function renderLandingStats() {
  const root = document.getElementById("landingStats");
  const stats = [
    { label: "Идэвхтэй оператор", value: appState.users.filter((u) => u.role.includes("Provider")).length || 0 },
    { label: "Нийт үйлчилгээ", value: appState.services.length },
    { label: "Сарын захиалга", value: appState.bookings.length },
    { label: "API mode", value: window.DroneHubApi.online ? "LIVE" : "DEMO" }
  ];
  root.innerHTML = stats.map((s) => `<article class="card stat-card"><p>${s.label}</p><div class="number">${s.value}</div></article>`).join("");
}

function createStats(items) {
  const grid = document.createElement("div");
  grid.className = "stats-grid";
  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card stat-card fade-in-up";
    card.innerHTML = `<p>${item.label}</p><div class="number">${item.value}</div><small>${item.note || ""}</small>`;
    grid.appendChild(card);
  });
  return grid;
}

function getFilteredServices() {
  let filtered = [...appState.services];
  const { query, location, sort } = appState.filters;
  if (query.trim()) {
    const q = query.toLowerCase();
    filtered = filtered.filter((s) => s.title.toLowerCase().includes(q) || s.location.toLowerCase().includes(q));
  }
  if (location !== "all") filtered = filtered.filter((s) => s.location === location);
  if (sort === "low") filtered.sort((a, b) => a.priceValue - b.priceValue);
  if (sort === "high") filtered.sort((a, b) => b.priceValue - a.priceValue);
  return filtered;
}

function serviceCard(service, mode = "customer") {
  const template = document.getElementById("serviceCardTemplate");
  const node = template.content.cloneNode(true);
  node.querySelector("img").src = service.image;
  node.querySelector(".service-title").textContent = service.title;
  node.querySelector(".price").textContent = service.price;
  node.querySelector(".service-location").textContent = `📍 ${service.location}`;
  node.querySelector(".service-description").textContent = service.description;

  const status = node.querySelector(".service-status");
  const approval = service.approvalStatus || "pending";
  status.className = `badge service-status ${statusClassMap[approval] || "pending"}`;
  status.textContent = approval;

  const actions = node.querySelector(".card-actions");
  if (mode === "customer") {
    const btn = document.createElement("button");
    btn.className = "primary-btn";
    btn.textContent = "Захиалах";
    btn.addEventListener("click", () => createQuickBooking(service));
    actions.appendChild(btn);
  }
  if (mode === "operator") {
    actions.innerHTML = `<button class="ghost-btn" data-action="edit" data-id="${service.id}">Засах</button><button class="danger-btn" data-action="delete" data-id="${service.id}">Устгах</button>`;
  }
  if (mode === "manager") {
    actions.innerHTML = `<button class="primary-btn" data-action="approve" data-id="${service.id}">Батлах</button><button class="danger-btn" data-action="reject" data-id="${service.id}">Татгалзах</button>`;
  }
  return node;
}

function bookingTable(rows, operatorMode = false) {
  const wrap = document.createElement("div");
  wrap.className = "table-wrap card fade-in-up";
  const table = document.createElement("table");
  table.innerHTML = `<thead><tr><th>ID</th><th>Хэрэглэгч</th><th>Үйлчилгээ</th><th>Огноо</th><th>Байршил</th><th>Төлөв</th>${operatorMode ? "<th>Action</th>" : ""}</tr></thead>
    <tbody>${rows
      .map(
        (b) => `<tr><td>${b.id}</td><td>${b.customer}</td><td>${b.service}</td><td>${b.date} ${b.time}</td><td>${b.location}</td><td><span class="badge ${statusClassMap[b.status] || "pending"}">${b.status}</span></td>${
          operatorMode
            ? `<td><button class="ghost-btn" data-id="${b.id}" data-action="next">Төлөв +1</button> <button class="primary-btn" data-id="${b.id}" data-action="upload">Файл upload</button></td>`
            : ""
        }</tr>`
      )
      .join("")}</tbody>`;
  wrap.appendChild(table);
  return wrap;
}

async function createQuickBooking(service) {
  const payload = {
    customer: appState.currentUser.name,
    operator: service.provider,
    service: service.title,
    date: new Date().toISOString().slice(0, 10),
    time: "10:00",
    location: service.location,
    notes: "Quick booking",
    status: "Хүлээгдэж байна",
    fileReady: false
  };
  const created = await window.DroneHubApi.createBooking(payload);
  appState.bookings.unshift(created);
  showToast("Захиалга үүслээ.");
}

function renderMenu() {
  roleBadge.textContent = roleDisplay[appState.currentRole];
  profileName.textContent = appState.currentUser.name;
  menuList.innerHTML = "";
  menus[appState.currentRole].forEach(([key, icon, label]) => {
    const b = document.createElement("button");
    b.className = `menu-item ${appState.activePage === key ? "active" : ""}`;
    b.innerHTML = `<i class="fa-solid ${icon}"></i> ${label}`;
    b.onclick = () => {
      appState.activePage = key;
      renderMenu();
      renderView();
      sidebar.classList.remove("open");
    };
    menuList.appendChild(b);
  });
}

function customerServicesView() {
  const wrap = document.createElement("div");
  const panel = document.createElement("article");
  panel.className = "card input-card fade-in-up";
  panel.innerHTML = `<div class="search-row"><input id="q" placeholder="Хайх" value="${appState.filters.query}"/><select id="loc"><option value="all">Бүгд</option><option value="Улаанбаатар">Улаанбаатар</option><option value="Тэрэлж">Тэрэлж</option></select><select id="sort"><option value="none">Эрэмбэ</option><option value="low">Үнэ өсөх</option><option value="high">Үнэ буурах</option></select></div>`;
  wrap.appendChild(panel);
  const grid = document.createElement("div");
  grid.className = "card-grid";
  getFilteredServices().filter((s) => s.approvalStatus === "confirmed").forEach((s) => grid.appendChild(serviceCard(s, "customer")));
  wrap.appendChild(grid);

  panel.querySelector("#loc").value = appState.filters.location;
  panel.querySelector("#sort").value = appState.filters.sort;
  panel.querySelector("#q").oninput = (e) => {
    appState.filters.query = e.target.value;
    renderView();
  };
  panel.querySelector("#loc").onchange = (e) => {
    appState.filters.location = e.target.value;
    renderView();
  };
  panel.querySelector("#sort").onchange = (e) => {
    appState.filters.sort = e.target.value;
    renderView();
  };

  return wrap;
}

function customerBookingsView() {
  const wrap = document.createElement("div");
  const form = document.createElement("article");
  form.className = "card input-card fade-in-up";
  form.innerHTML = `<h4>Шинэ захиалга</h4><div class="search-row"><input id="d" type="date"/><input id="t" type="time"/><input id="l" placeholder="Байршил"/></div><textarea id="n" rows="3" placeholder="Тайлбар"></textarea><div class="inline-actions"><button class="primary-btn" id="create">Үүсгэх</button></div>`;
  form.querySelector("#create").onclick = async () => {
    const payload = {
      customer: appState.currentUser.name,
      operator: "Unassigned",
      service: "Custom booking",
      date: form.querySelector("#d").value,
      time: form.querySelector("#t").value,
      location: form.querySelector("#l").value,
      notes: form.querySelector("#n").value,
      status: "Хүлээгдэж байна",
      fileReady: false
    };
    if (!payload.date || !payload.time || !payload.location) return showToast("Талбаруудаа бөглөнө үү.");
    const created = await window.DroneHubApi.createBooking(payload);
    appState.bookings.unshift(created);
    showToast("Захиалга үүслээ.");
    renderView();
  };

  wrap.appendChild(form);
  wrap.appendChild(bookingTable(appState.bookings));
  return wrap;
}

function operatorServicesView() {
  const wrap = document.createElement("div");
  const form = document.createElement("article");
  form.className = "card input-card fade-in-up";
  form.innerHTML = `<h4>Шинэ үйлчилгээ</h4><div class="search-row"><input id="title" placeholder="Нэр"/><input id="price" placeholder="Үнэ"/><input id="location" placeholder="Байршил"/></div><textarea id="desc" rows="3" placeholder="Тайлбар"></textarea><div class="inline-actions"><button id="add" class="primary-btn">Нэмэх</button></div>`;
  form.querySelector("#add").onclick = async () => {
    const payload = {
      title: form.querySelector("#title").value,
      priceValue: Number(form.querySelector("#price").value),
      location: form.querySelector("#location").value,
      description: form.querySelector("#desc").value,
      image: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=900&q=80",
      approvalStatus: "pending",
      provider: appState.currentUser.name
    };
    if (!payload.title || !payload.priceValue || !payload.location || !payload.description) return showToast("Мэдээллээ бүрэн оруулна уу.");
    const created = await window.DroneHubApi.createService(payload);
    appState.services.unshift({ ...created, price: `₮${payload.priceValue.toLocaleString()}` });
    showToast("Зар нэмэгдлээ.");
    renderView();
  };

  wrap.appendChild(form);

  const grid = document.createElement("div");
  grid.className = "card-grid";
  appState.services.forEach((s) => grid.appendChild(serviceCard(s, "operator")));
  grid.onclick = async (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    const id = Number(t.dataset.id);
    const action = t.dataset.action;
    if (!id || !action) return;

    if (action === "delete") {
      await window.DroneHubApi.deleteService(id);
      appState.services = appState.services.filter((s) => s.id !== id);
      showToast("Зар устлаа.");
      renderView();
    }

    if (action === "edit") {
      const svc = appState.services.find((s) => s.id === id);
      if (!svc) return;
      svc.approvalStatus = "pending";
      svc.title = `${svc.title} (edited)`;
      await window.DroneHubApi.updateService(id, svc);
      showToast("Зар засварлагдлаа.");
      renderView();
    }
  };
  wrap.appendChild(grid);
  return wrap;
}

function operatorOrdersView() {
  const wrap = bookingTable(appState.bookings, true);
  wrap.onclick = async (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    const id = t.dataset.id;
    const action = t.dataset.action;
    const booking = appState.bookings.find((b) => b.id === id);
    if (!booking) return;

    if (action === "next") {
      const states = ["Хүлээгдэж байна", "Баталгаажсан", "Гүйцэтгэж байна", "Дууссан"];
      booking.status = states[Math.min(states.indexOf(booking.status) + 1, states.length - 1)];
      await window.DroneHubApi.updateBooking(id, { status: booking.status });
      showToast("Төлөв шинэчлэгдлээ.");
      renderView();
    }

    if (action === "upload") {
      booking.fileReady = true;
      booking.status = "Дууссан";
      await window.DroneHubApi.updateBooking(id, { fileReady: true, status: booking.status });
      showToast("Файл upload хийлээ.");
      renderView();
    }
  };
  return wrap;
}

function managerView() {
  const grid = document.createElement("div");
  grid.className = "card-grid";
  appState.services.forEach((s) => grid.appendChild(serviceCard(s, "manager")));
  grid.onclick = async (e) => {
    const t = e.target;
    if (!(t instanceof HTMLElement)) return;
    const id = Number(t.dataset.id);
    const svc = appState.services.find((s) => s.id === id);
    if (!svc) return;
    if (t.dataset.action === "approve") svc.approvalStatus = "confirmed";
    if (t.dataset.action === "reject") svc.approvalStatus = "rejected";
    await window.DroneHubApi.updateService(id, svc);
    showToast("Контент статус шинэчлэгдлээ.");
    renderView();
  };
  return grid;
}

function usersTable() {
  const c = document.createElement("article");
  c.className = "card input-card";
  c.innerHTML = `<div class="table-wrap"><table><thead><tr><th>ID</th><th>Нэр</th><th>Role</th><th>Status</th></tr></thead><tbody>${appState.users.map((u) => `<tr><td>${u.id}</td><td>${u.name}</td><td>${u.role}</td><td>${u.status}</td></tr>`).join("")}</tbody></table></div>`;
  return c;
}

function reportsView() {
  const done = appState.bookings.filter((b) => b.status === "Дууссан").length;
  const perf = appState.bookings.length ? Math.round((done / appState.bookings.length) * 100) : 0;
  const wrap = document.createElement("div");
  wrap.className = "view";
  wrap.appendChild(createStats([{ label: "Нийт захиалга", value: appState.bookings.length }, { label: "Нийт үйлчилгээ", value: appState.services.length }, { label: "Гүйцэтгэл", value: `${perf}%` }]));
  return wrap;
}

function renderView() {
  view.innerHTML = "";
  pageSubtitle.textContent = `Өгөгдөл шинэчлэгдсэн: ${new Date().toISOString().slice(0, 10)}`;

  if (appState.activePage === "dashboard") {
    pageTitle.textContent = "Dashboard";
    view.appendChild(createStats([{ label: "Services", value: appState.services.length }, { label: "Bookings", value: appState.bookings.length }, { label: "Users", value: appState.users.length }]));
    return;
  }

  if (appState.currentRole === "customer" && appState.activePage === "services") {
    pageTitle.textContent = "Үйлчилгээ";
    view.appendChild(customerServicesView());
    return;
  }
  if (appState.currentRole === "customer" && appState.activePage === "bookings") {
    pageTitle.textContent = "Миний захиалга";
    view.appendChild(customerBookingsView());
    return;
  }
  if (appState.currentRole === "operator" && appState.activePage === "my-services") {
    pageTitle.textContent = "Миний зар";
    view.appendChild(operatorServicesView());
    return;
  }
  if (appState.currentRole === "operator" && appState.activePage === "orders") {
    pageTitle.textContent = "Ирсэн захиалга";
    view.appendChild(operatorOrdersView());
    return;
  }
  if (appState.currentRole === "manager" && appState.activePage === "reviews") {
    pageTitle.textContent = "Контент шалгалт";
    view.appendChild(managerView());
    return;
  }
  if (appState.currentRole === "admin" && appState.activePage === "users") {
    pageTitle.textContent = "Хэрэглэгчид";
    view.appendChild(usersTable());
    return;
  }
  if (appState.currentRole === "admin" && appState.activePage === "all-bookings") {
    pageTitle.textContent = "Бүх захиалга";
    view.appendChild(bookingTable(appState.bookings));
    return;
  }
  if (appState.currentRole === "admin" && appState.activePage === "reports") {
    pageTitle.textContent = "Тайлан";
    view.appendChild(reportsView());
  }
}

async function bootstrapData() {
  const data = await window.DroneHubApi.getBootstrapData();
  appState.services = data.services || [];
  appState.bookings = data.bookings || [];
  appState.users = data.users || [];
}

function bindEvents() {
  document.getElementById("openAuthBtn").onclick = showAuth;
  document.getElementById("heroLoginBtn").onclick = showAuth;
  document.getElementById("heroDemoBtn").onclick = () => {
    showAuth();
    showToast("Demo mode нээгдлээ.");
  };
  document.getElementById("backToLandingBtn").onclick = showLanding;

  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.onclick = () => {
      document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const tab = btn.dataset.tab;
      document.getElementById("loginForm").classList.toggle("active", tab === "login");
      document.getElementById("registerForm").classList.toggle("active", tab === "register");
    };
  });

  document.getElementById("registerForm").onsubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById("registerName").value;
    await window.DroneHubApi.register({ name });
    showToast("Бүртгэл амжилттай.");
    document.querySelector('[data-tab="login"]').click();
  };

  document.getElementById("loginForm").onsubmit = async (e) => {
    e.preventDefault();
    const role = document.getElementById("roleSelector").value;
    const email = document.getElementById("loginEmail").value;
    await window.DroneHubApi.login({ role, email });
    appState.currentRole = role;
    appState.activePage = "dashboard";
    appState.currentUser.name = { customer: "B. User", operator: "A. Operator", manager: "C. Manager", admin: "D. Admin" }[role];
    showApp();
    renderMenu();
    renderView();
  };

  document.getElementById("logoutBtn").onclick = () => {
    showLanding();
    showToast("Системээс гарлаа.");
  };

  document.getElementById("mobileMenuBtn").onclick = () => sidebar.classList.toggle("open");
}

async function init() {
  await window.DroneHubApi.init();
  await bootstrapData();
  setBackendBadge();
  renderLandingStats();
  bindEvents();
  showLanding();
}

init();
