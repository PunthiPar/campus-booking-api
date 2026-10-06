# API Contract & Specification

**Base URL:** `http://127.0.0.1:8787`

---

## 1. Equipment Endpoints

### `GET /api/equipment`
- **คำอธิบาย:** ดึงรายการอุปกรณ์ทั้งหมดในระบบ
- **Response Status:** `200 OK`
- **Response Body Example:**
  ```json
  [
    {
      "id": "eq-1",
      "name": "Projector A",
      "location": "Building 1"
    },
    {
      "id": "eq-2",
      "name": "Camera B",
      "location": "Building 2"
    }
  ]