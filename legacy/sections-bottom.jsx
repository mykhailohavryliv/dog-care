// Dog Care — bottom sections

const PLANS = [
  {
    name: "Базовий курс",
    desc: "10 індивідуальних занять для щенят і молодих собак.",
    price: "4 500",
    unit: "₴ / курс",
    features: ["10 занять по 60 хв", "Письмовий план", "Чат з кінологом", "Базові команди"],
  },
  {
    name: "Все включено",
    desc: "Кінологія + грумінг + 7 днів готелю на канікули.",
    price: "9 800",
    unit: "₴ / місяць",
    features: ["20 занять", "2 грумінг‑сеанси", "7 днів готелю", "Експрес ветогляд", "Пріоритетне бронювання"],
    featured: true,
  },
  {
    name: "Зоо‑готель",
    desc: "Безпечне і затишне місце поки вас немає вдома.",
    price: "380",
    unit: "₴ / доба",
    features: ["Окрема кімната", "Прогулянки 3 р/день", "Камера 24/7", "Щоденні фотозвіти"],
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
      { service: "На виїзд", duration: "1 година", price: "~900 ₴", note: "без пального" },
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
      { service: "1 раз на тиждень · 1 год · школа", duration: "1 заняття", price: "350 ₴" },
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
      { service: "Подвійний вигул", duration: "2 години", price: "600 ₴" },
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
      { service: "Загальний курс", duration: "мін. 3–4 міс · 12 занять/міс", price: "180 €/міс" },
      { service: "Курс охорони", duration: "1–2 міс · 12 занять/міс", price: "230 €/міс" },
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

function PriceIcon({ id, size = 22 }) {
  if (id === "consult") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
  if (id === "group") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
  if (id === "nanny") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2" />
      <path d="M5 22v-3a7 7 0 0 1 14 0v3" />
      <path d="M12 9v4l2 2" />
    </svg>
  );
  if (id === "courses") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
  if (id === "hotel") return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
  return null;
}

function Pricing() {
  const [activeTab, setActiveTab] = useState(0);
  const [hotelTab, setHotelTab] = useState(0);
  const group = PRICING_GROUPS[activeTab];
  const rows = group.weightTabs ? group.weightTabs[hotelTab].rows : group.rows;

  return (
    <section className="dc-section dc-section-white dc-section-with-wave" id="pricing">
      <WaveDivider from="#D80032" variant="pebble" height={80} />
      <div className="dc-wrap">
        <SectionHead
          eyebrow="Прайс — Dog Care"
          title={<>Прозорі ціни <em>без сюрпризів</em> у чеку</>}
          subtitle="Школа, зооготель та грумінг у Івано‑Франківську. Для діючих учнів школи тренування — безкоштовні."
        />

        <div className="dc-price-tabs">
          {PRICING_GROUPS.map((g, i) => (
            <button
              key={g.id}
              className={"dc-price-tab" + (activeTab === i ? " active" : "")}
              onClick={() => setActiveTab(i)}
              aria-pressed={activeTab === i}
            >
              <span className="dc-price-tab-icon"><PriceIcon id={g.id} size={16} /></span>
              {g.label}
            </button>
          ))}
        </div>

        <div className="dc-price-panel">
          {/* Full-width dark header */}
          <div className="dc-price-header">
            <div className="dc-price-header-icon"><PriceIcon id={group.id} size={26} /></div>
            <div className="dc-price-header-text">
              <h3 className="dc-price-header-title">{group.label}</h3>
              <p className="dc-price-header-desc">{group.desc}</p>
            </div>
            {group.footnote && (
              <div className="dc-price-header-note">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="8" />
                  <line x1="12" y1="12" x2="12" y2="16" />
                </svg>
                {group.footnote}
              </div>
            )}
            <a href="#contact" className="dc-btn dc-btn-primary" style={{ flexShrink: 0 }}
              onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}>
              Записатися <span className="dc-btn-arrow"><Arrow /></span>
            </a>
          </div>

          {/* Cream body */}
          <div className={"dc-price-body" + (group.includes ? " dc-price-body-split" : "")}>
            <div>
              {group.weightTabs && (
                <div className="dc-weighttabs">
                  {group.weightTabs.map((w, i) => (
                    <button key={w.label}
                      className={"dc-weighttab" + (hotelTab === i ? " active" : "")}
                      onClick={() => setHotelTab(i)}>
                      {w.label}
                    </button>
                  ))}
                </div>
              )}
              <div className="dc-price-rows">
                {rows.map((r, i) => (
                  <div key={i} className="dc-price-row">
                    <div className="dc-price-row-left">
                      <div className="dc-price-row-name">{r.service}</div>
                      {r.duration && <div className="dc-price-row-dur">{r.duration}</div>}
                    </div>
                    <div className="dc-price-row-right">
                      <div className="dc-price-row-amount">{r.price}</div>
                      {r.note && <div className="dc-price-row-note">{r.note}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {group.includes && (
              <div className="dc-price-features-area">
                <div className="dc-price-features-label">Що входить:</div>
                <ul className="dc-price-features">
                  {group.includes.map(f => (
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
              </div>
            )}
          </div>
        </div>

        <div className="dc-pricing-cta">
          <div>
            <h4>Залишились запитання?</h4>
            <p>Отримайте безкоштовну консультацію від спеціаліста.</p>
          </div>
          <a href="#contact" className="dc-btn dc-btn-primary"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}>
            Залишити заявку <span className="dc-btn-arrow"><Arrow /></span>
          </a>
        </div>
      </div>
    </section>
  );
}

const TESTI = [
  { quote: "За 6 тижнів наш Рекс перестав тягнути повідок і слухається без ласощів. Магія, але насправді — професіоналізм Оксани.", name: "Ірина", pet: "та Рекс (3 р., лабрадор)", stars: 5, initials: "ІР" },
  { quote: "Залишали Бусю на 10 днів у готелі — і отримували фото щодня. Повернулися — собака не схудла і навіть навчилася давати лапу.", name: "Дмитро", pet: "та Буся (5 р., шпіц)", stars: 5, initials: "ДМ" },
  { quote: "Максим — грумер від Бога. Йоркі вперше не тремтів у ванні, а потім ще й хвостом виляв, коли йшли додому.", name: "Олена", pet: "та Тоша (2 р., йорк)", stars: 5, initials: "ОК" },
];

// Відео з каналу @dogcare888 (https://www.youtube.com/@dogcare888)
const VIDEOS = [
  { id: "5bshyFuJog0", title: "Дресирування цуценя Фреді" },
  { id: "JCOA99ojZts", title: "Коргі Рональд — тренування" },
  { id: "KUv0W0bBB1o", title: "Тренування Айви" },
  { id: "gFkc4kjNdFo", title: "Бельгійська вівчарка Едісон · охорона" },
  { id: "bdQR34DnA6U", title: "Жести на відстані" },
  { id: "de_A4AMnLbs", title: "Токіо — тренування в парку" },
];

function VideoSlider() {
  const [active, setActive] = useState(null);
  const trackRef = useRef(null);
  const slide = (dir) => {
    const t = trackRef.current;
    const card = t?.querySelector(".dc-video");
    if (!card) return;
    t.scrollBy({ left: dir * (card.offsetWidth + 22), behavior: "smooth" });
  };
  return (
    <div className="dc-videos">
      <div className="dc-videos-head">
        <h3>Подивіться, як це у нас</h3>
        <div className="dc-videos-nav">
          <button onClick={() => slide(-1)} aria-label="Попереднє">‹</button>
          <button onClick={() => slide(1)} aria-label="Наступне">›</button>
        </div>
      </div>
      <div className="dc-videos-track" ref={trackRef}>
        {VIDEOS.map((v) => (
          <div key={v.id} className="dc-video">
            {active === v.id ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`}
                title={v.title}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button className="dc-video-thumb" onClick={() => setActive(v.id)} aria-label={`Відтворити: ${v.title}`}>
                <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt="" loading="lazy" />
                <span className="dc-video-overlay" aria-hidden="true">
                  <span className="dc-video-play">▶</span>
                </span>
                <span className="dc-video-title">{v.title}</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <section className="dc-section dc-section-light">
      <div className="dc-wrap">
        <SectionHead
          eyebrow="Відгуки"
          title={<>Що кажуть наші <em>випускники</em> та їхні люди</>}
          subtitle="Більше 480 відгуків з оцінкою 5/5 на Google і Facebook."
        />
        <div className="dc-testi-row">
          {TESTI.map((t, i) => (
            <div key={i} className="dc-testi">
              <div className="dc-testi-stars">★★★★★</div>
              <p className="dc-testi-quote">«{t.quote}»</p>
              <div className="dc-testi-author">
                <div className="dc-testi-avatar">{t.initials}</div>
                <div>
                  <div className="dc-testi-name">{t.name}</div>
                  <div className="dc-testi-pet">{t.pet}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <VideoSlider />
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Кінологія", "Грумінг", "Зоо‑готель", "Соціалізація", "Догляд", "З любов'ю", "Без стресу"];
  const line = (
    <span>
      {items.map((w, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 56 }}>
          {w}
          <PawPrint size={22} color="#D80032" />
        </span>
      ))}
    </span>
  );
  return (
    <div className="dc-marquee">
      <div className="dc-marquee-track">
        {line}{line}
      </div>
    </div>
  );
}

function ContactForm() {
  const [data, setData] = useState({
    name: "", phone: "", pet: "", service: "Курс кінології", message: "",
  });
  const [sent, setSent] = useState(false);
  const services = ["Курс кінології", "Грумінг", "Зоо‑готель", "Консультація"];
  function submit(e) {
    e.preventDefault();
    if (!data.name || !data.phone) return;
    setSent(true);
  }
  return (
    <section className="dc-section dc-section-yellow dc-section-with-wave dc-contact-section" id="contact">
      <WaveDivider from="#FFFEF7" variant="soft" height={80} flip={true} />
      <img className="dc-contact-paws dc-contact-paws-left" src="./assets/images/paws-left.png" alt="" aria-hidden="true" />
      <img className="dc-contact-paws dc-contact-paws-right" src="./assets/images/paws-right.png" alt="" aria-hidden="true" />
      <div className="dc-wrap" style={{ position: "relative", zIndex: 1 }}>
        <div className="dc-form-card">
          <div className="dc-form-side">
            <h2>Запишіть свого <em>хвостика</em> на пробне заняття</h2>
            <p>Залиште номер — і ми передзвонимо протягом 15 хвилин у робочий час, щоб підібрати зручний час і спеціаліста.</p>
            <div className="dc-contact-row">
              <span className="dc-contact-ic">📞</span> +380 (66) 130 8884
            </div>
            <div className="dc-contact-row">
              <span className="dc-contact-ic">✉️</span> dogcare8888@gmail.com
            </div>
            <div className="dc-contact-row">
              <span className="dc-contact-ic">📍</span> Івано-Франківськ, вул. Молодіжна 40
            </div>
            <div className="dc-contact-row">
              <span className="dc-contact-ic">⏰</span> Пн–Нд · 8:00 — 21:00
            </div>
          </div>
          <form className="dc-form" onSubmit={submit}>
            <div className="dc-form-row">
              <div className="dc-input-wrap">
                <span className="dc-input-label">Ваше ім'я</span>
                <input className="dc-input" placeholder="Наталя"
                  value={data.name} onChange={e => setData({ ...data, name: e.target.value })} />
              </div>
              <div className="dc-input-wrap">
                <span className="dc-input-label">Телефон</span>
                <input className="dc-input" placeholder="+380 __ ___ __ __"
                  value={data.phone} onChange={e => setData({ ...data, phone: e.target.value })} />
              </div>
            </div>
            <div className="dc-input-wrap">
              <span className="dc-input-label">Кличка та порода</span>
              <input className="dc-input" placeholder="Рекс, лабрадор · 1 рік"
                value={data.pet} onChange={e => setData({ ...data, pet: e.target.value })} />
            </div>
            <div className="dc-input-wrap">
              <span className="dc-input-label">Що цікавить</span>
              <div className="dc-pill-row">
                {services.map(s => (
                  <button type="button" key={s}
                    className={"dc-pill" + (data.service === s ? " active" : "")}
                    onClick={() => setData({ ...data, service: s })}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="dc-input-wrap">
              <span className="dc-input-label">Коротко про вашого хвостика</span>
              <textarea className="dc-input" placeholder="Тягне повідок, гавкає на велосипедистів…"
                value={data.message} onChange={e => setData({ ...data, message: e.target.value })} />
            </div>
            <button type="submit" className="dc-form-submit">
              Записатися безкоштовно <Arrow />
            </button>
          </form>
          {sent && (
            <div className="dc-form-success">
              <div className="dc-success-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12.5L10 17.5L19 7.5" stroke="#1A1814" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 style={{ fontFamily: "var(--display)", fontSize: 28, margin: 0, letterSpacing: "-0.03em" }}>
                Дякуємо, {data.name || "друже"}!
              </h3>
              <p style={{ color: "var(--ink-2)", maxWidth: 360, margin: 0 }}>
                Ми передзвонимо протягом 15 хвилин на {data.phone || "ваш номер"}, щоб погодити час і фахівця.
              </p>
              <button className="dc-btn dc-btn-ghost" onClick={() => setSent(false)}>
                Записати ще одного хвостика
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const ZM_CATEGORIES = [
  {
    name: "Натуральний корм", desc: "Royal Canin, Brit, Acana", priceFrom: "від 320 ₴", icon: "🥩",
    src: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=600&q=80",
    items: [
      { name: "Royal Canin Medium Adult 4 кг", desc: "Для собак середніх порід, 1+ року", price: "1 450 ₴",
        src: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&q=80" },
      { name: "Brit Premium Junior 3 кг", desc: "Курка з рисом, для цуценят великих порід", price: "980 ₴",
        src: "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=500&q=80" },
      { name: "Acana Pacifica 2 кг", desc: "Беззернова формула, риба океану", price: "1 620 ₴",
        src: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=500&q=80" },
      { name: "Hill's Science Diet 7 кг", desc: "Для дорослих собак з нормальною активністю", price: "2 890 ₴",
        src: "https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?w=500&q=80" },
      { name: "Pro Plan Sensitive 3 кг", desc: "При чутливому травленні, лосось", price: "1 320 ₴",
        src: "https://images.unsplash.com/photo-1622484212385-1d28c08bcb7d?w=500&q=80" },
      { name: "Farmina N&D 2.5 кг", desc: "Беззерновий курка з гранатом", price: "1 480 ₴",
        src: "https://images.unsplash.com/photo-1601758174039-c46b09e8fb87?w=500&q=80" },
    ],
  },
  {
    name: "Іграшки та канати", desc: "Безпечні, для жування", priceFrom: "від 89 ₴", icon: "🦴",
    src: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&q=80",
    items: [
      { name: "Канат бавовняний", desc: "Для перетягування і жування, ø 22 мм", price: "120 ₴",
        src: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&q=80" },
      { name: "Гумовий мʼячик Kong", desc: "Незнищенний, з пустотою для ласощів", price: "320 ₴",
        src: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&q=80" },
      { name: "Іграшка-пищалка плюш", desc: "Для тихої гри вдома, з пищиком", price: "89 ₴",
        src: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=500&q=80" },
      { name: "Канат-вісімка", desc: "Подвійний вузол, тренує щелепи", price: "180 ₴",
        src: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=500&q=80" },
      { name: "Інтерактивна головоломка", desc: "Розвиває кмітливість, ховаємо ласощі", price: "450 ₴",
        src: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=500&q=80" },
      { name: "Фрісбі для собак", desc: "Мʼяке, не травмує зуби", price: "240 ₴",
        src: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&q=80" },
    ],
  },
  {
    name: "Лежаки та будиночки", desc: "Усі розміри, від щенят до сенбернарів", priceFrom: "від 750 ₴", icon: "🏠",
    src: "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=600&q=80",
    items: [
      { name: "Лежак-подушка S (50×40)", desc: "Знімний чохол, можна прати", price: "750 ₴",
        src: "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=500&q=80" },
      { name: "Лежак-кошик M (70×55)", desc: "Високі борти, тепло і затишно", price: "1 200 ₴",
        src: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=500&q=80" },
      { name: "Будиночок для малих порід", desc: "Закрита печера, тонована сітка", price: "2 400 ₴",
        src: "https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=500&q=80" },
      { name: "Лежак-матрац L (90×65)", desc: "Для великих порід, антиалергенний", price: "1 890 ₴",
        src: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=500&q=80" },
      { name: "Підстилка ортопедична", desc: "Памʼять форми, для літніх собак", price: "1 650 ₴",
        src: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=500&q=80" },
      { name: "Будиночок-печера плюш", desc: "Для маленьких порід, дуже мʼякий", price: "1 980 ₴",
        src: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&q=80" },
    ],
  },
  {
    name: "Аксесуари", desc: "Повідки, нашийники, переноски", priceFrom: "від 150 ₴", icon: "🎒",
    src: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=600&q=80",
    items: [
      { name: "Нашийник шкіряний", desc: "Натуральна шкіра, латунна фурнітура", price: "380 ₴",
        src: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=500&q=80" },
      { name: "Повідок-рулетка 5 м", desc: "Для собак до 25 кг, з фіксатором", price: "650 ₴",
        src: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=500&q=80" },
      { name: "Переноска S (до 6 кг)", desc: "Для авто і літака, вентильована", price: "890 ₴",
        src: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=500&q=80" },
      { name: "Шлейка з відбивачами", desc: "H-подібна, регульована", price: "520 ₴",
        src: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&q=80" },
      { name: "Миска подвійна на стійці", desc: "Сталь, нековзка, регульована висота", price: "280 ₴",
        src: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&q=80" },
      { name: "Гребінець-фурмінатор M", desc: "Видаляє підшерсток, не травмує", price: "740 ₴",
        src: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&q=80" },
    ],
  },
];

function ZoomarketModal({ category, onClose, onOrder }) {
  useEffect(() => {
    if (!category) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [category, onClose]);
  if (!category) return null;
  return (
    <div className="dc-modal-overlay" onClick={onClose}>
      <div className="dc-modal dc-modal-products" onClick={(e) => e.stopPropagation()}>
        <button className="dc-modal-close" onClick={onClose} aria-label="Закрити">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <div className="dc-modal-body">
          <div className="dc-zm-modal-head">
            <div className="dc-zm-modal-icon">{category.icon}</div>
            <div>
              <div className="dc-eyebrow-text" style={{ marginBottom: 6 }}>Зоомагазин</div>
              <h3 className="dc-zm-modal-title">{category.name}</h3>
              <p className="dc-zm-modal-sub">{category.desc} · {category.items.length} позицій у наявності</p>
            </div>
          </div>
          <div className="dc-zm-modal-grid">
            {category.items.map((p) => (
              <div key={p.name} className="dc-zm-product">
                <div className="dc-zm-product-photo">
                  <PH label={p.name} src={p.src} />
                </div>
                <h4>{p.name}</h4>
                <p>{p.desc}</p>
                <div className="dc-zm-product-price">
                  <span>{p.price}</span>
                  <span className="dc-zm-product-buy">
                    <Arrow size={13} />
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="dc-zm-modal-cta">
            <a href="#contact" className="dc-btn dc-btn-primary"
              onClick={(e) => { e.preventDefault(); onClose(); onOrder(); }}>
              Замовити {category.name.toLowerCase()} <span className="dc-btn-arrow"><Arrow /></span>
            </a>
            <button className="dc-btn dc-btn-ghost" onClick={onClose}>Закрити</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Zoomarket() {
  const [openIdx, setOpenIdx] = useState(null);
  const goContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  return (
    <section className="dc-section dc-section-light dc-section-with-wave" id="zoomarket">
      <WaveDivider from="#FFFFFF" variant="arch" height={40} />
      <div className="dc-wrap">
        <div className="dc-zoomarket-hero">
          <div>
            <div className="dc-eyebrow-text">Зоомагазин</div>
            <h2 className="dc-h2">
              Потіш свого <em style={{ background: "var(--yellow)", color: "#fff", padding: "0 14px", borderRadius: 18, fontStyle: "normal", display: "inline-block", transform: "rotate(-1deg)" }}>улюбленця</em><br />
              смачненьким!
            </h2>
            <p style={{ color: "var(--ink-2)", fontSize: 16, maxWidth: 480, marginTop: 20, marginBottom: 28 }}>
              Корми преміум‑класу, іграшки, аксесуари та все необхідне для щасливої собаки. Працюємо за адресою школи у Івано‑Франківську.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#contact" className="dc-btn dc-btn-primary"
                onClick={(e) => { e.preventDefault(); goContact(); }}>
                До магазину <span className="dc-btn-arrow"><Arrow /></span>
              </a>
              <a href="#contact" className="dc-btn dc-btn-ghost"
                onClick={(e) => { e.preventDefault(); goContact(); }}>
                Замовити консультацію
              </a>
            </div>
          </div>
          <div className="dc-zoomarket-mosaic">
            <div className="dc-zoomarket-mosaic-photo">
              <PH label="dog with treats" src="https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=800&q=80" />
            </div>
            <div className="dc-zoomarket-mosaic-card">
              <div className="dc-zoomarket-mosaic-num">500+</div>
              <div className="dc-zoomarket-mosaic-label">товарів<br/>у наявності</div>
            </div>
          </div>
        </div>

        <div className="dc-zoomarket-grid">
          {ZM_CATEGORIES.map((p, i) => (
            <button key={p.name} className="dc-zoomarket-card" onClick={() => setOpenIdx(i)}
              style={{ textAlign: "left", font: "inherit" }}>
              <div className="dc-zoomarket-card-photo">
                <PH label={p.name} src={p.src} />
                <div className="dc-zoomarket-card-icon">{p.icon}</div>
              </div>
              <div className="dc-zoomarket-card-body">
                <h4>{p.name}</h4>
                <p>{p.desc}</p>
                <div className="dc-zoomarket-card-foot">
                  <span className="dc-zoomarket-card-price">{p.priceFrom}</span>
                  <span className="dc-zoomarket-card-arrow">
                    <Arrow size={14} />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <ZoomarketModal
        category={openIdx !== null ? ZM_CATEGORIES[openIdx] : null}
        onClose={() => setOpenIdx(null)}
        onOrder={goContact}
      />
    </section>
  );
}

function Footer() {
  return (
    <footer className="dc-footer dc-section-with-wave">
      <WaveDivider from="#D80032" variant="double" height={80} />
      <div className="dc-wrap">
        <div className="dc-footer-grid">
          <div>
            <div className="dc-footer-logo">
              <LogoHorizontal height={48} color="var(--yellow)" />
            </div>
            <p className="dc-footer-desc">
              Школа собак, грумінг‑салон і зоо‑готель у самому серці міста. З 2018 року поряд із вашими хвостиками.
            </p>
            <div className="dc-socials">
              <a href="#" className="dc-social">f</a>
              <a href="#" className="dc-social">ig</a>
              <a href="#" className="dc-social">yt</a>
              <a href="#" className="dc-social">tg</a>
            </div>
          </div>
          <div>
            <h4>Послуги</h4>
            <ul>
              <li><a href="#">Курс кінології</a></li>
              <li><a href="#">Корекція поведінки</a></li>
              <li><a href="#">Грумінг</a></li>
              <li><a href="#">Зоо‑готель</a></li>
              <li><a href="#">Виїзні заняття</a></li>
            </ul>
          </div>
          <div>
            <h4>Школа</h4>
            <ul>
              <li><a href="#">Про нас</a></li>
              <li><a href="#">Команда</a></li>
              <li><a href="#">Блог</a></li>
              <li><a href="#">Випускники</a></li>
              <li><a href="#">Партнери</a></li>
            </ul>
          </div>
          <div>
            <h4>Контакти</h4>
            <ul>
              <li>+380 (66) 130 8884</li>
              <li>dogcare8888@gmail.com</li>
              <li>вул. Молодіжна 40</li>
              <li>Івано-Франківськ, Україна</li>
            </ul>
          </div>
        </div>
        <div className="dc-footer-bottom">
          <div>© 2026 Dog Care School. Усі права захищені.</div>
          <div style={{ display: "flex", gap: 24 }}>
            <a href="#">Політика конфіденційності</a>
            <a href="#">Умови</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Pricing, Testimonials, Marquee, ContactForm, Footer, Zoomarket });
