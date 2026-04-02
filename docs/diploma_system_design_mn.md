# Дроны зураг авалтын захиалга, удирдлагын вэб систем
## (Дипломын ажилд ашиглах иж бүрэн тодорхойлолт)

> Технологи: **HTML + CSS + JavaScript (Frontend), Java (Backend), MySQL (XAMPP)**

---

## 1. Системийн зорилго, зорилт

### 1.1 Системийн зорилго
Дроны зураг авалтын үйлчилгээний захиалга, операторын ажлын хуваарь, байршлын мэдээлэл, гүйцэтгэлийн төлөв, файл хадгалалт, тайлангийн урсгалыг нэг платформд нэгтгэсэн вэб систем боловсруулах.

### 1.2 Зорилтууд
1. Хэрэглэгчдэд үйлчилгээ хайх, захиалга өгөх, явц хянах боломж олгох.
2. Операторт ажлын оноолт, төлөв шинэчлэл, файл илгээх функцийг өгөх.
3. Админд хяналт, баталгаажуулалт, тайлангийн нэгдсэн самбар өгөх.
4. Контент хянагчид үйлчилгээний зар, материалын чанарыг шалгах урсгал бий болгох.
5. Захиалгын цаг давхцахаас сэргийлэх сервер талын шалгалт нэвтрүүлэх.

---

## 2. Хэрэглэгчийн төрлүүд

1. **Customer (Хэрэглэгч)**
   - Бүртгүүлэх, нэвтрэх
   - Үйлчилгээ харах/хайх
   - Захиалга үүсгэх
   - Захиалгын төлөв хянах
   - Дууссан зураг, видео татах

2. **Operator (Оператор)**
   - Өөрийн үйлчилгээний зар үүсгэх/засах
   - Оносон ажлын жагсаалт харах
   - Ажлын төлөв шинэчлэх
   - Гүйцэтгэсэн файл upload хийх

3. **Content Manager (Контент хянагч)**
   - Шинэ үйлчилгээний зарууд шалгах
   - Батлах / татгалзах
   - Контентын чанарын шаардлага хэрэгжүүлэх

4. **Admin (Админ)**
   - Хэрэглэгч, оператор, захиалга бүхэлд нь хянах
   - Захиалга батлах, оператор оноох
   - Тайлан, статистик гаргах

---

## 3. Функционал шаардлага

1. Нэвтрэх, бүртгэх (role-based access).
2. Үйлчилгээний зар CRUD.
3. Захиалга үүсгэх (огноо, цаг, байршил, тайлбар).
4. Захиалгын төлөв удирдах:
   - Хүлээгдэж байна
   - Баталгаажсан
   - Операторт оноосон
   - Гүйцэтгэж байна
   - Дууссан
   - Цуцлагдсан
5. Админ захиалга батлах, оператор оноох.
6. Оператор төлөв шинэчлэх.
7. Файл upload (зураг/видео), metadata хадгалах.
8. Захиалгын түүх, үйлдлийн лог.
9. Тайлан (өдөр, сар, оператор, орлого, гүйцэтгэл).

---

## 4. Функционал бус шаардлага

1. **Аюулгүй байдал**: Password hash, session/token, SQL injection хамгаалалт.
2. **Гүйцэтгэл**: 3 сек-ээс бага хугацаанд dashboard ачаалах.
3. **Өргөтгөх боломж**: service layer-тэй модульчлагдсан архитектур.
4. **Надежность**: transaction ашиглаж өгөгдлийн бүрэн бүтэн байдал хангах.
5. **Хэрэглээний тав тух**: responsive UI, ойлгомжтой төлөвийн badge.
6. **Нөөцлөлт**: MySQL backup төлөвлөгөө (өдөр тутам dump).

---

## 5. Use Case тодорхойлолт

### UC-01: Нэвтрэх
- **Actor**: Бүх хэрэглэгч
- **Pre-condition**: Бүртгэлтэй байх
- **Main flow**:
  1. Email/password оруулна
  2. Систем credential шалгана
  3. Session үүсгэнэ
  4. Role дагуу dashboard руу шилжинэ
- **Post-condition**: Нэвтэрсэн төлөв

