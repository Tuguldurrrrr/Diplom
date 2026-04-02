# DroneHub – Бүрэн ажиллах Node.js + Express + MySQL вэб систем

## 📁 Project structure

```
Diplom/
├─ server.js
├─ package.json
├─ .env.example
├─ src/
│  ├─ config/db.js
│  ├─ middlewares/auth.js
│  ├─ models/
│  │  ├─ userModel.js
│  │  ├─ serviceModel.js
│  │  ├─ bookingModel.js
│  │  └─ fileModel.js
│  ├─ controllers/
│  │  ├─ authController.js
│  │  ├─ serviceController.js
│  │  ├─ bookingController.js
│  │  ├─ uploadController.js
│  │  └─ reportController.js
│  └─ routes/
│     ├─ authRoutes.js
│     ├─ serviceRoutes.js
│     ├─ bookingRoutes.js
│     ├─ uploadRoutes.js
│     └─ reportRoutes.js
├─ public/
│  ├─ index.html
│  ├─ login.html
│  ├─ register.html
│  ├─ dashboard.html
│  ├─ booking.html
│  ├─ admin.html
│  ├─ operator.html
│  ├─ css/style.css
│  └─ js/app.js
├─ sql/dronehub_schema.sql
└─ uploads/
```

## ⚙️ Ажиллуулах алхам (XAMPP + MySQL)

1. XAMPP дээр Apache, MySQL асаана.
2. `sql/dronehub_schema.sql` файлыг phpMyAdmin-аар импортлоно.
3. `.env.example`-г `.env` болгож хуулна.
4. Терминал дээр:
   - `npm install`
   - `npm run dev`
5. Хөтөч дээр `http://localhost:3000/login.html` нээнэ.

## 🔐 Security
- Password: bcrypt hash
- Auth: JWT
- SQL: mysql2 prepared query (`db.execute(...)`)

## 📊 Тайлан API
- `GET /api/reports/monthly`
