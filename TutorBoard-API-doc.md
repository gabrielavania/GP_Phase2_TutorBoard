# 🧠 TutorBoard Whiteboard AI Explanation API

Endpoint ini digunakan untuk mengirim gambar whiteboard dalam format Base64 ke AI Gemini untuk dijelaskan secara otomatis dalam bahasa yang mudah dimengerti oleh pelajar.

---

## 📍 Endpoint

`POST /explain`

---

## 📥 Request Body

Kirim data JSON dengan gambar dalam bentuk base64:

```json
{
  "imageBase64": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

### 📝 Body Parameters

| Field         | Type   | Required | Description                                        |
| ------------- | ------ | -------- | -------------------------------------------------- |
| `imageBase64` | string | ✅ Yes   | Data gambar dalam format base64 (`data:image/...`) |

> ❗ Harus menyertakan prefix `data:image/png;base64,...` atau `data:image/jpeg;base64,...`

---

## 📤 Response

### ✅ Success — `200 OK`

```json
{
  "message": "Whiteboard explanation successfully generated",
  "explanation": "The whiteboard shows a diagram explaining..."
}
```

### ❌ Client Error — `400 Bad Request`

```json
{
  "message": "Image data is required."
}
```

### ❌ Server Error — `500 Internal Server Error`

```json
{
  "message": "Failed to generate whiteboard explanation",
  "error": "Detailed error message from Gemini AI or server"
}
```

---

## 📦 Example Curl

```bash
curl -X POST http://localhost:3000/explain \
  -H "Content-Type: application/json" \
  -d '{"imageBase64": "data:image/png;base64,iVBORw0KGgoAAA..."}'
```

---

## 🛠 Tech Stack

- **Backend**: Express.js
- **AI**: Google Gemini 2.0 Flash (via `@google/generative-ai`)
- **Image Processing**: PNG/JPEG via base64

---

© 2025 TutorBoard AI — Collaborative Whiteboard Intelligence
