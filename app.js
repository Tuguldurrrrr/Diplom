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

const appState = {
  currentRole: "customer",
  activePage: "dashboard",
  currentUser: { name: "B. User", email: "customer@dronehub.mn" },
  filters: { query: "", location: "all", sort: "none" },
  services: [
    {
      id: 1,
      title: "Хотын төв aerial зураг",
      priceValue: 350000,
      price: "₮350,000",
      location: "Улаанбаатар",
      description: "4K видео + 20 фото, үл хөдлөхийн зар сурталчилгаанд тохиромжтой.",
      image:
        "https://images.unsplash.com/photo-1508615070457-7baeba4003ab?auto=format&fit=crop&w=900&q=80",
      approvalStatus: "confirmed",
      provider: "SkyLens Studio"
    },
    {
      id: 2,
      title: "Wedding drone багц",
      priceValue: 650000,
      price: "₮650,000",
      location: "Тэрэлж",
      description: "Кино стилийн өнгө засвар, highlight reel 3-5 минут.",
      image:
        "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=900&q=80",
      approvalStatus: "pending",
      provider: "Aero Moments"
    },
    {
      id: 3,
      title: "Барилгын progress monitoring",
      priceValue: 480000,
      price: "₮480,000",
      location: "Хан-Уул",
      description: "Сар бүрийн явцын зураг авалт ба тайлангийн overlay.",
      image:
        "https://images.unsplash.com/photo-1521405924368-64c5b84bec60?auto=format&fit=crop&w=900&q=80",
      approvalStatus: "confirmed",
      provider: "BuildScan Pro"
    }
  ],
  bookings: [
    {
      id: "BK-1024",
      customer: "T. Nomin",
      operator: "Aero Moments",
      service: "Wedding drone багц",
      date: "2026-04-12",
      time: "11:30",
      location: "Тэрэлж",
      notes: "Sunset frame авах",
      status: "Хүлээгдэж байна",
      fileReady: false
    },
    {
      id: "BK-1025",
      customer: "S. Erdene",
      operator: "BuildScan Pro",
      service: "Барилгын progress monitoring",
      date: "2026-04-06",
      time: "15:00",
      location: "Яармаг",
      notes: "Дээврийн өнцөг давхар авна",
      status: "Баталгаажсан",
      fileReady: false
    },
    {
      id: "BK-1026",
      customer: "M. Ariunaa",
      operator: "SkyLens Studio",
      service: "Хотын төв aerial зураг",
      date: "2026-03-31",
      time: "09:00",
      location: "Сүхбаатар дүүрэг",
      notes: "Commercial ашиглалт",
      status: "Гүйцэтгэж байна",
      fileReady: false
    },
    {
      id: "BK-1027",
      customer: "Orgil LLC",
      operator: "BuildScan Pro",
      service: "Барилгын progress monitoring",
      date: "2026-03-22",
      time: "13:30",
      location: "Баянзүрх",
      notes: "Monthly archive",
      status: "Дууссан",
      fileReady: true
    }
  ],
  users: [
    { id: "U-01", name: "B. User", role: "Customer", status: "Active" },
    { id: "U-02", name: "A. Operator", role: "Service Provider", status: "Active" },
    { id: "U-03", name: "C. Manager", role: "Content Manager", status: "Active" },
    { id: "U-04", name: "D. Admin", role: "Admin", status: "Active" }
  ]
};

const statusClassMap = {
  "Хүлээгдэж байна": "pending",
  "Баталгаажсан": "confirmed",
  "Гүйцэтгэж байна": "progress",
  "Дууссан": "done",
  "Татгалзсан": "rejected",
  pending: "pending",
  confirmed: "confirmed",
  rejected: "rejected"
};

