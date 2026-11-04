import { TajwidEngine } from "./engine.js";

// Pemetaan Contoh Tiap Hukum ke Rekaman MP3 Qari Dunia (EveryAyah CDN)
const RULE_AUDIO_EXAMPLES = {
  IZHAR_HALQI: {
    text: "وَآمَنَهُمْ مِنْ خَوْفٍ",
    latin: "QS. Quraisy [106]: 4 — Contoh Izhar Halqi: Nun Sukun bertemu Kha (مِنْ خَوْفٍ)",
    surah: 106,
    ayah: 4
  },
  IDGHAM_BIGHUNNAH: {
    text: "فَمَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ",
    latin: "QS. Az-Zalzalah [99]: 7 — Contoh Idgham Bighunnah (فَمَنْ يَعْمَلْ & خَيْرًا يَرَهُ)",
    surah: 99,
    ayah: 7
  },
  IDGHAM_BILAGHUNNAH: {
    text: "وَيْلٌ لِكُلِّ هُمَزَةٍ لُمَزَةٍ",
    latin: "QS. Al-Humazah [104]: 1 — Contoh Idgham Bilaghunnah (وَيْلٌ لِكُلِّ)",
    surah: 104,
    ayah: 1
  },
  IQLAB: {
    text: "كَلَّا لَيُنْبَذَنَّ فِي الْحُطَمَةِ",
    latin: "QS. Al-Humazah [104]: 4 — Contoh Iqlab: Nun Sukun bertemu Ba (لَيُنْبَذَنَّ)",
    surah: 104,
    ayah: 4
  },
  IKHFA: {
    text: "مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",
    latin: "QS. An-Nas [114]: 4 — Contoh Ikhfa Haqiqi: Nun Sukun bertemu Syin (مِنْ شَرِّ)",
    surah: 114,
    ayah: 4
  },
  IKHFA_SYAFAWI: {
    text: "تَرْمِيهِمْ بِحِجَارَةٍ مِنْ سِجِّيلٍ",
    latin: "QS. Al-Fil [105]: 4 — Contoh Ikhfa Syafawi: Mim Sukun bertemu Ba (تَرْمِيهِمْ بِحِجَارَةٍ)",
    surah: 105,
    ayah: 4
  },
  IDGHAM_MIMI: {
    text: "الَّذِي أَطْعَمَهُمْ مِنْ جُوعٍ",
    latin: "QS. Quraisy [106]: 4 — Contoh Idgham Mimi: Mim Sukun bertemu Mim (أَطْعَمَهُمْ مِنْ)",
    surah: 106,
    ayah: 4
  },
  IZHAR_SYAFAWI: {
    text: "أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ",
    latin: "QS. Al-Insyirah [94]: 1 — Contoh Izhar Syafawi: Mim Sukun bertemu Nun (أَلَمْ نَشْرَحْ)",
    surah: 94,
    ayah: 1
  },
  GHUNNAH: {
    text: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ",
    latin: "QS. Al-Kautsar [108]: 1 — Contoh Ghunnah Musyaddadah (إِنَّا)",
    surah: 108,
    ayah: 1
  },
  AL_SYAMSIYAH: {
    text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    latin: "QS. Al-Fatihah [1]: 1 — Contoh Alif Lam Syamsiyah (الرَّحْمَٰنِ الرَّحِيمِ)",
    surah: 1,
    ayah: 1
  },
  AL_QAMARIYAH: {
    text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    latin: "QS. Al-Fatihah [1]: 2 — Contoh Alif Lam Qamariyah (الْحَمْدُ & الْعَالَمِينَ)",
    surah: 1,
    ayah: 2
  },
  QALQALAH: {
    text: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
    latin: "QS. Al-Ikhlas [112]: 3 — Contoh Qalqalah Dal Sukun (يَلِدْ & يُولَدْ)",
    surah: 112,
    ayah: 3
  },
  MAD_LAZIM: {
    text: "غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّآلِّينَ",
    latin: "QS. Al-Fatihah [1]: 7 — Contoh Mad Lazim Mutsaqqal Kalimi 6 Harakat (الضَّآلِّينَ)",
    surah: 1,
    ayah: 7
  },
  MAD_WAJIB: {
    text: "إِذَا جَآءَ نَصْرُ اللَّهِ وَالْفَتْحُ",
    latin: "QS. An-Nashr [110]: 1 — Contoh Mad Wajib Muttashil 4–5 Harakat (جَآءَ)",
    surah: 110,
    ayah: 1
  },
  MAD_JAIZ: {
    text: "إِنَّآ أَعْطَيْنَاكَ الْكَوْثَرَ",
    latin: "QS. Al-Kautsar [108]: 1 — Contoh Mad Jaiz Munfashil (إِنَّآ أَعْطَيْنَاكَ)",
    surah: 108,
    ayah: 1
  },
  LAFADZ_JALALAH: {
    text: "قُلْ هُوَ اللَّهُ أَحَدٌ",
    latin: "QS. Al-Ikhlas [112]: 1 — Contoh Lafadz Jalalah Tafkhim (هُوَ اللَّهُ)",
    surah: 112,
    ayah: 1
  },
  MAD_LAYYIN: {
    text: "لِإِيلَافِ قُرَيْشٍ",
    latin: "QS. Quraisy [106]: 1 — Contoh Mad Layyin / Lin: Fathah bertemu Ya Sukun (قُرَيْشٍ)",
    surah: 106,
    ayah: 1
  },
  MAD_THABII: {
    text: "مَالِكِ يَوْمِ الدِّينِ",
    latin: "QS. Al-Fatihah [1]: 4 — Contoh Mad Thabi'i 2 Harakat (مَالِكِ)",
    surah: 1,
    ayah: 4
  }
};

