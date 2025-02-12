# VOCASIA MSIB B7 DigiCar Rental Mobil

### How to install on localhost :
1. Git Clone repository ini.
2. Pergi ke dalam /backend dan jalankan npm install.
3. Pergi ke dalam /frontend dan jalankan npm install.
4. Cek /backend/env.example dan buat /backend/.env baru disitu isi sesuai dengan env.example.
5. Pergi ke /baclend/helper/midtrans.js disitu ada variabel serverKey dan clientKey ganti dengan key yang sesuai dengan akun midtrans anda, sebenarnya ini tidak aman sebaiknya ditambahkan lewat .env anda.
6. Hidupkan server mongoDB dan bila ingin menggunakan seeder pergin ke /backend dan jalankan npm run seed.
7. Untuk fitur pembayaran midtrans dan sekaligus fitur cek pembayaran yang bisa digunakan anda perlu menggunakan NGROK dan menjalankan ngrok http 3000 / sesuaikan dengan port backend.
8. Pada menu "URL notifikasi pembayaran", isi domainNgrok/api/auth/payment/notification, contoh nya seperti https://b966-114-79-23-253.ngrok-free.app/api/auth/payment/notification (ini untuk fitur notifikasi).
9. lalu pergi ke /backend jalankan npm run dev
10. lalu pergi ke frontend jalankan npm run dev
