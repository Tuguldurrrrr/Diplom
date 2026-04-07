const bcrypt = require('bcrypt');
const db = require('../config/db');

(async () => {
  const adminPass = await bcrypt.hash('Admin123!', 10);
  const managerPass = await bcrypt.hash('Manager123!', 10);
  const operatorPass = await bcrypt.hash('Operator123!', 10);
  const customerPass = await bcrypt.hash('Customer123!', 10);

  await db.execute("INSERT INTO users (full_name,email,password,role,phone) VALUES ('System Admin','admin@drone.mn',?,'admin','99990000')", [adminPass]);
  await db.execute("INSERT INTO users (full_name,email,password,role,phone) VALUES ('Content Manager','cm@drone.mn',?,'content_manager','99991111')", [managerPass]);
  await db.execute("INSERT INTO users (full_name,email,password,role,phone) VALUES ('Operator One','operator@drone.mn',?,'operator','99112233')", [operatorPass]);
  await db.execute("INSERT INTO users (full_name,email,password,role,phone) VALUES ('Customer One','customer@drone.mn',?,'customer','88112233')", [customerPass]);

  await db.execute("INSERT INTO service_categories (name,description) VALUES ('Wedding','Хуримын зураг авалт'),('Real Estate','Үл хөдлөх хөрөнгийн зураг'),('Survey','Газрын зураглал')");

  console.log('Seed complete');
  process.exit(0);
})();
