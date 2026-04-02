const authShell = document.getElementById("authShell");
const appShell = document.getElementById("appShell");
const menuList = document.getElementById("menuList");
const view = document.getElementById("view");
const roleBadge = document.getElementById("roleBadge");
const profileName = document.getElementById("profileName");
const pageTitle = document.getElementById("pageTitle");
const pageSubtitle = document.getElementById("pageSubtitle");
const sidebar = document.getElementById("sidebar");

const sampleServices = [
  {
    id: 1,
    title: "Хотын төв aerial зураг",
    price: "₮350,000",
    location: "Улаанбаатар",
    description: "4K видео + 20 фото, үл хөдлөхийн зар сурталчилгаанд тохиромжтой.",
    image:
      "https://images.unsplash.com/photo-1508615070457-7baeba4003ab?auto=format&fit=crop&w=900&q=80",
    status: "pending"
  },
  {
    id: 2,
    title: "Wedding drone багц",
    price: "₮650,000",
    location: "Тэрэлж",
    description: "Кино стилийн өнгө засвар, highlight reel 3-5 минут.",
    image:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=900&q=80",
    status: "confirmed"
  },
  {
    id: 3,
    title: "Барилгын progress monitoring",
    price: "₮480,000",
    location: "Хан-Уул",
    description: "Сар бүрийн явцын зураг авалт ба тайлангийн overlay.",
    image:
      "https://images.unsplash.com/photo-1521405924368-64c5b84bec60?auto=format&fit=crop&w=900&q=80",
    status: "done"
  }
];

const sampleBookings = [
  {
    id: "BK-1024",
    customer: "T. Nomin",
    service: "Wedding drone багц",
    date: "2026-04-12",
    time: "11:30",
    location: "Тэрэлж",
    status: "Хүлээгдэж байна"
  },
  {
    id: "BK-1025",
    customer: "S. Erdene",
    service: "Барилгын progress monitoring",
    date: "2026-04-06",
    time: "15:00",
    location: "Яармаг",
    status: "Баталгаажсан"
  },
  {
    id: "BK-1026",
    customer: "M. Ariunaa",
    service: "Хотын төв aerial зураг",
    date: "2026-03-31",
    time: "09:00",
    location: "Сүхбаатар дүүрэг",
    status: "Гүйцэтгэж байна"
  },
  {
    id: "BK-1027",
    customer: "Orgil LLC",
    service: "Барилгын progress monitoring",
    date: "2026-03-22",
    time: "13:30",
    location: "Баянзүрх",
    status: "Дууссан"
  }
];

const statusClassMap = {
  "Хүлээгдэж байна": "pending",
  "Баталгаажсан": "confirmed",
  "Гүйцэтгэж байна": "progress",
  "Дууссан": "done"
};

const menus = {
  customer: [
    ["dashboard", "fa-chart-line", "Хянах самбар"],
    ["services", "fa-camera", "Үйлчилгээний зар"],
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

let currentRole = "customer";
let activePage = "dashboard";

document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const tab = btn.dataset.tab;
    document.getElementById("loginForm").classList.toggle("active", tab === "login");
    document.getElementById("registerForm").classList.toggle("active", tab === "register");
  });
});

document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Бүртгэл амжилттай! Одоо нэвтэрнэ үү.");
  document.querySelector('[data-tab="login"]').click();
});

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  currentRole = document.getElementById("roleSelector").value;
  activePage = "dashboard";
  authShell.classList.add("hidden");
  appShell.classList.remove("hidden");
  renderMenu();
  renderView();
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  appShell.classList.add("hidden");
  authShell.classList.remove("hidden");
});

document.getElementById("mobileMenuBtn").addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

function renderMenu() {
  const roleNames = {
    customer: "Customer",
    operator: "Service Provider",
    manager: "Content Manager",
    admin: "Admin"
  };
  roleBadge.textContent = roleNames[currentRole];
  profileName.textContent =
    {
      customer: "B. User",
      operator: "A. Operator",
      manager: "C. Manager",
      admin: "D. Admin"
    }[currentRole] || "B. User";

  menuList.innerHTML = "";
  menus[currentRole].forEach(([key, icon, label]) => {
    const btn = document.createElement("button");
    btn.className = `menu-item ${activePage === key ? "active" : ""}`;
    btn.innerHTML = `<i class="fa-solid ${icon}"></i> ${label}`;
    btn.addEventListener("click", () => {
      activePage = key;
      renderMenu();
      renderView();
      sidebar.classList.remove("open");
    });
    menuList.appendChild(btn);
  });
}

