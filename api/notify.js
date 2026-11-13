// Função serverless (Vercel): recebe avaliações e telemetria do site e repassa para o Discord.
// A URL do webhook fica só aqui no servidor — nunca aparece no HTML/JS enviado ao navegador.
// Variável de ambiente obrigatória no painel da Vercel: DISCORD_WEBHOOK_URL

const MAX_FIELDS = 30;
const MAX_FIELD_LEN = 1024;
const MAX_DESC_LEN = 4096;
const MAX_TITLE_LEN = 256;

// Limite simples por IP: evita flood básico. É "best-effort" (zera a cada cold start
// da função), mas já impede um script simples de martelar o endpoint sem parar.
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const last = hits.get(ip) || 0;
  if (now - last < 1200) return true;
  hits.set(ip, now);
  if (hits.size > 5000) hits.clear(); // evita a Map crescer pra sempre
  return false;
}

function str(v, max) {
  return typeof v === 'string' ? v.slice(0, max) : '';
}

export default async function handler(req, res) {
  // Tudo dentro de um try/catch único: se algo quebrar, a gente SEMPRE devolve um
  // JSON com o motivo em vez de um 500 cru (assim dá pra ver o erro no console do navegador
  // e nos logs da Vercel, em vez de só "Internal Server Error").
  try {
    res.setHeader('Cache-Control', 'no-store');
    if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });

    const url = process.env.DISCORD_WEBHOOK_URL;
    if (!url) return res.status(500).json({ error: 'missing_DISCORD_WEBHOOK_URL' });

    let ip = 'unknown';
    try { ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || (req.socket && req.socket.remoteAddress) || 'unknown'; } catch (e) {}
    if (rateLimited(ip)) return res.status(429).json({ error: 'rate_limited' });

    let body = req.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
    if (!body || typeof body !== 'object') return res.status(400).json({ error: 'invalid_body' });

    const username = str(body.username, 80) || 'Azul Groove';
    const rawEmbeds = Array.isArray(body.embeds) ? body.embeds.slice(0, 3) : [];
    if (!rawEmbeds.length) return res.status(400).json({ error: 'missing_embeds' });

    // Reconstrói os embeds só com os campos esperados. Assim o cliente nunca consegue
    // injetar algo fora desse formato (ex.: mencionar @everyone, trocar o alvo, etc.).
    const embeds = rawEmbeds.map(e => {
      const out = { timestamp: new Date().toISOString() };
      if (e && typeof e.title === 'string') out.title = str(e.title, MAX_TITLE_LEN);
      if (e && typeof e.color === 'number') out.color = e.color;
      if (e && typeof e.description === 'string') out.description = str(e.description, MAX_DESC_LEN);
      if (e && Array.isArray(e.fields)) {
        out.fields = e.fields.slice(0, MAX_FIELDS).map(f => ({
          name: str(f && f.name, MAX_TITLE_LEN) || '—',
          value: str(f && f.value, MAX_FIELD_LEN) || '—',
          inline: !!(f && f.inline)
        }));
      }
      if (e && e.footer && typeof e.footer.text === 'string') out.footer = { text: str(e.footer.text, 200) };
      return out;
    });

    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, allowed_mentions: { parse: [] }, embeds })
    });
    if (r.status === 429) return res.status(429).json({ error: 'discord_rate_limited' });
    if (!r.ok) {
      const txt = await r.text().catch(() => '');
      console.error('discord_failed', r.status, txt);
      return res.status(502).json({ error: 'discord_failed', status: r.status, detail: txt.slice(0, 300) });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    // TEMPORÁRIO: devolve a mensagem do erro pra diagnosticar. Depois de resolver,
    // troque a linha abaixo de volta para: return res.status(500).json({ error: 'server_error' });
    console.error('notify_crash', e);
    return res.status(500).json({ error: 'server_error', detail: String(e && e.message || e) });
  }
}