// 6 Paket Sampel Komprehensif yang Mencakup Seluruh 16+ Kaidah Tajwid
const SAMPLE_DATA = [
  {
    id: "S1",
    title: "Sampel 1 — QS. Az-Zalzalah: 7 (Idgham Bighunnah, Izhar Halqi & Qalqalah)",
    arabic: "فَمَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ",
    translation: "Memuat Idgham Bighunnah (فَمَنْ يَعْمَلْ & خَيْرًا يَرَهُ), Izhar Halqi pada Tanwin bertemu Kha (ذَرَّةٍ خَيْرًا), serta Mad Thabi'i (مِثْقَالَ).",
    surah: 99,
    ayah: 7
  },
  {
    id: "S2",
    title: "Sampel 2 — QS. Al-Fil: 4 & Al-Humazah: 4 (Ikhfa Syafawi, Iqlab & Ikhfa Haqiqi)",
    arabic: "تَرْمِيهِمْ بِحِجَارَةٍ مِنْ سِجِّيلٍ ۞ كَلَّا لَيُنْبَذَنَّ فِي الْحُطَمَةِ",
    translation: "Memuat Ikhfa Syafawi (تَرْمِيهِمْ بِحِجَارَةٍ), Idgham Bighunnah (بِحِجَارَةٍ مِنْ), Ikhfa Haqiqi (مِنْ سِجِّيلٍ), Iqlab & Ghunnah (لَيُنْبَذَنَّ), serta Alif Lam Qamariyah (الْحُطَمَةِ).",
    surah: 105,
    ayah: 4
  },
  {
    id: "S3",
    title: "Sampel 3 — QS. Al-Insyirah: 1–2 (Izhar Syafawi, Qalqalah & Ikhfa)",
    arabic: "أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ ۞ وَوَضَعْنَا عَنْكَ وِزْرَكَ",
    translation: "Memuat Izhar Syafawi (أَلَمْ نَشْرَحْ), Qalqalah Sugra pada Dal Sukun (صَدْرَكَ), dan Ikhfa Haqiqi pada Nun Sukun bertemu Kaf (عَنْكَ).",
    surah: 94,
    ayah: 1
  },
  {
    id: "S4",
    title: "Sampel 4 — QS. Al-Fatihah: 7 & An-Nashr: 1 (Mad Lazim, Mad Wajib & Alif Lam)",
    arabic: "إِذَا جَآءَ نَصْرُ اللَّهِ وَالْفَتْحُ ۞ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّآلِّينَ",
    translation: "Memuat Mad Wajib Muttashil (جَآءَ), Lafadz Jalalah (اللَّهِ), Alif Lam Qamariyah (وَالْفَتْحُ & الْمَغْضُوبِ), Alif Lam Syamsiyah & Mad Lazim 6 Harakat (الضَّآلِّينَ).",
    surah: 1,
    ayah: 7
  },
  {
    id: "S5",
    title: "Sampel 5 — QS. Quraisy: 4 (Idgham Mimi, Izhar Halqi & Mad Layyin)",
    arabic: "الَّذِيٓ أَطْعَمَهُمْ مِنْ جُوعٍ وَآمَنَهُمْ مِنْ خَوْفٍ",
    translation: "Memuat Mad Jaiz Munfashil (الَّذِيٓ أَطْعَمَهُمْ), Qalqalah (أَطْعَمَهُمْ), Idgham Mimi (أَطْعَمَهُمْ مِنْ), Ikhfa Haqiqi (مِنْ جُوعٍ), Izhar Halqi (مِنْ خَوْفٍ), dan Mad Layyin (خَوْفٍ).",
    surah: 106,
    ayah: 4
  },
  {
    id: "S6",
    title: "Sampel 6 — QS. Al-Ikhlas: 1–3 (Lafadz Jalalah, Alif Lam Syamsiyah & Qalqalah)",
    arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ۞ قُلْ هُوَ اللَّهُ أَحَدٌ ۞ اللَّهُ الصَّمَدُ ۞ لَمْ يَلِدْ وَلَمْ يُولَدْ",
    translation: "Memuat Lafadz Jalalah Tarqiq (بِسْمِ اللَّهِ) & Tafkhim (هُوَ اللَّهُ), Alif Lam Syamsiyah (الرَّحْمَٰنِ & الصَّمَدُ), Izhar Syafawi (لَمْ يَلِدْ), dan Qalqalah (يَلِدْ & يُولَدْ).",
    surah: 112,
    ayah: 1
  }
];

