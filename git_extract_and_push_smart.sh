
#!/bin/bash

ZIP_NAME="pojokanpay_final_project.zip"
PROJECT_DIR=~/pojokanpay

echo "===== Mengecek apakah file $ZIP_NAME ada ====="
if [ ! -f "$ZIP_NAME" ]; then
    echo "❌ File $ZIP_NAME tidak ditemukan di direktori saat ini!"
    echo "Silakan upload terlebih dahulu ke: $(pwd)"
    exit 1
fi

echo "✅ File ditemukan. Mengekstrak ke $PROJECT_DIR ..."
unzip -o $ZIP_NAME -d $PROJECT_DIR

cd $PROJECT_DIR || exit

echo "===== Menambahkan semua file ke Git ====="
git add .

echo "===== Commit perubahan ====="
git commit -m "Tambah semua isi modul backend lengkap (otomatis)" || echo "Tidak ada perubahan baru untuk di-commit."

echo "===== Menarik update terbaru dari GitHub (rebase) ====="
git pull --rebase origin main

echo "===== Push ke GitHub via SSH ====="
git push origin main
