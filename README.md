# DroneHub Frontend + XAMPP(MySQL) Integration Notes

Энэ frontend нь хоёр горимтой:

1. **LIVE mode** – XAMPP дээрх PHP API ажиллаж байвал (`http://localhost/dronehub-api`) өгөгдлийг API-аас авна.
2. **DEMO mode** – API байхгүй үед локал demo өгөгдлөөр ажиллана.

## XAMPP setup

1. `Apache` болон `MySQL`-ээ XAMPP дээр асаана.
2. API фолдероо `htdocs/dronehub-api` дотор байрлуулна.
3. Frontend дотроос дуудагдах endpoint-ууд:
   - `GET /health.php`
   - `GET /bootstrap.php`
   - `POST /auth/login.php`
   - `POST /auth/register.php`
   - `POST /bookings/create.php`
   - `POST /bookings/update.php?id=...`
   - `POST /services/create.php`
   - `POST /services/update.php?id=...`
   - `DELETE /services/delete.php?id=...`

## MySQL suggested tables

- `users(id, name, email, role, status, created_at)`
- `services(id, title, price_value, location, description, image, approval_status, provider, created_at)`
- `bookings(id, customer, operator, service, date, time, location, notes, status, file_ready, created_at)`

## API response shape

`GET /bootstrap.php`:

```json
{
  "services": [],
  "bookings": [],
  "users": []
}
```

## Base URL override

Хэрвээ өөр URL ашиглах бол `index.html`-д `api.js`-ийн өмнө:

```html
<script>window.DRONEHUB_API_BASE = "http://localhost/my-custom-api";</script>
```
