/**
 * TajwidEngine: Rule-Based Arabic Phonetic & Tajwid RegEx Parser
 * Mendukung karakter Unicode Harakat Standar & Mushaf Utsmani
 */
export class TajwidEngine {
  // Karakter Diakritik / Harakat Unicode
  static SUKUN = "[\\u0652\\u06E1]"; // Sukun standar atau bulatan sukun Utsmani
  static SHADDA = "\\u0651";
  static TANWIN = "[\\u064B\\u064C\\u064D]"; // Fathatain, Dhammatain, Kasratain
  static HARAKAT_OPT = "[\\u064B-\\u065F\\u0670\\u06D6-\\u06ED]*";
  // Jembatan spasi atau huruf alif/wawu/hamzah washal di antara dua kata
  static WORD_BRIDGE = "(?:\\u0627?\\s+(?:\\u0627\\u0644|[\\u0627\\u0671])?|\\s*)";

  static RULES = [
    {
      id: "IDGHAM_MIMI",
      name: "Idgham Mimi (Mutamatsilain)",
      color: "#14b8a6",
      caraBaca: "Dileburkan dengan dengung (ghunnah) sepanjang 2–3 harakat karena Mim Sukun bertemu huruf Mim berharakat.",
      pattern: new RegExp(
        `\\u0645${this.SUKUN}?\\s+\\u0645${this.SHADDA}?${this.HARAKAT_OPT}`,
        "gu"
      )
    },
    {
      id: "IKHFA_SYAFAWI",
      name: "Ikhfa Syafawi",
      color: "#ec4899",
      caraBaca: "Disamarkan di bibir disertai dengung (ghunnah) 2 harakat karena Mim Sukun bertemu dengan huruf Ba (ب).",
      pattern: new RegExp(
        `\\u0645${this.SUKUN}\\s*\\u0628${this.HARAKAT_OPT}`,
        "gu"
      )
    },
    {
      id: "IQLAB",
      name: "Iqlab",
      color: "#a855f7",
      caraBaca: "Bunyi Nun Sukun atau Tanwin diubah menjadi bunyi Mim (م) yang disamarkan dengan dengung karena bertemu huruf Ba (ب).",
      pattern: new RegExp(
        `(?:\\u0646${this.SUKUN}|\\u0646\\u06E2|[\\u0621-\\u064A]${this.TANWIN})${this.WORD_BRIDGE}\\u0628${this.HARAKAT_OPT}`,
        "gu"
      )
    },
    {
      id: "IDGHAM_BIGHUNNAH",
      name: "Idgham Bighunnah",
      color: "#10b981",
      caraBaca: "Suara Nun Sukun atau Tanwin dileburkan masuk ke salah satu huruf (ي ن م و) disertai dengung 2 harakat.",
      pattern: new RegExp(
        `(?:\\u0646${this.SUKUN}?|[\\u0621-\\u064A]${this.TANWIN})${this.WORD_BRIDGE}[\\u064A\\u0646\\u0645\\u0648]${this.SHADDA}?${this.HARAKAT_OPT}`,
        "gu"
      )
    },
    {
      id: "IDGHAM_BILAGHUNNAH",
      name: "Idgham Bilaghunnah",
      color: "#38bdf8",
      caraBaca: "Suara Nun Sukun atau Tanwin dileburkan secara jelas ke huruf Lam (ل) atau Ra (ر) tanpa dengung.",
      pattern: new RegExp(
        `(?:\\u0646${this.SUKUN}?|[\\u0621-\\u064A]${this.TANWIN})${this.WORD_BRIDGE}[\\u0644\\u0631]${this.SHADDA}?${this.HARAKAT_OPT}`,
        "gu"
      )
    },
    {
      id: "IKHFA",
      name: "Ikhfa Haqiqi",
      color: "#f59e0b",
      caraBaca: "Bunyi Nun Sukun atau Tanwin dibaca samar-samar (antara Izhar dan Idgham) dengan dengung 2 harakat saat bertemu salah satu dari 15 huruf Ikhfa.",
      pattern: new RegExp(
        `(?:\\u0646${this.SUKUN}|[\\u0621-\\u064A]${this.TANWIN})${this.WORD_BRIDGE}[\\u062A\\u062B\\u062C\\u062F\\u0630\\u0632\\u0633\\u0634\\u0635\\u0636\\u0637\\u0638\\u0641\\u0642\\u0643]${this.HARAKAT_OPT}`,
        "gu"
      )
    },
    {
      id: "GHUNNAH",
      name: "Ghunnah Musyaddadah",
      color: "#f43f5e",
      caraBaca: "Huruf Nun atau Mim yang bertasydid (نّ / مّ) wajib dibaca mendengung ke pangkal hidung (khaisyum) sepanjang 2 harakat.",
      pattern: new RegExp(
        `[\\u0646\\u0645]${this.SHADDA}${this.HARAKAT_OPT}`,
        "gu"
      )
    },
    {
      id: "QALQALAH",
      name: "Qalqalah (Pantulan)",
      color: "#3b82f6",
      caraBaca: "Huruf Qalqalah (ق ط ب ج د) yang berharakat sukun dibaca memantul secara jelas.",
      pattern: new RegExp(
        `[\\u0642\\u0637\\u0628\\u062C\\u062F]${this.SUKUN}`,
        "gu"
      )
    }
  ];

