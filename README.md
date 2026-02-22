## Before start you must set up the modules
npm init -y 

## Panduan database menggunakan dump sql

mysql -u root

CREATE DATABASE hmj; // jika belum ada

## Dump via Command Line (lebih cepat & fleksibel)

Buka Laragon → Menu → Terminal → MySQL Command Line (atau bisa pakai CMD/PowerShell).

Jalankan perintah berikut:

mysqldump -u root -p hmj > hmj.sql
