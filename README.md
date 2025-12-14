# Library Management API

RESTful API untuk sistem manajemen perpustakaan yang mendukung autentikasi JWT, role-based access control (RBAC), dan relasi data menggunakan Prisma ORM.

## Features
- Register & Login pengguna
- JWT Authentication (Access Token & Refresh Token)
- Role-Based Access Control (ADMIN, USER)
- CRUD Buku (ADMIN)
- CRUD Kategori (ADMIN)
- Peminjaman Buku (USER)
- Prisma ORM dengan PostgreSQL
- Validasi request menggunakan Joi
- Middleware Authentication & Authorization

---

## Tech Stack
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JSON Web Token (JWT)
- bcrypt
- Joi
- dotenv

## Instalasi
- npm install
- npx prisma migrate dev
- npm run dev