### UC-02: Захиалга үүсгэх
- **Actor**: Customer
- **Pre-condition**: Нэвтэрсэн байх
- **Main flow**:
  1. Үйлчилгээ сонгоно
  2. Огноо, цаг, байршил, тайлбар оруулна
  3. Систем цаг давхцал шалгана
  4. Захиалга `PENDING` төлөвтэй хадгалагдана

### UC-03: Захиалга батлах
- **Actor**: Admin
- **Main flow**:
  1. PENDING захиалгыг харна
  2. Батлах эсвэл татгалзах
  3. Баталбал оператор онооно

### UC-04: Төлөв шинэчлэх
- **Actor**: Operator
- **Main flow**:
  1. Assigned захиалга сонгоно
  2. In Progress → Completed шинэчилнэ

### UC-05: Файл upload
- **Actor**: Operator
- **Main flow**:
  1. Захиалга сонгоно
  2. Фото/видео оруулна
  3. Систем metadata + storage path хадгална
  4. Customer татаж авах боломжтой болно

---

## 6. Activity Diagram тайлбар

### Захиалгын үндсэн урсгал
1. Customer захиалга үүсгэнэ.
2. System: цаг давхцал шалгана.
3. Давхцалгүй бол `PENDING`.
4. Admin батална → `CONFIRMED`.
5. Admin оператор онооно → `ASSIGNED`.
6. Operator ажил эхлүүлнэ → `IN_PROGRESS`.
7. Operator файл upload хийнэ.
8. Захиалга `COMPLETED`.
9. Customer үр дүн татна.

### Альтернатив урсгал
- Давхцал илэрвэл “Өөр цаг сонгоно уу” алдаа буцаана.
- Админ татгалзвал `REJECTED`.

---

## 7. Class Diagram тайлбар

### Гол entity классууд
- `User` (id, name, email, passwordHash, role)
- `Service` (id, operatorId, title, price, location, status)
- `Booking` (id, customerId, serviceId, operatorId, dateTime, status)
- `BookingFile` (id, bookingId, fileType, filePath, uploadedBy)
- `AuditLog` (id, actorId, action, entityType, entityId, createdAt)

### Харилцаа
- User(Operator) 1..* Service
- User(Customer) 1..* Booking
- Service 1..* Booking
- Booking 1..* BookingFile

---

## 8. Database Schema (MySQL)

Schema файл: `sql/dronehub_schema.sql`

- `roles`
- `users`
- `services`
- `bookings`
- `booking_files`
- `service_reviews`
- `audit_logs`

---

## 9. Хүснэгтийн relation (FK)

1. `users.role_id -> roles.id`
2. `services.operator_id -> users.id`
3. `bookings.customer_id -> users.id`
4. `bookings.operator_id -> users.id`
5. `bookings.service_id -> services.id`
6. `booking_files.booking_id -> bookings.id`
7. `service_reviews.service_id -> services.id`
8. `service_reviews.reviewer_id -> users.id`

---

## 10. Backend архитектур (Java)

### Layered architecture
- **Controller**: HTTP request/response
- **Service**: Бизнес логик
- **DAO**: DB CRUD, SQL
- **Model/DTO**: өгөгдлийн бүтэц

### Package бүтэц
`com.dronehub`
- `controller`
- `service`, `service.impl`
- `dao`, `dao.impl`
- `model`, `dto`
- `security`
- `util`

> Жишээ Java skeleton классууд `backend/src/main/java/com/dronehub/...` дотор нэмэгдсэн.

---

## 11. Frontend page-үүд

1. Landing page
2. Login/Register
3. Customer dashboard
4. Operator dashboard
5. Content Manager review page
6. Admin dashboard (users, bookings, reports)

---

## 12. Login, Register, Booking Form, Dashboard

- Login/Register: role сонгож нэвтрэх
- Booking form: огноо, цаг, байршил, тайлбар
- Dashboard: role бүрт өөр KPI үзүүлэлт
- Sidebar navigation + responsive дизайн

---

## 13. Захиалга үүсгэх, батлах, төлөв шинэчлэх логик

1. Customer create booking
2. Admin approve/reject
3. Admin assign operator
4. Operator update status
5. Completed үед файл холбох

