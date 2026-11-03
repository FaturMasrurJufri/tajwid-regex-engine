import { TajwidEngine } from "./engine.js";

// Dataset Kalimat Latihan Fonetik Arab Klasik (Dirancang khusus memuat berbagai hukum tajwid)
const SAMPLE_DATA = [
  {
    id: "S1",
    title: "Sampel Latihan 1 — Kombinasi Nun Sukun, Tanwin & Qalqalah",
    arabic: "مَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ ۞ وَمَنْ يَكْسِبْ إِثْمًا فَإِنَّمَا يَكْسِبُهُ عَلَىٰ نَفْسِهِ",
    translation: "Kalimat latihan untuk menguji deteksi Idgham Bighunnah (مَنْ يَعْمَلْ & خَيْرًا يَرَهُ), Qalqalah Sukun (يَكْسِبْ), Ikhfa Haqiqi (إِثْمًا فَإِنَّمَا), dan Ghunnah Musyaddadah (فَإِنَّمَا)."
  },
  {
    id: "S2",
    title: "Sampel Latihan 2 — Qalqalah, Ghunnah & Idgham Bilaghunnah",
    arabic: "أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ ۞ وَوَضَعْنَا عَنْكَ وِزْرَكَ ۞ مِنْ رَبِّهِمْ هُدًى وَرَحْمَةٌ لِلْمُؤْمِنِينَ",
    translation: "Kalimat latihan untuk menguji Qalqalah (صَدْرَكَ), Ikhfa Haqiqi (عَنْكَ), serta Idgham Bilaghunnah pada pertemuan Nun Sukun/Tanwin dengan huruf Ra dan Lam (مِنْ رَبِّهِمْ & وَرَحْمَةٌ لِلْمُؤْمِنِينَ)."
  },
  {
    id: "S3",
    title: "Sampel Latihan 3 — Hukum Mim Sukun (Ikhfa Syafawi & Idgham Mimi) serta Iqlab",
    arabic: "تَرْمِيهِمْ بِحِجَارَةٍ مِنْ سِجِّيلٍ ۞ أَطْعَمَهُمْ مِنْ جُوعٍ وَآمَنَهُمْ مِنْ خَوْفٍ ۞ كَلَّا لَيُنْبَذَنَّ فِي الْحُطَمَةِ",
    translation: "Kalimat latihan untuk menguji Ikhfa Syafawi (تَرْمِيهِمْ بِحِجَارَةٍ), Idgham Mimi (أَطْعَمَهُمْ مِنْ), Iqlab (لَيُنْبَذَنَّ), dan Ghunnah (لَيُنْبَذَنَّ)."
  },
  {
    id: "S4",
    title: "Sampel Latihan 4 — Rangkaian Ikhfa Haqiqi, Qalqalah & Ghunnah",
    arabic: "إِنَّ الْإِنْسَانَ لَفِي خُسْرٍ ۞ وَالْعَصْرِ وَالصَّبْرِ عِنْدَ الصَّدْمَةِ الْأُولَىٰ ۞ قَدْ أَفْلَحَ مَنْ زَكَّاهَا",
    translation: "Kalimat latihan untuk menguji Ghunnah (إِنَّ), Ikhfa Haqiqi (الْإِنْسَانَ, عِنْدَ, مَنْ زَكَّاهَا), serta Qalqalah pada huruf Dal dan Ba sukun (الصَّبْرِ, الصَّدْمَةِ, قَدْ)."
  }
];

