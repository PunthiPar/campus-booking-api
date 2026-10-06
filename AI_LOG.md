# AI Interaction Log

บันทึกประวัติคำสั่ง (Prompts) และแนวทางการทำงานร่วมกับ AI ในการพัฒนาโปรเจกต์ `campus-booking-api`

## 📝 บันทึกประวัติการใช้งาน AI

### 1. การเตรียมสภาพแวดล้อมและการแก้ไขปัญหา VS Code
- **Prompt:** สอบถามวิธีแก้ปัญหา Open File / Open Folder และวิธีปลดล็อก Restricted Mode ใน VS Code
- **AI Solution:** ให้คำแนะนำขั้นตอนการเลือก Folder การปลดล็อกสิทธิ์ Trust Folder และเปิด Terminal ใน VS Code

### 2. การติดตั้ง dependencies และเตรียมฐานข้อมูล
- **Prompt:** สอบถามชุดคำสั่งสำหรับตั้งค่า Hono Framework และ Cloudflare D1
- **AI Solution:** แนะนำชุดคำสั่ง `npm init`, `npm install hono`, `npm install -D wrangler typescript @cloudflare/workers-types` พร้อมเขียนคำสั่ง D1 Local Execution

### 3. การออกแบบ Schema และการเขียน API (Backend)
- **Prompt:** ขอโค้ด SQL สำหรับสร้างตาราง `equipment`, `bookings` และโค้ด Hono REST API รองรับ CRUD (GET, POST, PATCH, DELETE) พร้อมระบบเช็คการจองเวลาซ้อนทับ
- **AI Solution:** สร้างไฟล์ `schema.sql`, `wrangler.toml` และไฟล์หลัก `src/index.ts` ที่มีการตรวจสอบ Validation ข้อมูลครบถ้วน

### 4. การทดสอบระบบและการจัดทำเอกสาร
- **Prompt:** สอบถามวิธีรันเซิร์ฟเวอร์และทดสอบการเรียกใช้งานผ่านเบราว์เซอร์
- **AI Solution:** แนะนำคำสั่ง `npx wrangler dev`, วิธีเปิดหน้าเว็บทดสอบ `/api/equipment` และ `/api/bookings` รวมถึงช่วยจัดทำชุดเอกสาร `README.md`, `API_CONTRACT.md` และ `AI_LOG.md`