const menus = {
  customer: [
    ["dashboard", "fa-chart-line", "Хянах самбар"],
    ["services", "fa-camera", "Үйлчилгээ хайх"],
    ["bookings", "fa-list-check", "Миний захиалга"]
  ],
  operator: [
    ["dashboard", "fa-chart-line", "Хянах самбар"],
    ["my-services", "fa-rectangle-list", "Миний зар"],
    ["orders", "fa-file-signature", "Ирсэн захиалга"]
  ],
  manager: [
    ["dashboard", "fa-chart-line", "Хянах самбар"],
    ["reviews", "fa-shield-halved", "Контент шалгалт"]
  ],
  admin: [
    ["dashboard", "fa-chart-line", "Хянах самбар"],
    ["users", "fa-users", "Хэрэглэгчид"],
    ["all-bookings", "fa-clipboard-list", "Бүх захиалга"],
    ["reports", "fa-chart-pie", "Тайлан"]
  ]
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

function renderLandingStats() {
  const stats = [
    { label: "Идэвхтэй оператор", value: 198 },
    { label: "Нийт үйлчилгээ", value: appState.services.length },
    { label: "Сарын захиалга", value: 542 },
    { label: "SLA", value: "97.2%" }
  ];
  const root = document.getElementById("landingStats");
  root.innerHTML = stats
    .map(
      (s) => `<article class="card stat-card"><p>${s.label}</p><div class="number">${s.value}</div></article>`
    )
    .join("");
}

function wireAuthTabs() {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const tab = btn.dataset.tab;
      document.getElementById("loginForm").classList.toggle("active", tab === "login");
      document.getElementById("registerForm").classList.toggle("active", tab === "register");
    });
  });
}

function createStats(items) {
  const grid = document.createElement("div");
  grid.className = "stats-grid";
  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card stat-card fade-in-up";
    card.innerHTML = `<p>${item.label}</p><div class="number">${item.value}</div><small>${item.note}</small>`;
    grid.appendChild(card);
  });
  return grid;
}

function getFilteredServices() {
  let filtered = [...appState.services];
  const { query, location, sort } = appState.filters;

  if (query.trim()) {
    const q = query.trim().toLowerCase();
    filtered = filtered.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q)
    );
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
  node.querySelector("img").alt = service.title;
  node.querySelector(".service-title").textContent = service.title;
  node.querySelector(".price").textContent = service.price;
  node.querySelector(".service-location").textContent = `📍 ${service.location}`;
  node.querySelector(".service-description").textContent = service.description;

  const status = node.querySelector(".service-status");
  status.textContent =
    service.approvalStatus === "pending"
      ? "Pending review"
      : service.approvalStatus === "rejected"
      ? "Rejected"
      : "Approved";
  status.className = `badge service-status ${statusClassMap[service.approvalStatus]}`;

  const actions = node.querySelector(".card-actions");
  if (mode === "customer") {
    const btn = document.createElement("button");
    btn.className = "primary-btn";
    btn.textContent = "Захиалах";
    btn.addEventListener("click", () => quickCreateBooking(service));
    actions.appendChild(btn);
  }

  if (mode === "operator") {
    actions.innerHTML = `<button class="ghost-btn" data-id="${service.id}" data-action="edit">Засах</button><button class="danger-btn" data-id="${service.id}" data-action="delete">Устгах</button>`;
  }

  if (mode === "manager") {
    actions.innerHTML = `<button class="primary-btn" data-id="${service.id}" data-action="approve">Батлах</button><button class="danger-btn" data-id="${service.id}" data-action="reject">Татгалзах</button>`;
  }

  return node;
}

function bookingTable(rows, forOperator = false, forAdmin = false) {
  const tableWrap = document.createElement("div");
  tableWrap.className = "table-wrap card fade-in-up";
  const table = document.createElement("table");
  table.innerHTML = `
    <thead>
      <tr>
        <th>ID</th>
        <th>Хэрэглэгч</th>
        <th>Үйлчилгээ</th>
        <th>Оператор</th>
        <th>Огноо</th>
        <th>Цаг</th>
        <th>Байршил</th>
        <th>Төлөв</th>
        <th>Файл</th>
        ${forOperator || forAdmin ? "<th>Action</th>" : ""}
      </tr>
    </thead>
    <tbody>
      ${rows
        .map(
          (item) => `<tr>
            <td>${item.id}</td>
            <td>${item.customer}</td>
            <td>${item.service}</td>
            <td>${item.operator}</td>
            <td>${item.date}</td>
            <td>${item.time}</td>
            <td>${item.location}</td>
            <td><span class="badge ${statusClassMap[item.status]}">${item.status}</span></td>
            <td>${item.fileReady ? "Бэлэн" : "Хүлээгдэж буй"}</td>
            ${
              forOperator
                ? `<td>
                  <button class="ghost-btn" data-id="${item.id}" data-action="nextStatus">Төлөв +1</button>
                  <button class="primary-btn" data-id="${item.id}" data-action="upload">Upload</button>
                </td>`
                : forAdmin
                ? `<td><button class="ghost-btn" data-id="${item.id}" data-action="adminInspect">Шалгах</button></td>`
                : ""
            }
          </tr>`
        )
        .join("")}
    </tbody>
  `;
  tableWrap.appendChild(table);
  return tableWrap;
}

