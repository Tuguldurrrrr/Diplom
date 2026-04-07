# Drone Marketplace (MVP)

## 1) Project structure
```
config/
controllers/
middleware/
models/
routes/
views/
public/
sql/schema.sql
seed/seed.js
app.js
```

## 2) Install dependencies
```bash
npm install
```

## 3) DB setup
```bash
mysql -u root -p < sql/schema.sql
```

## 4) Configure env
Copy `.env.example` to `.env` and edit DB credentials.

Required DB variables:
- `DB_MODE=mysql`
- `DB_HOST` (e.g. `127.0.0.1`)
- `DB_PORT` (default `3306`)
- `DB_USER`
- `DB_PASSWORD`
- `DB_DATABASE` (schema name)

## 5) Seed
```bash
npm run seed
```

## 6) Run
```bash
npm run dev
```

## 7) Basic test
```bash
npm test
```

## MVP features
- Session auth + bcrypt
- Role-based dashboards (admin/content_manager/operator/customer)
- Service listing and approval workflow
- Order lifecycle updates
- File upload/download
- Reports page (basic)
- Simplified page routing/controller (fewer files, easier maintenance)
- HTML template views (`views/**/*.html`) rendered by EJS engine

## Next improvements
- Payment integration
- Chat / notifications
- Advanced search map filters
- Review moderation & analytics
- API docs + automated testing
