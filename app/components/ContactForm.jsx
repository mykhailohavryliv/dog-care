import { useState } from "react";
import { Arrow, PawScatter, WaveDivider } from "./shared.jsx";

const SERVICES = ["Курс кінології", "Грумінг", "Зоо‑готель", "Консультація"];

export default function ContactForm() {
  const [data, setData] = useState({
    name: "",
    phone: "",
    pet: "",
    service: "Курс кінології",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!data.name.trim() || data.name.trim().length < 2)
      e.name = "Введіть ім'я (мінімум 2 символи)";
    const phone = data.phone.replace(/[\s\-()]/g, "");
    if (!phone || !/^(\+380\d{9}|0\d{9})$/.test(phone))
      e.phone = "Некоректний номер. Формат: +380XXXXXXXXX або 0XXXXXXXXX";
    return e;
  }

  async function submit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSending(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.error("Telegram error:", err);
    }
    setSending(false);
    setSent(true);
  }

  return (
    <section className="dc-section dc-section-yellow dc-section-with-wave" id="contact">
      <WaveDivider from="#FFFEF7" variant="soft" height={80} flip />
      <PawScatter count={5} color="rgba(26, 24, 20, 0.07)" />
      <div className="dc-wrap" style={{ position: "relative", zIndex: 1 }}>
        <div className="dc-form-card">
          <div className="dc-form-side">
            <h2>
              Запишіть свого <em>хвостика</em> на пробне заняття
            </h2>
            <p>
              Залиште номер — і ми передзвонимо протягом дня, щоб підібрати зручний час і спеціаліста.
            </p>
            <div className="dc-contact-row">
              <span className="dc-contact-ic">📞</span> +380 (44) 123‑45‑67
            </div>
            <div className="dc-contact-row">
              <span className="dc-contact-ic">✉️</span> hello@dogcare.school
            </div>
            <div className="dc-contact-row">
              <span className="dc-contact-ic">📍</span> вул. Хвоста, 17 · Київ
            </div>
            <div className="dc-contact-row">
              <span className="dc-contact-ic">⏰</span> Пн–Нд · 8:00 — 21:00
            </div>
          </div>
          <form className="dc-form" onSubmit={submit}>
            <div className="dc-form-row">
              <div>
                <div className="dc-input-wrap">
                  <span className="dc-input-label">Ваше ім'я *</span>
                  <input
                    className={`dc-input${errors.name ? " dc-input-err" : ""}`}
                    placeholder="Наталя"
                    value={data.name}
                    onChange={(e) => { setData({ ...data, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
                  />
                </div>
                {errors.name && <div style={{ color: "#ef233c", fontSize: 12, marginTop: 4, fontWeight: 600 }}>{errors.name}</div>}
              </div>
              <div>
                <div className="dc-input-wrap">
                  <span className="dc-input-label">Телефон *</span>
                  <input
                    className={`dc-input${errors.phone ? " dc-input-err" : ""}`}
                    placeholder="+380 99 123 45 67"
                    value={data.phone}
                    onChange={(e) => { setData({ ...data, phone: e.target.value }); setErrors({ ...errors, phone: "" }); }}
                  />
                </div>
                {errors.phone && <div style={{ color: "#ef233c", fontSize: 12, marginTop: 4, fontWeight: 600 }}>{errors.phone}</div>}
              </div>
            </div>
            <div className="dc-input-wrap">
              <span className="dc-input-label">Кличка та порода</span>
              <input
                className="dc-input"
                placeholder="Рекс, лабрадор · 1 рік"
                value={data.pet}
                onChange={(e) => setData({ ...data, pet: e.target.value })}
              />
            </div>
            <div className="dc-input-wrap">
              <span className="dc-input-label">Що цікавить</span>
              <div className="dc-pill-row">
                {SERVICES.map((s) => (
                  <button
                    type="button"
                    key={s}
                    className={"dc-pill" + (data.service === s ? " active" : "")}
                    onClick={() => setData({ ...data, service: s })}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="dc-input-wrap">
              <span className="dc-input-label">Коротко про вашого хвостика</span>
              <textarea
                className="dc-input"
                placeholder="Тягне повідок, гавкає на велосипедистів…"
                value={data.message}
                onChange={(e) => setData({ ...data, message: e.target.value })}
              />
            </div>
            <button type="submit" className="dc-form-submit" disabled={sending}>
              {sending ? "Надсилаємо…" : <>Записатися <Arrow /></>}
            </button>
          </form>
          {sent && (
            <div className="dc-form-success">
              <div className="dc-success-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12.5L10 17.5L19 7.5"
                    stroke="#1A1814"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3
                style={{
                  fontFamily: "var(--display)",
                  fontSize: 28,
                  margin: 0,
                  letterSpacing: "-0.03em",
                }}
              >
                Дякуємо, {data.name || "друже"}!
              </h3>
              <p style={{ color: "var(--ink-2)", maxWidth: 360, margin: 0 }}>
                Ми передзвонимо протягом дня на {data.phone || "ваш номер"}, щоб погодити час і фахівця.
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