function quickCreateBooking(service) {
  const id = `BK-${1000 + appState.bookings.length + 1}`;
  const now = new Date();
  const newBooking = {
    id,
    customer: appState.currentUser.name,
    operator: service.provider,
    service: service.title,
    date: now.toISOString().slice(0, 10),
    time: "10:00",
    location: service.location,
    notes: "Quick booking",
    status: "Хүлээгдэж байна",
    fileReady: false
  };
  appState.bookings.unshift(newBooking);
  showToast("Захиалга амжилттай үүслээ.");
}

function renderMenu() {
  roleBadge.textContent = roleDisplay[appState.currentRole];
  profileName.textContent = appState.currentUser.name;
  menuList.innerHTML = "";

  menus[appState.currentRole].forEach(([key, icon, label]) => {
    const btn = document.createElement("button");
    btn.className = `menu-item ${appState.activePage === key ? "active" : ""}`;
    btn.innerHTML = `<i class="fa-solid ${icon}"></i> ${label}`;
    btn.addEventListener("click", () => {
      appState.activePage = key;
      renderMenu();
      renderView();
      sidebar.classList.remove("open");
    });
    menuList.appendChild(btn);
  });
}

function customerServicesView() {
  const wrap = document.createElement("div");
  wrap.className = "view";

  const controls = document.createElement("article");
  controls.className = "card input-card fade-in-up";
  controls.innerHTML = `
    <div class="search-row">
      <input id="searchInput" placeholder="Хайх..." value="${appState.filters.query}" />
      <select id="locationFilter">
        <option value="all">Бүх байршил</option>
        <option value="Улаанбаатар">Улаанбаатар</option>
        <option value="Тэрэлж">Тэрэлж</option>
        <option value="Хан-Уул">Хан-Уул</option>
      </select>
      <select id="sortFilter">
        <option value="none">Эрэмбэ: Стандарт</option>
        <option value="low">Үнэ өсөх</option>
        <option value="high">Үнэ буурах</option>
      </select>
    </div>
  `;

  wrap.appendChild(controls);

  const grid = document.createElement("div");
  grid.className = "card-grid";
  getFilteredServices()
    .filter((s) => s.approvalStatus === "confirmed")
    .forEach((service) => grid.appendChild(serviceCard(service, "customer")));

  wrap.appendChild(grid);

  controls.querySelector("#locationFilter").value = appState.filters.location;
  controls.querySelector("#sortFilter").value = appState.filters.sort;

  controls.querySelector("#searchInput").addEventListener("input", (e) => {
    appState.filters.query = e.target.value;
    renderView();
  });
  controls.querySelector("#locationFilter").addEventListener("change", (e) => {
    appState.filters.location = e.target.value;
    renderView();
  });
  controls.querySelector("#sortFilter").addEventListener("change", (e) => {
    appState.filters.sort = e.target.value;
    renderView();
  });

  return wrap;
}

