// Dog Care — main app

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#D80032",
  "headingFont": "Unbounded",
  "showPaws": true,
  "showMarquee": true,
  "buttonShape": "pill"
}/*EDITMODE-END*/;

function App() {
  const [active, setActive] = useState("home");
  const [booking, setBooking] = useState({
    service: "Курс кінології",
    breed: "Будь‑яка",
    date: "",
    time: "Ранок (9–12)",
  });
  const [t, setTweak] = (window.useTweaks || (() => [TWEAK_DEFAULTS, () => {}]))(TWEAK_DEFAULTS);

  // Apply tweaks via CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--yellow", t.accent);
    // Derive deeper variant
    root.style.setProperty("--display", `"${t.headingFont}", system-ui, sans-serif`);
    if (t.buttonShape === "rounded") {
      root.style.setProperty("--radius-pill", "16px");
    }
  }, [t.accent, t.headingFont, t.buttonShape]);

  // Smooth scroll to section
  function navTo(id) {
    setActive(id);
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  // Track active section
  useEffect(() => {
    const ids = ["about", "services", "team", "pricing", "contact"];
    const onScroll = () => {
      let cur = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 220) cur = id;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-reveal animations. Decorate key blocks with .reveal, stagger siblings,
  // then fade-up via IntersectionObserver as they enter the viewport.
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    const selector = [
      ".dc-hero-card",
      ".dc-booking-card",
      ".dc-section-head",
      ".dc-service-panel",
      ".dc-bubble",
      ".dc-trainer",
      ".dc-pricegroup",
      ".dc-pricing-cta",
      ".dc-zoomarket-hero > *",
      ".dc-zoomarket-card",
      ".dc-testi",
      ".dc-videos",
      ".dc-video",
      ".dc-form-card",
    ].join(",");

    // Wait one frame so React has flushed all section nodes.
    const raf = requestAnimationFrame(() => {
      const els = Array.from(document.querySelectorAll(selector));
      const groups = new Map();
      els.forEach((el) => {
        el.classList.add("reveal");
        const parent = el.parentElement;
        if (!groups.has(parent)) groups.set(parent, []);
        groups.get(parent).push(el);
      });
      groups.forEach((siblings) => {
        siblings.forEach((el, i) => el.style.setProperty("--reveal-i", i));
      });

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in-view");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
      );
      els.forEach((el) => io.observe(el));
      App._revealIO = io;
    });

    return () => {
      cancelAnimationFrame(raf);
      App._revealIO?.disconnect();
    };
  }, []);

  return (
    <div className="dc-app">
      <Nav activeSection={active} onNav={navTo} />
      <Hero onBook={() => navTo("contact")} />
      <AboutBlock />
      <Services />
      <Process />
      <Team />
      <Pricing />
      <Zoomarket />
      {t.showMarquee && <Marquee />}
      <Testimonials />
      <ContactForm />
      <Footer />

      {window.TweaksPanel && (
        <TweaksPanel title="Tweaks">
          <TweakSection label="Бренд">
            <TweakColor
              label="Акцент"
              value={t.accent}
              options={["#D80032", "#F5A623", "#FF9F4E", "#A8D8B9", "#F5C2DA", "#7BB6E0"]}
              onChange={(v) => setTweak("accent", v)}
            />
            <TweakSelect
              label="Шрифт заголовків"
              value={t.headingFont}
              options={["Unbounded", "Fraunces", "Bricolage Grotesque", "Space Grotesk", "Sora"]}
              onChange={(v) => setTweak("headingFont", v)}
            />
          </TweakSection>
          <TweakSection label="Дрібниці">
            <TweakToggle
              label="Лапки на фоні"
              value={t.showPaws}
              onChange={(v) => setTweak("showPaws", v)}
            />
            <TweakToggle
              label="Бігуча стрічка"
              value={t.showMarquee}
              onChange={(v) => setTweak("showMarquee", v)}
            />
          </TweakSection>
        </TweaksPanel>
      )}
      <style>{`
        ${!t.showPaws ? '.dc-paws { display: none !important; }' : ''}
      `}</style>
    </div>
  );
}

function AboutBlock() {
  return (
    <section className="dc-section dc-about" id="about">
      <div className="dc-wrap">
        <div className="dc-about-grid">
          <div className="dc-about-content">
            <div className="dc-eyebrow-text">Про школу</div>
            <h2 className="dc-h2">
              Школа №1 у Івано‑Франківську з <em className="dc-about-highlight">командою</em> професіоналів
            </h2>
            <p className="dc-about-lead">
              Наша місія — допомогти тобі виховати із свого цуценяти чи собаки справжнього друга та захисника. Навчаємо будувати стосунки без криків, стресу та страху.
            </p>
            <div className="dc-about-bullets">
              <div className="dc-about-bullet">
                <div className="dc-about-bullet-ic"><Heart size={18} /></div>
                <div>
                  <div className="dc-about-bullet-title">Без криків і стресу</div>
                  <div className="dc-about-bullet-sub">Довіра замість муштри</div>
                </div>
              </div>
              <div className="dc-about-bullet">
                <div className="dc-about-bullet-ic"><PawPrint size={18} /></div>
                <div>
                  <div className="dc-about-bullet-title">Індивідуальний підхід</div>
                  <div className="dc-about-bullet-sub">До кожного вихованця</div>
                </div>
              </div>
            </div>
          </div>
          <div className="dc-about-photo">
            <img className="dc-about-dog" src="./assets/images/about-dog.png" alt="Школа №1 у Івано-Франківську · 300+ вивчених собак" />
          </div>
        </div>
      </div>
    </section>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
