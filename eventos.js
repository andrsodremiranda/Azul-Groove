/* =========================================================
   Azul Groove — Temas de eventos (ativam sozinhos por data e hora)
   Horário de Brasília. Para mudar uma data/hora, edite EVENTOS abaixo.

   Para testar a qualquer momento, abra o site com:
     ?tema=sexta13  ?tema=vingadores  ?tema=gta6  ?tema=natal  ?tema=anonovo  ?tema=off
   (fica salvo só nessa aba até você fechar)
   ========================================================= */
(function () {
  'use strict';

  var EVENTOS = [
    { id: 'sexta13',    ini: '2026-11-13T00:00:00', fim: '2026-11-13T23:29:59' },
    { id: 'vingadores', ini: '2026-12-16T00:00:00', fim: '2026-12-19T23:59:59' },
    { id: 'gta6',       ini: '2026-11-19T00:00:00', fim: '2026-11-19T23:59:59' },
    { id: 'natal',      ini: '2026-12-24T00:00:00', fim: '2026-12-25T23:59:59' },
    { id: 'anonovo',    ini: '2026-12-31T00:00:00', fim: '2027-01-01T23:59:59' }
  ];
  var VALIDOS = EVENTOS.map(function (e) { return e.id; });

  function agora() { return Date.now(); }
  function ativoAgora() {
    var t = agora(), r = null;
    EVENTOS.forEach(function (ev) {
      if (t >= Date.parse(ev.ini + '-03:00') && t <= Date.parse(ev.fim + '-03:00')) r = ev.id;
    });
    return r;
  }

  var forcado = null;
  try {
    var q = new URLSearchParams(location.search).get('tema');
    if (q) sessionStorage.setItem('ag_tema', q);
    forcado = sessionStorage.getItem('ag_tema');
  } catch (e) {}

  var tema = null;
  if (forcado === 'off') tema = null;
  else if (VALIDOS.indexOf(forcado) > -1) tema = forcado;
  else tema = ativoAgora();

  // se a página ficar aberta na virada de horário, troca/limpa o tema sozinha
  if (!forcado) setInterval(function () { if (ativoAgora() !== tema) location.reload(); }, 30000);

  if (!tema) return;

  var reduz = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
  root.classList.add('ev-' + tema);
  if (/\/azul(\.html)?$/.test(location.pathname)) root.classList.add('pg-azul');
  // efeitos animados (gotas, neve, fogos, avisos...) só na página inicial; nas outras ficam só as cores
  var isIndex = /(^|\/)(index(-novo)?(\.html)?)?$/.test(location.pathname);
  if (isIndex) root.classList.add('ev-index');

  /* ---------- CSS ---------- */
  var CSS = {};

  CSS.base = [
    '.ev-layer{position:fixed;inset:0;pointer-events:none;overflow:hidden}',
    '.ev-bg{z-index:-1}',
    '.ev-fx{z-index:9998}',
    '.ev-pill{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:9999;display:flex;align-items:center;gap:12px;max-width:calc(100vw - 24px);padding:10px 12px 10px 18px;border-radius:99px;font:600 .88rem/1.3 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:#fff;backdrop-filter:blur(10px);animation:evPill .6s cubic-bezier(.2,.9,.3,1.3) both}',
    '.ev-pill button{all:unset;cursor:pointer;width:26px;height:26px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.14);font-size:.8rem;flex:none}',
    '.ev-pill button:hover{background:rgba(255,255,255,.28)}',
    '@keyframes evPill{from{opacity:0;transform:translate(-50%,30px)}to{opacity:1;transform:translate(-50%,0)}}',
    '@media(max-width:600px){.ev-pill{font-size:.78rem;bottom:10px}}'
  ].join('\n');

  /* ===== SEXTA-FEIRA 13 ===== */
  CSS.sexta13 = [
    'html.ev-sexta13:root{color-scheme:dark;--bg:#090203;--card:#150709;--line:#4a1218;--tx:#f6e9e9;--mut:#b99a9c;--ac:#d4141c;--ac2:#ff5252;--p:#d4141c;--p2:#a50f15}',
    'html.ev-sexta13 body{background:#090203}',
    'html.ev-sexta13:not(.pg-azul) nav{background:rgba(12,3,4,.85)!important;border-bottom-color:#4a1218!important}',
    'html.ev-sexta13 .btn.pri{background:linear-gradient(135deg,#d4141c,#7a0b10)!important;box-shadow:0 8px 24px rgba(212,20,28,.45)!important}',
    'html.ev-sexta13 body>.glow{background:radial-gradient(600px 400px at 15% 5%,rgba(212,20,28,.28),transparent),radial-gradient(500px 400px at 90% 20%,rgba(120,10,16,.3),transparent)!important}',
    'html.ev-sexta13 body>.orb{filter:hue-rotate(150deg) saturate(1.4)}',
    'html.ev-sexta13.ev-index .hero h1,html.ev-sexta13.ev-index .logo{animation:evFlicker 6s infinite}',
    'html.ev-sexta13:not(.pg-azul) .hero h1{filter:drop-shadow(0 0 18px rgba(255,40,40,.55))}',
    '@keyframes evFlicker{0%,18%,22%,25%,53%,57%,100%{opacity:1}20%,24%,55%{opacity:.35}}',
    '.ev-fog{position:absolute;inset:-10%;background:radial-gradient(40% 30% at 20% 80%,rgba(255,255,255,.07),transparent),radial-gradient(45% 35% at 75% 70%,rgba(255,255,255,.06),transparent),radial-gradient(35% 25% at 50% 95%,rgba(255,255,255,.08),transparent);animation:evFog 28s ease-in-out infinite alternate}',
    '@keyframes evFog{from{transform:translateX(-4%)}to{transform:translateX(4%) scale(1.08)}}',
    '.ev-vig{position:absolute;inset:0;background:radial-gradient(ellipse at center,transparent 45%,rgba(0,0,0,.75) 100%)}',
    '.ev-flash{position:absolute;inset:0;background:#fff;opacity:0}',
    '.ev-flash.on{animation:evBolt .7s ease-out}',
    '@keyframes evBolt{0%{opacity:0}6%{opacity:.55}12%{opacity:.05}20%{opacity:.4}100%{opacity:0}}',
    '.ev-drip{position:absolute;top:0;width:var(--w);left:var(--x);height:0;border-radius:0 0 99px 99px;background:linear-gradient(90deg,#5c070c,#c4121a 45%,#7d0a10);box-shadow:0 0 8px rgba(196,18,26,.6);animation:evDrip var(--d) ease-in infinite;animation-delay:var(--dl)}',
    '.ev-drip::after{content:"";position:absolute;left:50%;bottom:-6px;width:calc(var(--w) * 1.5);height:calc(var(--w) * 1.5);margin-left:calc(var(--w) * -.75);border-radius:50%;background:radial-gradient(circle at 35% 35%,#e0262e,#7d0a10)}',
    '@keyframes evDrip{0%{height:0;opacity:1}55%{height:var(--h);opacity:1}85%{height:var(--h);opacity:1}100%{height:calc(var(--h) + 40px);opacity:0}}',
    '.ev-bat{position:absolute;top:var(--y);left:-60px;font-size:var(--s);opacity:.8;animation:evBat var(--t) linear infinite;animation-delay:var(--dl);filter:grayscale(1) brightness(.5)}',
    '@keyframes evBat{0%{transform:translate(0,0) scaleX(1)}25%{transform:translate(30vw,-40px)}50%{transform:translate(60vw,30px)}75%{transform:translate(90vw,-30px)}100%{transform:translate(calc(100vw + 120px),10px)}}',
    '.ev-sexta13.ev-pill,.ev-pill.s13{background:rgba(30,4,6,.92);border:1px solid #8c1119;box-shadow:0 10px 34px rgba(212,20,28,.35)}'
  ].join('\n');

  /* ===== GTA VI / VICE CITY ===== */
  var PALM = "data:image/svg+xml;utf8," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 420"><g fill="#0b0020"><path d="M96 420c-2-90 0-190 14-300l9 1c-12 108-14 208-12 299z"/><path d="M110 118C80 80 40 78 6 100c36-6 62 4 84 28zM112 116c10-44 40-70 82-72-30 14-48 34-60 68zM110 120c-18-30-14-62 6-96 0 36 8 62 24 90zM112 122c36-8 62 6 82 34-26-12-52-14-78-2zM108 124C76 128 52 150 40 184c20-26 42-38 70-44z"/></g></svg>'
  );
  CSS.gta6 = [
    'html.ev-gta6:root{color-scheme:dark;--bg:#14002e;--card:#210a47;--line:#6a1f9c;--tx:#fff4fb;--mut:#dcaee9;--ac:#ff2e93;--ac2:#25e8ff;--p:#ff2e93;--p2:#d11a74}',
    'html.ev-gta6 body{background:#14002e}',
    'html.ev-gta6:not(.pg-azul) nav{background:rgba(20,0,46,.82)!important;border-bottom:1px solid #ff2e93!important;box-shadow:0 2px 24px rgba(255,46,147,.35)}',
    'html.ev-gta6 .btn.pri{background:linear-gradient(135deg,#ff2e93,#ff8a3d)!important;box-shadow:0 8px 26px rgba(255,46,147,.55)!important;color:#fff}',
    'html.ev-gta6 .card:hover,html.ev-gta6 .btn:hover{border-color:#25e8ff!important;box-shadow:0 0 22px rgba(37,232,255,.35)}',
    'html.ev-gta6 body>.glow,html.ev-gta6 body>.orb{display:none!important}',
    'html.ev-gta6:not(.pg-azul) .hero h1{background:linear-gradient(180deg,#fff 5%,#ff7ad1 40%,#ff8a3d 75%,#ffd23d)!important;-webkit-background-clip:text!important;background-clip:text!important;color:transparent!important;font-style:italic;text-transform:uppercase;filter:drop-shadow(0 0 14px rgba(255,46,147,.7)) drop-shadow(0 0 30px rgba(37,232,255,.35))}',
    'html.ev-gta6 h2{text-shadow:0 0 16px rgba(255,46,147,.55)}',
    'html.ev-gta6 .eq i{background:linear-gradient(#25e8ff,#ff2e93)!important}',
    '.ev-sky{position:absolute;inset:0;background:linear-gradient(180deg,#14002e 0%,#3a0a6b 35%,#c2278f 62%,#ff7a45 82%,#ffc14d 100%);opacity:.9}',
    '.ev-sun{position:absolute;left:50%;bottom:16vh;width:min(46vw,420px);aspect-ratio:1;transform:translateX(-50%);border-radius:50%;background:linear-gradient(180deg,#fff27a,#ff9a3d 45%,#ff2e93);-webkit-mask:repeating-linear-gradient(180deg,#000 0 14px,transparent 14px 18px);mask:repeating-linear-gradient(180deg,#000 0 14px,transparent 14px 18px);-webkit-mask-composite:source-over;filter:drop-shadow(0 0 40px rgba(255,120,70,.7));opacity:.75}',
    '.ev-grid{position:absolute;left:-50%;right:-50%;bottom:0;height:28vh;background:linear-gradient(180deg,#14002e,#240547);transform:perspective(380px) rotateX(58deg);transform-origin:bottom;background-image:linear-gradient(rgba(37,232,255,.55) 1px,transparent 1px),linear-gradient(90deg,rgba(255,46,147,.55) 1px,transparent 1px);background-size:46px 46px;animation:evGrid 2.4s linear infinite}',
    '@keyframes evGrid{to{background-position:0 46px,0 0}}',
    '.ev-palm{position:absolute;bottom:0;width:min(30vw,260px);height:min(64vw,540px);background:url("' + PALM + '") no-repeat bottom/contain}',
    '.ev-palm.l{left:-2vw}.ev-palm.r{right:-2vw;transform:scaleX(-1)}',
    '.ev-scan{position:absolute;inset:0;background:repeating-linear-gradient(180deg,rgba(255,255,255,.035) 0 1px,transparent 1px 3px);mix-blend-mode:overlay}',
    '.ev-cops{position:absolute;inset:0;opacity:0;transition:opacity .4s}',
    '.ev-cops.on{opacity:1;animation:evCops .7s steps(1) infinite}',
    '@keyframes evCops{0%{box-shadow:inset 90px 0 120px -60px rgba(255,30,60,.55),inset -90px 0 120px -60px rgba(30,90,255,0)}50%{box-shadow:inset 90px 0 120px -60px rgba(255,30,60,0),inset -90px 0 120px -60px rgba(30,90,255,.55)}}',
    '.ev-stars{position:fixed;right:14px;top:78px;z-index:9997;display:flex;gap:4px;padding:6px 12px;border-radius:12px;background:rgba(20,0,46,.65);border:1px solid rgba(255,255,255,.18);backdrop-filter:blur(6px);pointer-events:none;font-size:1.25rem;line-height:1}',
    '.ev-stars span{color:rgba(255,255,255,.22);transition:.25s}',
    '.ev-stars span.on{color:#ffe14d;text-shadow:0 0 10px rgba(255,225,77,.9)}',
    '.ev-stars.hot span.on{animation:evStar .5s steps(1) infinite}',
    '@keyframes evStar{50%{color:#4d8bff;text-shadow:0 0 10px rgba(77,139,255,.9)}}',
    '.ev-pill.g6{background:linear-gradient(135deg,rgba(255,46,147,.92),rgba(120,40,200,.92));border:1px solid rgba(255,255,255,.35);box-shadow:0 10px 34px rgba(255,46,147,.5)}',
    '@media(max-width:600px){.ev-stars{top:70px;right:8px;font-size:1rem}.ev-sun{bottom:20vh}}'
  ].join('\n');


  /* ===== VINGADORES ===== */
  var ESTRELA = "data:image/svg+xml;utf8," + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 100 100"><circle r="46" fill="none" stroke="#f5c518" stroke-width="3"/><circle r="32" fill="none" stroke="#f5c518" stroke-width="2"/><path d="M0-30L8.8-9.3 31.4-7.4 14.2 7.7 19.4 29.5 0 17.9-19.4 29.5-14.2 7.7-31.4-7.4-8.8-9.3z" fill="#f5c518"/></svg>'
  );
  CSS.vingadores = [
    'html.ev-vingadores:root{color-scheme:dark;--bg:#060a1c;--card:#0d1634;--line:#2a3f8f;--tx:#eef2ff;--mut:#a9b6e6;--ac:#e62429;--ac2:#f5c518;--p:#e62429;--p2:#b3141a}',
    'html.ev-vingadores body{background:#060a1c}',
    'html.ev-vingadores:not(.pg-azul) nav{background:rgba(6,10,28,.85)!important;border-bottom:2px solid #f5c518!important;box-shadow:0 2px 20px rgba(41,214,95,.35)!important}',
    'html.ev-vingadores .btn.pri{background:linear-gradient(135deg,#e62429,#9d1218)!important;box-shadow:0 8px 24px rgba(230,36,41,.5)!important}',
    'html.ev-vingadores body>.glow{background:radial-gradient(600px 400px at 15% 5%,rgba(230,36,41,.25),transparent),radial-gradient(500px 400px at 90% 20%,rgba(37,99,235,.3),transparent),radial-gradient(700px 420px at 50% 100%,rgba(41,214,95,.22),transparent)!important}',
    'html.ev-vingadores:not(.pg-azul) .hero h1{background:linear-gradient(180deg,#fff 10%,#f5c518 50%,#29d65f)!important;-webkit-background-clip:text!important;background-clip:text!important;color:transparent!important;text-transform:uppercase;filter:drop-shadow(0 0 16px rgba(41,214,95,.5))}',
    'html.ev-vingadores .card:hover,html.ev-vingadores .btn:hover{border-color:#29d65f!important}',
    '.ev-halftone{position:absolute;inset:0;background-image:radial-gradient(rgba(245,197,24,.12) 1.6px,transparent 1.7px);background-size:16px 16px;-webkit-mask:linear-gradient(180deg,#000,transparent 70%);mask:linear-gradient(180deg,#000,transparent 70%)}',
    '.ev-star{position:absolute;left:50%;top:50%;width:min(80vmin,720px);aspect-ratio:1;transform:translate(-50%,-50%);background:url("' + ESTRELA + '") center/contain no-repeat;opacity:.09;animation:evSpin 90s linear infinite}',
    '@keyframes evSpin{to{transform:translate(-50%,-50%) rotate(360deg)}}',
    '.ev-arc{position:absolute;left:50%;top:38%;width:min(60vmin,520px);aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle,rgba(80,190,255,.28),transparent 62%);animation:evPulse 3.2s ease-in-out infinite}',
    '@keyframes evPulse{0%,100%{opacity:.5;transform:translate(-50%,-50%) scale(.92)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.06)}}',
    '.ev-bolt{position:absolute;inset:0;background:radial-gradient(circle at var(--bx,50%) 0,rgba(120,190,255,.7),transparent 55%);opacity:0}',
    '.ev-bolt.on{animation:evBolt .6s ease-out}',
    '.ev-bolt.g{background:radial-gradient(circle at var(--bx,50%) 0,rgba(60,255,120,.8),transparent 55%)}',
    '.ev-doom{position:absolute;left:50%;bottom:-20%;width:min(120vmin,1100px);aspect-ratio:1;transform:translateX(-50%);border-radius:50%;background:radial-gradient(circle,rgba(41,214,95,.34),rgba(20,120,60,.12) 45%,transparent 68%);animation:evDoom 5s ease-in-out infinite}',
    '@keyframes evDoom{0%,100%{opacity:.55;transform:translateX(-50%) scale(.94)}50%{opacity:1;transform:translateX(-50%) scale(1.06)}}',
    '.ev-mist{position:absolute;inset:-10%;background:radial-gradient(40% 25% at 20% 85%,rgba(41,214,95,.16),transparent),radial-gradient(45% 30% at 80% 75%,rgba(41,214,95,.13),transparent);animation:evMist 26s ease-in-out infinite alternate}',
    '@keyframes evMist{from{transform:translateX(-4%)}to{transform:translateX(4%) scale(1.08)}}',
    '.ev-pill.v{background:linear-gradient(135deg,rgba(230,36,41,.95),rgba(29,60,170,.95) 55%,rgba(16,110,55,.95));border:1px solid #29d65f;box-shadow:0 10px 34px rgba(41,214,95,.4)}'
  ].join('\n');

  /* ===== NATAL ===== */
  CSS.natal = [
    'html.ev-natal:root{color-scheme:dark;--bg:#06150e;--card:#0e2a1b;--line:#1f6b43;--tx:#fff5f0;--mut:#b5d6c2;--ac:#e0312f;--ac2:#ffd54a;--p:#e0312f;--p2:#b02220}',
    'html.ev-natal body{background:#06150e}',
    'html.ev-natal:not(.pg-azul) nav{background:rgba(6,21,14,.85)!important;border-bottom:2px solid #e0312f!important}',
    'html.ev-natal .btn.pri{background:linear-gradient(135deg,#e0312f,#18803f)!important;box-shadow:0 8px 24px rgba(224,49,47,.45)!important}',
    'html.ev-natal body>.glow{background:radial-gradient(600px 400px at 15% 5%,rgba(224,49,47,.25),transparent),radial-gradient(500px 400px at 90% 20%,rgba(24,128,63,.3),transparent)!important}',
    'html.ev-natal:not(.pg-azul) .hero h1{background:linear-gradient(120deg,#fff 15%,#ffd54a 55%,#ff6b5e)!important;-webkit-background-clip:text!important;background-clip:text!important;color:transparent!important;filter:drop-shadow(0 0 14px rgba(255,213,74,.4))}',
    '.ev-lights{position:absolute;left:0;right:0;top:0;height:22px;display:flex;justify-content:space-around;background:linear-gradient(#0000,#0000);border-top:3px solid #1b1b1b}',
    '.ev-lights i{display:block;width:10px;height:15px;margin-top:3px;border-radius:50% 50% 55% 55%;background:var(--c);box-shadow:0 0 10px 2px var(--c);animation:evBlink 1.6s ease-in-out infinite;animation-delay:var(--dl)}',
    '@keyframes evBlink{0%,100%{opacity:1}50%{opacity:.25}}',
    '.ev-snow{position:absolute;inset:0;width:100%;height:100%}',
    '.ev-pill.n{background:linear-gradient(135deg,rgba(224,49,47,.95),rgba(24,128,63,.95));border:1px solid rgba(255,255,255,.4);box-shadow:0 10px 34px rgba(224,49,47,.4)}'
  ].join('\n');

  /* ===== ANO NOVO ===== */
  CSS.anonovo = [
    'html.ev-anonovo:root{color-scheme:dark;--bg:#05050c;--card:#10101e;--line:#3d3412;--tx:#fff8e6;--mut:#c9bd95;--ac:#ffc93c;--ac2:#fff1a8;--p:#ffc93c;--p2:#d9a416}',
    'html.ev-anonovo body{background:#05050c}',
    'html.ev-anonovo:not(.pg-azul) nav{background:rgba(5,5,12,.85)!important;border-bottom:1px solid #ffc93c!important}',
    'html.ev-anonovo .btn.pri{background:linear-gradient(135deg,#ffc93c,#c98a0a)!important;color:#1a1200!important;box-shadow:0 8px 24px rgba(255,201,60,.45)!important}',
    'html.ev-anonovo body>.glow{background:radial-gradient(600px 400px at 15% 5%,rgba(255,201,60,.22),transparent),radial-gradient(500px 400px at 90% 20%,rgba(160,90,255,.2),transparent)!important}',
    'html.ev-anonovo:not(.pg-azul) .hero h1{background:linear-gradient(120deg,#fff 10%,#ffc93c 55%,#ff8a3d)!important;-webkit-background-clip:text!important;background-clip:text!important;color:transparent!important;filter:drop-shadow(0 0 16px rgba(255,201,60,.5))}',
    '.ev-fire{position:absolute;inset:0;width:100%;height:100%}',
    '.ev-pill a{color:#ffd96b;font-weight:800}',
    '.ev-pill.a{background:linear-gradient(135deg,rgba(40,32,5,.96),rgba(90,60,0,.96));border:1px solid #ffc93c;box-shadow:0 10px 34px rgba(255,201,60,.4)}'
  ].join('\n');


  /* ---------- paletas para azul.html e feedback.html (nomes de variável próprios) ---------- */
  var PAL = {
    sexta13:    { bg2:'#140608', sf:'#150709', sf2:'#1d0a0d', ink:'#f6e9e9', l2:'#5a1a21', acc:'#ff5252', accd:'#ff7b7b', accs:'#3a1013', acct:'#1a0203', star:'#ffb23a', inp:'#0d0405', az:'#ff4d4d', cy:'#ff8a8a', btn:'#ff4d4d', btnt:'#1a0203', hue:150 },
    vingadores: { bg2:'#0a1230', sf:'#0d1634', sf2:'#121d44', ink:'#eef2ff', l2:'#34479a', acc:'#f5c518', accd:'#ffd84d', accs:'#2b2410', acct:'#1b1400', star:'#f5c518', inp:'#080e26', az:'#f5c518', cy:'#3ddc84', btn:'#e62429', btnt:'#ffffff', hue:0 },
    gta6:       { bg2:'#1b0640', sf:'#210a47', sf2:'#2a0f58', ink:'#fff4fb', l2:'#6a2aa8', acc:'#ff2e93', accd:'#ff63b0', accs:'#3b0f52', acct:'#ffffff', star:'#ffe14d', inp:'#170035', az:'#ff2e93', cy:'#25e8ff', btn:'#ff2e93', btnt:'#ffffff', hue:105 },
    natal:      { bg2:'#0a2016', sf:'#0e2a1b', sf2:'#123523', ink:'#fff5f0', l2:'#2a6a46', acc:'#ff5a52', accd:'#ff8179', accs:'#3a1a1a', acct:'#1c0505', star:'#ffd54a', inp:'#081d12', az:'#e0312f', cy:'#ffd54a', btn:'#e0312f', btnt:'#ffffff', hue:-100 },
    anonovo:    { bg2:'#0b0b18', sf:'#10101e', sf2:'#181829', ink:'#fff8e6', l2:'#4a3f16', acc:'#ffc93c', accd:'#ffd96b', accs:'#2b2208', acct:'#1a1200', star:'#ffc93c', inp:'#0a0a14', az:'#ffc93c', cy:'#fff1a8', btn:'#ffc93c', btnt:'#1a1200', hue:180 }
  };
  Object.keys(PAL).forEach(function (id) {
    var c = PAL[id], h = 'html.ev-' + id;
    CSS[id] += '\n' + [
      h + ':root{--bg2:' + c.bg2 + ';--text:' + c.ink + ';--mute:var(--mut);--azure:' + c.az + ';--cyan:' + c.cy + ';--btn:' + c.btn + ';--btn-t:' + c.btnt +
        ';--surface:' + c.sf + ';--surface2:' + c.sf2 + ';--ink:' + c.ink + ';--line2:' + c.l2 + ';--acc:' + c.acc + ';--acc-d:' + c.accd + ';--acc-soft:' + c.accs + ';--acc-t:' + c.acct + ';--star:' + c.star + ';--inp:' + c.inp + '}',
      // azul.html: partes decorativas que têm azul fixo no CSS (a janela do app continua azul, é a réplica do programa)
      h + ' .bgfx{filter:hue-rotate(' + c.hue + 'deg)}',
      h + ' .hero::before{background:radial-gradient(ellipse at 50% 0,' + c.az + '59,transparent 65%)!important}',
      h + ' h1 .ax-w.hl>span{background-image:linear-gradient(100deg,' + c.az + ',' + c.cy + ',' + c.az + ')!important}',
      h + ' section h2::after,' + h + ' .sig span i{background:linear-gradient(90deg,' + c.az + ',' + c.cy + ')!important}',
      h + ' .btn:hover{box-shadow:0 10px 30px ' + c.az + '73!important}'
    ].join('\n');
  });

  /* ---------- helpers ---------- */
  function el(cls, parent, style, html) {
    var d = document.createElement('div');
    d.className = cls;
    if (style) d.style.cssText = style;
    if (html) d.innerHTML = html;
    (parent || document.body).appendChild(d);
    return d;
  }
  var rnd = function (a, b) { return a + Math.random() * (b - a); };

  function pill(cls, texto, chave) {
    try { if (sessionStorage.getItem(chave)) return; } catch (e) {}
    var p = el('ev-pill ' + cls);
    p.innerHTML = '<span>' + texto + '</span><button aria-label="Fechar" title="Fechar">✕</button>';
    // avisa a página (ex.: barra fixa do feedback.html) o espaço que o aviso ocupa
    root.style.setProperty('--ev-pill-h', (p.offsetHeight + 10) + 'px');
    p.querySelector('button').onclick = function () {
      p.remove(); root.style.setProperty('--ev-pill-h', '0px');
      try { sessionStorage.setItem(chave, '1'); } catch (e) {}
    };
  }


  /* ---------- canvas: neve e fogos ---------- */
  function canvasEm(parent, cls) {
    var c = document.createElement('canvas');
    c.className = cls;
    parent.appendChild(c);
    var x = c.getContext('2d');
    function rs() { c.width = innerWidth; c.height = innerHeight; }
    rs(); addEventListener('resize', rs);
    return { c: c, x: x };
  }
  function neve(parent) {
    var o = canvasEm(parent, 'ev-snow'), c = o.c, x = o.x;
    var n = Math.min(110, Math.floor(innerWidth / 10)), f = [];
    for (var i = 0; i < n; i++) f.push({ x: rnd(0, innerWidth), y: rnd(0, innerHeight), r: rnd(1.2, 3.6), v: rnd(.4, 1.4), d: rnd(0, 6.28) });
    (function loop() {
      x.clearRect(0, 0, c.width, c.height);
      x.fillStyle = 'rgba(255,255,255,.85)';
      f.forEach(function (p) {
        p.y += p.v; p.d += .01; p.x += Math.sin(p.d) * .6;
        if (p.y > c.height + 5) { p.y = -5; p.x = rnd(0, c.width); }
        x.beginPath(); x.arc(p.x, p.y, p.r, 0, 6.283); x.fill();
      });
      requestAnimationFrame(loop);
    })();
  }
  function fogos(parent) {
    var o = canvasEm(parent, 'ev-fire'), c = o.c, x = o.x, ps = [];
    var cores = [[255, 201, 60], [255, 120, 80], [120, 200, 255], [200, 130, 255], [255, 255, 255]];
    function explode() {
      var cx = rnd(.1, .9) * c.width, cy = rnd(.1, .5) * c.height, cor = cores[Math.floor(rnd(0, cores.length))];
      for (var i = 0; i < 70; i++) {
        var a = rnd(0, 6.283), s = rnd(1, 5.2);
        ps.push({ x: cx, y: cy, vx: Math.cos(a) * s, vy: Math.sin(a) * s, l: 1, c: cor });
      }
    }
    explode();
    c.addEventListener('ev-boom', function () { explode(); explode(); });
    setInterval(function () { if (!document.hidden) explode(); }, 1400);
    (function loop() {
      x.clearRect(0, 0, c.width, c.height);
      ps = ps.filter(function (p) { return p.l > 0; });
      ps.forEach(function (p) {
        p.x += p.vx; p.y += p.vy; p.vy += .05; p.vx *= .985; p.l -= .012;
        x.fillStyle = 'rgba(' + p.c[0] + ',' + p.c[1] + ',' + p.c[2] + ',' + Math.max(p.l, 0) + ')';
        x.beginPath(); x.arc(p.x, p.y, 2, 0, 6.283); x.fill();
      });
      requestAnimationFrame(loop);
    })();
  }


  /* ---------- montagem ---------- */
  function montar() {
    var st = document.createElement('style');
    st.id = 'ev-style';
    st.textContent = CSS.base + '\n' + CSS[tema];
    document.head.appendChild(st);

    if (!isIndex) return;

    if (tema === 'sexta13') {
      document.title = '🔪 ' + document.title;

      var fog = el('ev-layer ev-bg');
      el('ev-fog', fog);

      var fx = el('ev-layer ev-fx');
      el('ev-vig', fx);
      var flash = el('ev-flash', fx);

      if (!reduz) {
        // gotas de sangue pingando do topo
        var n = Math.min(14, Math.floor(innerWidth / 90));
        for (var i = 0; i < n; i++) {
          el('ev-drip', fx,
            '--x:' + rnd(2, 98).toFixed(1) + '%;--w:' + rnd(6, 13).toFixed(0) + 'px;--h:' + rnd(34, 120).toFixed(0) + 'px;--d:' + rnd(7, 15).toFixed(1) + 's;--dl:-' + rnd(0, 12).toFixed(1) + 's');
        }
        // morcegos
        for (var b = 0; b < 5; b++) {
          el('ev-bat', fx,
            '--y:' + rnd(8, 55).toFixed(0) + 'vh;--s:' + rnd(18, 34).toFixed(0) + 'px;--t:' + rnd(14, 26).toFixed(0) + 's;--dl:-' + rnd(0, 24).toFixed(0) + 's', '🦇');
        }
        // relâmpago aleatório
        (function trovao() {
          setTimeout(function () {
            flash.classList.remove('on'); void flash.offsetWidth; flash.classList.add('on');
            trovao();
          }, rnd(9000, 20000));
        })();
      }
      pill('s13', '🔪 <b>Sexta-feira 13</b> — cuidado, o Groove está assombrado hoje…', 'ag_p_s13');
    }

    if (tema === 'gta6') {
      document.title = '🌴 ' + document.title;

      var bg = el('ev-layer ev-bg');
      el('ev-sky', bg);
      el('ev-sun', bg);
      el('ev-grid', bg);
      el('ev-palm l', bg);
      el('ev-palm r', bg);

      var fx2 = el('ev-layer ev-fx');
      el('ev-scan', fx2);
      var cops = el('ev-cops', fx2);

      // nível de procurado: acende conforme você rola a página
      var stars = el('ev-stars', null, '', '<span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>');
      stars.title = 'Nível de procurado: role a página 😉';
      var ss = stars.children;
      var tick = false;
      function atualiza() {
        tick = false;
        var max = document.documentElement.scrollHeight - innerHeight;
        var p = max > 0 ? scrollY / max : 0;
        var n = p < 0.03 ? 0 : Math.min(5, Math.ceil(p * 5));
        for (var i = 0; i < 5; i++) ss[i].classList.toggle('on', i < n);
        stars.classList.toggle('hot', n === 5);
        cops.classList.toggle('on', n === 5 && !reduz);
      }
      addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(atualiza); } }, { passive: true });
      atualiza();

      pill('g6', '🌴 <b>19/11 — GTA VI chegou!</b> Sintonize na <b>Vice Groove FM</b>, a rádio mais quente do Azul Groove.', 'ag_p_g6');
    }

    if (tema === 'vingadores') {
      document.title = '🛡️ ' + document.title;
      var bgv = el('ev-layer ev-bg');
      el('ev-halftone', bgv); el('ev-doom', bgv); el('ev-mist', bgv); el('ev-arc', bgv); el('ev-star', bgv);
      var fxv = el('ev-layer ev-fx');
      var bolt = el('ev-bolt', fxv);
      if (!reduz) (function raio() {
        setTimeout(function () {
          bolt.style.setProperty('--bx', rnd(10, 90).toFixed(0) + '%');
          bolt.classList.toggle('g', Math.random() < 0.5); bolt.classList.remove('on'); void bolt.offsetWidth; bolt.classList.add('on');
          raio();
        }, rnd(6000, 14000));
      })();
      pill('v', '🛡️ <b>Vingadores, reunir!</b> A semana de <b>Doomsday</b> chegou, e o <b>Doutor Destino</b> também. 💚 O Azul Groove entra em ação com a trilha dos heróis.', 'ag_p_v');
    }

    if (tema === 'natal') {
      document.title = '🎄 ' + document.title;
      var fxn = el('ev-layer ev-fx');
      var luz = el('ev-lights', fxn);
      var cores = ['#ff3b3b', '#ffd54a', '#3bd16f', '#4da3ff'];
      for (var k2 = 0; k2 < Math.floor(innerWidth / 38) + 4; k2++) {
        var li = document.createElement('i');
        li.style.cssText = '--c:' + cores[k2 % 4] + ';--dl:-' + (k2 % 5 * 0.3).toFixed(1) + 's';
        luz.appendChild(li);
      }
      if (!reduz) neve(fxn);
      pill('n', '🎄 <b>Feliz Natal!</b> Que a sua playlist seja cheia de paz e boa música.', 'ag_p_n');
    }

    if (tema === 'anonovo') {
      var ano = new Date().getMonth() === 0 ? new Date().getFullYear() : new Date().getFullYear() + 1;
      document.title = '🎆 ' + document.title;
      var fxa = el('ev-layer ev-fx');
      if (!reduz) fogos(fxa);
      pill('a', '🎆 <b>Feliz ' + ano + '!</b> Que o novo ano chegue no ritmo certo. <a href="carta-ano-novo.html">Ler a carta →</a>', 'ag_p_a');
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar);
  else montar();
})();


