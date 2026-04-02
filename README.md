# DroneHub – Node.js + Express + MySQL (XAMPP)

## ✅ Цэвэр бүтэц (merge conflict-гүй)

```
server.js
package.json
.env.example
scripts/check-conflicts.js
src/
  config/
  controllers/
  middlewares/
  models/
  routes/
public/
  index.html
  login.html
  register.html
  dashboard.html
  booking.html
  admin.html
  operator.html
  css/style.css
  js/app.js
sql/dronehub_schema.sql
uploads/
```

## Ажиллуулах

1. XAMPP дээр Apache + MySQL асаана.
2. `sql/dronehub_schema.sql` import хийнэ.
3. `.env.example` → `.env` болгоно.
4. Дараа нь:
   - `npm install`
   - `npm run check:conflicts`
   - `npm run dev`
5. `http://localhost:3000/login.html` нээнэ.

## Merge conflict-оос сэргийлэх

- PR merge хийхийн өмнө заавал `npm run check:conflicts` ажиллуул.
- Хэрэв conflict marker (`<<<<<<<`, `=======`, `>>>>>>>`) илэрвэл тухайн файлыг цэвэрлээд дахин commit хий.
- Хамгийн түгээмэл асуудал гардаг файлууд: `README.md`, `sql/dronehub_schema.sql`.

## Security
- bcrypt password hash
- JWT auth + role authorization
- mysql2 prepared query (`db.execute`)

## Гол API
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/services`
- `POST /api/bookings`
- `GET /api/bookings`
- `PATCH /api/bookings/:id/status`
- `POST /api/upload`
- `GET /api/reports/monthly`
