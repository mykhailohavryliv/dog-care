// Vercel serverless function, served at /api/send-telegram from this same
// project (the whole repo — static pages + this function — deploys as one
// Vercel project). Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID as encrypted
// env vars in the Vercel project settings — never commit real values here.

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { text, parseMode } = req.body || {};

  if (typeof text !== "string" || !text.trim() || text.length > 4000) {
    res.status(400).json({ error: "Invalid payload" });
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    res.status(500).json({ error: "Server not configured" });
    return;
  }

  try {
    const body = { chat_id: chatId, text };
    if (parseMode === "HTML") body.parse_mode = "HTML";

    const tgRes = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );

    if (!tgRes.ok) {
      res.status(502).json({ error: "Telegram delivery failed" });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Internal error" });
  }
};
