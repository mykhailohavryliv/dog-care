// Dog Care — section components

function Nav({ activeSection, onNav }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // Lock body scroll + Esc-to-close while burger menu is open
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);
  const links = [
    { id: "about", label: "Про нас" },
    { id: "services", label: "Послуги" },
    { id: "pricing", label: "Ціни" },
    { id: "team", label: "Команда" },
    { id: "zoomarket", label: "Зоомагазин" },
    { id: "contact", label: "Контакти" },
  ];
  const handleNav = (id) => {
    setMenuOpen(false);
    onNav(id);
  };
  return (
    <>
      <nav className={"dc-nav" + (scrolled ? " scrolled" : "")}>
        <div className="dc-wrap dc-nav-inner">
          <div className="dc-logo">
            <LogoNav height={44} />
          </div>
          <div className="dc-nav-links">
            {links.map(l => (
              <a key={l.id} href={"#" + l.id}
                className={"dc-nav-link" + (activeSection === l.id ? " active" : "")}
                onClick={(e) => { e.preventDefault(); onNav(l.id); }}>
                {l.label}
              </a>
            ))}
            <a href="#contact" className="dc-btn dc-btn-light dc-nav-cta"
              onClick={(e) => { e.preventDefault(); onNav("contact"); }}>
              Записатися <Arrow />
            </a>
          </div>
          <button
            className={"dc-burger" + (menuOpen ? " open" : "")}
            aria-label={menuOpen ? "Закрити меню" : "Відкрити меню"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
      {menuOpen && (
        <div className="dc-mobile-menu" onClick={() => setMenuOpen(false)}>
          <div className="dc-mobile-menu-panel" onClick={(e) => e.stopPropagation()}>
            <div className="dc-mobile-menu-head">
              <LogoHorizontal height={28} color="var(--ink)" />
              <button className="dc-mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="Закрити">
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                  <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <nav className="dc-mobile-menu-links">
              {links.map(l => (
                <a key={l.id} href={"#" + l.id}
                  className={"dc-mobile-menu-link" + (activeSection === l.id ? " active" : "")}
                  onClick={(e) => { e.preventDefault(); handleNav(l.id); }}>
                  {l.label}
                </a>
              ))}
            </nav>
            <a href="#contact" className="dc-btn dc-btn-primary dc-mobile-menu-cta"
              onClick={(e) => { e.preventDefault(); handleNav("contact"); }}>
              Записатися <span className="dc-btn-arrow"><Arrow /></span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}

function Hero({ onBook }) {
  return (
    <section className="dc-hero">
      <div className="dc-wrap">
        <div className="dc-hero-card">
          <PawScatter count={6} color="rgba(196, 30, 46, 0.18)" />
          <div className="dc-hero-grid" style={{ position: "relative", zIndex: 1 }}>
            <div>
              <div className="dc-eyebrow">
                <span className="dc-eyebrow-dot"><Pin size={12} /></span>
                Школа №1 у Івано‑Франківську
              </div>
              <h1 className="dc-h1">
                Виховуємо щасливих <em>хвостиків</em><br />
                і спокійних господарів
              </h1>
              <p className="dc-hero-sub">
                Dog Care — це школа тренувань, зооготель, грумінг та зоомагазин. Допомагаємо виховати із вашого цуценяти чи собаки справжнього друга та захисника.
              </p>
              <div className="dc-hero-ctas">
                <button className="dc-btn dc-btn-primary" onClick={onBook}>
                  Записати на заняття <span className="dc-btn-arrow"><Arrow /></span>
                </button>
                <a href="#services" className="dc-btn dc-btn-ghost"
                  onClick={(e) => { e.preventDefault(); document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}>
                  Наші послуги
                </a>
              </div>
              <div className="dc-hero-stats">
                <div>
                  <div className="dc-stat-num">300+</div>
                  <div className="dc-stat-label">вивчених собак</div>
                </div>
                <div>
                  <div className="dc-stat-num">10 років</div>
                  <div className="dc-stat-label">досвіду</div>
                </div>
                <div>
                  <div className="dc-stat-num">24/7</div>
                  <div className="dc-stat-label">підтримка</div>
                </div>
              </div>
            </div>
            <div className="dc-hero-photo dc-hero-photo--composed">
              <image-slot
                id="hero-dog"
                class="dc-hero-slot"
                fit="contain"
                placeholder="Перетягніть фото собаки"
                src="./assets/images/hero-dog.png"></image-slot>
              <div className="dc-photo-tag dc-photo-tag-1">
                <span className="dc-photo-tag-emoji"><PawPrint size={14} /></span>
                Усі породи
              </div>
              <div className="dc-photo-tag dc-photo-tag-2">
                <span className="dc-photo-tag-emoji"><Heart size={12} /></span>
                Без стресу
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BookingWidget({ value, setValue }) {
  return (
    <div className="dc-wrap dc-booking">
      <div className="dc-booking-card">
        <label className="dc-field">
          <span className="dc-field-label">Послуга</span>
          <select value={value.service} onChange={e => setValue({ ...value, service: e.target.value })}>
            <option>Тренування у школі</option>
            <option>Тренування на виїзд</option>
            <option>Грумінг</option>
            <option>Зооготель</option>
            <option>Зооняня (вигул)</option>
          </select>
        </label>
        <label className="dc-field">
          <span className="dc-field-label">Порода</span>
          <select value={value.breed} onChange={e => setValue({ ...value, breed: e.target.value })}>
            <option>Будь‑яка</option>
            <option>Маленька (до 10 кг)</option>
            <option>Середня (10–25 кг)</option>
            <option>Велика (25+ кг)</option>
          </select>
        </label>
        <label className="dc-field">
          <span className="dc-field-label">Дата</span>
          <input type="date" value={value.date} onChange={e => setValue({ ...value, date: e.target.value })} />
        </label>
        <label className="dc-field">
          <span className="dc-field-label">Час</span>
          <select value={value.time} onChange={e => setValue({ ...value, time: e.target.value })}>
            <option>Ранок (9–12)</option>
            <option>День (12–16)</option>
            <option>Вечір (16–20)</option>
          </select>
        </label>
        <button className="dc-booking-go">
          Знайти час <span className="dc-btn-arrow"><Arrow /></span>
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { Nav, Hero, BookingWidget });