const DOCS_DATA = {
  readme: {
    filename: "README.md",
    content: `📖 Manual Penggunaan — TajwidEngine PRO 16 (World Qari Audio & Complete RegEx Edition)

TajwidEngine PRO 16 adalah instrumen analisis fonetik Al-Qur'an dan mesin pencari hukum tajwid berbasis Regular Expressions (RegEx) Unicode yang mendeteksi 18 kategori kaidah tajwid (16 rumpun utama) secara real-time, dilengkapi integrasi rekaman MP3 asli dari 5 Qari terkemuka dunia.

---

### 1. Daftar Lengkap Kaidah Hukum Tajwid yang Dideteksi
Aplikasi ini menganalisis dan mewarnai teks Arab secara otomatis untuk 4 rumpun besar ilmu tajwid:

A. Rumpun Nun Sukun (نْ) & Tanwin (ـً ـٍ ـٌ):
   1. Izhar Halqi — Bertemu 6 huruf tenggorokan (ء هـ ع ح غ خ), dibaca jelas.
   2. Idgham Bighunnah — Bertemu huruf (ي ن م و), dilebur dengan dengung 2 harakat.
   3. Idgham Bilaghunnah — Bertemu huruf Lam (ل) atau Ra (ر), dilebur tanpa dengung.
   4. Iqlab — Bertemu huruf Ba (ب), bunyi berubah menjadi Mim samar disertai dengung.
   5. Ikhfa Haqiqi — Bertemu 15 huruf Ikhfa, dibaca samar dengan dengung 2 harakat.

B. Rumpun Mim Sukun (مْ) & Ghunnah:
   6. Ikhfa Syafawi — Mim Sukun bertemu Ba (ب), disamarkan di bibir dengan dengung.
   7. Idgham Mimi (Mutamatsilain) — Mim Sukun bertemu Mim (م), dilebur dengan dengung.
   8. Izhar Syafawi — Mim Sukun bertemu huruf selain Mim dan Ba, dibaca jelas di bibir.
   9. Ghunnah Musyaddadah — Huruf Nun atau Mim bertasydid (نّ / مّ), wajib berdengung 2 harakat.

C. Rumpun Alif Lam (ال) & Qalqalah:
   10. Alif Lam Syamsiyah — Alif Lam bertemu 14 huruf Syamsiyah bertasydid (Lam melebur).
   11. Alif Lam Qamariyah — Alif Lam Sukun (الْ) bertemu 14 huruf Qamariyah (Lam dibaca jelas).
   12. Qalqalah — Huruf (ق ط ب ج د) berharakat sukun yang dibaca memantul.

D. Rumpun Hukum Mad & Lafadz Jalalah:
   13. Mad Lazim — Mad bertemu huruf bertasydid dalam satu kata (panjang 6 harakat).
   14. Mad Wajib Muttashil — Mad bertemu Hamzah (ء) dalam satu kata (4–5 harakat).
   15. Mad Jaiz Munfashil — Mad bertemu Hamzah (أ/إ) di kata berbeda (4–5 harakat).
   16. Mad Layyin (Lin) — Wawu/Ya Sukun didahului huruf berharakat Fathah (ـَوْ / ـَيْ).
   17. Mad Thabi'i (Asli) — Bacaan panjang dasar 2 harakat.
   18. Lafadz Jalalah (اللَّه) — Deteksi lafadz Allah (Tafkhim/tebal dan Tarqiq/tipis).

---

### 2. Cara Memilih Qari & Mendengarkan Audio Murottal Asli
1. Buka menu dropdown "Pilih Qari Dunia (MP3 Asli)" di bagian atas:
   - Syaikh Mahmoud Khalil Al-Hussary (Versi Muallim / Standar Guru Tajwid)
   - Syaikh Mishary Rashid Alafasy
   - Syaikh Abdul Basit Abdus Samad
   - Syaikh Abdurrahman As-Sudais
   - Syaikh Sa'ad Al-Ghamidi
2. Ketuk tombol "🔊 Qari" pada salah satu kotak di Katalog Hukum Tajwid untuk mendengarkan rekaman ayat Al-Qur'an yang menjadi contoh hukum tersebut.
3. Ketuk tombol "🔊 Putar Qari" di sudut kanan atas setiap kartu sampel ayat.
4. Ketuk potongan huruf Arab yang berwarna untuk melihat bedah rumus RegEx-nya di panel Inspektor kanan sekaligus memutar suaranya.

---

### 3. Menggunakan Live RegEx Sandbox (Uji Teks Arab Sendiri)
1. Tempelkan (paste) ayat atau kalimat bahasa Arab berharakat lengkap ke dalam kotak "Live RegEx & Audio Sandbox".
2. Ketuk tombol emas "⚡ Analisis 16 Hukum Tajwid".
3. Seluruh hukum bacaan pada teks Anda akan langsung diwarnai dan dihitung statistiknya secara otomatis.

📧 Kontak Developer: fatur62@gmail.com`
  },
  license: {
    filename: "LICENSE",
    content: `MIT License

Copyright (c) 2026 fatur62 (fatur62@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`
  }
};