const DOCS_DATA = {
  readme: {
    filename: "README.md",
    content: `📖 Manual Penggunaan — TajwidEngine PRO

TajwidEngine PRO adalah mesin pencari dan parser fonetik hukum tajwid berbasis Regular Expressions (RegEx) dan Finite-State Tokenizer yang menganalisis teks bahasa Arab berharakat secara real-time di sisi klien tanpa API eksternal.

1. Menguji Teks Arab Sendiri (Live RegEx Sandbox)
   - Ketik atau tempel (paste) kalimat bahasa Arab berharakat lengkap pada kotak "Live RegEx Sandbox".
   - Ketuk tombol emas "⚡ Analisis Hukum Tajwid".
   - Mesin akan memindai seluruh karakter Unicode dan mewarnai setiap hukum tajwid secara presisi.
   - Ketuk tombol "Reset ke Dataset" untuk kembali ke daftar sampel latihan bawaan.

2. Mesin Pencari & Filter Fokus Hukum
   - Kolom Pencarian: Ketik kata kunci bahasa Indonesia, istilah tajwid (misal: "qalqalah", "iqlab"), atau potongan huruf Arab untuk menyaring kartu.
   - Dropdown Filter Hukum: Pilih satu hukum spesifik (misal: "Ikhfa Haqiqi" atau "Idgham Bighunnah") untuk mengisolasi warna pada hukum tersebut saja.

3. Legenda Warna & Statistik Frekuensi
   - Menampilkan jumlah kemunculan setiap hukum tajwid yang berhasil dideteksi oleh algoritma RegEx pada teks yang sedang tampil.
   - Anda juga dapat mengetuk kartu legenda untuk memfilter hukum terkait.

4. Inspektor Fonetik & Kaidah (Panel Kanan/Bawah)
   - Ketuk salah satu potongan huruf Arab yang berwarna pada kartu hasil.
   - Panel Inspektor akan menampilkan:
     • Potongan teks Arab yang terdeteksi
     • Nama hukum tajwid & penjelasan kaidah cara membacanya
     • Pola ekspresi reguler (RegEx Pattern) Unicode yang menangkap pola tersebut.

fatur62@gmail.com`
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
      activeDocKey: "readme"
    };

    this.el = {
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
    this.renderAll();
  }

  bindEvents() {
    this.el.presetSample.addEventListener("change", (e) => {
      const val = e.target.value;
      if (val === "all") {
        this.state.activeItems = [...SAMPLE_DATA];
      } else {
        this.state.activeItems = SAMPLE_DATA.filter((item) => item.id === val);
      }
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
          translation: "Teks kustom yang dianalisis secara real-time menggunakan mesin RegEx TajwidEngine PRO."
        }
      ];
      this.renderAll();
    });

    this.el.btnResetCustom.addEventListener("click", () => {
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

    // Modal Baca Saya
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

      // Filter berdasarkan kata kunci pencarian (teks Arab, terjemahan, atau nama hukum yang ditemukan)
      if (kw) {
        const matchTitle = item.title.toLowerCase().includes(kw);
        const matchTrans = item.translation.toLowerCase().includes(kw);
        const matchArab = item.arabic.includes(kw);
        const matchRuleName = parsed.matches.some((m) => m.ruleName.toLowerCase().includes(kw));
        if (!matchTitle && !matchTrans && !matchArab && !matchRuleName) {
          return;
        }
      }

      // Akumulasi statistik
      Object.entries(parsed.counts).forEach(([ruleId, count]) => {
        totalCounts[ruleId] = (totalCounts[ruleId] || 0) + count;
        grandTotalMatches += count;
      });

      const card = document.createElement("article");
      card.className = "ayah-card";

      const metaDiv = document.createElement("div");
      metaDiv.className = "ayah-meta";
      metaDiv.innerHTML = `
        <span class="ayah-title">${this.escapeHtml(item.title)}</span>
        <span class="status-pill">${parsed.matches.length} Hukum Terdeteksi</span>
      `;

      const arabDiv = document.createElement("div");
      arabDiv.className = "arabic-text";

      parsed.segments.forEach((seg) => {
        if (seg.type === "plain") {
          arabDiv.appendChild(document.createTextNode(seg.text));
        } else {
          const span = document.createElement("span");
          span.className = `tj-token rule-${seg.meta.ruleId}`;
          span.textContent = seg.text;
          span.title = `${seg.meta.ruleName}`;
          span.addEventListener("click", () => {
            document.querySelectorAll(".tj-token.selected").forEach((el) => el.classList.remove("selected"));
            span.classList.add("selected");
            this.renderInspector(seg.meta);
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
      pill.className = "legend-pill";
      pill.innerHTML = `
        <div class="legend-left">
          <span class="color-swatch" style="background-color: ${rule.color};"></span>
          <span>${rule.name}</span>
        </div>
        <span class="legend-count">${counts[rule.id] || 0}</span>
      `;
      pill.addEventListener("click", () => {
        this.state.filterRule = this.state.filterRule === rule.id ? "ALL" : rule.id;
        this.el.filterRule.value = this.state.filterRule;
        this.renderAll();
      });
      frag.appendChild(pill);
    });

    this.el.legendGrid.appendChild(frag);
  }

  renderInspector(meta) {
    this.el.inspectorContent.innerHTML = `
      <div class="insp-arabic-preview" style="color: ${meta.color};">
        ${this.escapeHtml(meta.matchedText)}
      </div>
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
      <div class="insp-row">
        <div class="insp-label">Indeks Karakter (Start – End)</div>
        <div class="insp-desc">Indeks ke-${meta.start} s/d ke-${meta.end}</div>
      </div>
    `;
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
