DEPLOYMENT
1. Repo Github: https://github.com/nrfebrianabakri/project-backend-final-p.web 
2. Production URL:
Base URL: http://52.23.111.229/api/ 
Health check URL: http://52.23.111.229/api/ 
3. Detail AWS EC2:
Instance ID: i-045b01812e7fe45df 
Type: t2.micro
Public IPv4 (Elastic Ip) Address: 52.23.111.229
Private IPv4 (Elastic Ip) Address: 172.31.22.78
Region: us-east-1
OS: Ubuntu 22.04 LTS
4. Langkah Deployment:
    Lingkungan dan teknologi yang digunakan
Runtime: Node.js
Framework Backend: Express.js
Database: PostgreSQL
ORM: Prisma
Authentication: JWT (JSON Web Token)
Package Manager: npm
Operating System: macOS / Windows / Linux (untuk lokal), Ubuntu 22.04 (production)
Environment Configuration: dotenv (.env)
	Deployment Lokal (Local Development):
Clone repository
Buat file .env berdasarkan template .env.example
Install dependencies: npm install
Migrasi database: npx prisma migrate dev
Jalankan aplikasi: npm run dev
Server berjalan di: http://localhost:3000, Endpoint API: http://localhost:3000/api
Pengujian API (misal menggunakan Postman):
Autentikasi: register, login, refresh token
Manajemen buku dan kategori
Proses peminjaman buku (loan)
Role-based access control (ADMIN & USER)
Konfigurasi Environment

	Deployment Production
Melakukan clone repository di server
Membuat file .env berdasarkan template
Menginstall dependencies: npm install
Melakukan migrasi database (production): npx prisma migrate deploy
Menjalankan aplikasi dengan PM2:
pm2 start src/server.js --name library-api
pm2 save
pm2 status
Melakukan konfigurasi Nginx sebagai reverse proxy:
Test dan reload Nginx:
sudo nginx -t
sudo systemctl reload nginx
Melakukan verifikasi Deployment:
curl http://52.23.111.229/api/ (untuk cek health)
5. Konfigurasi Environment
Aplikasi menggunakan file .env untuk menyimpan variabel lingkungan yang dibutuhkan. Variabel-variabel ini mencakup NODE_ENV, PORT, DATABASE_URL, JWT_SECRET, JWT_EXPIRES_IN, JWT_REFRESH_SECRET, dan JWT_REFRESH_EXPIRES_IN. File .env tidak disertakan dalam version control, sehingga pengguna dapat menyesuaikan nilai variabel sesuai kebutuhan lingkungan lokal maupun production. Sebagai gantinya, disediakan file .env.example sebagai template.
6. Setup Database
Struktur database dikelola menggunakan Prisma ORM. Untuk membuat atau memperbarui tabel sesuai schema Prisma, jalankan perintah npx prisma migrate dev pada lingkungan development dan npx prisma migrate deploy pada production. Perintah ini akan memastikan semua tabel dan relasi database sesuai dengan definisi schema, serta membuat Prisma Client siap digunakan oleh aplikasi.
7. Application Start
Pada production server, aplikasi dijalankan menggunakan PM2 agar tetap berjalan di background dan otomatis restart saat server reboot. Perintah yang digunakan antara lain:
pm2 start src/server.js --name library-api
pm2 save
pm2 status
Perintah pm2 save menyimpan konfigurasi agar PM2 otomatis menjalankan aplikasi saat server restart, sedangkan pm2 status dapat digunakan untuk memantau status proses.
8. Konfigurasi Nginx
Jika menggunakan Nginx sebagai reverse proxy, pastikan konfigurasi location /api/ mengarah ke http://localhost:3000/ dan semua header yang diperlukan sudah di-set. Setelah konfigurasi selesai, lakukan pengecekan sintaks dan reload Nginx dengan:
sudo nginx -t
sudo systemctl reload nginx
Hal ini memastikan request dari public IP akan diteruskan ke aplikasi Node.js secara benar.
9. Langkah Verifikasi
Setelah deployment, verifikasi dapat dilakukan dengan mengakses Base URL dan Health Check URL melalui browser atau tools seperti curl dan Postman. Contoh:
curl http://52.23.111.229/api/ (untuk health)
curl http://52.23.111.229/api/auth/login (untuk login)
curl http://52.23.111.229/api/auth/me (untuk melihat informasi akun)
curl http://52.23.111.229/api/auth/refresh (untuk refresh token)
curl http://52.23.111.229/api/auth/register (untuk registrasi)
curl http://52.23.111.229/api/books (untuk manajemen buku)
curl http://52.23.111.229/api/categories (untuk manajemen kategori)
curl http://52.23.111.229/api/auth/loans (untuk peminjaman buku)

Semua endpoint dapat merespon dengan status yang sesuai (misal 200 OK) dan data API tampil seperti di development.
10. Troubleshooting
Beberapa masalah umum yang mungkin muncul antara lain:
Port 3000 tidak dapat diakses: Untuk memastikan firewall atau security group AWS mengizinkan inbound pada port yang digunakan.
PM2 tidak menjalankan aplikasi: Untuk memeriksa path file server (src/server.js) dan environment variable. pm2 logs library-api untuk saya gunakan melihat error.
Nginx menampilkan 404: Periksa konfigurasi location dan pastikan proxy_pass mengarah ke port Node.js yang benar.
11. Monitoring
Monitoring aplikasi dapat dilakukan melalui PM2 dan log file dengan:
pm2 status (melihat status semua proses)
pm2 logs library-api (melihat output dan error logs)
Log ini akan membantu mendeteksi error runtime, performa, atau masalah koneksi database.
12. Maintenance
Untuk melakukan update aplikasi, pertama-tama tarik update terbaru dari repository dengan perintah git pull origin main. Selanjutnya, perbarui seluruh dependencies yang dibutuhkan menggunakan npm install. Jika terdapat perubahan pada struktur database, jalankan migrasi schema dengan npx prisma migrate deploy. Setelah semua langkah tersebut selesai, restart aplikasi yang dijalankan melalui PM2 dengan perintah pm2 restart library-api agar update diterapkan. Selalu pastikan environment variable dan konfigurasi Nginx tetap sesuai setelah update agar aplikasi berjalan dengan baik.