Server-side validation:
- `booking_datetime` хоосон эсэх
- `service_id` хүчинтэй эсэх
- Operator availability (давхцал шалгалт)

---

## 14. Файл upload, хадгалалт

### Хадгалах хувилбар
- Apache file storage: `htdocs/dronehub-storage/{bookingId}/...`
- DB-д зөвхөн metadata хадгалах:
  - file_name
  - file_type
  - file_path
  - file_size

### Шаардлага
- Зөвшөөрөгдөх төрөл: `jpg, jpeg, png, mp4, mov`
- Max size: 200MB
- Virus scan hook (ирээдүйн өргөтгөл)

---

## 15. Тайлан (SQL query жишээ)

### 15.1 Сарын захиалгын тоо
```sql
SELECT DATE_FORMAT(created_at, '%Y-%m') AS ym, COUNT(*) AS total
FROM bookings
GROUP BY DATE_FORMAT(created_at, '%Y-%m')
ORDER BY ym DESC;
```

### 15.2 Операторын гүйцэтгэлийн тайлан
```sql
SELECT u.name AS operator_name,
       COUNT(b.id) AS total_jobs,
       SUM(CASE WHEN b.status = 'COMPLETED' THEN 1 ELSE 0 END) AS done_jobs
FROM bookings b
JOIN users u ON u.id = b.operator_id
GROUP BY u.id, u.name
ORDER BY done_jobs DESC;
```

### 15.3 Орлогын тайлан
```sql
SELECT DATE_FORMAT(b.booking_datetime, '%Y-%m') AS ym,
       SUM(s.price) AS total_revenue
FROM bookings b
JOIN services s ON s.id = b.service_id
WHERE b.status = 'COMPLETED'
GROUP BY DATE_FORMAT(b.booking_datetime, '%Y-%m')
ORDER BY ym DESC;
```

---

## 16. Аюулгүй байдлын шийдэл

1. Password hash: `BCrypt` (plain text хадгалахгүй)
2. Session timeout: 30 минут идэвхгүй бол logout
3. Role-based authorization check
4. SQL injection хамгаалалт: PreparedStatement
5. XSS хамгаалалт: output encoding
6. CSRF token (form submit дээр)
7. File upload whitelist + MIME type шалгалт

---

## 17. Цаашид сайжруулах боломж

1. Google Maps API интеграци (booking location pin)
2. Operator live tracking
3. Push notification / Email/SMS мэдэгдэл
4. Payment gateway (QPay, SocialPay)
5. AI-assisted image quality scoring
6. Multi-tenant байгууллагын горим

---

## Extra 1: Google Maps санал

- Booking form дээр map picker оруулах
- `latitude`, `longitude`, `address_text` хадгалах
- Admin/Operator талд маршрут харах

DB нэмэлт багана:
- `bookings.latitude DECIMAL(10,7)`
- `bookings.longitude DECIMAL(10,7)`
- `bookings.address_text VARCHAR(255)`

---

## Extra 2: Цаг давхцахаас сэргийлэх логик

### Бизнес дүрэм
Ижил операторын хувьд ижил өдөр/цагийн интервал давхцах захиалга үүсгэхгүй.

### SQL шалгалтын санаа
```sql
SELECT COUNT(*)
FROM bookings
WHERE operator_id = :operatorId
  AND status IN ('CONFIRMED','ASSIGNED','IN_PROGRESS')
  AND booking_datetime < :newEnd
  AND DATE_ADD(booking_datetime, INTERVAL duration_minute MINUTE) > :newStart;
```

Хэрэв count > 0 бол захиалга зөвшөөрөхгүй.

---

## Extra 3: UI төлөвлөлтийн зарчим

1. Энгийн sidebar + breadcrumb
2. Card layout (services)
3. Status badge (өнгө ялгалт)
4. Dashboard KPI cards
5. Хүснэгт + filter + pagination
6. Mobile responsive (<= 980px үед sidebar collapse)

---

## Дүгнэлт

Энэхүү загвар нь дипломын ажлын **онол + системийн дизайн + техникийн хэрэгжилтийн үндэс**-ийг бүрэн хамарч байгаа бөгөөд frontend/backend/db-ийг нэг цогц систем болгон хөгжүүлэхэд шууд ашиглаж болно.
