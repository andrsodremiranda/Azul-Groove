const astmBotKnowledge = {
    options: [
        { id: "update", label: "🚀 Ver ASTM OS 15.0 & HyperCore v2.0", query: "update" },
        { id: "ailogs", label: "🧠 Logs & Novidades da IA", query: "logs ia" },
        { id: "showcase", label: "✨ ASTM Showcase 2026 (Evento)", query: "showcase" },
        { id: "help", label: "🌟 Ver Todas as Funcionalidades (Help)", query: "help" }
    ],

    content: {
        aiLogs: {
            title: "ASTM HyperCore — Logs & Novidades da Inteligência Artificial",
            date: "Outubro de 2026",
            entries: [
                "<b>[v2.4-AI] Telemetria Preditiva:</b> Implementação de redes neurais leves para detecção prévia de latência em canais de voz do Discord.",
                "<b>[v2.3-AI] Otimização de Resposta:</b> Melhoria na indexação de fusos horários globais e cálculo de expressões matemáticas complexas no assistente.",
                "<b>[v2.1-AI] Diagnóstico Autônomo:</b> O sistema agora consegue auto-corrigir erros de fluxo no Wavelink sem intervenção manual.",
                "<b>[v2.0-HyperCore] Lançamento Oficial:</b> Integração completa do núcleo de IA centralizado no ASTM OS 15.0."
            ]
        },
        showcase2026: {
            title: "ASTM Showcase 2026 — O Grande Evento Anual",
            date: "Outubro de 2026",
            description: "O ASTM Showcase 2026 é o evento oficial da ASTM Software focado em revelar as grandes inovações do ecossistema, incluindo demonstrações ao vivo do ASTM OS 15.0, novos recursos do Azul Groove, atualizações do ASTM HyperCore v2.0 e novidades exclusivas para desenvolvedores e criadores de conteúdo do Discord."
        },
        inviteBot: {
            title: "Como colocar o Azul Groove no seu Servidor do Discord",
            steps: [
                "<b>1. Link de Convite:</b> Clique no botão <b>'Adicionar Bot'</b> no topo do site ou use o link de autorização oficial do Discord.",
                "<b>2. Selecionar o Servidor:</b> Escolha na lista suspensa o servidor onde deseja adicionar o bot (você precisa ter permissão de <i>Administrador</i> ou <i>Gerenciar Servidor</i>).",
                "<b>3. Conceder Permissões:</b> Confirme as permissões necessárias (como conectar a canais de voz e enviar mensagens) e clique em Autorizar.",
                "<b>4. Pronto para Usar:</b> Entre em um canal de voz no seu servidor e digite <code>/play &lt;música&gt;</code> para começar a tocar!"
            ]
        },
        build26000: {
            title: "ASTM OS 15.0 & ASTM HyperCore v2.0 (Maio, 2026)",
            release: "A atualização mais recente traz o poderoso ASTM HyperCore v2.0 e a integração de Inteligência Artificial para diagnóstico e telemetria inteligente, garantindo alta estabilidade, desempenho otimizado e correção rápida de falhas.",
            novidades: [
                "<b>ASTM HyperCore v2.0:</b> Novo núcleo central reestruturado com foco em desempenho, arquitetura moderna e suporte integrado a IA.",
                "<b>Telemetria Inteligente com IA:</b> Coleta e análise automática de registros técnicos para detecção proativa de falhas e estabilidade do backend de áudio.",
                "<b>Hospedagem Dedicada:</b> Infraestrutura otimizada para múltiplos bots, oferecendo mais velocidade e eficiência energética.",
                "<b>ASTM CoreStatus:</b> Plataforma de monitoramento em tempo real e transparência dos serviços ASTM.",
                "<b>Azul Groove RPC 15.0:</b> Integração completa com novas APIs internas e melhor desempenho no desktop."
            ],
            melhorias: [
                "Otimização geral do ASTM HyperCore 2.0 e suporte a múltiplos motores de áudio (NodeLink/Lavalink).",
                "Gestão avançada de áudio com streaming contínuo e sem falhas de som.",
                "Ambiente otimizado para múltiplos bots e processos internos."
            ],
            correcOes: [
                "Correção de falhas no sistema de reprodução e erros de áudio.",
                "Tratamento robusto de reconexões e eventos do Wavelink.",
                "Resolução de mais de 50 erros técnicos identificados pelo sistema de IA."
            ]
        },
        donations: {
            title: "💙 ASTM Software — Política de Doações",
            date: "Maio de 2026",
            info: "As doações realizadas para a ASTM Software possuem caráter voluntário e ajudam na manutenção do projeto (hospedagem dedicada, custos operacionais e desenvolvimento do ASTM OS).",
            benefits: "Liberam acesso antecipado a recursos experimentais, builds alpha/beta e sistemas em desenvolvimento.",
            warning: "⚠️ <b>Atenção:</b> Lembre-se de colocar o seu <b>nome de usuário do Discord</b> na descrição da doação para a equipe associar a transação corretamente!"
        },
        errorGuide: {
            title: "Guia de Erros Comuns do Azul Groove (ASTM OS)",
            notice: "Identificadores ativos no ASTM HyperCore para diagnóstico rápido.",
            categories: [
                {
                    name: "Permissões",
                    errors: [
                        { problem: "Sem permissão para conectar/falar", definition: "O bot não tem privilégios de rede no Discord.", solution: "Verifique as permissões do bot no canal de voz e ative Conectar e Falar." },
                        { problem: "Usuário sem permissão", definition: "A pessoa que tentou usar o comando não possui cargo autorizado.", solution: "Peça a um administrador para garantir acesso." }
                    ]
                },
                {
                    name: "Player e Comandos",
                    errors: [
                        { problem: "Nenhuma música tocando", definition: "O sistema de áudio está inativo ou a fila de reprodução está vazia.", solution: "Use <code>/play</code> para iniciar uma música." }
                    ]
                }
            ]
        },
        commands: {
            title: "Comandos Principais",
            explanation: "Comandos de barra (`/`) do Azul Groove:",
            list: [
                "• <code>/play &lt;música&gt;</code> - Toca música do YouTube, Spotify, etc.",
                "• <code>/pause</code> - Pausa a música atual",
                "• <code>/skip</code> - Pula a música",
                "• <code>/setup</code> - Configura permissões e o bot",
                "• <code>/rich_presence</code> - Gera o token para o Azul-Groove-RPC",
                "• <code>/about</code> - Informações da versão"
            ]
        }
    },

    search(query) {
        if (!query) return "Por favor, digite alguma palavra ou comando para pesquisar.";
        const q = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

        const matchAny = (words) => words.some(word => q.includes(word));

        // 🧠 1. LOGS E NOVIDADES DA IA
        if (matchAny(['logs ia', 'log ia', 'novidades ia', 'atualizacoes ia', 'ia logs'])) {
            let ai = this.content.aiLogs;
            let html = `🧠 <b>${ai.title}</b><br><i>Atualizado em: ${ai.date}</i><br><br>`;
            ai.entries.forEach(entry => html += `• ${entry}<br><br>`);
            return html;
        }

        // ✨ 2. EVENTO ASTM SHOWCASE 2026
        if (matchAny(['showcase', 'evento', 'conferencia', 'apresentacao'])) {
            let s = this.content.showcase2026;
            return `✨ <b>${s.title}</b><br><i>Data: ${s.date}</i><br><br>${s.description}`;
        }

        // 🌟 3. COMANDO HELP / FUNCIONALIDADES GERAIS
        if (matchAny(['help', 'ajuda', 'funcionalidades', 'recursos', 'o que sabes fazer', 'opcoes'])) {
            return `🤖 <b>Painel de Ajuda & Funcionalidades do Assistente:</b><br><br>` +
                   `• 🧠 <b>Logs da IA:</b> Acompanhe as novidades do núcleo inteligente.<br>` +
                   `• ✨ <b>ASTM Showcase 2026:</b> Informações sobre o evento anual.<br>` +
                   `• 🧮 <b>Matemática:</b> Contas simples (ex: <code>100 dividido por 4</code>).<br>` +
                   `• 🕒 <b>Horas Globais:</b> Horários mundiais (Tóquio, Nova Iorque, Rio Grande do Sul, etc.).<br>` +
                   `• 🎶 <b>Música e Erros:</b> Guia completo do player do Azul Groove.`;
        }

        // 🌐 4. TRADUTOR DE EMOJIS SIMPLES
        if (q.startsWith('emoji') || q.startsWith('traduzir')) {
            const mapaEmojis = { 'musica': '🎶', 'computador': '💻', 'coracao': '💙', 'fogo': '🔥', 'feliz': '😄', 'robo': '🤖', 'som': '🔊', 'discord': '💬' };
            let traduzido = q;
            for (let palavra in mapaEmojis) {
                traduzido = traduzido.replaceAll(palavra, mapaEmojis[palavra]);
            }
            return `🎨 <b>Tradução para Emojis:</b><br><code>${traduzido}</code>`;
        }

        // 🧮 5. MATEMÁTICA INTELIGENTE (Corrigido para "dividido", "vezes", etc.)
        let mathStr = q
            .replace(/ dividido por | dividido | div /g, '/')
            .replace(/ vezes por | vezes |x/g, '*')
            .replace(/ mais /g, '+')
            .replace(/ menos /g, '-');

        if (/[\+\-\*\/]/.test(mathStr) && /^[\d\s\+\-\*\/\(\)\.]+$/.test(mathStr) && /\d/.test(mathStr)) {
            try {
                const resultado = Function(`'use strict'; return (${mathStr})`)();
                if (!isNaN(resultado)) {
                    return `🧮 <b>Resultado da conta:</b> <code>${q} = ${resultado}</code>`;
                }
            } catch (e) {}
        }

        // 🤖 6. QUANTOS BOTS TEM / SUPORTE MULTIVOZ
        if (matchAny(['quantos bots', 'tem bot', 'multivoz', 'varios bots', 'canais de voz'])) {
            return `🤖 <b>Arquitetura e Suporte Multivoz:</b><br><br>` +
                   `O ecossistema do Azul Groove foi projetado com <b>Suporte Multivoz</b>, permitindo o suporte a múltiplos canais de voz simultâneos sem conflitos na infraestrutura da ASTM Software!`;
        }

        // 🕒 7. BUSCA DE FUSOS HORÁRIOS (Mapeamento Rápido + Dinâmico)
        if (matchAny(['horas', 'horario', 'que horas', 'data', 'dia', 'calendario', 'fuso', 'toquio', 'tokyo', 'iorque', 'rio grande do sul', 'paris', 'italia', 'roma', 'russia', 'moscou'])) {
            const agora = new Date();

            let timeZone = 'Europe/Lisbon';
            let localNome = 'Horário Local (Portugal)';

            if (matchAny(['toquio', 'tokyo'])) {
                timeZone = 'Asia/Tokyo';
                localNome = 'Japão (Tóquio)';
            } else if (matchAny(['iorque', 'new york', 'nova iorque', 'ny'])) {
                timeZone = 'America/New_York';
                localNome = 'Estados Unidos (Nova Iorque)';
            } else if (matchAny(['rio grande do sul', 'porto alegre'])) {
                timeZone = 'America/Sao_Paulo';
                localNome = 'Brasil (Rio Grande do Sul)';
            } else if (matchAny(['paris', 'franca'])) {
                timeZone = 'Europe/Paris';
                localNome = 'França (Paris)';
            } else if (matchAny(['italia', 'roma'])) {
                timeZone = 'Europe/Rome';
                localNome = 'Itália (Roma)';
            } else if (matchAny(['russia', 'moscou', 'moscow'])) {
                timeZone = 'Europe/Moscow';
                localNome = 'Rússia (Moscovo)';
            } else if (matchAny(['sao paulo', 'brasilia', 'rio de janeiro', 'brasil'])) {
                timeZone = 'America/Sao_Paulo';
                localNome = 'Brasil (São Paulo / Brasília)';
            } else if (matchAny(['manaus', 'amazonas'])) {
                timeZone = 'America/Manaus';
                localNome = 'Brasil (Manaus)';
            } else if (matchAny(['acre'])) {
                timeZone = 'America/Rio_Branco';
                localNome = 'Brasil (Acre)';
            } else {
                let termoBusca = q.replace(/horas|horario|que horas|data|dia|calendario|fuso|na|no|de|do|da/g, '').trim();
                if (termoBusca.length > 0) {
                    try {
                        const zones = Intl.supportedValuesOf('timeZone');
                        const matchZone = zones.find(z => z.toLowerCase().includes(termoBusca.replace(/\s+/g, '_')));
                        if (matchZone) {
                            timeZone = matchZone;
                            localNome = matchZone.replace(/_/g, ' ').replace('/', ' — ');
                        }
                    } catch (e) {}
                }
            }

            const horaZona = agora.toLocaleTimeString('pt-PT', { timeZone });
            const dataZona = agora.toLocaleDateString('pt-PT', { timeZone, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            
            return `🕒 Na região <b>${localNome}</b>, são exatamente <b>${horaZona}</b> (${dataZona}).`;
        }

        // ⚡ 8. HyperCore / Kernel / CoreStatus / Telemetria
        if (matchAny(['hypercore', 'kernel', 'corestatus', 'telemetria', 'inteligencia artificial'])) {
            return `<b>⚡ ASTM HyperCore v2.0 & CoreStatus</b><br><br>` +
                   `O HyperCore é o núcleo central do ASTM OS 15.0, equipado com IA para diagnóstico automático de falhas, telemetria inteligente e gestão avançada de áudio.<br><br>` +
                   `Podes acompanhar o estado em tempo real através da plataforma <b>ASTM CoreStatus</b>!`;
        }

        // 💙 9. Doações
        if (matchAny(['doacao', 'doar', 'apoiar', 'apoio', 'contribuir'])) {
            let d = this.content.donations;
            return `<b>${d.title}</b><br><i>Atualizado em: ${d.date}</i><br><br>${d.info}<br><br>🚀 <b>Benefícios:</b> ${d.benefits}<br><br>${d.warning}`;
        }

        // 🚀 10. Atualização / Build / Novidades
        if (matchAny(['update', 'atualiza', 'build', '15', 'novidades', 'novo', 'lancamento'])) {
            let b = this.content.build26000;
            let html = `<b>🚀 ${b.title}</b><br><br>${b.release}<br><br><b>🌟 Novidades:</b><br>`;
            b.novidades.forEach(n => html += `• ${n}<br>`);
            html += `<br><b>🚀 Melhorias:</b><br>`;
            b.melhorias.forEach(m => html += `• ${m}<br>`);
            html += `<br><b>🛠️ Correções:</b><br>`;
            b.correcOes.forEach(c => html += `• ${c}<br>`);
            return html;
        }

        // 🎶 11. Música / Player / Erros de Som
        if (matchAny(['musica', 'tocando', 'player', 'audio', 'som', 'tocar', 'play'])) {
            return `🎶 O Azul Groove foi feito para entregar a melhor experiência sonora com o motor ASTM OS 15.0 e HyperCore v2.0!<br><br>` +
                   `⚠️ <i>Se estiver a enfrentar o erro de reprodução:</i><br>` +
                   `<b>Erro: Nenhuma música tocando</b><br>` +
                   `O sistema de áudio está inativo ou a fila está vazia. Use <code>/play</code> para iniciar uma música.`;
        }

        // 📥 12. Convidar / Adicionar / Servidor
        if (matchAny(['colocar', 'adicionar', 'convite', 'convidar', 'servidor', 'invite', 'bot'])) {
            let inv = this.content.inviteBot;
            let html = `<b>📥 ${inv.title}</b><br><br>`;
            inv.steps.forEach(s => html += `${s}<br><br>`);
            html += `🔗 <a href='https://discord.com/oauth2/authorize?client_id=1107120892472983603&scope=bot&permissions=332892794064' target='_blank' style='color: #5865F2; font-weight: bold;'>Clique aqui para adicionar o bot ao seu servidor!</a>`;
            return html;
        }

        // 🤖 13. Quem é você / Sobre
        if (matchAny(['quem e voce', 'quem e vc', 'sobre', 'azul groove', 'assistente'])) {
            return "Eu sou o assistente virtual oficial do Azul Groove, um bot de música avançado para o Discord desenvolvido pela ASTM Software em versão beta, alimentado pelo motor ASTM OS 15.0 com suporte de Inteligência Artificial e uso a minha própria base de dados!";
        }

        // 🤖 14. Diferença entre assistentes
        if (matchAny(['diferenca', 'jotform', 'terceiros', 'site', 'pagina'])) {
            return "A IA da página inicial (hospedada na Jotform) é fornecida por terceiros, enquanto o assistente virtual que está logo em baixo no site é desenvolvido inteiramente pela ASTM Software.";
        }

        // 🎧 15. RPC / Rich Presence
        if (matchAny(['rpc', 'rich presence', 'status', 'token', 'discord rpc'])) {
            return `<b>🎧 Azul-Groove-RPC 15.0</b><br>Integra o que o bot está a tocar diretamente no seu status do Discord.<br><br><b>📌 Passos:</b><br>1. Descarregue o app no GitHub da ASTM Software.<br>2. Use o comando <code>/rich_presence</code> no Discord para gerar seu token.<br>3. Cole no app e adicione a chave de conexão <code>wss://gleaming-brindle-braid.glitch.me/ws</code>.`;
        }
        
        // ⚠️ 16. Permissões
        if (matchAny(['permissao', 'conectar', 'falar', 'cargo', 'admin'])) {
            let err = this.content.errorGuide.categories[0].errors[0];
            return `<b>⚠ Erro: ${err.problem}</b><br><i>O que é:</i> ${err.definition}<br><br>➡️ <b>Solução:</b> ${err.solution}`;
        }

        // ⚠️ 17. Erros / Guia / Bugs
        if (matchAny(['erro', 'error', 'guia', 'bugs', 'bug', 'problema'])) {
            let eg = this.content.errorGuide;
            let html = `<b>⚠️️ ${eg.title}</b><br><br><i>${eg.notice}</i><br><br>`;
            eg.categories.forEach(cat => {
                html += `<b>📂 ${cat.name}:</b><br>`;
                cat.errors.forEach(e => html += `• <b>${e.problem}</b><br>📝 ${e.definition}<br>➡️ ${e.solution}<br><br>`);
            });
            return html;
        } 
        
        // 🤖 18. Comandos / Ajuda
        if (matchAny(['comando', 'comandos', 'ajuda', 'help', 'comandos de barra'])) {
            let c = this.content.commands;
            let html = `<b>🤖 ${c.title}</b><br>${c.explanation}<br><br>`;
            c.list.forEach(cmd => html += `${cmd}<br>`);
            return html;
        }

        // 🔗 FALLBACK INTELIGENTE (Links Úteis Oficiais)
        return "Desculpe, não encontrei informações exatas para essa busca. Mas podes aceder diretamente aos nossos links oficiais:<br><br>" +
               "• 📥 <b>Convite do Bot (Discord):</b> <a href='https://discord.com/oauth2/authorize?client_id=1107120892472983603&scope=bot&permissions=332892794064' target='_blank'>Adicionar ao Servidor</a><br>" +
               "• 💬 <b>Servidor de Suporte:</b> <a href='https://discord.gg/g4cW4zRvjf' target='_blank'>Entrar no Discord</a><br>" +
               "• 🐙 <b>GitHub da ASTM Software:</b> <a href='https://github.com/andrsodremiranda' target='_blank'>Repositório Oficial</a><br>" +
               "• 📺 <b>Canal do YouTube:</b> <a href='https://www.youtube.com/@ASTMSoftware' target='_blank'>Ver Conteúdos</a><br>" +
               "• 🗳️ <b>Votação (Top.gg):</b> <a href='https://top.gg/bot/1107120892472983603/vote' target='_blank'>Votar no Bot</a><br><br>" +
               "Tente pesquisar por: <b>help</b>, <b>logs ia</b>, <b>ASTM Showcase 2026</b>, contas (ex: <i>100 dividido por 4</i>) ou <b>horario toquio</b>.";
    }
};