class TajwidApp {
  constructor() {
    this.state = {
      activeItems: [...SAMPLE_DATA],
      filterRule: "ALL",
      searchKeyword: "",
      activeDocKey: "readme",
      selectedQari: "Husary_Muallim_128kbps",
      currentAudio: null,
      isPlayingAudio: false,
      animFrameId: null,
      wavePhase: 0
    };

    this.el = {
      selectQari: document.getElementById("select-qari"),
      presetSample: document.getElementById("preset-sample"),
      customArabic: document.getElementById("custom-arabic"),
      btnParseCustom: document.getElementById("btn-parse-custom"),
      btnResetCustom: document.getElementById("btn-reset-custom"),
      searchText: document.getElementById("search-text"),
      filterRule: document.getElementById("filter-rule"),
      matchCounter: document.getElementById("match-counter"),
      legendGrid: document.getElementById("legend-grid"),
      arabicResults: document.getElementById("arabic-results"),
      inspectorContent: document.getElementById("inspector-content"),
      audioStatusBadge: document.getElementById("audio-status-badge"),
      audioCanvas: document.getElementById("audio-canvas"),

      btnOpenDocs: document.getElementById("btn-open-docs"),
      modalDocs: document.getElementById("modal-docs"),
      btnCloseDocs: document.getElementById("btn-close-docs"),
      tabReadme: document.getElementById("tab-readme"),
      tabLicense: document.getElementById("tab-license"),
      docFilename: document.getElementById("doc-filename"),
      docViewer: document.getElementById("doc-viewer"),
      btnCopyDoc: document.getElementById("btn-copy-doc")
    };
  }

