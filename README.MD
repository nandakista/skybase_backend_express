# Backend Express + Podman Setup Guide

## Prasyarat

Pastikan telah menginstal:

* Node.js (disarankan versi 22 LTS)
* npm
* Visual Studio Code
* Podman Desktop atau Podman CLI
* Git (opsional)

---

# 1. Membuka Project

Buka Visual Studio Code.

Jika project sudah ada:

```bash
cd nama-project
code .
```

Jika project belum ada:

```bash
mkdir nama-project
cd nama-project
code .
```

---

# 2. Inisialisasi Project Node.js

Jalankan:

```bash
npm init -y
```

Perintah tersebut akan membuat file:

```
package.json
```

---

# 3. Install Dependency

Contoh untuk Express + TypeScript.

### Dependency utama

```bash
npm install express
```

### Dependency development

```bash
npm install -D typescript @types/node @types/express ts-node nodemon
```

---

# 4. Inisialisasi TypeScript

```bash
npx tsc --init
```

Sesuaikan `tsconfig.json` sesuai kebutuhan project.

---

# 5. Struktur Project (Contoh)

```
project/
│
├── src/
│   ├── server.ts
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   └── repositories/
│
├── dist/
├── package.json
├── tsconfig.json
└── Dockerfile
```

---

# 6. Menjalankan Project

Development

```bash
npm run dev
```

Production

```bash
npm run build
npm start
```

---

# 7. Membuat Dockerfile

Buat file bernama:

```
Dockerfile
```

Isi:

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["node", "dist/server.js"]
```

---

# 8. Build Image Podman

Masuk ke folder project.

```bash
cd nama-project
```

Build image:

```bash
podman build -t nama-image .
```

Contoh:

```bash
podman build -t japfa-backend .
```

Apabila berhasil akan muncul pesan:

```
Successfully tagged localhost/japfa-backend:latest
```

---

# 9. Melihat Daftar Image

```bash
podman images
```

Contoh:

```
REPOSITORY                 TAG       IMAGE ID
localhost/japfa-backend    latest    xxxxxxxxxxxx
```

---

# 10. Menjalankan Container

```bash
podman run -d \
  --name japfa-backend \
  -p 3001:3001 \
  localhost/japfa-backend:latest
```

Melihat container yang sedang berjalan:

```bash
podman ps
```

Melihat seluruh container:

```bash
podman ps -a
```

---

# 11. Melihat Log Container

```bash
podman logs japfa-backend
```

---

# 12. Masuk ke Dalam Container

Karena image menggunakan Alpine Linux:

```bash
podman exec -it japfa-backend sh
```

---

# 13. Menghentikan Container

```bash
podman stop japfa-backend
```

---

# 14. Menghapus Container

```bash
podman rm japfa-backend
```

Jika container masih berjalan:

```bash
podman rm -f japfa-backend
```

---

# 15. Menghapus Image

Menghapus berdasarkan nama:

```bash
podman rmi localhost/japfa-backend:latest
```

atau

```bash
podman image rm localhost/japfa-backend:latest
```

Menghapus berdasarkan Image ID:

```bash
podman rmi <IMAGE_ID>
```

---

# 16. Menghapus Semua Image

```bash
podman rmi -a
```

---

# 17. Menghapus Image yang Tidak Digunakan

```bash
podman image prune
```

Tanpa konfirmasi:

```bash
podman image prune -f
```

---

# 18. Export Image Menjadi File

Jika image akan dikirim ke tim Infrastruktur:

```bash
podman save -o japfa-backend.tar localhost/japfa-backend:latest
```

Akan menghasilkan file:

```
japfa-backend.tar
```

---

# 19. Import Image

Di server tujuan:

```bash
podman load -i japfa-backend.tar
```

atau

```bash
docker load -i japfa-backend.tar
```

---

# 20. Membersihkan Seluruh Podman

Menghapus seluruh container, image, volume, dan network:

```bash
podman system reset
```

Gunakan dengan hati-hati karena seluruh data Podman akan dihapus.

---

# 20. Buat JWT_Secret

Untuk membuat JWT Secret sebagai identifier pada .env dapat jalankan:

```bash
openssl rand -hex 32
```

Gunakan dengan hati-hati karena seluruh data Podman akan dihapus.

---

# Ringkasan Perintah

| Perintah                       | Fungsi                               |
| ------------------------------ | ------------------------------------ |
| `npm init -y`                  | Membuat project Node.js              |
| `npm install`                  | Menginstal dependency                |
| `npm run build`                | Build TypeScript                     |
| `podman build -t nama-image .` | Build image                          |
| `podman images`                | Melihat image                        |
| `podman run ...`               | Menjalankan container                |
| `podman ps`                    | Melihat container aktif              |
| `podman logs`                  | Melihat log                          |
| `podman stop`                  | Menghentikan container               |
| `podman rm`                    | Menghapus container                  |
| `podman rmi`                   | Menghapus image                      |
| `podman image prune`           | Menghapus image yang tidak digunakan |
| `podman save`                  | Export image ke file `.tar`          |
| `podman load`                  | Import image                         |
| `podman system reset`          | Menghapus seluruh data Podman        |
