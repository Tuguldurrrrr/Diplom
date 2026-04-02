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
