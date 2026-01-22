# 📄 ScanApp — CamScanner-like Web Application

## Overview

ScanApp is a **CamScanner-style web application** that allows users to upload document images, automatically detect the document, enhance it, and view **before/after** results.

The project is built as a **full-stack prototype** with a strong focus on:
- Stability
- Clean architecture
- No third-party scanning / AI APIs
- Production-ready structure

This application demonstrates how a real document-scanning system can be built using **OpenCV**, **Node.js**, and **React**.

---

## 🚀 Key Features

- User authentication (Signup / Login)
- Upload up to **5 images at a time**
- Automatic document detection & perspective correction
- Document vs ID card classification
- Image enhancement
- Before / After comparison
- Download processed images
- Scan history (replay previous scans)
- Mobile-first responsive UI
- Cloud image storage

---

## 👤 User Flow

1. User opens the application
2. User signs up or logs in
3. User lands on the Dashboard
4. User uploads 1–5 document images
5. User clicks **Scan**
6. System processes images one by one
7. User sees **Before / After** results
8. User downloads processed images (optional)
9. User can visit **History** to view past scans

---

## 🔁 Data Flow (High Level)

1. **Frontend (React)**
   - User selects images
   - Images sent as `multipart/form-data`

2. **Backend (Node.js / Express)**
   - Auth middleware validates JWT
   - Multer stores images temporarily
   - Python OpenCV script is executed
   - Results returned as JSON

3. **Python (OpenCV)**
   - Image loaded from temp storage
   - Document detected via contours
   - Perspective warp applied
   - Image enhanced
   - Metadata returned (type, contrast)

4. **Cloud Storage**
   - Original and processed images uploaded
   - URLs returned to backend

5. **Database (MongoDB)**
   - Scan metadata stored
   - User scan history persisted

6. **Frontend**
   - Displays before/after images
   - Allows replay via history

---



## 🏗️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- JavaScript
- React Router

### Backend
- Node.js
- Express.js
- JWT Authentication
- Multer (file uploads)

### Image Processing
- Python
- OpenCV
- NumPy
- Pillow (PIL)

### Storage
- Cloudinary (image storage)
- MongoDB (scan metadata)

---

## 📁 Project Structure (Simplified)

```
frontend/
  ├── pages/
  ├── components/
  ├── api/
  ├── auth/
  └── routes/

backend/
  ├── src/
  │   ├── controllers/
  │   ├── routes/
  │   ├── services/
  │   ├── models/
  │   ├── middlewares/
  │   └── python/
  ├── uploads/
  └── server.js
```

---

## 🔐 Authentication

- JWT-based authentication
- Protected routes on both frontend and backend
- Tokens stored in browser localStorage
- Auth middleware validates every protected request

---

## ⚠️ Design Constraints

- ❌ No third-party scanning or AI APIs
- ❌ No OCR in current version
- ✅ Cloud storage allowed
- ✅ Local OpenCV processing only

---

## 📦 License

This project is licensed under the **MIT License**.

You are free to:
- Use
- Modify
- Distribute
- Commercialize

As long as the original license is included.

---