  /**
   * Menganalisis teks Arab dan menghasilkan daftar token non-overlapping
   * @param {string} text - Teks Arab berharakat
   * @param {string} filterRuleId - "ALL" atau ID aturan spesifik
   */
  static parseText(text, filterRuleId = "ALL") {
    if (!text || typeof text !== "string") {
      return { segments: [], matches: [], counts: {} };
    }

    const rawMatches = [];
    const counts = {};

    this.RULES.forEach((rule) => {
      counts[rule.id] = 0;
    });

    this.RULES.forEach((rule) => {
      if (filterRuleId !== "ALL" && rule.id !== filterRuleId) return;

      const regex = new RegExp(rule.pattern.source, "gu");
      let match;
      while ((match = regex.exec(text)) !== null) {
        const start = match.index;
        const end = start + match[0].length;
        rawMatches.push({
          ruleId: rule.id,
          ruleName: rule.name,
          caraBaca: rule.caraBaca,
          regexSource: rule.pattern.source,
          color: rule.color,
          matchedText: match[0],
          start,
          end
        });
      }
    });

    // Urutkan berdasarkan posisi kemunculan awal, lalu dahulukan match yang lebih panjang (spesifik)
    rawMatches.sort((a, b) => {
      if (a.start !== b.start) return a.start - b.start;
      return (b.end - b.start) - (a.end - a.start);
    });

    // Eliminasi token yang bertabrakan (Non-overlapping filter)
    const acceptedMatches = [];
    let lastEnd = -1;

    for (const m of rawMatches) {
      if (m.start >= lastEnd) {
        acceptedMatches.push(m);
        counts[m.ruleId] = (counts[m.ruleId] || 0) + 1;
        lastEnd = m.end;
      }
    }

    // Bangun potongan segmen teks murni & token tajwid untuk di-render secara aman ke DOM
    const segments = [];
    let cursor = 0;

    acceptedMatches.forEach((m, idx) => {
      if (m.start > cursor) {
        segments.push({
          type: "plain",
          text: text.slice(cursor, m.start)
        });
      }
      segments.push({
        type: "tajwid",
        text: m.matchedText,
        meta: { ...m, tokenIndex: idx }
      });
      cursor = m.end;
    });

    if (cursor < text.length) {
      segments.push({
        type: "plain",
        text: text.slice(cursor)
      });
    }

    return {
      segments,
      matches: acceptedMatches,
      counts
    };
  }
}
