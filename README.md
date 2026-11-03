# 📖 TajwidEngine PRO 16 — Rule-Based Arabic Phonetic & Tajwid Parser

![JavaScript ES6+](https://img.shields.io/badge/JavaScript-ES6%2B-d4af37?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5 Canvas](https://img.shields.io/badge/HTML5-Audio_Visualizer-10b981?style=for-the-badge&logo=html5&logoColor=white)
![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero_(Pure_RegEx)-0284c7?style=for-the-badge)
![License MIT](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)

**TajwidEngine PRO 16** adalah instrumen web observatorium fonetik Al-Qur'an dan mesin pencari hukum tajwid modern berbasis **Regular Expressions (RegEx) Unicode** tingkat lanjut. Aplikasi ini mampu mendeteksi, mewarnai, dan menganalisis **16+ rumpun kaidah hukum tajwid** secara *real-time* di sisi klien (**100% Client-Side, Zero External API**), serta terintegrasi langsung dengan rekaman audio MP3 murottal asli dari para Qari dunia.

Dikembangkan oleh **[@fatur62](https://github.com/fatur62)**.

---

## ✨ Fitur Unggulan

1. **Mesin Parser RegEx 16+ Kaidah Tajwid:**
   * Menganalisis karakter Unicode bahasa Arab berharakat tanpa tabrakan DOM (*non-overlapping tokenizer*).
   * Meliputi rumpun Nun Sukun/Tanwin, Mim Sukun, Ghunnah, Alif Lam (Syamsiyah & Qamariyah), Qalqalah, Rumpun Mad (Mad Thabi'i, Wajib, Jaiz, Lazim, Layyin), hingga Lafadz Jalalah (Tafkhim & Tarqiq).
2. **Integrasi Audio Murottal Qari Dunia (CDN MP3):**
   * Memutar rekaman asli per ayat dari Qari terkenal melalui CDN global (*EveryAyah*).
   * Pilihan Qari: **Syaikh Mahmoud Khalil Al-Hussary (Muallim)**, **Mishary Rashid Alafasy**, **Abdul Basit Abdus Samad**, **Abdurrahman As-Sudais**, dan **Sa'ad Al-Ghamidi**.
3. **Live RegEx & Audio Sandbox:**
   * Pengguna dapat mengetik atau menempel (*paste*) ayat Al-Qur'an bebas ke dalam kotak teks untuk langsung diuji dan dianalisis hukum bacaannya.
4. **Inspektor Fonetik & Visualizer Audio:**
   * Panel interaktif untuk melihat penjelasan kaidah, cara membaca, pola RegEx Unicode, serta animasi gelombang frekuensi suara (*HTML5 Canvas* 60 FPS).
5. **Arsitektur Modular Bersih (Clean Architecture):**
   * Dibangun menggunakan struktur standar *ES6 Native Modules* tanpa ketergantungan *framework* atau *library* pihak ketiga.

---

## 📚 Daftar 16 Kaidah Hukum Tajwid yang Dideteksi

| Rumpun Hukum | Nama Kaidah Tajwid | Penjelasan / Indikator Deteksi |
| :--- | :--- | :--- |
| **Nun Sukun & Tanwin** | **Izhar Halqi** | Nun sukun / tanwin bertemu (ء هـ ع ح غ خ) |
| | **Idgham Bighunnah** | Nun sukun / tanwin bertemu (ي ن م و) |
| | **Idgham Bilaghunnah** | Nun sukun / tanwin bertemu (ل ر) |
| | **Iqlab** | Nun sukun / tanwin bertemu (ب) |
| | **Ikhfa Haqiqi** | Nun sukun / tanwin bertemu 15 huruf ikhfa |
| **Mim Sukun & Ghunnah** | **Ikhfa Syafawi** | Mim sukun bertemu (ب) |
| | **Idgham Mimi** | Mim sukun bertemu (م) |
| | **Izhar Syafawi** | Mim sukun bertemu selain Mim & Ba |
| | **Ghunnah Musyaddadah** | Nun atau Mim bertasydid (نّ / مّ) |
| **Alif Lam & Qalqalah** | **Alif Lam Syamsiyah** | Alif Lam bertemu huruf syamsiyah bertasydid |
| | **Alif Lam Qamariyah** | Alif Lam sukun bertemu huruf qamariyah |
| | **Qalqalah** | Huruf (ق ط ب ج د) berharakat sukun |
| **Mad & Lafadz Jalalah**| **Mad Lazim** | Mad bertemu huruf bertasydid (6 harakat) |
| | **Mad Wajib Muttashil** | Mad bertemu Hamzah dalam satu kata (4–5 harakat) |
| | **Mad Jaiz Munfashil** | Mad bertemu Hamzah di beda kata (4–5 harakat) |
| | **Mad Layyin (Lin)** | Wawu/Ya sukun didahului Fathah |
| | **Mad Thabi'i** | Bacaan panjang dasar 2 harakat |
| | **Lafadz Jalalah** | Lafadz Allah (Tafkhim tebal & Tarqiq tipis) |

---

## 📂 Struktur Direktori Repositori

```text
tajwid-regex-engine/
├── index.html   # Kerangka DOM, Selector Qari, Modal Docs, & Canvas Visualizer
├── style.css    # Tema Luxury Dark Emerald-Gold, Grid Layout, & Token Styling
├── engine.js    # Mesin Algoritma RegEx Unicode 16 Kaidah Tajwid (Non-Overlapping)
├── app.js       # Pengendali UI, Pemutar Audio Qari CDN, & Web Speech Fallback
└── README.md    # Dokumentasi Teknis Proyek
