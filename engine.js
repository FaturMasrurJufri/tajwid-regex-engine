/**
 * TajwidEngine PRO 16: Rule-Based Arabic Phonetic & Tajwid RegEx Parser
 * Mencakup 16 Kaidah Hukum Bacaan dengan Prioritas Non-Overlapping
 */
export class TajwidEngine {
  static SUKUN = "[\\u0652\\u06E1]";
  static SHADDA = "\\u0651";
  static MADDAH = "\\u0653";
  static TANWIN = "[\\u064B\\u064C\\u064D]";
  static FATHAH = "\\u064E";
  static DAMMAH = "\\u064F";
  static KASRAH = "\\u0650";
  static DAGGER_ALIF = "\\u0670";
  static HARAKAT_OPT = "[\\u064B-\\u065F\\u0670\\u06D6-\\u06ED]*";
  static WORD_BRIDGE = "(?:\\u0627?\\s+(?:[\\u0627\\u0671]\\u0644|[\\u0627\\u0671])?|\\s*)";

  static RULES = [
    // 1. RUMPUN NUN SUKUN & TANWIN (5 HUKUM)
    {
      id: "IZHAR_HALQI",
      name: "Izhar Halqi",
      priority: 95,
      color: "#22d3ee",
      caraBaca: "Bunyi Nun Sukun atau Tanwin dibaca jelas dan tegas tanpa dengung karena bertemu salah satu dari 6 huruf tenggorokan (ء هـ ع ح غ خ).",
      pattern: new RegExp(
        `(?:\\u0646${this.SUKUN}|[\\u0621-\\u064A]${this.TANWIN})${this.WORD_BRIDGE}[\\u0621\\u0623\\u0625\\u0627\\u0647\\u0639\\u062D\\u063A\\u062E]${this.HARAKAT_OPT}`,
        "gu"
      )
    },
    {
      id: "IDGHAM_BIGHUNNAH",
      name: "Idgham Bighunnah",
      priority: 96,
      color: "#10b981",
      caraBaca: "Bunyi Nun Sukun atau Tanwin dileburkan masuk ke huruf (ي ن م و) disertai dengung (ghunnah) sepanjang 2 harakat.",
      pattern: new RegExp(
        `(?:\\u0646${this.SUKUN}?|[\\u0621-\\u064A]${this.TANWIN})${this.WORD_BRIDGE}[\\u064A\\u0646\\u0645\\u0648]${this.SHADDA}?${this.HARAKAT_OPT}`,
        "gu"
      )
    },
    {
      id: "IDGHAM_BILAGHUNNAH",
      name: "Idgham Bilaghunnah",
      priority: 96,
      color: "#38bdf8",
      caraBaca: "Bunyi Nun Sukun atau Tanwin dileburkan penuh ke huruf Lam (ل) atau Ra (ر) secara jelas tanpa dengung.",
      pattern: new RegExp(
        `(?:\\u0646${this.SUKUN}?|[\\u0621-\\u064A]${this.TANWIN})${this.WORD_BRIDGE}[\\u0644\\u0631]${this.SHADDA}?${this.HARAKAT_OPT}`,
        "gu"
      )
    },
    {
      id: "IQLAB",
      name: "Iqlab",
      priority: 98,
      color: "#a855f7",
      caraBaca: "Bunyi Nun Sukun atau Tanwin dibalik/diubah menjadi bunyi Mim (م) yang disamarkan disertai dengung 2 harakat karena bertemu huruf Ba (ب).",
      pattern: new RegExp(
        `(?:\\u0646${this.SUKUN}?|\\u0646\\u06E2|[\\u0621-\\u064A][\\u064B\\u064C\\u064D\\u06E2])${this.WORD_BRIDGE}\\u0628${this.HARAKAT_OPT}`,
        "gu"
      )
    },
    {
      id: "IKHFA",
      name: "Ikhfa Haqiqi",
      priority: 94,
      color: "#f59e0b",
      caraBaca: "Bunyi Nun Sukun atau Tanwin dibaca samar-samar disertai dengung 2 harakat karena bertemu salah satu dari 15 huruf Ikhfa (ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك).",
      pattern: new RegExp(
        `(?:\\u0646${this.SUKUN}?|[\\u0621-\\u064A]${this.TANWIN})${this.WORD_BRIDGE}[\\u062A\\u062B\\u062C\\u062F\\u0630\\u0632\\u0633\\u0634\\u0635\\u0636\\u0637\\u0638\\u0641\\u0642\\u0643]${this.HARAKAT_OPT}`,
        "gu"
      )
    },

    // 2. RUMPUN MIM SUKUN & GHUNNAH (4 HUKUM)
    {
      id: "IKHFA_SYAFAWI",
      name: "Ikhfa Syafawi",
      priority: 97,
      color: "#ec4899",
      caraBaca: "Mim Sukun (مْ) bertemu huruf Ba (ب), dibaca samar di bibir dengan dengung 2 harakat.",
      pattern: new RegExp(
        `\\u0645${this.SUKUN}?\\s+\\u0628${this.HARAKAT_OPT}`,
        "gu"
      )
    },
    {
      id: "IDGHAM_MIMI",
      name: "Idgham Mimi",
      priority: 97,
      color: "#14b8a6",
      caraBaca: "Mim Sukun (مْ) bertemu huruf Mim (م) berharakat, dileburkan dengan dengung sepanjang 2 harakat.",
      pattern: new RegExp(
        `\\u0645${this.SUKUN}?\\s+\\u0645${this.SHADDA}?${this.HARAKAT_OPT}`,
        "gu"
      )
    },
    {
      id: "IZHAR_SYAFAWI",
      name: "Izhar Syafawi",
      priority: 82,
      color: "#84cc16",
      caraBaca: "Mim Sukun (مْ) bertemu huruf selain Mim dan Ba, dibaca jelas di bibir dengan mulut tertutup tanpa dengung.",
      pattern: new RegExp(
        `\\u0645${this.SUKUN}\\s*[\\u0621-\\u0627\\u062A-\\u0644\\u0646-\\u064A]${this.HARAKAT_OPT}`,
        "gu"
      )
    },
    {
      id: "GHUNNAH",
      name: "Ghunnah Musyaddadah",
      priority: 75,
      color: "#f43f5e",
      caraBaca: "Huruf Nun atau Mim bertasydid (نّ / مّ) wajib ditahan dan didengungkan ke pangkal hidung sepanjang 2 harakat.",
      pattern: new RegExp(
        `[\\u0646\\u0645]${this.SHADDA}${this.HARAKAT_OPT}`,
        "gu"
      )
    },

    // 3. RUMPUN ALIF LAM & QALQALAH (3 HUKUM)
    {
      id: "AL_SYAMSIYAH",
      name: "Alif Lam Syamsiyah",
      priority: 86,
      color: "#fb923c",
      caraBaca: "Huruf Lam pada Alif Lam (ال) tidak dibaca melainkan langsung dileburkan (idgham) ke dalam huruf Syamsiyah bertasydid di depannya.",
      pattern: new RegExp(
        `[\\u0627\\u0671]\\u0644[\\u062A\\u062B\\u062F\\u0630\\u0631\\u0632\\u0633\\u0634\\u0635\\u0636\\u0637\\u0638\\u0644\\u0646]${this.SHADDA}${this.HARAKAT_OPT}`,
        "gu"
      )
    },
    {
      id: "AL_QAMARIYAH",
      name: "Alif Lam Qamariyah",
      priority: 85,
      color: "#60a5fa",
      caraBaca: "Huruf Lam Sukun pada Alif Lam (الْ) dibaca jelas (izhar) saat bertemu salah satu dari 14 huruf Qamariyah.",
      pattern: new RegExp(
        `[\\u0627\\u0671]\\u0644${this.SUKUN}[\\u0621\\u0623\\u0625\\u0628\\u062C\\u062D\\u062E\\u0639\\u063A\\u0641\\u0642\\u0643\\u0645\\u0648\\u0647\\u064A]${this.HARAKAT_OPT}`,
        "gu"
      )
    },
    {
      id: "QALQALAH",
      name: "Qalqalah (Pantulan)",
      priority: 88,
      color: "#3b82f6",
      caraBaca: "Huruf Qalqalah (ق ط ب ج د) yang berharakat sukun dibaca memantul dengan jelas.",
      pattern: new RegExp(
        `[\\u0642\\u0637\\u0628\\u062C\\u062F]${this.SUKUN}`,
        "gu"
      )
    },

    // 4. RUMPUN HUKUM MAD & LAFADZ JALALAH (4 HUKUM)
    {
      id: "MAD_LAZIM",
      name: "Mad Lazim (6 Harakat)",
      priority: 99,
      color: "#e11d48",
      caraBaca: "Huruf Mad berharakat gelombang panjang (ـٓ) yang bertemu huruf bertasydid atau sukun asli dalam satu kata, wajib dipanjangkan 6 harakat.",
      pattern: new RegExp(
        `[\\u0627\\u0648\\u064A\\u0670]${this.MADDAH}[\\u0621-\\u064A]${this.SHADDA}${this.HARAKAT_OPT}`,
        "gu"
      )
    },
    {
      id: "MAD_WAJIB",
      name: "Mad Wajib Muttashil",
      priority: 93,
      color: "#d946ef",
      caraBaca: "Huruf Mad bertemu Hamzah (ء) dalam satu kata yang sama, wajib dibaca panjang 4 hingga 5 harakat.",
      pattern: new RegExp(
        `[\\u0627\\u0648\\u064A\\u0670]${this.MADDAH}?[\\u0621\\u0626\\u0624]${this.HARAKAT_OPT}`,
        "gu"
      )
    },
    {
      id: "MAD_JAIZ",
      name: "Mad Jaiz Munfashil",
      priority: 92,
      color: "#c084fc",
      caraBaca: "Huruf Mad di akhir kata bertemu dengan Hamzah (أ / إ) di awal kata berikutnya, dibaca panjang 4 atau 5 harakat.",
      pattern: new RegExp(
        `(?:[\\u0627\\u0648\\u064A\\u0670]${this.MADDAH}\\s*[\\u0623\\u0625\\u0627]|[\\u0627\\u0648\\u064A]${this.MADDAH}?\\s+[\\u0623\\u0625])${this.HARAKAT_OPT}`,
        "gu"
      )
    },
    {
      id: "LAFADZ_JALALAH",
      name: "Lafadz Jalalah (اللَّه)",
      priority: 90,
      color: "#eab308",
      caraBaca: "Lam pada lafadz Allah (اللَّه) dibaca tebal (Tafkhim) jika didahului Fathah/Dhammah, dan dibaca tipis (Tarqiq) jika didahului Kasrah.",
      pattern: new RegExp(
        `(?:[${this.FATHAH}${this.DAMMAH}${this.KASRAH}]\\s*)?[\\u0627\\u0671]?\\u0644\\u0644${this.SHADDA}${this.FATHAH}?\\u0670?\\u0647${this.HARAKAT_OPT}`,
        "gu"
      )
    },
    {
      id: "MAD_LAYYIN",
      name: "Mad Layyin (Lin)",
      priority: 70,
      color: "#2dd4bf",
      caraBaca: "Huruf Wawu Sukun (وْ) atau Ya Sukun (يْ) yang didahului huruf berharakat Fathah, dibaca lunak dan boleh dipanjangkan 2, 4, atau 6 harakat saat waqaf.",
      pattern: new RegExp(
        `[\\u0621-\\u064A]${this.FATHAH}[\\u0648\\u064A]${this.SUKUN}`,
        "gu"
      )
    },
    {
      id: "MAD_THABII",
      name: "Mad Thabi'i (Asli)",
      priority: 50,
      color: "#94a3b8",
      caraBaca: "Bacaan panjang asli 2 harakat (Fathah diikuti Alif, Kasrah diikuti Ya Sukun, atau Dhammah diikuti Wawu Sukun).",
      pattern: new RegExp(
        `(?:${this.FATHAH}\\u0627|${this.DAGGER_ALIF}|${this.KASRAH}\\u064A${this.SUKUN}?|${this.DAMMAH}\\u0648${this.SUKUN}?)`,
        "gu"
      )
    }
  ];

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
        if (!match[0] || match[0].length === 0) break;
        const start = match.index;
        const end = start + match[0].length;
        rawMatches.push({
          ruleId: rule.id,
          ruleName: rule.name,
          priority: rule.priority,
          caraBaca: rule.caraBaca,
          regexSource: rule.pattern.source,
          color: rule.color,
          matchedText: match[0],
          start,
          end
        });
      }
    });

    // Seleksi Non-Overlapping Berdasarkan Prioritas & Panjang Match
    rawMatches.sort((a, b) => {
      if (b.priority !== a.priority) return b.priority - a.priority;
      if ((b.end - b.start) !== (a.end - a.start)) return (b.end - b.start) - (a.end - a.start);
      return a.start - b.start;
    });

    const occupied = new Array(text.length).fill(false);
    const acceptedMatches = [];

    for (const m of rawMatches) {
      let conflict = false;
      for (let i = m.start; i < m.end; i++) {
        if (occupied[i]) {
          conflict = true;
          break;
        }
      }
      if (!conflict) {
        for (let i = m.start; i < m.end; i++) {
          occupied[i] = true;
        }
        acceptedMatches.push(m);
        counts[m.ruleId] = (counts[m.ruleId] || 0) + 1;
      }
    }

    // Urutkan kembali berdasarkan indeks kemunculan karakter untuk rendering DOM
    acceptedMatches.sort((a, b) => a.start - b.start);

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