  init() {
    this.bindEvents();
    this.renderDocContent("readme");
    this.drawIdleWaveform();
    this.renderAll();
  }

  bindEvents() {
    this.el.selectQari.addEventListener("change", (e) => {
      this.state.selectedQari = e.target.value;
      if (this.state.isPlayingAudio) {
        this.stopAudio();
      }
    });

    this.el.presetSample.addEventListener("change", (e) => {
      const val = e.target.value;
      this.state.activeItems = val === "all"
        ? [...SAMPLE_DATA]
        : SAMPLE_DATA.filter((item) => item.id === val);
      this.renderAll();
    });

    this.el.btnParseCustom.addEventListener("click", () => {
      const rawText = this.el.customArabic.value.trim();
      if (!rawText) {
        alert("Masukkan teks bahasa Arab berharakat terlebih dahulu.");
        return;
      }
      this.state.activeItems = [
        {
          id: "CUSTOM",
          title: "Hasil Analisis Teks Kustom (Live Sandbox)",
          arabic: rawText,
          translation: "Teks kustom yang dianalisis dengan 16+ kaidah hukum tajwid secara real-time.",
          surah: null,
          ayah: null
        }
      ];
      this.renderAll();
    });

    this.el.btnResetCustom.addEventListener("click", () => {
      this.stopAudio();
      this.el.customArabic.value = "";
      this.el.presetSample.value = "all";
      this.state.activeItems = [...SAMPLE_DATA];
      this.state.filterRule = "ALL";
      this.el.filterRule.value = "ALL";
      this.el.searchText.value = "";
      this.state.searchKeyword = "";
      this.renderAll();
    });

    this.el.searchText.addEventListener("input", (e) => {
      this.state.searchKeyword = e.target.value.trim().toLowerCase();
      this.renderAll();
    });

    this.el.filterRule.addEventListener("change", (e) => {
      this.state.filterRule = e.target.value;
      this.renderAll();
    });

    this.el.btnOpenDocs.addEventListener("click", () => {
      this.renderDocContent("readme");
      this.el.modalDocs.showModal();
    });

    this.el.btnCloseDocs.addEventListener("click", () => {
      this.el.modalDocs.close();
    });

    this.el.tabReadme.addEventListener("click", () => this.renderDocContent("readme"));
    this.el.tabLicense.addEventListener("click", () => this.renderDocContent("license"));

    this.el.btnCopyDoc.addEventListener("click", async () => {
      const currentDoc = DOCS_DATA[this.state.activeDocKey];
      if (!currentDoc) return;
      try {
        await navigator.clipboard.writeText(currentDoc.content);
        const orig = this.el.btnCopyDoc.textContent;
        this.el.btnCopyDoc.textContent = "✓ Berhasil Disalin!";
        setTimeout(() => {
          this.el.btnCopyDoc.textContent = orig;
        }, 1800);
      } catch (err) {
        alert("Gagal menyalin teks.");
      }
    });
  }

  buildQariMp3Url(surah, ayah) {
    const sCode = String(surah).padStart(3, "0");
    const aCode = String(ayah).padStart(3, "0");
    return `https://everyayah.com/data/${this.state.selectedQari}/${sCode}${aCode}.mp3`;
  }

