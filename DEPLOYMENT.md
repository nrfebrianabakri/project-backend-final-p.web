Program ini dijalankan secara lokal menggunakan Node.js, Express.js, PostgreSQL, dan Prisma ORM dengan tujuan memastikan sistem dapat berjalan dengan baik sebelum digunakan atau dikembangkan lebih lanjut.
Deployment dilakukan dalam lingkungan local development (localhost).

Adapun lingkungan dan teknologi yang digunakan pada proses deployment adalah sebagai berikut:
- Runtime: Node.js
- Framework Backend: Express.js
- Database: PostgreSQL
- ORM: Prisma
- Authentication: JWT (JSON Web Token)
- Package Manager: npm
- Operating System: macOS / Windows / Linux
- Environment Configuration: dotenv (.env)

Sebelum menjalankan aplikasi, dilakukan konfigurasi environment variable melalui file .env.
File ini berisi konfigurasi penting yang dibutuhkan aplikasi, antara lain:

NODE_ENV=development
PORT=3000
DATABASE_URL="postgresql://username@localhost:5432/library_db"
JWT_SECRET=super-secret-key-min-32-char
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=super-refresh-secret-key-min-32-char
JWT_REFRESH_EXPIRES_IN=7d

File .env tidak disertakan ke dalam version control dan hanya digunakan secara lokal.
Sebagai gantinya, disediakan file .env.example sebagai template konfigurasi.

Setelah repository berhasil di-clone, langkah berikutnya adalah menginstal seluruh dependensi yang dibutuhkan dengan perintah npm install
Perintah ini akan mengunduh seluruh library yang terdaftar pada file package.json.

Aplikasi ini menggunakan Prisma sebagai ORM.
Sebelum server dijalankan, dilakukan migrasi database untuk menyesuaikan struktur tabel dengan schema Prisma: npx prisma migrate dev
Perintah ini akan membuat tabel database sesuai schema dan menyinkronkan struktur database dengan Prisma Client

Setelah seluruh konfigurasi dan migrasi selesai, aplikasi dijalankan menggunakan perintah npm run dev
Server akan berjalan pada alamat http://localhost:3000. Endpoint API dapat diakses melalui prefix http://localhost:3000/api

Setelah server berjalan, pengujian API dilakukan menggunakan tools seperti Postman
Pengujian meliputi:
- Autentikasi (register, login, refresh token)
- Manajemen buku dan kategori
- Proses peminjaman buku (loan)
- Role-based access control (ADMIN dan USER)