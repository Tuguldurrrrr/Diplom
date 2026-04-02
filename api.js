const API_BASE = window.DRONEHUB_API_BASE || "http://localhost/dronehub-api";

const demoData = {
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
    }
  ],
  bookings: [
    {
      id: "BK-1024",
      customer: "B. User",
      operator: "Aero Moments",
      service: "Wedding drone багц",
      date: "2026-04-12",
      time: "11:30",
      location: "Тэрэлж",
      notes: "Sunset frame авах",
      status: "Хүлээгдэж байна",
      fileReady: false
    }
  ],
  users: [
    { id: "U-01", name: "B. User", role: "Customer", status: "Active" },
    { id: "U-02", name: "A. Operator", role: "Service Provider", status: "Active" },
    { id: "U-03", name: "C. Manager", role: "Content Manager", status: "Active" },
    { id: "U-04", name: "D. Admin", role: "Admin", status: "Active" }
  ]
};

function clone(data) {
  return JSON.parse(JSON.stringify(data));
}

function toPrice(priceValue) {
  return `₮${Number(priceValue || 0).toLocaleString()}`;
}

class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.online = false;
    this.mock = clone(demoData);
  }

  async init() {
    this.online = await this.health();
    return this.online;
  }

  async health() {
    try {
      const r = await fetch(`${this.baseUrl}/health.php`, { method: "GET" });
      return r.ok;
    } catch {
      return false;
    }
  }

  async request(path, method = "GET", body) {
    const options = {
      method,
      headers: { "Content-Type": "application/json" }
    };
    if (body) options.body = JSON.stringify(body);

    const res = await fetch(`${this.baseUrl}${path}`, options);
    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }
    return res.json();
  }

  async login(payload) {
    if (!this.online) return { ok: true, user: payload };
    return this.request("/auth/login.php", "POST", payload);
  }

  async register(payload) {
    if (!this.online) return { ok: true, user: payload };
    return this.request("/auth/register.php", "POST", payload);
  }

  async getBootstrapData() {
    if (!this.online) return clone(this.mock);
    return this.request("/bootstrap.php");
  }

  async createBooking(payload) {
    if (!this.online) {
      const booking = { ...payload, id: `BK-${1000 + this.mock.bookings.length + 1}` };
      this.mock.bookings.unshift(booking);
      return booking;
    }
    return this.request("/bookings/create.php", "POST", payload);
  }

  async updateBooking(id, payload) {
    if (!this.online) {
      const b = this.mock.bookings.find((x) => x.id === id);
      if (b) Object.assign(b, payload);
      return b;
    }
    return this.request(`/bookings/update.php?id=${encodeURIComponent(id)}`, "POST", payload);
  }

  async createService(payload) {
    if (!this.online) {
      const svc = {
        ...payload,
        id: this.mock.services.length + 1,
        price: toPrice(payload.priceValue)
      };
      this.mock.services.unshift(svc);
      return svc;
    }
    return this.request("/services/create.php", "POST", payload);
  }

  async updateService(id, payload) {
    if (!this.online) {
      const svc = this.mock.services.find((s) => s.id === id);
      if (svc) Object.assign(svc, payload, { price: toPrice(payload.priceValue ?? svc.priceValue) });
      return svc;
    }
    return this.request(`/services/update.php?id=${id}`, "POST", payload);
  }

  async deleteService(id) {
    if (!this.online) {
      this.mock.services = this.mock.services.filter((s) => s.id !== id);
      return { ok: true };
    }
    return this.request(`/services/delete.php?id=${id}`, "DELETE");
  }
}

window.DroneHubApi = new ApiClient(API_BASE);