  playQariAudio(surah, ayah, fallbackArabicText, labelInfo = "Murottal Qari", color = "#10b981", buttonEl = null) {
    if (this.state.isPlayingAudio && buttonEl && buttonEl.classList.contains("playing")) {
      this.stopAudio();
      return;
    }

    this.stopAudio();

    if (!surah || !ayah) {
      this.speakArabicFallback(fallbackArabicText, labelInfo, color, buttonEl);
      return;
    }

    const mp3Url = this.buildQariMp3Url(surah, ayah);
    const audio = new Audio(mp3Url);
    this.state.currentAudio = audio;

    this.el.audioStatusBadge.textContent = "⏳ Memuat Qari...";
    this.el.audioStatusBadge.classList.remove("pill-warn");

    if (buttonEl) {
      buttonEl.classList.add("playing");
      buttonEl.dataset.origText = buttonEl.innerHTML;
      buttonEl.innerHTML = "⏹ Stop";
    }

    audio.addEventListener("playing", () => {
      this.state.isPlayingAudio = true;
      this.el.audioStatusBadge.textContent = `🔊 ${labelInfo}`;
      this.startWaveformAnimation(color);
    });

    audio.addEventListener("ended", () => {
      this.stopAudio();
    });

    audio.addEventListener("error", () => {
      this.speakArabicFallback(fallbackArabicText, labelInfo, color, buttonEl);
    });

    audio.play().catch(() => {
      this.speakArabicFallback(fallbackArabicText, labelInfo, color, buttonEl);
    });
  }

  speakArabicFallback(arabicText, labelInfo = "Pelafalan Fokus", activeColor = "#d4af37", buttonEl = null) {
    if (!("speechSynthesis" in window)) {
      this.stopAudio();
      alert("Gagal memuat audio.");
      return;
    }

    this.stopAudio();

    const cleanArabic = arabicText.replace(/۞/g, " ، ");
    const utterance = new SpeechSynthesisUtterance(cleanArabic);
    utterance.lang = "ar-SA";
    utterance.rate = 0.85;

    const voices = window.speechSynthesis.getVoices();
    const arabVoice = voices.find((v) => v.lang.includes("ar"));
    if (arabVoice) utterance.voice = arabVoice;

    utterance.onstart = () => {
      this.state.isPlayingAudio = true;
      this.el.audioStatusBadge.textContent = `🔊 ${labelInfo}`;
      this.el.audioStatusBadge.classList.remove("pill-warn");
      if (buttonEl) {
        buttonEl.classList.add("playing");
        buttonEl.dataset.origText = buttonEl.innerHTML;
        buttonEl.innerHTML = "⏹ Stop";
      }
      this.startWaveformAnimation(activeColor);
    };

    utterance.onend = () => this.stopAudio();
    utterance.onerror = () => this.stopAudio();

    window.speechSynthesis.speak(utterance);
  }

  stopAudio() {
    if (this.state.currentAudio) {
      this.state.currentAudio.pause();
      this.state.currentAudio.currentTime = 0;
      this.state.currentAudio = null;
    }
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    this.state.isPlayingAudio = false;
    this.el.audioStatusBadge.textContent = "Audio Siap";
    this.el.audioStatusBadge.classList.add("pill-warn");

    document.querySelectorAll(".btn-play-ayah.playing, .btn-mini-audio.playing").forEach((btn) => {
      btn.classList.remove("playing");
      if (btn.dataset.origText) {
        btn.innerHTML = btn.dataset.origText;
      }
    });

    if (this.state.animFrameId) {
      cancelAnimationFrame(this.state.animFrameId);
      this.state.animFrameId = null;
    }
    this.drawIdleWaveform();
  }

  drawIdleWaveform() {
    const canvas = this.el.audioCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    ctx.beginPath();
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.strokeStyle = "rgba(212, 175, 55, 0.35)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  startWaveformAnimation(color = "#10b981") {
    const canvas = this.el.audioCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;

    const renderFrame = () => {
      if (!this.state.isPlayingAudio) return;
      ctx.clearRect(0, 0, w, h);

      this.state.wavePhase += 0.16;
      const bars = 28;
      const barWidth = (w - (bars - 1) * 4) / bars;

      for (let i = 0; i < bars; i++) {
        const norm = Math.sin(i * 0.45 + this.state.wavePhase) * Math.cos(i * 0.2 - this.state.wavePhase * 0.7);
        const barHeight = Math.max(6, Math.abs(norm) * (h - 14));
        const x = i * (barWidth + 4);
        const y = (h - barHeight) / 2;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 3);
        ctx.fill();
      }

      this.state.animFrameId = requestAnimationFrame(renderFrame);
    };

