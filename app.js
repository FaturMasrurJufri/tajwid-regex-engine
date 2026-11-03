import { TajwidEngine } from "./engine.js";

// Contoh bacaan spesifik untuk masing-masing hukum tajwid (untuk tombol 🔊 di Legenda)
const RULE_AUDIO_EXAMPLES = {
  IDGHAM_MIMI: { text: "أَطْعَمَهُمْ مِنْ جُوعٍ", latin: "Ath'amahum min juu'" },
  IKHFA_SYAFAWI: { text: "تَرْمِيهِمْ بِحِجَارَةٍ", latin: "Tarmiihim bihijaarah" },
  IQLAB: { text: "سَمِيعٌ بَصِيرٌ", latin: "Samii'um bashiir" },
  IDGHAM_BIGHUNNAH: { text: "مَنْ يَعْمَلْ", latin: "May ya'mal" },
  IDGHAM_BILAGHUNNAH: { text: "مِنْ رَبِّهِمْ", latin: "Mir rabbihim" },
  IKHFA: { text: "مِنْ شَرِّ مَا خَلَقَ", latin: "Min syarri maa khalaq" },
  GHUNNAH: { text: "إِنَّ الْإِنْسَانَ", latin: "Innal insaana" },
  QALQALAH: { text: "لَمْ يَلِدْ وَلَمْ يُولَدْ", latin: "Lam yalid wa lam yuulad" }
};

const SAMPLE_DATA = [
  {
    id: "S1",
    title: "Sampel Latihan 1 — Kombinasi Nun Sukun, Tanwin & Qalqalah",
    arabic: "مَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ ۞ وَمَنْ يَكْسِبْ إِثْمًا فَإِنَّمَا يَكْسِبُهُ عَلَىٰ نَفْسِهِ",
    translation: "Kalimat latihan untuk menguji deteksi Idgham Bighunnah, Qalqalah Sukun, Ikhfa Haqiqi, dan Ghunnah Musyaddadah."
  },
  {
    id: "S2",
    title: "Sampel Latihan 2 — Qalqalah, Ghunnah & Idgham Bilaghunnah",
    arabic: "أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ ۞ وَوَضَعْنَا عَنْكَ وِزْرَكَ ۞ مِنْ رَبِّهِمْ هُدًى وَرَحْمَةٌ لِلْمُؤْمِنِينَ",
    translation: "Kalimat latihan untuk menguji Qalqalah, Ikhfa Haqiqi, serta Idgham Bilaghunnah pada pertemuan Nun Sukun/Tanwin dengan huruf Ra dan Lam."
  },
  {
    id: "S3",
    title: "Sampel Latihan 3 — Hukum Mim Sukun (Ikhfa Syafawi & Idgham Mimi) serta Iqlab",
    arabic: "تَرْمِيهِمْ بِحِجَارَةٍ مِنْ سِجِّيلٍ ۞ أَطْعَمَهُمْ مِنْ جُوعٍ وَآمَنَهُمْ مِنْ خَوْفٍ ۞ كَلَّا لَيُنْبَذَنَّ فِي الْحُطَمَةِ",
    translation: "Kalimat latihan untuk menguji Ikhfa Syafawi, Idgham Mimi, Iqlab, dan Ghunnah Musyaddadah."
  },
  {
    id: "S4",
    title: "Sampel Latihan 4 — Rangkaian Ikhfa Haqiqi, Qalqalah & Ghunnah",
    arabic: "إِنَّ الْإِنْسَانَ لَفِي خُسْرٍ ۞ وَالْعَصْرِ وَالصَّبْرِ عِنْدَ الصَّدْمَةِ الْأُولَىٰ ۞ قَدْ أَفْلَحَ مَنْ زَكَّاهَا",
    translation: "Kalimat latihan untuk menguji Ghunnah, Ikhfa Haqiqi, serta Qalqalah pada huruf Dal dan Ba sukun."
  }
];

