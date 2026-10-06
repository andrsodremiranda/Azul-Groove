// Função serverless (Vercel): troca o "code" do login do Discord pelos dados do usuário.
// Variável de ambiente obrigatória no painel da Vercel: DISCORD_CLIENT_SECRET
// Opcionais: DISCORD_CLIENT_ID, DISCORD_REDIRECT_URI

const CLIENT_ID = process.env.DISCORD_CLIENT_ID || '1556367785792118865';

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });

  const secret = process.env.DISCORD_CLIENT_SECRET;
  if (!secret) return res.status(500).json({ error: 'missing_DISCORD_CLIENT_SECRET' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const code = body && typeof body.code === 'string' ? body.code : '';
  if (!code) return res.status(400).json({ error: 'missing_code' });

  // precisa ser idêntico ao redirect_uri usado no login (origin + '/chat')
  const proto = (req.headers['x-forwarded-proto'] || 'https').split(',')[0];
  const redirect = process.env.DISCORD_REDIRECT_URI || `${proto}://${req.headers.host}/chat`;

  try {
    const tr = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: secret,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirect
      })
    });
    if (!tr.ok) return res.status(401).json({ error: 'token_exchange_failed', status: tr.status });
    const { access_token } = await tr.json();

    const h = { Authorization: 'Bearer ' + access_token };
    const [ur, gr] = await Promise.all([
      fetch('https://discord.com/api/users/@me', { headers: h }),
      fetch('https://discord.com/api/users/@me/guilds', { headers: h })
    ]);
    if (!ur.ok) return res.status(502).json({ error: 'user_fetch_failed' });
    const u = await ur.json();
    const guilds = gr.ok ? await gr.json() : [];

    // o token de acesso nunca é devolvido ao navegador
    return res.status(200).json({
      id: u.id,
      username: u.username,
      global_name: u.global_name || null,
      avatar: u.avatar || null,
      email: u.email || '',
      guilds: guilds.map(g => ({ name: g.name, owner: !!g.owner }))
    });
  } catch (e) {
    return res.status(500).json({ error: 'server_error' });
  }
};
