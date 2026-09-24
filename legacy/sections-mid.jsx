// Dog Care — middle sections

const SERVICES = [
  {
    id: "kinology",
    icon: "🦴",
    tab: "Тренування",
    title: "Школа тренувань для собак",
    desc: "Загальний курс кінології та курс охорони. Навчаємо будувати стосунки з вашим улюбленцем без криків, стресу та страху.",
    features: ["У школі — 350 ₴/год", "На виїзд — 700 ₴/год", "Загальний курс", "Курс охорони", "12 занять/міс", "Для учнів — тренування безкошт."],
    price: 350,
    unit: "₴ / година",
    photo: "trainer + dog",
    src: "https://images.unsplash.com/photo-1587764379873-97837921fd44?w=900&q=80",
  },
  {
    id: "grooming",
    icon: "✂️",
    tab: "Грумінг",
    title: "Грумінг із любов’ю до породи",
    desc: "Стрижки, тримінг, гігієна, SPA. Працюємо тільки гіпоалергенною косметикою преміум‑класу — і ніколи не на крик.",
    features: ["Породна стрижка", "Гігієнічна обрізка", "Тримінг жорсткошерстих", "SPA з пілінгом", "Експрес‑линька", "Перукарська проба"],
    price: 500,
    unit: "₴ / сеанс",
    photo: "dog in grooming bath",
    src: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=900&q=80",
  },
  {
    id: "hotel",
    icon: "🏡",
    tab: "Зооготель",
    title: "Зооготель і зоосадок",
    desc: "Не клітки, а справжні кімнати з ліжечками і прогулянковим двором. Підтримка 24/7, регулярні вигули та звіти власникам.",
    features: ["Зоосадок — від 230 ₴/день", "Зооготель — від 550 ₴/доба", "Абонемент 30 днів", "Регулярні вигули", "Контроль здоров’я", "Щоденні фотозвіти"],
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
    features: ["Один вигул — 400 ₴", "Подвійний — 600 ₴", "Тренування в процесі", "Ментальні ігри", "Фізична активність", "Офіційний договір"],
    price: 400,
    unit: "₴ / вигул",
    photo: "dog walking",
    src: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=900&q=80",
  },
];