const DOCS_DATA = {
  readme: {
    filename: "README.md",
    content: `📖 Manual Penggunaan — TajwidEngine PRO (Audio & RegEx Edition)

TajwidEngine PRO adalah mesin pencari, parser fonetik hukum tajwid berbasis Regular Expressions (RegEx), dan penyintesis audio pelafalan Arab secara real-time di sisi klien tanpa API eksternal.

1. Mendengarkan Audio Contoh Bacaan (3 Cara):
   - Audio Contoh per Hukum (Di Bagian Legenda): Ketuk tombol "🔊 Contoh" pada masing-masing kartu legenda hukum tajwid untuk mendengar contoh pelafalan spesifik hukum tersebut.
   - Audio Kalimat Sampel Penuh: Ketuk tombol "🔊 Putar Audio Sampel" di sudut kanan atas setiap kartu kalimat latihan.
   - Audio Potongan Token Tajwid: Ketuk salah satu huruf berwarna pada teks Arab, lalu ketuk tombol "🔊 Dengarkan Pelafalan Potongan Ini" di panel Inspektor.

2. Mengatur Kecepatan Bacaan (Tartil):
   - Gunakan menu dropdown "Kecepatan Baca (Tartil)" di bagian atas untuk memilih tempo Lambat/Tahqiq (0.75x), Tartil Standar (0.9x), atau Normal/Tadwir (1.0x).

3. Menguji Teks Arab Sendiri (Live RegEx & Audio Sandbox):
   - Ketik atau tempel kalimat bahasa Arab berharakat pada kotak Sandbox.
   - Ketuk tombol emas "⚡ Analisis & Siapkan Audio" untuk mewarnai hukum tajwid sekaligus mengaktifkan fitur pembaca audionya.

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
      activeDocKey: "readme",
      speechRate: 0.9,
      isPlayingAudio: false,
      animFrameId: null,
      wavePhase: 0
    };

    this.el = {
      presetSample: document.getElementById("preset-sample"),
      audioRate: document.getElementById("audio-rate"),
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
    this.el.presetSample.addEventListener("change", (e) => {
      const val = e.target.value;
      this.state.activeItems = val === "all"
        ? [...SAMPLE_DATA]
        : SAMPLE_DATA.filter((item) => item.id === val);
      this.renderAll();
    });

    this.el.audioRate.addEventListener("change", (e) => {
      this.state.speechRate = parseFloat(e.target.value) || 0.9;
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
          translation: "Teks kustom yang dianalisis secara real-time beserta dukungan pelafalan audio."
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

  // Mesin Pemutar Audio Pelafalan Arab + Gelombang Visualizer
  speakArabic(arabicText, labelInfo = "Memutar Audio...", activeColor = "#d4af37", buttonEl = null) {
    if (!("speechSynthesis" in window)) {
      alert("Browser Anda tidak mendukung fitur Web Speech Audio.");
      return;
    }

    // Jika sedang memutar dan tombol yang sama diklik, hentikan
    if (this.state.isPlayingAudio && buttonEl && buttonEl.classList.contains("playing")) {
      this.stopAudio();
      return;
    }

    this.stopAudio();

    // Bersihkan simbol pemisah ayat (۞) agar tidak dibaca aneh oleh mesin suara
    const cleanArabic = arabicText.replace(/۞/g, " ، ");
    const utterance = new SpeechSynthesisUtterance(cleanArabic);
    utterance.lang = "ar-SA";
    utterance.rate = this.state.speechRate;
    utterance.pitch = 1.0;

    // Pilih voice Bahasa Arab terbaik jika tersedia di perangkat
    const voices = window.speechSynthesis.getVoices();
    const arabVoice = voices.find((v) => v.lang.includes("ar"));
    if (arabVoice) {
      utterance.voice = arabVoice;
    }

    utterance.onstart = () => {
      this.state.isPlayingAudio = true;
      this.el.audioStatusBadge.textContent = `🔊 ${labelInfo}`;
      this.el.audioStatusBadge.classList.remove("pill-warn");
      if (buttonEl) {
        buttonEl.classList.add("playing");
        buttonEl.dataset.origText = buttonEl.innerHTML;
        buttonEl.innerHTML = "⏹ Hentikan";
      }
      this.startWaveformAnimation(activeColor);
    };

    utterance.onend = () => {
      this.stopAudio();
    };

    utterance.onerror = () => {
      this.stopAudio();
    };

    window.speechSynthesis.speak(utterance);
  }

  stopAudio() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    this.state.isPlayingAudio = false;
    this.el.audioStatusBadge.textContent = "Audio Siap";
    this.el.audioStatusBadge.classList.add("pill-warn");

    document.querySelectorAll(".btn-play-ayah.playing").forEach((btn) => {
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
      playBtn.innerHTML = "🔊 Putar Audio Sampel";
      playBtn.addEventListener("click", () => {
        this.speakArabic(item.arabic, item.id, "#10b981", playBtn);
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
          span.className = `tj-token rule-${seg.meta.ruleId}`;
          span.textContent = seg.text;
          span.title = `Ketuk untuk detail & audio: ${seg.meta.ruleName}`;
          span.addEventListener("click", () => {
            document.querySelectorAll(".tj-token.selected").forEach((el) => el.classList.remove("selected"));
            span.classList.add("selected");
            this.renderInspector(seg.meta);
            this.speakArabic(seg.meta.matchedText, seg.meta.ruleName, seg.meta.color);
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

      const leftDiv = document.createElement("div");
      leftDiv.className = "legend-left";
      leftDiv.title = "Ketuk untuk memfilter hukum ini";
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
      sampleBtn.title = `Dengarkan contoh bacaan ${rule.name}`;
      sampleBtn.textContent = "🔊 Contoh";
      sampleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const ex = RULE_AUDIO_EXAMPLES[rule.id];
        if (ex) {
          this.renderInspector({
            ruleId: rule.id,
            ruleName: rule.name,
            caraBaca: `${rule.caraBaca} (Contoh Lafadz: ${ex.latin})`,
            regexSource: rule.pattern.source,
            color: rule.color,
            matchedText: ex.text,
            start: 0,
            end: ex.text.length
          });
          this.speakArabic(ex.text, rule.name, rule.color);
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
        🔊 Dengarkan Pelafalan Potongan Ini
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
        this.speakArabic(meta.matchedText, meta.ruleName, meta.color);
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