function customerBookingView() {
  const wrap = document.createElement("div");
  wrap.className = "view";

  const card = document.createElement("article");
  card.className = "card input-card fade-in-up";
  card.innerHTML = `
    <h4>Шинэ захиалга үүсгэх</h4>
    <div class="search-row">
      <input id="bookingDate" type="date" />
      <input id="bookingTime" type="time" />
      <input id="bookingLocation" placeholder="Байршил" />
    </div>
    <textarea id="bookingNote" rows="3" placeholder="Нэмэлт тайлбар"></textarea>
    <div class="inline-actions">
      <button id="createBookingBtn" class="primary-btn">Захиалга илгээх</button>
      <button id="downloadBtn" class="ghost-btn">Дууссан файл шалгах</button>
    </div>
  `;

  card.querySelector("#createBookingBtn").addEventListener("click", () => {
    const id = `BK-${1000 + appState.bookings.length + 1}`;
    const date = card.querySelector("#bookingDate").value;
    const time = card.querySelector("#bookingTime").value;
    const location = card.querySelector("#bookingLocation").value;
    const notes = card.querySelector("#bookingNote").value;
    if (!date || !time || !location) {
      showToast("Огноо, цаг, байршлаа бөглөнө үү.");
      return;
    }
    appState.bookings.unshift({
      id,
      customer: appState.currentUser.name,
      operator: "Unassigned",
      service: "Custom booking",
      date,
      time,
      location,
      notes,
      status: "Хүлээгдэж байна",
      fileReady: false
    });
    showToast("Шинэ захиалга нэмэгдлээ.");
    renderView();
  });

  card.querySelector("#downloadBtn").addEventListener("click", () => {
    const readyCount = appState.bookings.filter((b) => b.fileReady).length;
    showToast(`${readyCount} дууссан файл татахад бэлэн.`);
  });

  wrap.appendChild(card);
  wrap.appendChild(bookingTable(appState.bookings.filter((b) => b.customer === appState.currentUser.name || appState.currentUser.name === "B. User")));
  return wrap;
}

function operatorServicesView() {
  const wrap = document.createElement("div");
  wrap.className = "view";
  const form = document.createElement("article");
  form.className = "card input-card fade-in-up";
  form.innerHTML = `
    <h4>Шинэ үйлчилгээний зар</h4>
    <div class="search-row">
      <input id="newServiceTitle" placeholder="Үйлчилгээний нэр" />
      <input id="newServicePrice" placeholder="Үнэ (тоо)" />
      <input id="newServiceLocation" placeholder="Байршил" />
    </div>
    <textarea id="newServiceDesc" rows="3" placeholder="Тайлбар"></textarea>
    <div class="inline-actions">
      <button id="createServiceBtn" class="primary-btn">Нийтлэх</button>
    </div>
  `;

  form.querySelector("#createServiceBtn").addEventListener("click", () => {
    const title = form.querySelector("#newServiceTitle").value.trim();
    const priceRaw = form.querySelector("#newServicePrice").value.trim();
    const location = form.querySelector("#newServiceLocation").value.trim();
    const description = form.querySelector("#newServiceDesc").value.trim();

    if (!title || !priceRaw || !location || !description) {
      showToast("Бүх талбарыг бөглөнө үү.");
      return;
    }

    const priceValue = Number(priceRaw.replace(/[^0-9]/g, ""));
    const id = appState.services.length + 1;
    appState.services.unshift({
      id,
      title,
      priceValue,
      price: `₮${priceValue.toLocaleString()}`,
      location,
      description,
      image:
        "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=900&q=80",
      approvalStatus: "pending",
      provider: appState.currentUser.name
    });

    showToast("Зар амжилттай нэмэгдлээ. Manager review хүлээж байна.");
    renderView();
  });

  wrap.appendChild(form);

  const grid = document.createElement("div");
  grid.className = "card-grid";
  appState.services.forEach((service) => grid.appendChild(serviceCard(service, "operator")));
  grid.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    const id = Number(target.dataset.id);
    const action = target.dataset.action;
    if (!id || !action) return;

    if (action === "delete") {
      appState.services = appState.services.filter((s) => s.id !== id);
      showToast("Зар устгалаа.");
      renderView();
    }
    if (action === "edit") {
      const service = appState.services.find((s) => s.id === id);
      if (!service) return;
      service.title = `${service.title} (updated)`;
      service.approvalStatus = "pending";
      showToast("Зар засварлагдлаа. Дахин батлуулах шаардлагатай.");
      renderView();
    }
  });
  wrap.appendChild(grid);

  return wrap;
}

