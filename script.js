class CarreiraComponent extends HTMLElement {
    constructor() {
        super();
        this.abaAtual = 'linguagens em alta por área'; // Aba inicial
        this.dados = {};
    }

    connectedCallback() {
        this.carregarDados();
    }

    async carregarDados() {
        try {
            // Busca o arquivo JSON
            const response = await fetch('dados.json');
            
            if (!response.ok) {
                throw new Error("Não foi possível carregar o arquivo JSON");
            }

            this.dados = await response.json();
            this.render(); // Desenha a tela
            this.adicionarEventos(); // Ativa os cliques
        } catch (error) {
            console.error(error);
            this.innerHTML = `
                <p style="color:red; text-align:center; padding:20px;">
                    <b>Erro ao carregar dados!</b><br>
                    Se você estiver no seu PC, use o "Live Server" no VS Code.<br>
                    Se estiver no GitHub Pages, verifique o nome do arquivo json.
                </p>
            `;
        }
    }

    adicionarEventos() {
        const tabs = this.querySelectorAll('.tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                // Pega o texto do botão (ex: "Mercado") e converte para minúsculo ("mercado")
                this.abaAtual = e.target.innerText.toLowerCase();
                this.render();
                this.adicionarEventos(); // Precisa reconectar pois o HTML mudou
            });
        });
    }

    render() {
        // Se a chave não existir no JSON, retorna lista vazia para não dar erro
        const itens = this.dados[this.abaAtual] || [];

        // 1. Gera HTML das Abas (Navegação)
        const htmlAbas = `
            <div class="tabs-container">
                ${Object.keys(this.dados).map(chave => `
                    <button class="tab-btn ${chave === this.abaAtual ? 'active' : ''}" style="text-transform: capitalize;">
                        ${chave}
                    </button>
                `).join('')}
            </div>
        `;

        // 2. Gera HTML do Conteúdo (Lista ou Cards)
        let htmlConteudo = '';

        if (itens.length === 0) {
            htmlConteudo = '<p style="text-align:center; color:#666;">Nenhum item disponível.</p>';
        } else {
            htmlConteudo = itens.map(item => {
                
                // TIPO DEFINIÇÃO (Ex: Explicação de Hard/Soft Skills)
                if (item.tipo === 'definicao') {
                    return `
                        <div class="definition-card">
                            <h3 class="definition-title">${item.titulo}</h3>
                            <p class="definition-text">${item.definicao}</p>
                        </div>
                    `;
                }
                
                // TIPO NOTÍCIA (Ex: Cards de notícias)
                else if (item.tipo === 'noticia') {
                    const imagemClass = item.imagem && (item.imagem.includes('g1.png') || item.imagem.includes('valoreconomico.jpg')) ? 
                        'news-image ' + (item.imagem.includes('g1.png') ? 'g1-image' : 'valor-image') : 'news-image';
                    
                    const imagemHtml = item.imagem ? 
                        `<img src="${item.imagem}" alt="${item.manchete}" class="${imagemClass}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">` +
                        `<div class="img-placeholder" style="display:none;"><span class="material-symbols-outlined" style="font-size:40px; margin-right:5px;">article</span>NOTÍCIA</div>` :
                        `<div class="img-placeholder"><span class="material-symbols-outlined" style="font-size:40px; margin-right:5px;">article</span>NOTÍCIA</div>`;
                    
                    return `
                        <div class="news-card">
                            ${imagemHtml}
                            <div class="news-content">
                                <h3 class="news-title">${item.manchete}</h3>
                                <p class="news-summary">${item.resumo}</p>
                                <div class="news-meta">
                                    <span class="news-source">${item.fonte}</span>
                                    <span class="news-date">${item.data}</span>
                                </div>
                            </div>
                        </div>
                    `;
                }
                
                // TIPO SKILL (Ex: Skills com definição)
                else if (item.tipo === 'skill') {
                    return `
                        <div class="skill-card">
                            <div class="skill-header">
                                <span class="material-symbols-outlined skill-icon">${item.icone}</span>
                                <h4 class="skill-title">${item.titulo}</h4>
                            </div>
                            <p class="skill-definition">${item.definicao}</p>
                        </div>
                    `;
                }
                
                // TIPO LISTA (Ex: Skills)
                else if (item.tipo === 'lista') {
                    return `
                        <div class="simple-list-item">
                            <div style="display:flex; align-items:center; gap:10px;">
                                <span class="material-symbols-outlined" style="color:var(--primary-blue)">${item.icone}</span>
                                ${item.titulo}
                            </div>
                            <span class="material-symbols-outlined" style="color:#ccc">chevron_right</span>
                        </div>
                    `;
                } 
                
                // TIPO CARD (Ex: Cursos - Estilo Imagem Amarela)
                else if (item.tipo === 'card') {
                    const imagemHtml = item.imagem ? 
                        `<img src="${item.imagem}" alt="${item.titulo}" class="course-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">` +
                        `<div class="img-placeholder" style="display:none;"><span class="material-symbols-outlined" style="font-size:40px; margin-right:5px;">play_circle</span>VÍDEO / IMG</div>` :
                        `<div class="img-placeholder"><span class="material-symbols-outlined" style="font-size:40px; margin-right:5px;">play_circle</span>VÍDEO / IMG</div>`;
                    
                    return `
                        <div class="generic-card">
                            ${item.topLabel ? `<div class="card-header-pill">${item.topLabel}</div>` : ''}
                            
                            ${imagemHtml}

                            <div class="card-title">${item.titulo}</div>
                            <div class="card-subtitle">${item.subtitulo}</div>

                            <div class="pills-row">
                                <div class="pill ${item.classeTag1}">${item.tag1}</div>
                                <div class="pill ${item.classeTag2}">${item.tag2}</div>
                            </div>
                        </div>
                    `;
                }
            }).join('');
        }

        // 3. Monta tudo
        this.innerHTML = `
            ${htmlAbas}
            <div class="aba-titulo">${this.abaAtual}</div>
            <div>${htmlConteudo}</div>
        `;
    }
}

// Registra o componente
customElements.define('carreira-component', CarreiraComponent);