function serviceCard(service, isOperator = false) {
  const temp = document.getElementById("serviceCardTemplate");
  const clone = temp.content.cloneNode(true);
  clone.querySelector("img").src = service.image;
  clone.querySelector(".service-title").textContent = service.title;
  clone.querySelector(".price").textContent = service.price;
  clone.querySelector(".service-location").textContent = `📍 ${service.location}`;
  clone.querySelector(".service-description").textContent = service.description;

  const actions = clone.querySelector(".card-actions");
  if (isOperator) {
    actions.innerHTML = `<button class="ghost-btn">Засах</button><button class="ghost-btn">Устгах</button>`;
  } else {
    actions.innerHTML = `<button class="primary-btn">Захиалах</button>`;
  }
  return clone;
}

function bookingTable(rows, includeActions = false) {
  const tableWrap = document.createElement("div");
  tableWrap.className = "table-wrap card fade-in-up";
  const table = document.createElement("table");
  table.innerHTML = `
    <thead>
      <tr>
        <th>ID</th><th>Хэрэглэгч</th><th>Үйлчилгээ</th><th>Огноо</th><th>Цаг</th><th>Байршил</th><th>Төлөв</th>${
          includeActions ? "<th>Action</th>" : ""
        }
      </tr>
    </thead>
    <tbody>
      ${rows
        .map(
          (item) => `<tr>
          <td>${item.id}</td>
          <td>${item.customer}</td>
          <td>${item.service}</td>
          <td>${item.date}</td>
          <td>${item.time}</td>
          <td>${item.location}</td>
          <td><span class="badge ${statusClassMap[item.status]}">${item.status}</span></td>
          ${
            includeActions
              ? '<td><button class="ghost-btn">Төлөв шинэчлэх</button> <button class="primary-btn">Файл upload</button></td>'
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

function renderStats(items) {
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

function renderView() {
  view.innerHTML = "";
  pageSubtitle.textContent = "Өгөгдөл шинэчлэгдсэн: 2026-03-30";

  if (activePage === "dashboard") {
    pageTitle.textContent = "Dashboard";
    const statsByRole = {
      customer: [
        { label: "Идэвхтэй захиалга", value: "3", note: "+1 this week" },
        { label: "Дууссан ажил", value: "12", note: "Татах файлууд бэлэн" },
        { label: "Шинэ зар", value: "8", note: "Өнөөдрийн update" }
      ],
      operator: [
        { label: "Ирсэн хүсэлт", value: "9", note: "2 нь яаралтай" },
        { label: "Идэвхтэй зар", value: "5", note: "1 review pending" },
        { label: "Сарын орлого", value: "₮6.2M", note: "+12%" }
      ],
      manager: [
        { label: "Шалгах зар", value: "7", note: "24 цагт багтаах" },
        { label: "Баталсан", value: "30", note: "Энэ 7 хоног" },
        { label: "Татгалзсан", value: "4", note: "Quality mismatch" }
      ],
      admin: [
        { label: "Нийт хэрэглэгч", value: "1,284", note: "+41 шинэ" },
        { label: "Нийт захиалга", value: "3,942", note: "Realtime" },
        { label: "Гүйцэтгэлийн түвшин", value: "97.2%", note: "SLA сайн" }
      ]
    };
    view.appendChild(renderStats(statsByRole[currentRole]));
  }

  if (currentRole === "customer" && activePage === "services") {
    pageTitle.textContent = "Үйлчилгээ хайх";
    view.innerHTML = `
      <article class="card input-card fade-in-up">
        <div class="search-row">
          <input placeholder="Түлхүүр үгээр хайх..." />
          <select>
            <option>Үнэ: Бүгд</option>
            <option>Доод үнэ</option>
            <option>Дээд үнэ</option>
          </select>
          <select>
            <option>Байршил: Бүгд</option>
            <option>Улаанбаатар</option>
            <option>Тэрэлж</option>
          </select>
        </div>
      </article>
    `;
    const grid = document.createElement("div");
    grid.className = "card-grid";
    sampleServices.forEach((service) => grid.appendChild(serviceCard(service)));
    view.appendChild(grid);
  }

  if (currentRole === "customer" && activePage === "bookings") {
    pageTitle.textContent = "Миний захиалгууд";
    view.innerHTML = `
      <article class="card input-card fade-in-up">
        <h4>Шинэ захиалга үүсгэх</h4>
        <div class="search-row">
          <input type="date" />
          <input type="time" />
          <input placeholder="Байршил" />
        </div>
        <textarea rows="3" placeholder="Нэмэлт тайлбар"></textarea>
        <div style="margin-top:10px; display:flex; gap:10px; flex-wrap:wrap;">
          <button class="primary-btn">Захиалга илгээх</button>
          <button class="ghost-btn">Дууссан файлууд татах</button>
        </div>
      </article>
    `;
    view.appendChild(bookingTable(sampleBookings));
  }

  if (currentRole === "operator" && activePage === "my-services") {
    pageTitle.textContent = "Миний үйлчилгээний зар";
    view.innerHTML = `
      <article class="card input-card fade-in-up">
        <h4>Шинэ зар үүсгэх</h4>
        <div class="search-row">
          <input placeholder="Үйлчилгээний нэр" />
          <input placeholder="Үнэ" />
          <input placeholder="Байршил" />
        </div>
        <textarea rows="3" placeholder="Дэлгэрэнгүй тайлбар"></textarea>
        <div style="margin-top:10px;">
          <button class="primary-btn">Зар нийтлэх</button>
        </div>
      </article>
    `;
    const grid = document.createElement("div");
    grid.className = "card-grid";
    sampleServices.forEach((service) => grid.appendChild(serviceCard(service, true)));
    view.appendChild(grid);
  }

  if (currentRole === "operator" && activePage === "orders") {
    pageTitle.textContent = "Ирсэн захиалгууд";
    view.appendChild(bookingTable(sampleBookings, true));
  }

  if (currentRole === "manager" && activePage === "reviews") {
    pageTitle.textContent = "Контент шалгах хэсэг";
    const grid = document.createElement("div");
    grid.className = "card-grid";
    sampleServices.forEach((service) => {
      const card = serviceCard(service, true);
      card.querySelector(
        ".card-actions"
      ).innerHTML = `<button class="primary-btn">Батлах</button><button class="ghost-btn">Татгалзах</button>`;
      grid.appendChild(card);
    });
    view.appendChild(grid);
  }

  if (currentRole === "admin" && activePage === "users") {
    pageTitle.textContent = "Бүх хэрэглэгчид";
    view.innerHTML = `
      <article class="card input-card fade-in-up">
        <h4>User Overview</h4>
        <div class="stats-grid">
          <div><strong>Customer:</strong> 1010</div>
          <div><strong>Operator:</strong> 198</div>
          <div><strong>Manager:</strong> 24</div>
          <div><strong>Admin:</strong> 12</div>
        </div>
      </article>
    `;
  }

  if (currentRole === "admin" && activePage === "all-bookings") {
    pageTitle.textContent = "Бүх захиалга";
    view.appendChild(bookingTable(sampleBookings));
  }

  if (currentRole === "admin" && activePage === "reports") {
    pageTitle.textContent = "Тайлан, статистик";
    view.appendChild(
      renderStats([
        { label: "Сарын захиалга", value: "542", note: "Өсөлт +18%" },
        { label: "Дундаж чек", value: "₮420k", note: "Stable" },
        { label: "Татгалзсан зар", value: "22", note: "Quality issues" },
        { label: "NPS", value: "62", note: "High satisfaction" }
      ])
    );
    const chartBox = document.createElement("article");
    chartBox.className = "card input-card fade-in-up";
    chartBox.innerHTML = `
      <h4>Гүйцэтгэлийн хураангуй</h4>
      <p>• Захиалгын 97.2% нь хугацаандаа гүйцэтгэсэн</p>
      <p>• Customer сэтгэл ханамж 4.8/5</p>
      <p>• Operator идэвх +11% (сүүлийн 30 хоног)</p>
    `;
    view.appendChild(chartBox);
  }
}
