import { TajwidEngine } from "./engine.js";

// Pemetaan Contoh Tiap Hukum ke Rekaman MP3 Qari Dunia (EveryAyah CDN)
const RULE_AUDIO_EXAMPLES = {
  IZHAR_HALQI: { text: "وَآمَنَهُمْ مِنْ خَوْفٍ", latin: "QS. Quraisy [106]: 4", surah: 106, ayah: 4 },
  IDGHAM_BIGHUNNAH: { text: "فَمَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ", latin: "QS. Az-Zalzalah [99]: 7", surah: 99, ayah: 7 },
  IDGHAM_BILAGHUNNAH: { text: "وَيْلٌ لِكُلِّ هُمَزَةٍ لُمَزَةٍ", latin: "QS. Al-Humazah [104]: 1", surah: 104, ayah: 1 },
  IQLAB: { text: "كَلَّا لَيُنْبَذَنَّ فِي الْحُطَمَةِ", latin: "QS. Al-Humazah [104]: 4", surah: 104, ayah: 4 },
  IKHFA: { text: "مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ", latin: "QS. An-Nas [114]: 4", surah: 114, ayah: 4 },
  IKHFA_SYAFAWI: { text: "تَرْمِيهِمْ بِحِجَارَةٍ مِنْ سِجِّيلٍ", latin: "QS. Al-Fil [105]: 4", surah: 105, ayah: 4 },
  IDGHAM_MIMI: { text: "الَّذِي أَطْعَمَهُمْ مِنْ جُوعٍ", latin: "QS. Quraisy [106]: 4", surah: 106, ayah: 4 },
  IZHAR_SYAFAWI: { text: "أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ", latin: "QS. Al-Insyirah [94]: 1", surah: 94, ayah: 1 },
  GHUNNAH: { text: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ", latin: "QS. Al-Kautsar [108]: 1", surah: 108, ayah: 1 },
  AL_SYAMSIYAH: { text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", latin: "QS. Al-Fatihah [1]: 1", surah: 1, ayah: 1 },
  AL_QAMARIYAH: { text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", latin: "QS. Al-Fatihah [1]: 2", surah: 1, ayah: 2 },
  QALQALAH: { text: "لَمْ يَلِدْ وَلَمْ يُولَدْ", latin: "QS. Al-Ikhlas [112]: 3", surah: 112, ayah: 3 },
  MAD_LAZIM: { text: "وَلَا الضَّآلِّينَ", latin: "QS. Al-Fatihah [1]: 7", surah: 1, ayah: 7 },
  MAD_WAJIB: { text: "إِذَا جَآءَ نَصْرُ اللَّهِ", latin: "QS. An-Nashr [110]: 1", surah: 110, ayah: 1 },
  MAD_JAIZ: { text: "إِنَّآ أَعْطَيْنَاكَ الْكَوْثَرَ", latin: "QS. Al-Kautsar [108]: 1", surah: 108, ayah: 1 },
  LAFADZ_JALALAH: { text: "قُلْ هُوَ اللَّهُ أَحَدٌ", latin: "QS. Al-Ikhlas [112]: 1", surah: 112, ayah: 1 },
  MAD_LAYYIN: { text: "لِإِيلَافِ قُرَيْشٍ", latin: "QS. Quraisy [106]: 1", surah: 106, ayah: 1 },
  MAD_THABII: { text: "مَالِكِ يَوْمِ الدِّينِ", latin: "QS. Al-Fatihah [1]: 4", surah: 1, ayah: 4 }
};

// Database Pustaka Referensi Ayat (Termasuk Surah Yasin Ayat 7-8 yang baru ditanyakan!)
const AYAH_DATABASE = [
  { text: "لَقَدْ حَقَّ الْقَوْلُ عَلَىٰ أَكْثَرِهِمْ فَهُمْ لَا يُؤْمِنُونَ", surah: 36, ayah: 7, title: "Surah Yasin: 7" },
  { text: "إِنَّا جَعَلْنَا فِي أَعْنَاقِهِمْ أَغْلَالًا فَهِيَ إِلَى الْأَذْقَانِ فَهُمْ مُقْمَحُونَ", surah: 36, ayah: 8, title: "Surah Yasin: 8" },
  { text: "فَمَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ", surah: 99, ayah: 7, title: "QS. Az-Zalzalah: 7" },
  { text: "أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ", surah: 94, ayah: 1, title: "QS. Al-Insyirah: 1" },
  { text: "تَرْمِيهِمْ بِحِجَارَةٍ مِنْ سِجِّيلٍ", surah: 105, ayah: 4, title: "QS. Al-Fil: 4" },
  { text: "كَلَّا لَيُنْبَذَنَّ فِي الْحُطَمَةِ", surah: 104, ayah: 4, title: "QS. Al-Humazah: 4" },
  { text: "قُلْ هُوَ اللَّهُ أَحَدٌ", surah: 112, ayah: 1, title: "QS. Al-Ikhlas: 1" }
];

const SAMPLE_DATA = [
  { id: "S1", title: "Sampel 1 — QS. Az-Zalzalah: 7", arabic: "فَمَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ", translation: "Idgham Bighunnah, Izhar Halqi & Qalqalah.", surah: 99, ayah: 7 },
  { id: "S2", title: "Sampel 2 — QS. Al-Insyirah: 1–2", arabic: "أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ ۞ وَوَضَعْنَا عَنْكَ وِزْرَكَ", translation: "Izhar Syafawi, Qalqalah & Ikhfa.", surah: 94, ayah: 1 },
  { id: "S3", title: "Sampel 3 — QS. Al-Fil: 4 & Al-Humazah: 4", arabic: "تَرْمِيهِمْ بِحِجَارَةٍ مِنْ سِجِّيلٍ ۞ كَلَّا لَيُنْبَذَنَّ فِي الْحُطَمَةِ", translation: "Ikhfa Syafawi, Iqlab, Ikhfa & Ghunnah.", surah: 105, ayah: 4 },
  { id: "S4", title: "Sampel 4 — QS. Yasin: 7–8 (Baru)", arabic: "لَقَدْ حَقَّ الْقَوْلُ عَلَىٰ أَكْثَرِهِمْ فَهُمْ لَا يُؤْمِنُونَ ۞ إِنَّا جَعَلْنَا فِي أَعْنَاقِهِمْ أَغْلَالًا فَهِيَ إِلَى الْأَذْقَانِ فَهُمْ مُقْمَحُونَ", translation: "Contoh Ayat Surah Yasin lengkap dengan Qari Dunia.", surah: 36, ayah: 7 }
];

const DOCS_DATA = {
  readme: {
    filename: "README.md",
    content: `📖 Manual Penggunaan — TajwidEngine PRO 16

Fitur Sandbox Cerdas: Saat Anda menempelkan (paste) teks ayat Al-Qur'an (seperti Surah Yasin ayat 7-8), sistem secara otomatis mencocokkan database surah agar audio yang diputar langsung menggunakan rekaman MP3 Qari Dunia pilihan Anda!

fatur62@gmail.com`
  },
  license: {
    filename: "LICENSE",
    content: `MIT License (c) 2026 fatur62 (fatur62@gmail.com)`
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
      if (this.state.isPlayingAudio) this.stopAudio();
    });

    this.el.presetSample.addEventListener("change", (e) => {
      const val = e.target.value;
      this.state.activeItems = val === "all" ? [...SAMPLE_DATA] : SAMPLE_DATA.filter((item) => item.id === val);
      this.renderAll();
    });

    this.el.btnParseCustom.addEventListener("click", () => {
      const rawText = this.el.customArabic.value.trim();
      if (!rawText) {
        alert("Masukkan teks bahasa Arab berharakat terlebih dahulu.");
        return;
      }

      // Deteksi otomatis apakah teks yang dicocokkan ada di database referensi ayat
      let matchedSurah = 36; // Default Surah Yasin jika tidak ditemukan
      let matchedAyah = 7;
      let matchedTitle = "Teks Kustom (Sandbox)";

      const found = AYAH_DATABASE.find((item) => rawText.includes(item.text.substring(0, 15)));
      if (found) {
        matchedSurah = found.surah;
        matchedAyah = found.ayah;
        matchedTitle = `Deteksi Otomatis: ${found.title}`;
      }

      this.state.activeItems = [
        {
          id: "CUSTOM",
          title: matchedTitle,
          arabic: rawText,
          translation: "Teks kustom/copy-paste yang terhubung ke Audio Murottal Qari Dunia.",
          surah: matchedSurah,
          ayah: matchedAyah
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

    this.el.btnCloseDocs.addEventListener("click", () => this.el.modalDocs.close());
    this.el.tabReadme.addEventListener("click", () => this.renderDocContent("readme"));
    this.el.tabLicense.addEventListener("click", () => this.renderDocContent("license"));

    this.el.btnCopyDoc.addEventListener("click", async () => {
      const currentDoc = DOCS_DATA[this.state.activeDocKey];
      if (!currentDoc) return;
      await navigator.clipboard.writeText(currentDoc.content);
      alert("Berhasil disalin!");
    });
  }

  buildQariMp3Url(surah, ayah) {
    const sCode = String(surah).padStart(3, "0");
    const aCode = String(ayah).padStart(3, "0");
    return `https://everyayah.com/data/${this.state.selectedQari}/${sCode}${aCode}.mp3`;
  }

  playQariAudio(surah, ayah, fallbackText, labelInfo = "Murottal Qari", color = "#10b981", buttonEl = null) {
    if (this.state.isPlayingAudio && buttonEl && buttonEl.classList.contains("playing")) {
      this.stopAudio();
      return;
    }
    this.stopAudio();

    if (!surah || !ayah) {
      this.speakFallback(fallbackText, labelInfo, color, buttonEl);
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

    audio.addEventListener("ended", () => this.stopAudio());
    audio.addEventListener("error", () => this.speakFallback(fallbackText, labelInfo, color, buttonEl));

    audio.play().catch(() => this.speakFallback(fallbackText, labelInfo, color, buttonEl));
  }

  speakFallback(text, labelInfo, color, buttonEl) {
    if (!("speechSynthesis" in window)) {
      this.stopAudio();
      return;
    }
    this.stopAudio();
    const utterance = new SpeechSynthesisUtterance(text.replace(/۞/g, ""));
    utterance.lang = "ar-SA";
    utterance.rate = 0.85;

    utterance.onstart = () => {
      this.state.isPlayingAudio = true;
      this.el.audioStatusBadge.textContent = `🔊 ${labelInfo} (AI)`;
      if (buttonEl) {
        buttonEl.classList.add("playing");
        buttonEl.dataset.origText = buttonEl.innerHTML;
        buttonEl.innerHTML = "⏹ Stop";
      }
      this.startWaveformAnimation(color);
    };
    utterance.onend = () => this.stopAudio();
    window.speechSynthesis.speak(utterance);
  }

  stopAudio() {
    if (this.state.currentAudio) {
      this.state.currentAudio.pause();
      this.state.currentAudio.currentTime = 0;
      this.state.currentAudio = null;
    }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();

    this.state.isPlayingAudio = false;
    this.el.audioStatusBadge.textContent = "Audio Siap";
    this.el.audioStatusBadge.classList.add("pill-warn");

    document.querySelectorAll(".btn-play-ayah.playing, .btn-mini-audio.playing").forEach((btn) => {
      btn.classList.remove("playing");
      if (btn.dataset.origText) btn.innerHTML = btn.dataset.origText;
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
        if (!matchTitle && !matchTrans && !matchArab && !matchRuleName) return;
      }

      Object.entries(parsed.counts).forEach(([ruleId, count]) => {
        totalCounts[ruleId] = (totalCounts[ruleId] || 0) + count;
        grandTotalMatches += count;
      });

      const card = document.createElement("article");
      card.className = "ayah-card";

      const metaDiv = document.createElement("div");
      metaDiv.className = "ayah-meta";
      metaDiv.innerHTML = `
        <span class="ayah-title">${item.title}</span>
        <div class="ayah-actions">
          <button type="button" class="btn-play-ayah">🔊 Putar Qari</button>
          <span class="status-pill">${parsed.matches.length} Hukum</span>
        </div>
      `;

      const playBtn = metaDiv.querySelector(".btn-play-ayah");
      playBtn.addEventListener("click", () => {
        this.playQariAudio(item.surah, item.ayah, item.arabic, `Qari (${item.title})`, "#10b981", playBtn);
      });

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
          span.addEventListener("click", () => {
            document.querySelectorAll(".tj-token.selected").forEach((el) => el.classList.remove("selected"));
            span.classList.add("selected");
            this.renderInspector({ ...seg.meta, surah: item.surah, ayah: item.ayah });
            this.playQariAudio(item.surah, item.ayah, seg.meta.matchedText, seg.meta.ruleName, seg.meta.color);
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
      pill.innerHTML = `
        <div class="legend-left">
          <span class="color-swatch" style="background-color: ${rule.color};"></span>
          <span>${rule.name}</span>
        </div>
        <div class="legend-right">
          <button type="button" class="btn-mini-audio">🔊 Qari</button>
          <span class="legend-count">${counts[rule.id] || 0}</span>
        </div>
      `;

      pill.querySelector(".legend-left").addEventListener("click", () => {
        this.state.filterRule = this.state.filterRule === rule.id ? "ALL" : rule.id;
        this.el.filterRule.value = this.state.filterRule;
        this.renderAll();
      });

      const sampleBtn = pill.querySelector(".btn-mini-audio");
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

      frag.appendChild(pill);
    });
    this.el.legendGrid.appendChild(frag);
  }

  renderInspector(meta) {
    this.el.inspectorContent.innerHTML = `
      <div class="insp-arabic-preview" style="color: ${meta.color};">${meta.matchedText}</div>
      <button type="button" id="btn-replay-token" class="btn-speak-token">🔊 Putar Ulang Audio Qari</button>
      <div class="insp-row">
        <div class="insp-label">Hukum Tajwid Terdeteksi</div>
        <div class="insp-value" style="color: ${meta.color};">${meta.ruleName}</div>
      </div>
      <div class="insp-row">
        <div class="insp-label">Kaidah Fonetik & Cara Membaca</div>
        <p class="insp-desc">${meta.caraBaca}</p>
      </div>
      <div class="insp-row">
        <div class="insp-label">Pola RegEx Unicode</div>
        <code class="insp-regex">/${meta.regexSource}/gu</code>
      </div>
    `;

    document.getElementById("btn-replay-token").addEventListener("click", () => {
      this.playQariAudio(meta.surah, meta.ayah, meta.matchedText, meta.ruleName, meta.color);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new TajwidApp().init();
});