function operatorOrdersView() {
  const operatorBookings = appState.bookings.filter(
    (b) => b.operator === appState.currentUser.name || appState.currentUser.name === "A. Operator"
  );
  const table = bookingTable(operatorBookings, true, false);
  table.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    const id = target.dataset.id;
    const action = target.dataset.action;
    if (!id || !action) return;

    const booking = appState.bookings.find((b) => b.id === id);
    if (!booking) return;

    if (action === "nextStatus") {
      const order = ["Хүлээгдэж байна", "Баталгаажсан", "Гүйцэтгэж байна", "Дууссан"];
      const idx = order.indexOf(booking.status);
      booking.status = order[Math.min(idx + 1, order.length - 1)];
      showToast(`Төлөв шинэчлэгдлээ: ${booking.status}`);
      renderView();
    }

    if (action === "upload") {
      booking.fileReady = true;
      booking.status = "Дууссан";
      showToast("Гүйцэтгэлийн файл байршууллаа.");
      renderView();
    }
  });

  return table;
}

function managerReviewView() {
  const grid = document.createElement("div");
  grid.className = "card-grid";
  appState.services.forEach((service) => grid.appendChild(serviceCard(service, "manager")));

  grid.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    const id = Number(target.dataset.id);
    const action = target.dataset.action;
    if (!id || !action) return;

    const service = appState.services.find((s) => s.id === id);
    if (!service) return;

    service.approvalStatus = action === "approve" ? "confirmed" : "rejected";
    showToast(action === "approve" ? "Зар батлагдлаа." : "Зар татгалзагдлаа.");
    renderView();
  });

  return grid;
}

