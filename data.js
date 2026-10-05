// data.js - base de conhecimento local (sem chaves, sem chamadas externas)
const astmBotKnowledge = {
  items: [
    { key: "update", resposta: "🚀 **ASTM OS 15.0:** atualizado com respostas por IA e reescrita em tempo real!", tags: ["update", "atualizacao", "novidades", "os", "versao"] },
    { key: "erros", resposta: "⚠️ **Erros comuns:**\n1. **Bot offline:** verifique as permissões do bot no servidor do Discord.\n2. **Sem som:** confirme se o bot tem permissão para falar no canal de voz.", tags: ["erros", "erro", "problema", "bug", "ajuda", "offline", "som"] },
    { key: "comandos", resposta: "🤖 **Comandos principais:**\n• /play [música] - toca uma música ou playlist.\n• /stop - para a reprodução e limpa a fila.\n• /skip - pula para a próxima faixa.", tags: ["comandos", "comando", "rpc", "play", "skip", "stop", "musica"] },
    { key: "sobre", resposta: "ℹ️ **Sobre o Azul Groove:** bot de música e moderação desenvolvido pela ASTM Software.", tags: ["sobre", "bot", "azul groove", "astm"] }
  ],
  // Devolve texto simples (o chat formata **negrito**). Usado como contexto da IA e como fallback offline.
  local(query) {
    const t = String(query || '').toLowerCase().trim();
    if (!t) return '';
    const f = this.items.find(r => r.key === t || t.includes(r.key) || r.tags.some(g => t.includes(g)));
    return f ? f.resposta : '';
  }
};