/* =========================================================
   Contagem regressiva + animação de agradecimento (só na página inicial)
   - Mostra o contador até a virada e, quando chega em 0, abre a animação
     de agradecimento NA PRÓPRIA PÁGINA (sem mandar a pessoa para outra página).
   - Quem entrar até 3 dias depois da virada também vê a animação (1 vez).
   Para testar:  ?contagem=1  (mostra o contador)   ?obrigado=1  (abre a animação direto)

   ========================================================= */
(function () {
  'use strict';
  var ALVO = Date.parse('2027-01-01T00:00:00-03:00');   // a virada do ano (horário de Brasília)
  var INICIO = Date.parse('2026-12-26T00:00:00-03:00'); // o contador aparece a partir daqui
  var JANELA = 3 * 86400000;      // depois da virada: quem entrar em até 3 dias vê a animação 1 vez

  var isIndex = /(^|\/)(index(-novo)?(\.html)?)?$/.test(location.pathname);
  if (!isIndex) return;

  var qs;
  try { qs = new URLSearchParams(location.search); } catch (e) { qs = { get: function () { return null; } }; }
  var forcar = qs.get('contagem') === '1', previa = qs.get('obrigado') === '1';
  var reduz = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function visto() { try { return localStorage.getItem('ag_obrig_2027') === '1'; } catch (e) { return false; } }
  function marcar() { try { localStorage.setItem('ag_obrig_2027', '1'); } catch (e) {} }
  function pronto(fn) { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn); else fn(); }

  var t0 = Date.now();
  if (previa) { pronto(function () { abrirObrigado(true); }); return; }
  if (t0 >= ALVO) {
    if (t0 < ALVO + JANELA && !visto()) pronto(function () { abrirObrigado(false); });
    return;
  }
  if (!forcar && t0 < INICIO) return;

  /* ---------------- contador ---------------- */
  var oculto = false;
  try { oculto = !!sessionStorage.getItem('ag_p_cd'); } catch (e) {}

  var st = document.createElement('style');
  st.textContent = [
    '.ev-cd{position:fixed;top:76px;left:50%;transform:translateX(-50%);z-index:9997;display:flex;align-items:center;gap:14px;padding:10px 12px 10px 16px;border-radius:18px;background:linear-gradient(135deg,rgba(25,18,2,.94),rgba(70,48,0,.94));border:1px solid #ffc93c;box-shadow:0 12px 36px rgba(255,201,60,.35);color:#fff8e6;font:600 .82rem/1.2 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;backdrop-filter:blur(10px);animation:evCdIn .6s cubic-bezier(.2,.9,.3,1.3) both}',
    '.ev-cd .t{display:flex;flex-direction:column;gap:2px;padding-right:4px}.ev-cd .t small{font-weight:500;color:#e8d9a8;font-size:.72rem}',
    '.ev-cd .n{display:flex;gap:8px}.ev-cd .n div{min-width:46px;text-align:center;padding:6px 6px 5px;border-radius:11px;background:rgba(255,201,60,.12);border:1px solid rgba(255,201,60,.35)}',
    '.ev-cd .n b{display:block;font:800 1.35rem/1 ui-monospace,Menlo,Consolas,monospace;color:#ffd96b;font-variant-numeric:tabular-nums;text-shadow:0 0 12px rgba(255,201,60,.6)}',
    '.ev-cd .n span{font-size:.62rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#d9c88f}',
    '.ev-cd button{all:unset;cursor:pointer;width:26px;height:26px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.14);font-size:.8rem;flex:none}.ev-cd button:hover{background:rgba(255,255,255,.28)}',
    '@keyframes evCdIn{from{opacity:0;transform:translate(-50%,-24px)}to{opacity:1;transform:translate(-50%,0)}}',
    '@media(max-width:640px){.ev-cd{top:70px;max-width:calc(100vw - 16px);gap:8px;padding:8px 8px 8px 12px}.ev-cd .t small{display:none}.ev-cd .n{gap:5px}.ev-cd .n div{min-width:38px;padding:5px 4px}.ev-cd .n b{font-size:1.05rem}}'
  ].join('\n');
  document.head.appendChild(st);

  var box = null, el = {}, timer;
  function dois(n) { return (n < 10 ? '0' : '') + n; }
  function montarContador() {
    if (!oculto) {
      box = document.createElement('div');
      box.className = 'ev-cd';
      box.setAttribute('role', 'timer');
      box.innerHTML = '<div class="t"><span>🎆 Faltam para 2027</span><small>a virada do ano no Azul Groove</small></div>' +
        '<div class="n"><div><b id="cd-d">00</b><span>dias</span></div><div><b id="cd-h">00</b><span>horas</span></div><div><b id="cd-m">00</b><span>min</span></div><div><b id="cd-s">00</b><span>seg</span></div></div>' +
        '<button aria-label="Fechar" title="Fechar">✕</button>';
      document.body.appendChild(box);
      ['d', 'h', 'm', 's'].forEach(function (k) { el[k] = box.querySelector('#cd-' + k); });
      // fechar só esconde o contador; a animação da virada continua marcada para acontecer
      box.querySelector('button').onclick = function () {
        box.remove(); box = null;
        try { sessionStorage.setItem('ag_p_cd', '1'); } catch (e) {}
      };
    }
    tick(); timer = setInterval(tick, 1000);
  }
  function tick() {
    var ms = ALVO - Date.now();
    if (ms <= 0) {
      clearInterval(timer);
      if (box) { box.remove(); box = null; }
      if (!visto()) abrirObrigado(false);
      return;
    }
    if (!box) return;
    var s = Math.floor(ms / 1000);
    el.d.textContent = dois(Math.floor(s / 86400));
    el.h.textContent = dois(Math.floor(s % 86400 / 3600));
    el.m.textContent = dois(Math.floor(s % 3600 / 60));
    el.s.textContent = dois(s % 60);
  }
  pronto(montarContador);

  /* ---------------- filme de agradecimento (cenas automáticas) ---------------- */
  var aberto = false;
  function abrirObrigado(modoPrevia) {
    if (aberto) return;
    aberto = true;
    if (!modoPrevia) marcar();

    // início de cada cena (ms) — a última é a tela final, que fica parada
    var T = [0, 7000, 13500, 19000, 24500, 32500, 42000, 50500];
    var NCENAS = T.length - 1; // 6 cenas + final

    var css = document.createElement('style');
    css.textContent = [
      '.ob{position:fixed;inset:0;z-index:10000;overflow:hidden;color:#fff8e6;font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;background:#04040a;animation:obIn .5s ease both;user-select:none}',
      '@keyframes obIn{from{opacity:0}to{opacity:1}}',
      '.ob.sai{animation:obOut .6s ease both}@keyframes obOut{to{opacity:0;transform:scale(1.06)}}',
      '.ob :focus-visible{outline:3px solid #ffc93c;outline-offset:3px}',
      '.ob-bg,.ob-bg2{position:absolute;inset:0;pointer-events:none}',
      '.ob-bg{background:radial-gradient(ellipse at 50% 110%,#2a1d52 0,#0d0a20 45%,#04040a 100%)}',
      '.ob-bg2{opacity:0;transition:opacity 1.2s;background:radial-gradient(60% 50% at 15% 60%,rgba(230,36,41,.30),transparent),radial-gradient(60% 50% at 85% 40%,rgba(37,99,235,.34),transparent),#03030a;animation:obPulse 4s ease-in-out infinite}',
      '@keyframes obPulse{50%{filter:brightness(1.35)}}',
      '.ob[data-sc="5"] .ob-bg2{opacity:1}',
      '.ob canvas{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}',
      '.ob-flash{position:absolute;inset:0;z-index:4;pointer-events:none;opacity:0}',
      '.ob-flash.go{animation:obFlash .8s ease-out}@keyframes obFlash{0%{opacity:.85}100%{opacity:0}}',
      '.ob-vig{position:absolute;inset:0;z-index:3;pointer-events:none;background:radial-gradient(ellipse at center,transparent 55%,rgba(0,0,0,.65) 100%)}',
      '.ob-bar{position:absolute;left:0;right:0;z-index:5;background:#000;height:7vh;animation:obBar 1.6s cubic-bezier(.7,0,.2,1) both}',
      '.ob-bar.t{top:0}.ob-bar.b{bottom:0}',
      '@keyframes obBar{from{height:50vh}to{height:7vh}}',
      '.ob.fim .ob-bar{animation:none;height:0;transition:height 1.2s cubic-bezier(.7,0,.2,1)}',
      '.ob-prog{position:absolute;z-index:7;left:14px;right:14px;top:calc(env(safe-area-inset-top,0px) + 10px);display:flex;gap:5px;transition:opacity .8s}',
      '.ob-prog i{flex:1;height:3px;border-radius:3px;background:rgba(255,255,255,.22);overflow:hidden}',
      '.ob-prog b{display:block;height:100%;background:#ffc93c;transform-origin:left;transform:scaleX(0)}',
      '.ob.fim .ob-prog{opacity:0}',
      '.ob-ctl{position:absolute;z-index:7;right:12px;top:calc(env(safe-area-inset-top,0px) + 24px);display:flex;gap:8px}',
      '.ob-ctl button{all:unset;cursor:pointer;height:36px;min-width:36px;padding:0 12px;box-sizing:border-box;border-radius:99px;display:grid;place-items:center;font:700 .8rem system-ui,sans-serif;background:rgba(0,0,0,.55);border:1px solid rgba(255,201,60,.5);color:#fff8e6;backdrop-filter:blur(6px)}',
      '.ob-ctl button:hover{background:rgba(255,201,60,.25)}',
      '.ob-stage{position:absolute;inset:0;z-index:2;perspective:1200px}',
      '.ob.shake .ob-stage{animation:obShake .55s linear}',
      '@keyframes obShake{0%,100%{transform:none}15%{transform:translate(-9px,5px)}30%{transform:translate(8px,-6px)}45%{transform:translate(-6px,-4px)}60%{transform:translate(5px,5px)}80%{transform:translate(-3px,2px)}}',
      '.sc{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:9vh 22px;visibility:hidden;opacity:0;transition:opacity .6s,visibility 0s .6s;pointer-events:none}',
      '.sc.on{visibility:visible;opacity:1;transition:opacity .6s,visibility 0s;animation:obZoom 9s linear both}',
      '.sc.s7.on{animation:none}',
      '@keyframes obZoom{from{transform:scale(1)}to{transform:scale(1.07)}}',
      '.sc a,.sc button{pointer-events:auto}',
      /* letras que entram */
      '.ch{display:inline-block;opacity:0}',
      '.sc.on .ch{animation:chIn .9s cubic-bezier(.2,.9,.2,1) both;animation-delay:calc(var(--b,0s) + var(--i)*70ms)}',
      '@keyframes chIn{from{opacity:0;transform:translateY(70%) scale(1.6);filter:blur(14px)}to{opacity:1;transform:none;filter:blur(0)}}',
      '.up{opacity:0}.sc.on .up{animation:upIn .9s cubic-bezier(.2,.8,.2,1) both;animation-delay:var(--b,0s)}',
      '@keyframes upIn{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}',
      /* cena 1 */
      '.k{font-weight:800;font-size:clamp(.8rem,3.2vw,1.35rem);letter-spacing:.38em;text-transform:uppercase;color:#ffc93c;text-shadow:0 0 18px rgba(255,201,60,.7);margin-bottom:2vh}',
      '.odo{display:flex;font-weight:900;font-size:min(27vw,21vh,13rem);line-height:1;letter-spacing:-.03em;filter:drop-shadow(0 0 28px rgba(255,201,60,.55))}',
      '.odo .c{height:1em;overflow:hidden;display:block}',
      '.odo em{display:block;height:1em;font-style:normal;background:linear-gradient(180deg,#fff 5%,#ffc93c 60%,#ff8a3d);-webkit-background-clip:text;background-clip:text;color:transparent}',
      '.odo .col{display:block}',
      '.sc.on .odo .col.roll{animation:obRoll 2.3s cubic-bezier(.15,.8,.1,1) 1s both}',
      '@keyframes obRoll{from{transform:translateY(0)}to{transform:translateY(-11em)}}',
      '.odo .c{opacity:0;transform:scale(.6)}.sc.on .odo .c{animation:obDig .8s cubic-bezier(.2,1.4,.3,1) both;animation-delay:calc(var(--i)*.12s + .3s)}',
      '@keyframes obDig{to{opacity:1;transform:none}}',
      '.rg{position:absolute;left:50%;top:50%;width:20px;height:20px;margin:-10px;border-radius:50%;border:1px solid #ffe08a;box-shadow:0 0 18px #ffc93c,inset 0 0 18px #ffc93c;opacity:0}',
      '.sc.on .rg{animation:obRing 1.8s ease-out both;animation-delay:calc(3.25s + var(--r)*.22s)}',
      '@keyframes obRing{0%{opacity:.95;transform:scale(1)}100%{opacity:0;transform:scale(55)}}',
      '.sub1{margin-top:3vh;font-size:clamp(.95rem,3vw,1.3rem);color:#e8d9a8;font-weight:600}',
      /* cena 2 */
      '.big{white-space:nowrap;font-weight:900;font-size:min(14.5vw,16vh,10rem);letter-spacing:-.02em;line-height:1;color:#fff;text-shadow:0 0 30px rgba(255,201,60,.65),0 0 80px rgba(255,150,40,.35)}',
      '.l1{margin-top:3.2vh;font-size:clamp(1.1rem,4.4vw,2rem);font-weight:600;color:#fff8e6}.l1 b{color:#ffc93c}',
      '.l2{margin-top:3vh;font-size:clamp(.8rem,2.8vw,1.15rem);font-weight:800;letter-spacing:.35em;text-transform:uppercase;color:#ffc93c}',
      /* cenas 3 e 4 */
      '.pre{font-size:clamp(1rem,3.6vw,1.6rem);font-weight:700;color:#e8d9a8;letter-spacing:.2em;text-transform:uppercase}',
      '.num{font:900 min(25vw,19vh,12rem)/1.05 ui-monospace,Menlo,Consolas,monospace;font-variant-numeric:tabular-nums;color:#ffd96b;text-shadow:0 0 30px rgba(255,201,60,.7),0 0 90px rgba(255,150,40,.4);margin:1.4vh 0}',
      '.num.is6{font-size:min(19vw,15vh,10rem)}',
      '.leg{font-size:clamp(1.1rem,4.2vw,1.9rem);font-weight:700}',
      '.eq{position:absolute;left:0;right:0;bottom:7vh;height:26vh;display:flex;align-items:flex-end;justify-content:center;gap:5px;padding:0 14px;opacity:.55;pointer-events:none;-webkit-mask-image:linear-gradient(0deg,#000 30%,transparent);mask-image:linear-gradient(0deg,#000 30%,transparent)}',
      '.eq i{flex:1;max-width:22px;border-radius:6px 6px 0 0;background:linear-gradient(0deg,#ffc93c,#ff8a3d);height:12%;transform-origin:bottom;animation:obEq var(--d,1s) ease-in-out infinite alternate;animation-delay:var(--dl,0s)}',
      '@keyframes obEq{to{height:var(--h,80%)}}',
      /* cena 5 */
      '.h2{font-weight:900;font-size:clamp(1.6rem,6.4vw,3.2rem);line-height:1.1;margin-bottom:5vh}.h2 b{color:#ffc93c;text-shadow:0 0 24px rgba(255,201,60,.6)}',
      '.cards{display:flex;gap:22px;flex-wrap:wrap;justify-content:center;perspective:1000px}',
      '.card{width:min(300px,82vw);padding:26px 20px;border-radius:22px;text-decoration:none;color:inherit;background:linear-gradient(160deg,rgba(60,46,10,.95),rgba(14,12,26,.95));border:1px solid rgba(255,201,60,.55);box-shadow:0 20px 60px rgba(255,201,60,.18);opacity:0;transition:transform .2s,border-color .2s}',
      '.card:hover{border-color:#ffc93c}',
      '.card i{display:block;font-style:normal;font-size:3rem;margin-bottom:10px}.card b{display:block;font-size:1.25rem}.card small{color:#d8c991;font-size:.92rem}',
      '.sc.on .card.c1{animation:cardL 1.1s cubic-bezier(.2,.9,.2,1) 1.2s both,obFloat 3s ease-in-out 2.4s infinite}',
      '.sc.on .card.c2{animation:cardR 1.1s cubic-bezier(.2,.9,.2,1) 2s both,obFloat 3s ease-in-out 3.2s infinite reverse}',
      '@keyframes cardL{from{opacity:0;transform:translateX(-120px) rotateY(70deg) scale(.7)}to{opacity:1;transform:none}}',
      '@keyframes cardR{from{opacity:0;transform:translateX(120px) rotateY(-70deg) scale(.7)}to{opacity:1;transform:none}}',
      '@keyframes obFloat{50%{transform:translateY(-10px)}}',
      /* cena 6 — mistério */
      '.typ{min-height:2.6em;font-size:clamp(1.05rem,4vw,1.7rem);font-weight:600;color:#cfd6f5;max-width:640px;line-height:1.4}',
      '.typ::after{content:"▍";margin-left:3px;animation:obCur .7s steps(1) infinite;color:#ffc93c}',
      '@keyframes obCur{50%{opacity:0}}',
      '.mt{position:relative;white-space:nowrap;margin-top:4vh;font-weight:900;font-size:min(9.2vw,11vh,6rem);letter-spacing:.02em;text-transform:uppercase;color:#fff;line-height:1.05;opacity:0}',
      '.mt.m2{margin-top:1vh}',
      '.sc.on .mt{animation:obGl 9s steps(1) 3.4s both,obMj .9s steps(1) 3.4s infinite}',
      '.sc.on .mt.m2{animation-delay:3.9s,3.9s}',
      '@keyframes obMj{0%,100%{transform:none}20%{transform:translate(-5px,2px) skewX(6deg)}40%{transform:translate(4px,-3px)}60%{transform:translate(-3px,0) skewX(-8deg)}80%{transform:translate(6px,2px)}}',
      '.mt::before,.mt::after{content:attr(data-t);position:absolute;left:0;right:0;top:0}',
      '.mt::before{color:#ff2b3a;transform:translate(-4px,0);mix-blend-mode:screen;animation:obG1 1.4s steps(1) infinite}',
      '.mt::after{color:#2b7bff;transform:translate(4px,0);mix-blend-mode:screen;animation:obG2 1.1s steps(1) infinite}',
      '@keyframes obGl{0%{opacity:0}4%{opacity:1}8%{opacity:.2}12%,100%{opacity:1}}',
      '@keyframes obG1{0%,100%{transform:translate(-4px,0);clip-path:inset(0 0 60% 0)}25%{transform:translate(6px,-2px);clip-path:inset(40% 0 20% 0)}50%{transform:translate(-8px,2px);clip-path:inset(70% 0 0 0)}75%{transform:translate(3px,0);clip-path:inset(10% 0 55% 0)}}',
      '@keyframes obG2{0%,100%{transform:translate(4px,0);clip-path:inset(55% 0 5% 0)}30%{transform:translate(-6px,2px);clip-path:inset(0 0 70% 0)}60%{transform:translate(8px,-2px);clip-path:inset(30% 0 40% 0)}85%{transform:translate(-3px,0);clip-path:inset(75% 0 0 0)}}',
      '.red{margin-top:3.4vh;display:flex;gap:10px;justify-content:center;flex-wrap:wrap}',
      '.red span{display:block;height:1.1em;border-radius:3px;background:#e9edff;opacity:0}',
      '.sc.on .red span{animation:obRed 1.2s steps(1) both;animation-delay:calc(5.6s + var(--i)*.18s)}',
      '@keyframes obRed{0%{opacity:0}20%{opacity:1}40%{opacity:.3}60%,100%{opacity:1}}',
      '.red .w1{width:min(24vw,120px)}.red .w2{width:min(30vw,160px)}.red .w3{width:min(18vw,90px)}',
      '.aw{margin-top:4vh;font-weight:800;letter-spacing:.5em;text-transform:uppercase;font-size:clamp(.9rem,3.4vw,1.4rem);color:#ffc93c;opacity:0}',
      '.sc.on .aw{animation:upIn 1s ease 7.6s both,obGlow 1.6s ease-in-out 8.8s infinite}',
      '@keyframes obGlow{50%{text-shadow:0 0 24px #ffc93c}}',
      '.gw{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:9vh 22px}',
      '.sc.on .gw{animation:obJit 2.4s steps(1) infinite}',
      '@keyframes obJit{0%,100%{transform:none;filter:none}6%{transform:translate(-7px,2px) skewX(3deg);filter:hue-rotate(45deg)}8%{transform:none;filter:none}30%{transform:translate(5px,-3px);filter:saturate(2.4)}32%{transform:none;filter:none}52%{transform:translate(-9px,0) skewX(-5deg);filter:hue-rotate(-60deg) contrast(1.3)}54%{transform:scaleY(1.03);filter:none}56%{transform:none}78%{transform:translate(8px,3px) skewX(4deg);filter:invert(.15)}80%{transform:none;filter:none}}',
      '.scan{position:absolute;inset:0;pointer-events:none;background:repeating-linear-gradient(0deg,rgba(255,255,255,.07) 0 1px,transparent 1px 4px);animation:obScanF .12s steps(2) infinite}',
      '@keyframes obScanF{50%{opacity:.55}}',
      '.tear{position:absolute;left:0;right:0;height:13vh;pointer-events:none;background:linear-gradient(90deg,rgba(255,43,58,.28),rgba(43,123,255,.28));mix-blend-mode:screen;animation:obTear 2.3s steps(14) infinite}',
      '@keyframes obTear{from{top:-15%;transform:skewX(10deg)}to{top:110%;transform:skewX(-10deg)}}',
      '.er{position:absolute;left:var(--x);top:var(--y);font:700 clamp(.7rem,2.6vw,1rem) ui-monospace,Menlo,Consolas,monospace;color:var(--c);text-shadow:0 0 8px var(--c);letter-spacing:.08em;font-style:normal;opacity:0}',
      '.sc.on .er{animation:obEr var(--d) steps(1) infinite;animation-delay:var(--dl)}',
      '@keyframes obEr{0%{opacity:0}10%{opacity:1}18%{opacity:0}55%{opacity:0}60%{opacity:1;transform:translateX(7px)}68%,100%{opacity:0}}',
      '.cake{font-size:clamp(2.6rem,12vw,5rem);line-height:1;opacity:0;margin:1vh 0}',
      '.sc.on .cake{animation:cakeIn .9s cubic-bezier(.2,1.4,.3,1) .3s both,obFloat 2.4s ease-in-out 1.3s infinite}',
      '@keyframes cakeIn{from{opacity:0;transform:scale(.2) rotate(-20deg)}to{opacity:1;transform:none}}',
      '.num.inv{font-size:min(17vw,15vh,9rem);margin:.6vh 0}',
      '.date{display:inline-block;margin-top:3vh;padding:12px 28px;border-radius:99px;font-weight:900;font-size:clamp(1.3rem,5.2vw,2.3rem);color:#1a1200;background:linear-gradient(135deg,#ffd96b,#ffb020);box-shadow:0 0 40px rgba(255,201,60,.6)}',
      '.sc.on .date{animation:upIn 1s ease var(--b,3s) both,obBeat 1.4s ease-in-out 4.2s infinite}',
      '.chan{display:inline-block;margin-top:2.6vh;padding:10px 18px;border-radius:12px;background:rgba(88,101,242,.28);border:1px solid #7c88ff;color:#fff;text-decoration:none;font-weight:700;font-size:clamp(.88rem,3.4vw,1.15rem)}.chan:hover{background:rgba(88,101,242,.5)}',
      '@keyframes obBeat{50%{transform:scale(1.06);box-shadow:0 0 60px rgba(255,201,60,.9)}}',
      /* final */
      '.fin{font-weight:900;font-size:min(17vw,14vh,9rem);line-height:1;letter-spacing:-.02em;color:#fff;text-shadow:0 0 40px rgba(255,201,60,.7)}.fin b{color:#ffc93c}',
      '.chips{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:3vh}',
      '.chips span{padding:8px 16px;border-radius:99px;background:rgba(10,10,22,.8);border:1px solid rgba(255,201,60,.45);font-weight:700;font-size:clamp(.8rem,2.8vw,1rem);color:#ffe9a8}',
      '.lk{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:2.4vh}',
      '.lk a{padding:10px 18px;border-radius:12px;text-decoration:none;color:#fff8e6;font-weight:700;font-size:.92rem;background:rgba(16,16,30,.9);border:1px solid rgba(255,201,60,.4);transition:.2s}.lk a:hover{border-color:#ffc93c;transform:translateY(-2px)}',
      '.teaser{margin-top:2.4vh;font-size:.9rem;color:#9aa3c7;font-weight:600}',
      '.acts{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:3.4vh}',
      '.btn{all:unset;box-sizing:border-box;cursor:pointer;display:inline-flex;align-items:center;gap:8px;text-decoration:none;font:700 .95rem system-ui,sans-serif;padding:13px 22px;border-radius:12px;border:1px solid rgba(255,201,60,.45);background:rgba(10,10,22,.8);color:#fff8e6;transition:.2s}',
      '.btn:hover{border-color:#ffc93c;transform:translateY(-2px)}',
      '.btn.pri{background:linear-gradient(135deg,#ffc93c,#c98a0a);color:#1a1200;border-color:transparent;box-shadow:0 8px 24px rgba(255,201,60,.35)}',
      '.ob.fim .sc.s7 .up{animation-delay:calc(var(--b,0s) + .2s)}',
      /* sem animação (acessibilidade) */
      '.ob.estatico *{animation:none!important;transition:none!important}.ob.estatico .ch,.ob.estatico .up{opacity:1}',
      '@media(prefers-reduced-motion:reduce){.ob *{animation:none!important}.ch,.up{opacity:1}}'
    ].join('\n');
    document.head.appendChild(css);

    var ob = document.createElement('div');
    ob.className = 'ob';
    ob.setAttribute('role', 'dialog');
    ob.setAttribute('aria-modal', 'true');
    ob.setAttribute('aria-label', 'Feliz 2027! Mensagem de agradecimento do Azul Groove');
    ob.dataset.sc = '0';

    var eq = '';
    for (var q = 0; q < 30; q++) eq += '<i style="--h:' + (30 + Math.random() * 70).toFixed(0) + '%;--d:' + (0.5 + Math.random() * 0.8).toFixed(2) + 's;--dl:-' + (Math.random()).toFixed(2) + 's"></i>';
    var prog = ''; for (var pz = 0; pz < NCENAS; pz++) prog += '<i><b></b></i>';
    var dig = function (a) { return '<span class="c" style="--i:' + a[0] + '"><em>' + a[1] + '</em></span>'; };

    ob.innerHTML =
      '<div class="ob-bg"></div><div class="ob-bg2"></div>' +
      '<canvas class="ob-st" aria-hidden="true"></canvas><canvas class="ob-fx" aria-hidden="true"></canvas>' +
      '<div class="ob-vig"></div><div class="ob-flash"></div>' +
      '<div class="ob-bar t"></div><div class="ob-bar b"></div>' +
      '<div class="ob-prog" aria-hidden="true">' + prog + '</div>' +
      '<div class="ob-ctl"><button type="button" id="ob-pz" aria-label="Pausar">❚❚</button><button type="button" id="ob-skip">Pular ⏭</button></div>' +
      '<div class="ob-stage">' +
        /* 1 */ '<div class="sc s1"><div class="k up" style="--b:.5s">Feliz Ano Novo</div>' +
          '<div class="odo" aria-hidden="true">' + dig([0, 2]) + dig([1, 0]) + dig([2, 2]) +
            '<span class="c" style="--i:3"><span class="col roll"><em>6</em><em>7</em><em>8</em><em>9</em><em>0</em><em>1</em><em>2</em><em>3</em><em>4</em><em>5</em><em>6</em><em>7</em></span></span></div>' +
          '<i class="rg" style="--r:0"></i><i class="rg" style="--r:1"></i><i class="rg" style="--r:2"></i>' +
          '<div class="sub1 up" style="--b:4s">Azul Groove · ASTM Software</div></div>' +
        /* 2 */ '<div class="sc s2"><h2 class="big" data-split="Obrigado" style="--b:.4s"></h2>' +
          '<p class="l1 up" style="--b:2s">por fazer parte de <b>2026</b> 💙</p><p class="l2 up" style="--b:3.4s">ASTM Software</p></div>' +
        /* 3 */ '<div class="sc s3"><div class="pre up" style="--b:.3s">Mais de</div><div class="num" data-n="500" data-s="+" data-d="600">0</div><div class="leg up" style="--b:.9s">servidores ativos</div><div class="eq" aria-hidden="true">' + eq + '</div></div>' +
        /* 4 */ '<div class="sc s4"><div class="pre up" style="--b:.3s">E foram</div><div class="num is6" data-n="183289" data-d="600">0</div><div class="leg up" style="--b:.9s">usuários atendidos em 2026</div><div class="eq" aria-hidden="true">' + eq + '</div></div>' +
        /* 5 */ '<div class="sc s5"><h2 class="h2 up" style="--b:.3s">Em 2026 a gente teve <b>grandes lançamentos</b> 🚀</h2><div class="cards">' +
          '<a class="card c1" href="ia.html"><i aria-hidden="true">🤖</i><b>Azul Groove IA</b><small>Conheça a nossa inteligência artificial</small></a>' +
          '<a class="card c2" href="azul.html"><i aria-hidden="true">🎵</i><b>Azul Groove Music</b><small>para Windows</small></a></div></div>' +
        /* 6 */ '<div class="sc s6"><div class="gw"><div class="scan" aria-hidden="true"></div><div class="tear" aria-hidden="true"></div>' +
          '<p class="typ" id="ob-typ" aria-label="Em 2027, a gente tem grandes coisas vindo aí…"></p>' +
          '<div class="mt" data-t="Grandes coisas">Grandes coisas</div><div class="mt m2" data-t="vindo aí">vindo aí</div>' +
          '<div aria-hidden="true"><i class="er" style="--x:8%;--y:16%;--c:#ff4d5a;--d:1.7s;--dl:0s">ERRO 404</i><i class="er" style="--x:62%;--y:12%;--c:#3dff8a;--d:2.1s;--dl:.5s">SYSTEM_FAIL</i><i class="er" style="--x:14%;--y:78%;--c:#5aa0ff;--d:1.5s;--dl:.9s">0x2027</i><i class="er" style="--x:70%;--y:70%;--c:#ff4d5a;--d:2.3s;--dl:.3s">undefined</i><i class="er" style="--x:80%;--y:38%;--c:#3dff8a;--d:1.9s;--dl:1.1s">NaN</i><i class="er" style="--x:6%;--y:44%;--c:#5aa0ff;--d:1.6s;--dl:.7s">▓▒░ ░▒▓</i><i class="er" style="--x:46%;--y:88%;--c:#ff4d5a;--d:2s;--dl:1.3s">#@!%&</i><i class="er" style="--x:52%;--y:6%;--c:#3dff8a;--d:1.8s;--dl:.2s">GLITCH</i></div></div></div>' +
        /* 7 */ '<div class="sc s6b"><div class="k up" style="--b:.2s">ASTM Software completa</div><div class="cake" aria-hidden="true">🎂</div>' +
          '<div class="num inv" data-n="8" data-s=" ANOS" data-d="500">0</div><div class="leg up" style="--b:1s">de história 💙</div>' +
          '<p class="l1 up" style="--b:1.9s">Estou convidando <b>todos vocês</b> para fazer parte do <b>aniversário da ASTM</b>! 🎉</p>' +
          '<div class="date up" style="--b:3s">📅 10/01/2027</div>' +
          '<a class="chan up" style="--b:4.4s" href="https://discord.gg/g4cW4zRvjf" target="_blank" rel="noopener noreferrer">O convite está no canal <b>・astm-showcase</b> →</a></div>' +
        /* final */ '<div class="sc s7"><h2 class="fin up" style="--b:.2s" aria-label="Feliz 2027!">Feliz <b>2027</b>!</h2>' +
          '<div class="chips up" style="--b:.7s"><span>500+ servidores ativos</span><span>183.289 usuários em 2026</span></div>' +
          '<div class="lk up" style="--b:1s"><a href="ia.html">🤖 Azul Groove IA</a><a href="azul.html">🎵 Music para Windows</a><a href="https://discord.gg/g4cW4zRvjf" target="_blank" rel="noopener noreferrer">💬 Entrar no Discord</a></div>' +
          '<div class="teaser up" style="--b:1.3s">🎂 8 anos da ASTM Software · 10/01/2027 · canal ・astm-showcase</div>' +
          '<div class="acts up" style="--b:1.6s"><button class="btn pri" id="ob-ok" type="button">Continuar no site</button><button class="btn" id="ob-re" type="button">↻ Rever</button><a class="btn pri" href="index-novo.html" id="ob-teste">✨ Testar o visual novo</a><a class="btn" href="carta-ano-novo.html">💌 Ler a carta</a></div></div>' +
      '</div>';
    document.body.appendChild(ob);

    // letras separadas (efeito de texto entrando)
    ob.querySelectorAll('[data-split]').forEach(function (e) {
      var tx = e.getAttribute('data-split'); e.setAttribute('aria-label', tx);
      for (var i = 0; i < tx.length; i++) {
        var sp = document.createElement('span'); sp.className = 'ch'; sp.setAttribute('aria-hidden', 'true');
        sp.style.setProperty('--i', i); sp.textContent = tx[i]; e.appendChild(sp);
      }
    });

    var antes = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    var vivo = true, pausado = false, t = 0, ultimo = performance.now(), idx = -1, cueI = 0, finalOk = false;
    var scs = ob.querySelectorAll('.sc'), segs = ob.querySelectorAll('.ob-prog b'), typEl = ob.querySelector('#ob-typ');
    var TEXTO = 'Em 2027, a gente tem grandes coisas vindo aí…';

    /* ---- efeitos de tela ---- */
    var flashEl = ob.querySelector('.ob-flash');
    function flash(cor) { flashEl.style.background = cor || '#fff'; flashEl.classList.remove('go'); void flashEl.offsetWidth; flashEl.classList.add('go'); }
    function tremer() { ob.classList.remove('shake'); void ob.offsetWidth; ob.classList.add('shake'); setTimeout(function () { ob.classList.remove('shake'); }, 600); }

    var fx = reduz ? null : motor(ob.querySelector('.ob-fx'), ob.querySelector('.ob-st'), function () { return vivo; });

    // intensidade dos fogos em cada cena
    var INT = [0, 0.8, 0, 0, 1.1, 0, 3, 2.6];

    /* ---- marcações no tempo (cortes, flashes, explosões) ---- */
    var cues = [
      { at: 3250, fn: function () { flash('#ffe08a'); tremer(); if (fx) { fx.inten = 2.2; fx.rajada(7); } } },
      { at: T[1], fn: function () { flash('#fff3c4'); } },
      { at: T[2], fn: function () { flash('#ffd96b'); } },
      { at: T[3], fn: function () { flash('#ffd96b'); } },
      { at: T[4], fn: function () { flash('#ffffff'); if (fx) fx.rajada(4); } },
      { at: T[5] + 900, fn: function () { tremer(); } },
      { at: T[5] + 3400, fn: function () { flash('#ff2b3a'); tremer(); } },
      { at: T[5] + 5200, fn: function () { flash('#2b7bff'); tremer(); } },
      { at: T[5] + 6800, fn: function () { flash('#ff2b3a'); setTimeout(function () { flash('#2b7bff'); }, 140); tremer(); } },
      { at: T[5] + 8600, fn: function () { flash('#ffffff'); tremer(); setTimeout(tremer, 250); } },
      { at: T[6], fn: function () { flash('#ffe08a'); tremer(); if (fx) fx.rajada(8); } },
      { at: T[7], fn: function () { flash('#ffffff'); tremer(); if (fx) fx.rajada(10); } }
    ];

    function entrar(i) {
      idx = i;
      ob.dataset.sc = String(i);
      scs.forEach(function (s, k) { s.classList.toggle('on', k === i); });
      if (fx) { fx.inten = INT[i]; fx.mis = (i === 5); }
      if (i === NCENAS) {
        ob.classList.add('fim');
        if (!finalOk) { finalOk = true; setTimeout(function () { if (vivo) { var b = ob.querySelector('#ob-ok'); if (b) b.focus(); } }, 400); }
      }
    }
    function ease(p) { return 1 - Math.pow(1 - p, 3); }

    function atualizar() {
      var i = 0; while (i < NCENAS && t >= T[i + 1]) i++;
      if (i !== idx) entrar(i);
      while (cueI < cues.length && t >= cues[cueI].at) { cues[cueI].fn(); cueI++; }
      var local = t - T[idx];
      // números subindo
      var ns = scs[idx].querySelectorAll('[data-n]');
      for (var k = 0; k < ns.length; k++) {
        var n = +ns[k].getAttribute('data-n'), suf = ns[k].getAttribute('data-s') || '', d = +ns[k].getAttribute('data-d') || 0;
        var pp = Math.max(0, Math.min(1, (local - d) / 2600));
        ns[k].textContent = Math.round(n * ease(pp)).toLocaleString('pt-BR') + (pp >= 1 ? suf : '');
      }
      // texto digitando
      if (idx === 5) {
        var c = Math.max(0, Math.min(TEXTO.length, Math.floor((local - 700) / 48)));
        typEl.textContent = TEXTO.slice(0, c);
      }
      // barras de progresso
      for (var g = 0; g < segs.length; g++) {
        var f = Math.max(0, Math.min(1, (t - T[g]) / (T[g + 1] - T[g])));
        segs[g].style.transform = 'scaleX(' + f.toFixed(3) + ')';
      }
    }

    function laco(now) {
      if (!vivo) return;
      var dt = Math.min(100, now - ultimo); ultimo = now;
      if (!pausado) { t += dt; atualizar(); if (fx) fx.passo(dt); }
      requestAnimationFrame(laco);
    }

    /* ---- controles ---- */
    function fechar() {
      if (!vivo) return;
      vivo = false;
      document.removeEventListener('keydown', tecla);
      document.body.style.overflow = antes;
      ob.classList.add('sai');
      setTimeout(function () { ob.remove(); css.remove(); }, reduz ? 0 : 600);
    }
    function pausar(v) {
      pausado = (v === undefined) ? !pausado : v;
      ob.querySelector('#ob-pz').textContent = pausado ? '▶' : '❚❚';
      ob.querySelector('#ob-pz').setAttribute('aria-label', pausado ? 'Continuar' : 'Pausar');
      ob.querySelectorAll('.sc *, .ob-bg2, .eq i').forEach(function (e) { e.style.animationPlayState = pausado ? 'paused' : ''; });
    }
    function pular() { pausar(false); t = T[NCENAS] + 1; cueI = cues.length; atualizar(); }
    function rever() {
      pausar(false); finalOk = false; ob.classList.remove('fim');
      t = 0; cueI = 0; idx = -1; scs.forEach(function (s) { s.classList.remove('on'); });
      void ob.offsetWidth; // reinicia as animações
      // reinicia as barras de cinema
      ob.querySelectorAll('.ob-bar').forEach(function (b) { b.style.animation = 'none'; void b.offsetWidth; b.style.animation = ''; });
      if (fx) fx.limpar();
    }
    function tecla(e) {
      if (e.key === 'Escape') fechar();
      else if (e.key === ' ' && document.activeElement && document.activeElement.tagName !== 'BUTTON' && document.activeElement.tagName !== 'A') { e.preventDefault(); pausar(); }
    }
    document.addEventListener('keydown', tecla);
    ob.querySelector('#ob-pz').onclick = function () { pausar(); };
    ob.querySelector('#ob-skip').onclick = pular;
    ob.querySelector('#ob-ok').onclick = fechar;
    ob.querySelector('#ob-re').onclick = rever;
    ob.querySelector('#ob-skip').focus();

    if (reduz) {                       // quem prefere menos movimento vai direto para a tela final
      ob.classList.add('estatico');
      t = T[NCENAS] + 1; cueI = cues.length; atualizar();
      ob.querySelector('#ob-ok').focus();
    }
    var cenaIni = parseInt(qs.get('cena'), 10);   // teste: ?obrigado=1&cena=5 começa direto na cena 5
    if (cenaIni > 0 && cenaIni <= NCENAS) { t = T[cenaIni]; while (cueI < cues.length && cues[cueI].at <= t) cueI++; }
    requestAnimationFrame(function (n) { ultimo = n; laco(n); });
  }

  /* ---------------- motor de partículas (fogos, estrelas, brasas) ---------------- */
  function motor(cvF, cvS, ativo) {
    var xf = cvF.getContext('2d'), xs = cvS.getContext('2d'), W = 0, H = 0, ps = [], rk = [], stars = [], acc = 0;
    var api = { inten: 0, mis: false };
    var cores = [[255, 201, 60], [255, 140, 60], [120, 200, 255], [200, 130, 255], [255, 255, 255], [255, 90, 150], [255, 235, 140]];
    function rnd(a, b) { return a + Math.random() * (b - a); }
    function rs() {
      var d = Math.min(window.devicePixelRatio || 1, 2);
      W = innerWidth; H = innerHeight;
      cvF.width = cvS.width = Math.round(W * d); cvF.height = cvS.height = Math.round(H * d);
      xf.setTransform(d, 0, 0, d, 0, 0); xs.setTransform(d, 0, 0, d, 0, 0);
      stars = [];
      for (var i = 0, n = Math.round(W * H / 8000); i < n; i++) stars.push({ x: rnd(0, W), y: rnd(0, H), r: rnd(0.4, 1.7), z: rnd(0.15, 1), p: rnd(0, 6.28) });
    }
    rs(); addEventListener('resize', rs);
    function boom(x, y, c, n) {
      var anel = Math.random() < 0.35;
      for (var i = 0; i < n; i++) {
        var a = (anel ? i / n * 6.2832 : Math.random() * 6.2832), v = anel ? 4.2 : rnd(0.8, 6);
        ps.push({ x: x, y: y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, l: 1, dl: rnd(0.008, 0.016), c: c, g: 0.05, r: 2 });
      }
    }
    function foguete() { rk.push({ x: rnd(W * 0.12, W * 0.88), y: H, vy: -rnd(9, 13) * Math.max(0.7, H / 800), ty: rnd(H * 0.12, H * 0.5), c: cores[Math.floor(Math.random() * cores.length)] }); }
    api.rajada = function (n) { for (var i = 0; i < n; i++) (function (k) { setTimeout(function () { if (ativo()) boom(rnd(W * 0.1, W * 0.9), rnd(H * 0.1, H * 0.5), cores[k % cores.length], 80); }, k * 160); })(i); };
    api.limpar = function () { ps = []; rk = []; xf.clearRect(0, 0, W, H); };
    api.passo = function (dt) {
      if (!ativo()) { removeEventListener('resize', rs); return; }
      var f = dt / 16.67, i;
      // estrelas
      xs.clearRect(0, 0, W, H);
      for (i = 0; i < stars.length; i++) {
        var s = stars[i]; s.y -= s.z * 0.15 * f; if (s.y < -2) { s.y = H + 2; s.x = rnd(0, W); }
        s.p += 0.03 * f;
        xs.fillStyle = api.mis ? 'rgba(170,190,255,' + (0.25 + 0.35 * Math.abs(Math.sin(s.p))).toFixed(2) + ')' : 'rgba(255,240,200,' + (0.25 + 0.5 * Math.abs(Math.sin(s.p))).toFixed(2) + ')';
        xs.beginPath(); xs.arc(s.x, s.y, s.r * s.z + 0.3, 0, 6.2832); xs.fill();
      }
      // rastro dos fogos
      xf.globalCompositeOperation = 'destination-out';
      xf.fillStyle = 'rgba(0,0,0,' + (1 - Math.pow(0.84, f)).toFixed(3) + ')';
      xf.fillRect(0, 0, W, H);
      xf.globalCompositeOperation = 'lighter';
      acc += api.inten * dt / 1000;
      while (acc >= 1) { foguete(); acc -= 1; }
      if (api.mis && Math.random() < 0.5 * f) {
        var red = Math.random() < 0.5;
        ps.push({ x: rnd(0, W), y: H + 5, vx: rnd(-0.3, 0.3), vy: -rnd(0.5, 1.6), l: 1, dl: 0.004, c: red ? [255, 60, 70] : [70, 130, 255], g: 0, r: rnd(1.2, 3) });
      }
      for (i = rk.length - 1; i >= 0; i--) {
        var r = rk[i]; r.y += r.vy * f;
        ps.push({ x: r.x, y: r.y, vx: rnd(-0.2, 0.2), vy: 0.3, l: 0.7, dl: 0.04, c: r.c, g: 0, r: 1.5 });
        if (r.y <= r.ty) { boom(r.x, r.y, r.c, 90); rk.splice(i, 1); }
      }
      for (i = ps.length - 1; i >= 0; i--) {
        var p = ps[i];
        p.x += p.vx * f; p.y += p.vy * f; p.vx *= Math.pow(0.985, f); p.vy = p.vy * Math.pow(0.985, f) + p.g * f; p.l -= p.dl * f;
        if (p.l <= 0) { ps.splice(i, 1); continue; }
        xf.fillStyle = 'rgba(' + p.c[0] + ',' + p.c[1] + ',' + p.c[2] + ',' + p.l.toFixed(2) + ')';
        xf.beginPath(); xf.arc(p.x, p.y, p.r, 0, 6.2832); xf.fill();
      }
    };
    return api;
  }
})();
