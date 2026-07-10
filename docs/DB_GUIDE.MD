# DATABASE.README.md

# Database Guide

Dokumen ini berisi panduan penggunaan database pada project ini, mulai dari inisialisasi PostgreSQL, konfigurasi environment, migration, seeding, hingga rollback.

---

# Tech Stack

* PostgreSQL
* Knex.js
* TypeScript
* dotenv

---

# Requirements

* PostgreSQL telah terinstall.
* Node.js telah terinstall.
* Database sudah dibuat.

Contoh database:

```sql
CREATE DATABASE japfa_backend;
```

---

# Environment

Buat file `.env`

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=japfa_backend
DB_USER=postgres
DB_PASSWORD=password

JWT_SECRET=your-super-secret-key
```

Keterangan:

| Variable    | Description          |
| ----------- | -------------------- |
| DB_HOST     | Host PostgreSQL      |
| DB_PORT     | Port PostgreSQL      |
| DB_NAME     | Nama database        |
| DB_USER     | Username PostgreSQL  |
| DB_PASSWORD | Password PostgreSQL  |
| JWT_SECRET  | Secret key untuk JWT |

---

# Install Dependency

```bash
npm install
```

---

# Migration

## Membuat Migration Baru

```bash
npm run make:migration -- create_products_table
```

Contoh hasil:

```
20260706123000_create_products_table.ts
```

Migration akan dibuat pada:

```
src/database/migrations
```

---

## Menjalankan Migration

```bash
npm run migrate
```

---

## Rollback Migration Terakhir

```bash
npm run rollback
```

---

# Seeder

Seeder digunakan untuk mengisi data awal.

Contoh:

* Roles
* Users
* Master Data

---

## Membuat Seeder Baru

```bash
npm run make:seed -- 001_roles
```

atau

```bash
npm run make:seed -- 002_users
```

Seeder akan dibuat pada

```
src/database/seeds
```

---

## Menjalankan Seeder

```bash
npm run seed
```

---

# Urutan Seeder

Seeder dijalankan berdasarkan nama file.

Disarankan menggunakan prefix angka.

Contoh:

```
001_roles.ts
002_users.ts
003_categories.ts
004_products.ts
```

Jangan menggunakan nama seperti

```
roles.ts
users.ts
```

karena urutan eksekusinya hanya berdasarkan alfabet.

---

# Migration vs Seeder

## Migration

Digunakan untuk mengubah struktur database.

Contoh:

* membuat table
* menambah column
* mengubah column
* membuat foreign key
* membuat index

Migration memiliki timestamp sehingga urutannya otomatis.

---

## Seeder

Digunakan untuk mengisi data awal.

Contoh:

* Roles
* Administrator
* Master Data
* Dummy Data

Seeder tidak memiliki timestamp sehingga urutannya ditentukan oleh nama file.

---

# Soft Delete

Project ini menggunakan soft delete.

Setiap table yang mendukung soft delete memiliki column

```
deleted_at
```

Untuk mengambil data aktif gunakan

```sql
WHERE deleted_at IS NULL
```

---

# Timestamp

Setiap table memiliki

```
created_at
updated_at
```

yang dibuat menggunakan

```ts
table.timestamps(true, true);
```

---

# Foreign Key

Contoh

```
users.role_id
```

mereferensikan

```
roles.id
```

dengan

```ts
.onUpdate("CASCADE")
.onDelete("RESTRICT")
```

Arti:

* CASCADE → jika primary key berubah maka foreign key ikut berubah.
* RESTRICT → data parent tidak dapat dihapus apabila masih digunakan.

---

# Roles

Master data role:

| ID | Role        |
| -- | ----------- |
| 1  | super_admin |
| 2  | admin       |
| 3  | maintainer  |
| 4  | user        |
| 5  | guest       |

---

# Default User

Seeder membuat akun administrator.

Email

```
admin@example.com
```

Password

```
admin123
```

---

# Database Connection Test

Untuk memastikan koneksi berhasil.

```ts
await db.raw("SELECT 1");
```

atau

```ts
await db.raw("SELECT current_database()");
```

---

# PostgreSQL

Masuk ke PostgreSQL

```bash
psql -U postgres
```

Masuk ke database tertentu

```bash
psql -U postgres -d japfa_backend
```

Melihat daftar database

```sql
\l
```

Melihat seluruh table

```sql
\dt
```

Melihat struktur table

```sql
\d users
```

Keluar dari PostgreSQL

```sql
\q
```

---

# DBeaver

Apabila migration atau seeder berhasil tetapi table tidak muncul:

1. Pastikan koneksi mengarah ke database yang benar.
2. Refresh schema (`F5` atau klik kanan → Refresh).
3. Pastikan schema yang digunakan adalah `public`.
4. Jalankan:

```sql
SELECT current_database();
```

untuk memastikan database yang sedang dibuka.

---

# Best Practice

* Jangan mengubah migration yang sudah digunakan di environment bersama.
* Gunakan migration baru untuk setiap perubahan struktur database.
* Gunakan foreign key untuk menjaga integritas data.
* Hindari hard delete jika data masih diperlukan sebagai histori.
* Gunakan `deleted_at` untuk soft delete.
* Simpan seluruh konfigurasi database di `.env`.
* Jangan menyimpan password database ataupun `JWT_SECRET` ke repository Git.
* Gunakan nama migration yang jelas, misalnya `create_users_table`, `add_role_id_to_users`, atau `create_products_table`.
* Gunakan penomoran pada seed (`001_`, `002_`, dst.) agar urutan eksekusi konsisten.

---

# Project Structure

```
src
└── database
    ├── migrations
    ├── seeds
    └── database.ts
```