function Services() {
  const [active, setActive] = useState(0);
  const s = SERVICES[active];
  return (
    <section className="dc-section dc-section-light dc-services-section" id="services">
      {/* Perfectly smooth wave — C1-continuous tangents at every joint
         (control points on each side of a peak/valley share the same Y as the
         endpoint → horizontal tangent at peaks/valleys = no kinks). */}
      <svg className="dc-services-wave" viewBox="0 0 1920 200" preserveAspectRatio="none" aria-hidden="true">
        <path d="
          M 0 110
          C 160 110, 320 40, 480 40
          C 640 40, 800 130, 960 130
          C 1120 130, 1280 60, 1440 60
          C 1600 60, 1760 110, 1920 110
          L 1920 200
          L 0 200
          Z
        " fill="#FFFEF7" />
      </svg>
      <div className="dc-wrap">
        <SectionHead
          eyebrow="Що ми робимо"
          title={<>Послуг багато, <em>філософія</em> одна: поважати тварину</>}
          subtitle="Оберіть напрям — і подивіться, як виглядає наш підхід зсередини."
        />
        <div className="dc-tabs">
          {SERVICES.map((s, i) => (
            <button key={s.id}
              className={"dc-tab" + (i === active ? " active" : "")}
              onClick={() => setActive(i)}>
              <span className="dc-tab-icon">{s.icon}</span>
              {s.tab}
            </button>
          ))}
        </div>
        <div className="dc-service-panel">
          <div className="dc-service-photo">
            <div className="dc-service-photo-frame">
              <PH label={s.photo} src={s.src} />
            </div>
          </div>
          <div className="dc-service-content">
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <ul className="dc-service-features">
              {s.features.map(f => (
                <li key={f}>
                  <span className="dc-check">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6.5L5 9.5L10 3.5" stroke="#1A1814" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="dc-service-price">
              <span className="dc-service-price-from">від</span>
              <span className="dc-service-price-num">{s.price}</span>
              <span className="dc-service-price-unit">{s.unit}</span>
            </div>
            <a href="#contact" className="dc-btn dc-btn-primary"
              onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}>
              Записатися <span className="dc-btn-arrow"><Arrow /></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const PROCESS_STEPS = [
  { step: "01", title: "Знайомство", icon: "👋" },
  { step: "02", title: "Тест поведінки", icon: "🐾" },
  { step: "03", title: "План занять", icon: "📋" },
  { step: "04", title: "Заняття разом", icon: "🔧" },
  { step: "05", title: "Звіти і відео", icon: "📱" },
  { step: "06", title: "Випуск", icon: "🎓" },
];

function Process() {
  return (
    <section className="dc-process dc-section-with-wave" id="process">
      <WaveDivider from="#FFFEF7" variant="double" height={80} />
      {/* Decorative paw clusters on the sides — uploaded PNG assets */}
      <img className="dc-process-paws dc-process-paws-left" src="./assets/images/paws-left.png" alt="" aria-hidden="true" />
      <img className="dc-process-paws dc-process-paws-right" src="./assets/images/paws-right.png" alt="" aria-hidden="true" />
      <div className="dc-wrap" style={{ position: "relative", zIndex: 1 }}>
        <SectionHead
          eyebrow="Як ми працюємо"
          title={<>Шість кроків від першого знайомства до <em>випускного</em></>}
          align="center"
        />
        <div className="dc-process-stage">
          {PROCESS_STEPS.map((p, i) => (
            <div key={i} className={`dc-bubble dc-bubble-${i + 1}`}>
              <div className="dc-bubble-icon">{p.icon}</div>
              <div className="dc-bubble-text">
                <div className="dc-bubble-step">Крок {p.step}</div>
                <div className="dc-bubble-title">{p.title}</div>
              </div>
            </div>
          ))}
          <img className="dc-process-center" src="./assets/images/process-dog.png" alt="" />
        </div>
      </div>
    </section>
  );
}

const TRAINERS = [
  {
    name: "Маївський Павло",
    role: "Кінолог‑інструктор",
    badge: "~300 собак",
    photo: "Pavlo",
    spec: "Дресирування з 2016",
    src: "./assets/images/team-3.png",
    bio: "З дитинства захоплювався собаками. У 2014 р. закінчив аграрний коледж за спеціальністю «ветеринарія». У 2014–2016 рр. — молодший кінолог‑інструктор ТОВ «Секюрайті». З 2016 року займається дресируванням собак — вивчив близько 300 вихованців.",
    education: [
      "Аграрний коледж — ветеринарія, 2014",
      "ТОВ «Секюрайті» — кінолог‑інструктор, 2014–16",
      "Практика 3 роки у ветклініці «Олвет»",
    ],
    skills: ["Базовий курс", "Захисно‑караульна служба", "Корекція поведінки", "Робота з великими породами"],
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
    src: "./assets/images/team-2.png",
    bio: "Тварини для нього все. Закінчив Рогатинський коледж та Львівський університет за фахом «ветеринарна медицина». 2 роки працював у ветклініці. З 2022 р. займається дресируванням.",
    education: [
      "Рогатинський коледж — ветмедицина",
      "Львівський національний університет ветмедицини",
      "Дресирування собак з 2022",
    ],
    skills: ["Щенята", "Соціалізація", "Перша ветдопомога", "Праця з нервовими собаками"],
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
    src: "./assets/images/team-1.png",
    bio: "Закінчила курси зоопсихології у м. Вроцлав (Польща). Працювала в собачому притулку та займалася консультаціями, допомагаючи людям виправляти поведінку собак вдома. З 2021 р. — службова кінологія.",
    education: [
      "Курси зоопсихології, Вроцлав, Польща",
      "Робота в собачому притулку",
      "Службова кінологія з 2021",
    ],
    skills: ["Реактивність на поводку", "Страхи та фобії", "Консультації вдома", "Робота з притульними"],
    stats: { years: 5, dogs: 180, satisf: "98%" },
    favorite: "Безпородні врятовані",
    quote: "Якщо ваша собака робить все, що їй заманеться — є рішення.",
    languages: ["Українська", "Польська"],
  },
];
function TrainerModal({ trainer, onClose }) {
  useEffect(() => {
    if (!trainer) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [trainer]);
  if (!trainer) return null;
  const t = trainer;
  return (
    <div className="dc-modal-overlay" onClick={onClose}>
      <div className="dc-modal" onClick={(e) => e.stopPropagation()}>
        <button className="dc-modal-close" onClick={onClose} aria-label="Закрити">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <div className="dc-modal-photo">
          <PH label={t.photo} src={t.src} />
          <div className="dc-modal-photo-tag">
            <Heart size={12} /> {t.badge}
          </div>
        </div>
        <div className="dc-modal-body">
          <div className="dc-eyebrow-text" style={{ marginBottom: 8 }}>{t.role}</div>
          <h3 className="dc-modal-name">{t.name}</h3>
          <p className="dc-modal-bio">{t.bio}</p>

          <div className="dc-modal-stats">
            <div>
              <div className="dc-modal-stat-num">{t.stats.years}</div>
              <div className="dc-modal-stat-label">років досвіду</div>
            </div>
            <div>
              <div className="dc-modal-stat-num">{t.stats.dogs}+</div>
              <div className="dc-modal-stat-label">собак випущено</div>
            </div>
            <div>
              <div className="dc-modal-stat-num">{t.stats.satisf}</div>
              <div className="dc-modal-stat-label">вдоволення</div>
            </div>
          </div>

          <div className="dc-modal-quote">
            <svg className="dc-modal-quote-mark" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
              <path d="M0 216C0 149.7 53.7 96 120 96l8 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-8 0c-30.9 0-56 25.1-56 56l0 8 64 0c35.3 0 64 28.7 64 64l0 64c0 35.3-28.7 64-64 64l-64 0c-35.3 0-64-28.7-64-64l0-32 0-32 0-72zm256 0c0-66.3 53.7-120 120-120l8 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-8 0c-30.9 0-56 25.1-56 56l0 8 64 0c35.3 0 64 28.7 64 64l0 64c0 35.3-28.7 64-64 64l-64 0c-35.3 0-64-28.7-64-64l0-32 0-32 0-72z"/>
            </svg>
            {t.quote}
          </div>

          <div className="dc-modal-section">
            <h4>Спеціалізація</h4>
            <div className="dc-modal-chips">
              {t.skills.map(s => <span key={s} className="dc-modal-chip">{s}</span>)}
            </div>
          </div>

          <div className="dc-modal-section">
            <h4>Освіта і сертифікати</h4>
            <ul className="dc-modal-list">
              {t.education.map(e => (
                <li key={e}>
                  <span className="dc-check">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6.5L5 9.5L10 3.5" stroke="#1A1814" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {e}
                </li>
              ))}
            </ul>
          </div>

          <div className="dc-modal-row">
            <div className="dc-modal-section" style={{ flex: 1 }}>
              <h4>Улюблена порода</h4>
              <div style={{ fontWeight: 600 }}>{t.favorite}</div>
            </div>
            <div className="dc-modal-section" style={{ flex: 1 }}>
              <h4>Мови</h4>
              <div style={{ fontWeight: 600 }}>{t.languages.join(" · ")}</div>
            </div>
          </div>

          <div className="dc-modal-cta">
            <button className="dc-btn dc-btn-ghost" onClick={onClose}>
              Назад
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Team() {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <section className="dc-section dc-section-yellow" id="team">
      <PawScatter count={5}
         color="rgba(26, 24, 20, 0.06)" />
      <div className="dc-wrap" style={{ position: "relative", zIndex: 1 }}>
        <SectionHead
          eyebrow="Команда"
          title={<>Люди, до яких ви охоче залишите <em>найдорожче</em></>}
          subtitle="Кожен наш фахівець — це сертифікація, профільна освіта і десятки годин стажування на рік."
        />
        <div className="dc-team-grid">
          {TRAINERS.map((t, i) => (
            <button key={t.name} className="dc-trainer" onClick={() => setOpenIdx(i)}
              style={{ textAlign: "left", cursor: "pointer" }}>
              <div className="dc-trainer-photo">
                <PH label={t.photo} src={t.src} />
                <div className="dc-trainer-badge">
                  <Heart size={11} /> {t.badge}
                </div>
              </div>
              <h4 className="dc-trainer-name">{t.name}</h4>
              <p className="dc-trainer-role">{t.role} · {t.spec}</p>
              <div className="dc-trainer-foot">
                <span>відкрити</span>
                <span className="dc-trainer-arrow"><Arrow size={12} /></span>
              </div>
            </button>
          ))}
        </div>
      </div>
      <TrainerModal trainer={openIdx !== null ? TRAINERS[openIdx] : null} onClose={() => setOpenIdx(null)} />
    </section>
  );
}

Object.assign(window, { Services, Process, Team, TrainerModal, SERVICES, TRAINERS });
