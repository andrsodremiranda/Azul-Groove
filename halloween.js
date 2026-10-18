/* Tema de Halloween do Azul Groove
 * Liga sozinho de 17/10/2026 a 07/11/2026 (inclusive) e depois some, sem precisar mexer no site.
 * Teste: adicione ?halloween=1 na URL para forçar ligado, ?halloween=0 para forçar desligado.
 */
(function () {
  var INICIO = [2026, 10, 17]; // ano, mês, dia
  var FIM = [2026, 11, 7];

  function chave(a) { return a[0] * 10000 + a[1] * 100 + a[2]; }

  var ativo;
  var q = '';
  try { q = new URLSearchParams(location.search).get('halloween'); } catch (e) {}
  if (q === '1') ativo = true;
  else if (q === '0') ativo = false;
  else {
    var d = new Date(); // data do aparelho do visitante
    var hoje = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    ativo = hoje >= chave(INICIO) && hoje <= chave(FIM);
  }
  if (!ativo) return;

  // Chat: não mexe na cor dos botões (respeita a cor escolhida pela pessoa)
  // Animações (chuva e névoa) só na tela inicial
  var ehInicio = /\/(index(\.html)?)?$/.test(location.pathname);
  var ehChat = /\/(chat|assistente)(\.html)?\/?$/.test(location.pathname);
  var ehIA = /\/ia(\.html)?\/?$/.test(location.pathname);
  // Docs, licenças e guia de IA local: sem animação (as cores do tema continuam)
  var semAnim = ehChat || ehIA || /\/(docs|licenca|licenca-ia|ia-local)(\.html)?\/?$/.test(location.pathname);

  var css = '' +
    /* cores: as duas famílias de variáveis usadas nas páginas (--ac/--ac2 e --p/--p2) */
    ':root.halloween:not(.hw-chat){--ac:#ff7a1a;--ac2:#ffb347;--p:#ff7a1a;--p2:#e0630a;--g1:#ff7a1a;--g2:#a855f7;--ok:#9be15d}' +
    ':root.halloween:not([data-theme=light]){--bg:#0d0716;--card:#1a0f26;--side:#140a1e;--inp:#1a0f26;--line:#3b1f52;--mut:#c4a6d9;--m:#c4a6d9;--soft:rgba(255,122,26,.08)}' +
    '.halloween .glow{background:radial-gradient(600px 400px at 15% 0,rgba(255,122,26,.22),transparent),radial-gradient(500px 400px at 95% 10%,rgba(168,85,247,.2),transparent)!important}' +
    /* chat e assistente: botões em roxo (combina com o fundo e não é laranja); a cor escolhida pela pessoa nas configurações continua valendo */
    ':root.halloween.hw-chat{--p:#9b5cf6;--p2:#7c3aed}' +
    '.hw-chat .hero .logo,.hw-chat .hero img{box-shadow:0 0 44px rgba(155,92,246,.55)!important}' +
    '.hw-chat .main.empty .box{box-shadow:0 10px 30px rgba(155,92,246,.2)!important}' +
    /* botões: degradê de uma cor só (laranja), sem misturar com roxo */
    '.halloween:not(.hw-chat) .btn,.halloween:not(.hw-chat) .btn.pri{--g1:#ff8a2a;--g2:#e0630a;--gl:rgba(255,122,26,.4)}' +
    /* painel de Novidades: tudo em laranja e roxo, sem sobras de azul */
    '.halloween .nw-btn:hover{box-shadow:0 14px 40px rgba(255,122,26,.5)}' +
    '.halloween .nw-h{background:linear-gradient(120deg,rgba(255,122,26,.32),rgba(168,85,247,.16) 60%,transparent)}' +
    '.halloween .nw-hi{background:linear-gradient(135deg,#ff8a2a,#e0630a);box-shadow:0 8px 22px rgba(255,122,26,.5)}' +
    '.halloween .nw-h button:hover{background:rgba(255,122,26,.3)}' +
    '.halloween .nw-tabs button.on{background:linear-gradient(135deg,#ff8a2a,#e0630a);box-shadow:0 6px 16px rgba(255,122,26,.4)}' +
    '.halloween .nw-it:hover{background:rgba(255,122,26,.08)}' +
    '.halloween .nw-it.fresh{border-color:rgba(255,122,26,.55);background:linear-gradient(135deg,rgba(255,122,26,.14),rgba(168,85,247,.06))}' +
    '.halloween .nw-ic{background:linear-gradient(135deg,#ff8a2a,#e0630a)}' +
    '.halloween .nw-it.up .nw-ic{background:linear-gradient(135deg,#a855f7,#7c3aed)}' +
    '.halloween .nw-tag{background:rgba(168,85,247,.2);color:#d8b4fe}' +
    '.halloween .nw-tag.new{background:rgba(255,122,26,.22);color:#ffc078}' +
    '.halloween .nw-it a{background:rgba(255,122,26,.16);color:#ffd2a1}' +
    '.halloween .nw-it a:hover{background:#ff7a1a;color:#fff}' +
    '.halloween .nw-f a{color:#ffb347}' +
    /* barras de rolagem (painel de Novidades e página): finas, laranja e roxo, sem o branco com setas */
    '.halloween .nw-list,.halloween:not(.hw-chat){scrollbar-width:thin;scrollbar-color:#ff7a1a rgba(255,255,255,.05)}' +
    '.halloween .nw-list::-webkit-scrollbar,.halloween:not(.hw-chat)::-webkit-scrollbar{width:8px;height:8px}' +
    '.halloween .nw-list::-webkit-scrollbar-track,.halloween:not(.hw-chat)::-webkit-scrollbar-track{background:rgba(255,255,255,.04);border-radius:99px}' +
    '.halloween .nw-list::-webkit-scrollbar-thumb,.halloween:not(.hw-chat)::-webkit-scrollbar-thumb{background:linear-gradient(#ff8a2a,#a855f7);border-radius:99px}' +
    '.halloween .nw-list::-webkit-scrollbar-button,.halloween:not(.hw-chat)::-webkit-scrollbar-button{display:none;width:0;height:0}' +
    /* decoração */
    '#hw-layer{position:fixed;inset:0;pointer-events:none;z-index:-1;overflow:hidden}' +
    '#hw-layer .hw-i{position:absolute;top:-40px;font-size:22px;opacity:.75;animation:hwfall linear infinite;will-change:transform}' +
    '@keyframes hwfall{0%{transform:translate3d(0,-40px,0) rotate(0)}50%{transform:translate3d(30px,55vh,0) rotate(180deg)}100%{transform:translate3d(-20px,110vh,0) rotate(360deg)}}' +
    '#hw-fog{position:fixed;left:0;right:0;bottom:0;height:90px;pointer-events:none;z-index:-1;background:linear-gradient(to top,rgba(168,85,247,.16),transparent)}' +
    '.halloween ::selection{background:#ff7a1a;color:#fff}' +
    '.halloween .logo,.halloween .brand{text-shadow:0 0 14px rgba(255,122,26,.55)}' +
    '@media (prefers-reduced-motion:reduce){#hw-layer .hw-i{animation:none;top:auto;bottom:10px}}';

  // Fundo musical (bolas de luz, barras de equalizador, brilho do logo) nas páginas de chat e IA
  if (ehChat || ehIA) css +=
    '.hw-bg .o1{background:#ff7a1a}' +
    '.hw-bg .o2{background:#a855f7}' +
    '.hw-bg .o3{background:#ffb347}' +
    '.hw-bg .eq i{background:linear-gradient(to top,rgba(255,122,26,.75),rgba(168,85,247,.12))}' +
    '.hw-bg:not([data-theme=light]) .main.empty{background:radial-gradient(ellipse 60% 50% at 50% 62%,rgba(124,45,176,.5) 0%,rgba(13,7,22,0) 70%),var(--bg)}' +
    '.hw-bg .hero .logo,.hw-bg .hero img{box-shadow:0 0 44px rgba(255,122,26,.5)}' +
    '.hw-bg .main.empty .box{box-shadow:0 10px 30px rgba(255,122,26,.16)}' +
    '.hw-bg .note{border-left-color:#ff7a1a;background:rgba(255,122,26,.12)}' +
    ':root.hw-bg[data-theme=light] .o1{background:#ffc999}' +
    ':root.hw-bg[data-theme=light] .o2{background:#d8b4fe}' +
    ':root.hw-bg[data-theme=light] .o3{background:#ffe2b0}' +
    ':root.hw-bg[data-theme=light] .main.empty{background:radial-gradient(ellipse 60% 50% at 50% 62%,rgba(255,122,26,.2) 0%,rgba(244,246,251,0) 70%),var(--bg)}';

  // Site da IA: botões laranja (mesmos efeitos, só trocando a cor)
  if (ehIA) css +=
    '.hw-bg .btn:hover{box-shadow:0 8px 28px rgba(255,122,26,.55)}' +
    '.hw-bg .btn.ghost{background:rgba(255,122,26,.14)}' +
    '.hw-bg .btn.ghost:hover{background:rgba(255,122,26,.32);box-shadow:none}' +
    '@keyframes pulse{0%{box-shadow:0 0 0 0 rgba(255,122,26,.55)}70%{box-shadow:0 0 0 18px rgba(255,122,26,0)}100%{box-shadow:0 0 0 0 rgba(255,122,26,0)}}';

  // "Pronto para Começar?": borda giratória, fundo, título e enfeites de Halloween
  css +=
    /* só background-image (nunca o atalho "background"): assim a animação, que mexe no background-position, continua funcionando */
    '.halloween .final::before{background-image:conic-gradient(from 0deg,transparent 0 55%,rgba(255,122,26,.9) 75%,rgba(168,85,247,.9) 88%,transparent 100%)}' +
    '.halloween .final::after{background-image:linear-gradient(135deg,rgba(255,122,26,.22),rgba(168,85,247,.16),rgba(255,122,26,.12)),linear-gradient(#12081d,#12081d)}' +
    '.halloween .final h2{background-image:linear-gradient(90deg,#ffb347,#fff,#ff7a1a,#c084fc,#ffb347)}' +
    '@keyframes glowp{0%,100%{box-shadow:0 8px 24px rgba(255,122,26,.4)}50%{box-shadow:0 8px 40px rgba(168,85,247,.75)}}' +
    '.hw-deco{position:absolute;z-index:0;pointer-events:none;line-height:1;filter:drop-shadow(0 0 10px rgba(255,122,26,.5));animation:hwfloat 4s ease-in-out infinite alternate}' +
    '@keyframes hwfloat{from{transform:translateY(0) rotate(-6deg)}to{transform:translateY(-10px) rotate(6deg)}}' +
    '@media (max-width:600px){.hw-deco{font-size:26px!important}}';

  function montar() {
    document.documentElement.classList.add('halloween');
    if (ehChat) document.documentElement.classList.add('hw-chat');
    if (ehChat || ehIA) document.documentElement.classList.add('hw-bg');

    var st = document.createElement('style');
    st.id = 'hw-style';
    st.textContent = css;
    document.head.appendChild(st);

    // enfeites dentro do bloco "Pronto para Começar?"
    var fin = document.querySelector('.final');
    if (fin) {
      [['🎃', 'left:5%;top:14%;font-size:38px'], ['🦇', 'right:6%;top:12%;font-size:32px'],
       ['👻', 'left:8%;bottom:12%;font-size:32px'], ['🎃', 'right:7%;bottom:14%;font-size:30px']].forEach(function (d, i) {
        var e = document.createElement('span');
        e.className = 'hw-deco';
        e.textContent = d[0];
        e.style.cssText = d[1] + ';animation-delay:' + (-i * 0.9) + 's';
        fin.appendChild(e);
      });
    }

    if (semAnim || !ehInicio) return; // animações só na tela inicial

    var fog = document.createElement('div');
    fog.id = 'hw-fog';
    document.body.appendChild(fog);

    var layer = document.createElement('div');
    layer.id = 'hw-layer';
    var icones = ['🎃', '🦇', '👻', '🕸️', '🍬', '🦇'];
    var qtd = window.innerWidth < 600 ? 7 : 14;
    for (var i = 0; i < qtd; i++) {
      var s = document.createElement('span');
      s.className = 'hw-i';
      s.textContent = icones[i % icones.length];
      s.style.left = (Math.random() * 96) + '%';
      s.style.fontSize = (16 + Math.random() * 16) + 'px';
      s.style.animationDuration = (12 + Math.random() * 14) + 's';
      s.style.animationDelay = (-Math.random() * 20) + 's';
      layer.appendChild(s);
    }
    document.body.appendChild(layer);
  }

  if (document.body) montar();
  else document.addEventListener('DOMContentLoaded', montar);
})();
