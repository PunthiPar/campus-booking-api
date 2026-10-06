# Campus Equipment Booking API

RESTful API สำหรับระบบจองอุปกรณ์ภายในวิทยาเขต พัฒนาด้วย **Hono** และนำขึ้นระบบด้วย **Cloudflare Workers** พร้อมระบบตรวจสอบเวลาจองทับซ้อน (Overlap Validation)

---

## 🌐 Base API URLs

- **Local Development:** `http://localhost:8787/api`
- **Production (Cloudflare Workers):** `https://campus-booking-api.6731503111-transpot-parking.workers.dev/api`

---

## 📌 Endpoints Overview

| Method | Endpoint | Description | Status Codes |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/equipment` | ดึงรายการอุปกรณ์ทั้งหมด | `200 OK` |
| **GET** | `/api/bookings` | ดึงรายการการจองทั้งหมด | `200 OK` |
| **POST** | `/api/bookings` | สร้างรายการจองใหม่ (เช็คเวลาทับซ้อน) | `201 Created`, `400 Bad Request`, `409 Conflict` |
| **PATCH** | `/api/bookings/:id` | อัปเดตสถานะการจอง | `200 OK`, `400 Bad Request`, `404 Not Found` |
| **DELETE** | `/api/bookings/:id` | ยกเลิก/ลบรายการจอง | `200 OK`, `404 Not Found` |

---

## 🚀 How to Run Locally

1. **Install Dependencies**
   ```bash
   npm install