function adminUsersView() {
  const card = document.createElement("article");
  card.className = "card input-card fade-in-up";
  card.innerHTML = `
    <h4>Хэрэглэгчийн жагсаалт</h4>
    <div class="table-wrap">
      <table>
        <thead><tr><th>ID</th><th>Нэр</th><th>Role</th><th>Status</th></tr></thead>
        <tbody>
          ${appState.users
            .map(
              (u) => `<tr><td>${u.id}</td><td>${u.name}</td><td>${u.role}</td><td>${u.status}</td></tr>`
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
  return card;
}

function adminReportsView() {
  const wrap = document.createElement("div");
  wrap.className = "view";

  const doneCount = appState.bookings.filter((b) => b.status === "Дууссан").length;
  const performance = Math.round((doneCount / appState.bookings.length) * 100);

  wrap.appendChild(
    createStats([
      { label: "Нийт захиалга", value: appState.bookings.length, note: "Realtime" },
      { label: "Нийт үйлчилгээ", value: appState.services.length, note: "Ашиглалтад" },
      { label: "Гүйцэтгэл", value: `${performance}%`, note: "Delivery completion" }
    ])
  );

  const card = document.createElement("article");
  card.className = "card input-card fade-in-up";
  card.innerHTML = `
    <h4>Системийн KPI</h4>
    <p>Нийт идэвхтэй хэрэглэгч: ${appState.users.length}</p>
    <div class="progress-bar"><span style="width:${performance}%"></span></div>
    <p>Батлагдсан үйлчилгээ: ${appState.services.filter((s) => s.approvalStatus === "confirmed").length}</p>
    <p>Pending review: ${appState.services.filter((s) => s.approvalStatus === "pending").length}</p>
  `;

  wrap.appendChild(card);
  return wrap;
}

function renderDashboard() {
  const statsByRole = {
    customer: [
      { label: "Идэвхтэй захиалга", value: appState.bookings.length, note: "Жишээ өгөгдөл" },
      { label: "Бэлэн файл", value: appState.bookings.filter((b) => b.fileReady).length, note: "Татах боломжтой" },
      {
        label: "Батлагдсан үйлчилгээ",
        value: appState.services.filter((s) => s.approvalStatus === "confirmed").length,
        note: "Ашиглахад бэлэн"
      }
    ],
    operator: [
      { label: "Ирсэн хүсэлт", value: appState.bookings.length, note: "Шинэ захиалга" },
      { label: "Миний зар", value: appState.services.length, note: "Зар удирдлага" },
      { label: "Pending review", value: appState.services.filter((s) => s.approvalStatus === "pending").length, note: "Manager review" }
    ],
    manager: [
      { label: "Шалгах зар", value: appState.services.filter((s) => s.approvalStatus === "pending").length, note: "Priority" },
      { label: "Баталсан", value: appState.services.filter((s) => s.approvalStatus === "confirmed").length, note: "Approved" },
      { label: "Татгалзсан", value: appState.services.filter((s) => s.approvalStatus === "rejected").length, note: "Rejected" }
    ],
    admin: [
      { label: "Нийт хэрэглэгч", value: appState.users.length, note: "System wide" },
      { label: "Нийт захиалга", value: appState.bookings.length, note: "All channels" },
      { label: "Гүйцэтгэл", value: "97.2%", note: "Demo KPI" }
    ]
  };

  return createStats(statsByRole[appState.currentRole]);
}

function renderView() {
  view.innerHTML = "";
  pageSubtitle.textContent = "Өгөгдөл шинэчлэгдсэн: 2026-04-02";

  if (appState.activePage === "dashboard") {
    pageTitle.textContent = "Dashboard";
    view.appendChild(renderDashboard());
    return;
  }

  if (appState.currentRole === "customer" && appState.activePage === "services") {
    pageTitle.textContent = "Үйлчилгээний зарууд";
    view.appendChild(customerServicesView());
    return;
  }

  if (appState.currentRole === "customer" && appState.activePage === "bookings") {
    pageTitle.textContent = "Миний захиалгууд";
    view.appendChild(customerBookingView());
    return;
  }

  if (appState.currentRole === "operator" && appState.activePage === "my-services") {
    pageTitle.textContent = "Миний үйлчилгээний зар";
    view.appendChild(operatorServicesView());
    return;
  }

  if (appState.currentRole === "operator" && appState.activePage === "orders") {
    pageTitle.textContent = "Ирсэн захиалгууд";
    view.appendChild(operatorOrdersView());
    return;
  }

  if (appState.currentRole === "manager" && appState.activePage === "reviews") {
    pageTitle.textContent = "Контент шалгалт";
    view.appendChild(managerReviewView());
    return;
  }

  if (appState.currentRole === "admin" && appState.activePage === "users") {
    pageTitle.textContent = "Бүх хэрэглэгч";
    view.appendChild(adminUsersView());
    return;
  }

  if (appState.currentRole === "admin" && appState.activePage === "all-bookings") {
    pageTitle.textContent = "Бүх захиалга";
    view.appendChild(bookingTable(appState.bookings, false, true));
    return;
  }

  if (appState.currentRole === "admin" && appState.activePage === "reports") {
    pageTitle.textContent = "Тайлан ба статистик";
    view.appendChild(adminReportsView());
  }
}

function bindGlobalEvents() {
  document.getElementById("openAuthBtn").addEventListener("click", showAuth);
  document.getElementById("heroLoginBtn").addEventListener("click", showAuth);
  document.getElementById("heroDemoBtn").addEventListener("click", () => {
    showAuth();
    document.getElementById("roleSelector").value = "customer";
    document.getElementById("loginEmail").value = "customer@dronehub.mn";
    showToast("Demo бэлэн. Role сонгоод нэвтэрнэ үү.");
  });
  document.getElementById("backToLandingBtn").addEventListener("click", showLanding);

  document.getElementById("registerForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("registerName").value || "Шинэ хэрэглэгч";
    showToast(`${name}, бүртгэл амжилттай! Одоо нэвтэрнэ үү.`);
    document.querySelector('[data-tab="login"]').click();
  });

  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const role = document.getElementById("roleSelector").value;
    const email = document.getElementById("loginEmail").value || `${role}@dronehub.mn`;
    appState.currentRole = role;
    appState.activePage = "dashboard";
    appState.currentUser = {
      name: {
        customer: "B. User",
        operator: "A. Operator",
        manager: "C. Manager",
        admin: "D. Admin"
      }[role],
      email
    };

    showApp();
    renderMenu();
    renderView();
    showToast(`${roleDisplay[role]} амжилттай нэвтэрлээ.`);
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    showLanding();
    showToast("Системээс гарлаа.");
  });

  document.getElementById("mobileMenuBtn").addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });
}

function init() {
  renderLandingStats();
  wireAuthTabs();
  bindGlobalEvents();
  showLanding();
}

init();
