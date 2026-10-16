/* Dog Care — default editable content (services, trainers, pricing) and the rules for merging
   it with what admin.html saved to Firestore (`site_content/<key>`, JSON under `json`).
   Loaded as a plain script by index.html and admin.html so both use the same defaults.
   See CLAUDE.md → "Content architecture". */
(function () {
  const SERVICES = [
    {
      id: "kinology",
      icon: "🦴",
      tab: "Тренування",
      title: "Школа тренувань для собак",
      desc: "Загальний курс кінології та курс охорони. Навчаємо будувати стосунки з вашим улюбленцем без криків, стресу та страху.",
      features: [
        "У школі — 350 ₴/год",
        "На виїзд — 700 ₴/год",
        "Загальний курс",
        "Курс охорони",
        "12 занять/міс",
        "Для учнів — тренування безкошт.",
      ],
      price: 350,
      unit: "₴ / година",
      photo: "trainer + dog",
      src: "assets/images/training-dog.jpg",
    },
    {
      id: "grooming",
      icon: "✂️",
      tab: "Грумінг",
      title: "Грумінг із любов’ю до породи",
      desc: "Стрижки, тримінг, гігієна, SPA. Працюємо тільки гіпоалергенною косметикою преміум‑класу — і ніколи не на крик.",
      features: [
        "Породна стрижка",
        "Гігієнічна обрізка",
        "Тримінг жорсткошерстих",
        "SPA з пілінгом",
        "Експрес‑линька",
        "Перукарська проба",
      ],
      price: 500,
      unit: "₴ / сеанс",
      photo: "dog in grooming bath",
      src: "assets/images/grooming-dog.jpg",
    },
    {
      id: "hotel",
      icon: "🏡",
      tab: "Зооготель",
      title: "Зооготель і зоосадок",
      desc: "Не клітки, а справжні кімнати з ліжечками і прогулянковим двором. Підтримка 24/7, регулярні вигули та звіти власникам.",
      features: [
        "Зоосадок — від 230 ₴/день",
        "Зооготель — від 550 ₴/доба",
        "Абонемент 30 днів",
        "Регулярні вигули",
        "Контроль здоров’я",
        "Щоденні фотозвіти",
      ],
      price: 230,
      unit: "₴ / день",
      photo: "cozy dog room",
      src: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=900&q=80",
    },
    {
      id: "nanny",
      icon: "🚶",
      tab: "Зооняня",
      title: "Зооняня — вигул і догляд",
      desc: "Зооняня приїжджає до вас додому та забирає песика на прогулянку. Песик закриває усі свої потреби, грається, повторює команди і тренується.",
      features: [
        "Один вигул — 400 ₴",
        "Подвійний — 600 ₴",
        "Тренування в процесі",
        "Ментальні ігри",
        "Фізична активність",
        "Офіційний договір",
      ],
      price: 400,
      unit: "₴ / вигул",
      photo: "dog walking",
      src: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=900&q=80",
    },
  ];

  const TRAINERS = [
    {
      name: "Маївський Павло",
      role: "Кінолог‑інструктор",
      badge: "~300 собак",
      photo: "Pavlo",
      spec: "Дресирування з 2016",
      src: "assets/images/team-3.png",
      bio: "З дитинства захоплювався собаками. У 2014 р. закінчив аграрний коледж за спеціальністю «ветеринарія». У 2014–2016 рр. — молодший кінолог‑інструктор ТОВ «Секюрайті». З 2016 року займається дресируванням собак — вивчив близько 300 вихованців.",
      education: [
        "Аграрний коледж — ветеринарія, 2014",
        "ТОВ «Секюрайті» — кінолог‑інструктор, 2014–16",
        "Практика 3 роки у ветклініці «Олвет»",
      ],
      skills: [
        "Базовий курс",
        "Захисно‑караульна служба",
        "Корекція поведінки",
        "Робота з великими породами",
      ],
      stats: { years: 10, dogs: 300, satisf: "100%" },
      favorite: "Німецький вівчар",
      quote: "Собаки слухають, але тих, хто вміє говорити.",
      languages: ["Українська"],
    },
    {
      name: "Попадюк Тарас",
      role: "Кінолог, ветфельдшер",
      badge: "ЛНУВМ",
      photo: "Taras",
      spec: "Спільна мова з кожною",
      src: "assets/images/team-2.png",
      bio: "Тварини для нього все. Закінчив Рогатинський коледж та Львівський університет за фахом «ветеринарна медицина». 2 роки працював у ветклініці. З 2022 р. займається дресируванням.",
      education: [
        "Рогатинський коледж — ветмедицина",
        "Львівський національний університет ветмедицини",
        "Дресирування собак з 2022",
      ],
      skills: [
        "Щенята",
        "Соціалізація",
        "Перша ветдопомога",
        "Праця з нервовими собаками",
      ],
      stats: { years: 4, dogs: 220, satisf: "99%" },
      favorite: "Лабрадор",
      quote: "Знайду спільну мову з кожною собакою.",
      languages: ["Українська"],
    },
    {
      name: "Плещинська Вероніка",
      role: "Зоопсихолог, кінолог",
      badge: "Вроцлав",
      photo: "Veronika",
      spec: "Корекція поведінки",
      src: "assets/images/team-1.png",
      bio: "Закінчила курси зоопсихології у м. Вроцлав (Польща). Працювала в собачому притулку та займалася консультаціями, допомагаючи людям виправляти поведінку собак вдома. З 2021 р. — службова кінологія.",
      education: [
        "Курси зоопсихології, Вроцлав, Польща",
        "Робота в собачому притулку",
        "Службова кінологія з 2021",
      ],
      skills: [
        "Реактивність на поводку",
        "Страхи та фобії",
        "Консультації вдома",
        "Робота з притульними",
      ],
      stats: { years: 5, dogs: 180, satisf: "98%" },
      favorite: "Безпородні врятовані",
      quote: "Якщо ваша собака робить все, що їй заманеться — є рішення.",
      languages: ["Українська", "Польська"],
    },
  ];

  const PRICING_GROUPS = [
    {
      id: "consult",
      label: "Консультації",
      icon: "💬",
      desc: "Індивідуальні консультації з кінологом для оцінки поведінки і складання плану.",
      rows: [
        { service: "У школі", duration: "1 година", price: "700 ₴" },
        {
          service: "На виїзд",
          duration: "1 година",
          price: "~900 ₴",
          note: "без пального",
        },
      ],
      includes: [
        "Оцінка поведінки та темпераменту собаки",
        "Складання індивідуального плану корекції",
        "Письмові рекомендації після сеансу",
        "Відповіді на всі запитання власника",
        "Консультація щодо харчування і режиму",
      ],
    },
    {
      id: "group",
      label: "Групові заняття",
      icon: "🐾",
      desc: "Заняття у міні‑групі — собаки соціалізуються та вчаться працювати в оточенні.",
      rows: [
        {
          service: "1 раз на тиждень · 1 год · школа",
          duration: "1 заняття",
          price: "350 ₴",
        },
      ],
      footnote: "Для діючих учнів школи DOG CARE тренування безкоштовні.",
      includes: [
        "Соціалізація з іншими собаками",
        "Навчання базових і розширених команд",
        "Корекція поведінки в соціальному середовищі",
        "Домашнє завдання і матеріали після заняття",
        "Рекомендації кінолога між заняттями",
      ],
    },
    {
      id: "nanny",
      label: "Зооняня",
      icon: "🚶",
      desc: "Зооняня приїжджає до вас додому та забирає песика на прогулянку: вигул, ментальні ігри, фізична активність і тренування.",
      rows: [
        { service: "Один вигул", duration: "1 година", price: "400 ₴" },
        {
          service: "Подвійний вигул",
          duration: "2 години",
          price: "600 ₴",
        },
      ],
      includes: [
        "Складання офіційного договору за бажанням",
        "Вигул собаки",
        "Тренування і ментальні ігри",
        "Фізична активність (м’ячик, стрибки, пробіжки)",
        "Транспортні витрати зооняні",
        "Навички кінолога в зооняні",
      ],
    },
    {
      id: "courses",
      label: "Курси кінології",
      icon: "🎓",
      desc: "Повноцінні курси дресирування — загальний і охоронний.",
      rows: [
        {
          service: "Загальний курс",
          duration: "мін. 3–4 міс · 12 занять/міс",
          price: "180 €/міс",
        },
        {
          service: "Курс охорони",
          duration: "1–2 міс · 12 занять/міс",
          price: "230 €/міс",
        },
      ],
      includes: [
        "12 індивідуальних занять на місяць",
        "Персональна програма навчання",
        "Письмовий план і звіти прогресу",
        "Чат з кінологом між заняттями",
        "Фінальна атестація з сертифікатом",
      ],
    },
    {
      id: "hotel",
      label: "Зооготель",
      icon: "🏡",
      desc: "Передержка з прогулянками і доглядом. Ціни залежать від ваги собаки.",
      weightTabs: [
        {
          label: "до 10 кг",
          rows: [
            { service: "1 година", price: "230 ₴" },
            { service: "Зоосадок · день", price: "550 ₴" },
            { service: "Зооготель · доба", price: "650 ₴" },
            { service: "Абонемент 30 днів", price: "17 550 ₴" },
          ],
        },
        {
          label: "10–25 кг",
          rows: [
            { service: "1 година", price: "280 ₴" },
            { service: "Зоосадок · день", price: "650 ₴" },
            { service: "Зооготель · доба", price: "750 ₴" },
            { service: "Абонемент 30 днів", price: "20 250 ₴" },
          ],
        },
        {
          label: "від 25 кг",
          rows: [
            { service: "1 година", price: "330 ₴" },
            { service: "Зоосадок · день", price: "750 ₴" },
            { service: "Зооготель · доба", price: "850 ₴" },
            { service: "Абонемент 30 днів", price: "22 950 ₴" },
          ],
        },
      ],
      includes: [
        "Окреме комфортне місце для відпочинку",
        "Прогулянки 3 рази на день",
        "Годування за розкладом власника",
        "Відеоспостереження 24/7",
        "Щоденні фото- та відеозвіти",
      ],
    },
  ];

  // Bump when the shape/meaning of saved content changes; admin.html stores it as `schema`
  // next to `json` in each site_content doc (and as localStorage `dc_content_schema`).
  const SCHEMA = 2;

  // Values the pre-v2 admin.html defaults seeded into Firestore that never matched the site.
  const LEGACY_VALUES = new Set([
    "https://images.unsplash.com/photo-1587764379873-97837921fd44?w=900&q=80",
    "https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=900&q=80",
    "Індивідуальні консультації з кінологом.",
    "Заняття у міні‑групі.",
    "Вигул, ментальні ігри, фізична активність.",
    "Повноцінні курси дресирування.",
  ]);

  const DEFAULTS = { services: SERVICES, trainers: TRAINERS, pricing: PRICING_GROUPS };
  const clone = (v) => JSON.parse(JSON.stringify(v));
  const keyOf = (kind, item) => (kind === "trainers" ? item.name : item.id);
  // Old admin defaults used ' where the site uses ’ — treat such values as unedited.
  const sameText = (a, b) =>
    JSON.stringify(a).replace(/’/g, "'") === JSON.stringify(b).replace(/’/g, "'");

  function defaults(kind) {
    return clone(DEFAULTS[kind]);
  }

  // Saved items keep their order and membership; fields they lack (or an empty `src`) come from
  // the matching default item. For pre-v2 data, leftover old-admin defaults are replaced and
  // default items that seed dropped are restored.
  function merge(kind, saved, schema) {
    const defs = defaults(kind);
    if (!Array.isArray(saved)) return defs;
    const legacy = !(schema >= SCHEMA);
    const byKey = new Map(defs.map((d) => [keyOf(kind, d), d]));
    const out = saved.map((item) => {
      const def = byKey.get(keyOf(kind, item));
      if (!def) return item;
      const merged = { ...def, ...item };
      Object.keys(def).forEach((f) => {
        const v = item[f];
        if (v === undefined || (f === "src" && !v)) merged[f] = def[f];
        else if (legacy && (LEGACY_VALUES.has(v) || sameText(v, def[f]))) merged[f] = def[f];
      });
      return merged;
    });
    if (legacy) {
      defs.forEach((d, i) => {
        if (!out.some((x) => keyOf(kind, x) === keyOf(kind, d)))
          out.splice(Math.min(i, out.length), 0, d);
      });
    }
    return out;
  }

  window.DCContent = { SCHEMA, defaults, merge };
})();
