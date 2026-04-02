# DroneHub

Дроны зураг авалтын захиалга, удирдлагын вэб систем.

## Stack
- Node.js + Express
- MySQL (XAMPP)
- HTML/CSS/JS

## Run
1. `cp .env.example .env`
2. XAMPP MySQL асааж `sql/dronehub_schema.sql` импортло
3. `npm install`
4. `npm run check:conflicts`
5. `npm run dev`
6. `http://localhost:3000/login.html`

## API
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/services`
- `POST /api/bookings`
- `GET /api/bookings`
- `PATCH /api/bookings/:id/status`
- `POST /api/upload`
- `GET /api/reports/monthly`

## Conflict fix
Хэрэв GitHub PR дээр conflict гарвал локал дээрээ:
```bash
git fetch origin
git checkout <your-branch>
git merge origin/main
# README.md, sql/dronehub_schema.sql файлуудаа засаад
git add README.md sql/dronehub_schema.sql
git commit
```
# DroneHub Diploma Project (HTML/CSS/JS + Java + MySQL/XAMPP)

Энэ repository-д дипломын ажлын түвшний системийн материалууд орсон:

## Орсон файлууд

- `docs/diploma_system_design_mn.md` — Дипломын тайлангийн үндсэн бүлгүүд (зорилго, шаардлага, use-case, diagram тайлбар, аюулгүй байдал, тайлан, сайжруулалт).
- `sql/dronehub_schema.sql` — MySQL schema (roles, users, services, bookings, booking_files, service_reviews, audit_logs).
- `backend/src/main/java/com/dronehub/...` — Java backend architecture skeleton (controller/service/dao/model/security/util).
- `index.html`, `styles.css`, `app.js`, `api.js` — Frontend dashboard prototype.

## XAMPP Setup

1. XAMPP дээр `Apache` + `MySQL` асаана.
2. `sql/dronehub_schema.sql` файлыг импортлоно.
3. Java backend-ийг MySQL руу `jdbc:mysql://localhost:3306/dronehub_db` холбож ажиллуулна.
4. Хэрвээ PHP bridge ашиглах бол `http://localhost/dronehub-api` endpoint-ууд бэлдэнэ.

## Анхаарах зүйл

- Энэ commit дээрх Java код нь дипломын архитектурын **skeleton** тул endpoint, transaction, exception handling-ийг төслийн хэрэгжилтэд бүрэн гүйцээж нэмэх шаардлагатай.
- Password hashing-д demo зорилгоор SHA-256 ашигласан. Production орчинд BCrypt/Argon2 хэрэглэхийг зөвлөж байна.