    renderFrame();
  }

  renderDocContent(docKey) {
    const docItem = DOCS_DATA[docKey] || DOCS_DATA.readme;
    this.state.activeDocKey = docKey;
    this.el.tabReadme.classList.toggle("active", docKey === "readme");
    this.el.tabLicense.classList.toggle("active", docKey === "license");
    this.el.docFilename.textContent = `File: ${docItem.filename}`;
    this.el.docViewer.textContent = docItem.content;
  }

  renderAll() {
    const kw = this.state.searchKeyword;
    const ruleFilter = this.state.filterRule;

    const totalCounts = {};
    TajwidEngine.RULES.forEach((r) => { totalCounts[r.id] = 0; });
    let grandTotalMatches = 0;

    this.el.arabicResults.innerHTML = "";
    const frag = document.createDocumentFragment();

    this.state.activeItems.forEach((item) => {
      const parsed = TajwidEngine.parseText(item.arabic, ruleFilter);

      if (kw) {
        const matchTitle = item.title.toLowerCase().includes(kw);
        const matchTrans = item.translation.toLowerCase().includes(kw);
        const matchArab = item.arabic.includes(kw);
        const matchRuleName = parsed.matches.some((m) => m.ruleName.toLowerCase().includes(kw));
        if (!matchTitle && !matchTrans && !matchArab && !matchRuleName) {
          return;
        }
      }

      Object.entries(parsed.counts).forEach(([ruleId, count]) => {
        totalCounts[ruleId] = (totalCounts[ruleId] || 0) + count;
        grandTotalMatches += count;
      });

      const card = document.createElement("article");
      card.className = "ayah-card";

      const metaDiv = document.createElement("div");
      metaDiv.className = "ayah-meta";

      const titleSpan = document.createElement("span");
      titleSpan.className = "ayah-title";
      titleSpan.textContent = item.title;

      const actionsDiv = document.createElement("div");
      actionsDiv.className = "ayah-actions";

      const playBtn = document.createElement("button");
      playBtn.type = "button";
      playBtn.className = "btn-play-ayah";
      playBtn.innerHTML = item.surah ? "🔊 Putar Qari" : "🔊 Putar Audio";
      playBtn.addEventListener("click", () => {
        this.playQariAudio(item.surah, item.ayah, item.arabic, `Qari (${item.id})`, "#10b981", playBtn);
      });

      const countPill = document.createElement("span");
      countPill.className = "status-pill";
      countPill.textContent = `${parsed.matches.length} Hukum`;

      actionsDiv.appendChild(playBtn);
      actionsDiv.appendChild(countPill);
      metaDiv.appendChild(titleSpan);
      metaDiv.appendChild(actionsDiv);

      const arabDiv = document.createElement("div");
      arabDiv.className = "arabic-text";

      parsed.segments.forEach((seg) => {
        if (seg.type === "plain") {
          arabDiv.appendChild(document.createTextNode(seg.text));
        } else {
          const span = document.createElement("span");
          span.className = "tj-token";
          span.style.color = seg.meta.color;
          span.style.backgroundColor = `${seg.meta.color}22`;
          span.textContent = seg.text;
          span.title = `Ketuk untuk detail & audio: ${seg.meta.ruleName}`;
          span.addEventListener("click", () => {
            document.querySelectorAll(".tj-token.selected").forEach((el) => el.classList.remove("selected"));
            span.classList.add("selected");
            this.renderInspector({ ...seg.meta, surah: item.surah, ayah: item.ayah });
            if (item.surah && item.ayah) {
              this.playQariAudio(item.surah, item.ayah, seg.meta.matchedText, seg.meta.ruleName, seg.meta.color);
            } else {
              this.speakArabicFallback(seg.meta.matchedText, seg.meta.ruleName, seg.meta.color);
            }
          });
          arabDiv.appendChild(span);
        }
      });

      const transP = document.createElement("p");
      transP.className = "translation-text";
      transP.textContent = item.translation;

      card.appendChild(metaDiv);
      card.appendChild(arabDiv);
      card.appendChild(transP);
      frag.appendChild(card);
    });

    this.el.arabicResults.appendChild(frag);
    this.el.matchCounter.textContent = `${grandTotalMatches} Deteksi Aktif`;
    this.renderLegend(totalCounts);
  }

  renderLegend(counts) {
    this.el.legendGrid.innerHTML = "";
    const frag = document.createDocumentFragment();

    TajwidEngine.RULES.forEach((rule) => {
      const pill = document.createElement("div");
      pill.className = `legend-pill ${this.state.filterRule === rule.id ? "active-filter" : ""}`;

      const leftDiv = document.createElement("div");
      leftDiv.className = "legend-left";
      leftDiv.title = "Ketuk untuk memfilter khusus hukum ini";
      leftDiv.innerHTML = `
        <span class="color-swatch" style="background-color: ${rule.color};"></span>
        <span>${rule.name}</span>
      `;
      leftDiv.addEventListener("click", () => {
        this.state.filterRule = this.state.filterRule === rule.id ? "ALL" : rule.id;
        this.el.filterRule.value = this.state.filterRule;
        this.renderAll();
      });

      const rightDiv = document.createElement("div");
      rightDiv.className = "legend-right";

      const sampleBtn = document.createElement("button");
      sampleBtn.type = "button";
      sampleBtn.className = "btn-mini-audio";
      sampleBtn.title = `Dengarkan Qari membaca contoh ${rule.name}`;
      sampleBtn.innerHTML = "🔊 Qari";
      sampleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const ex = RULE_AUDIO_EXAMPLES[rule.id];
        if (ex) {
          this.renderInspector({
            ruleId: rule.id,
            ruleName: rule.name,
            caraBaca: `${rule.caraBaca} (${ex.latin})`,
            regexSource: rule.pattern.source,
            color: rule.color,
            matchedText: ex.text,
            surah: ex.surah,
            ayah: ex.ayah
          });
          this.playQariAudio(ex.surah, ex.ayah, ex.text, rule.name, rule.color, sampleBtn);
        }
      });

      const countSpan = document.createElement("span");
      countSpan.className = "legend-count";
      countSpan.textContent = counts[rule.id] || 0;

      rightDiv.appendChild(sampleBtn);
      rightDiv.appendChild(countSpan);

      pill.appendChild(leftDiv);
      pill.appendChild(rightDiv);
      frag.appendChild(pill);
    });

    this.el.legendGrid.appendChild(frag);
  }

  renderInspector(meta) {
    this.el.inspectorContent.innerHTML = `
      <div class="insp-arabic-preview" style="color: ${meta.color};">
        ${this.escapeHtml(meta.matchedText)}
      </div>
      <button type="button" id="btn-replay-token" class="btn-speak-token">
        🔊 Putar Ulang Audio Qari
      </button>
      <div class="insp-row">
        <div class="insp-label">Hukum Tajwid Terdeteksi</div>
        <div class="insp-value" style="color: ${meta.color};">${this.escapeHtml(meta.ruleName)}</div>
      </div>
      <div class="insp-row">
        <div class="insp-label">Kaidah Fonetik & Cara Membaca</div>
        <p class="insp-desc">${this.escapeHtml(meta.caraBaca)}</p>
      </div>
      <div class="insp-row">
        <div class="insp-label">Pola RegEx Unicode</div>
        <code class="insp-regex">/${this.escapeHtml(meta.regexSource)}/gu</code>
      </div>
    `;

    const replayBtn = document.getElementById("btn-replay-token");
    if (replayBtn) {
      replayBtn.addEventListener("click", () => {
        if (meta.surah && meta.ayah) {
          this.playQariAudio(meta.surah, meta.ayah, meta.matchedText, meta.ruleName, meta.color);
        } else {
          this.speakArabicFallback(meta.matchedText, meta.ruleName, meta.color);
        }
      });
    }
  }

  escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new TajwidApp().init();
});
