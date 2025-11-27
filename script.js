<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wireframe Funcional - Carreira</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />

    <style>
        /* CSS DO WIREFRAME (Visual) */
        body { font-family: Arial, sans-serif; margin: 0; background: #f4f4f4; }
        
        header { background: white; border-bottom: 2px solid black; padding: 10px 20px; display: flex; justify-content: space-between; align-items: center; }
        
        main { padding: 20px; max-width: 600px; margin: 0 auto; background: white; min-height: 100vh; border-left: 1px solid #ccc; border-right: 1px solid #ccc; }

        /* Estilo do Componente de Cursos (Baseado no seu CSS original + Wireframe) */
        .comp-curso {
            border: 1px solid black;
            padding: 10px;
            margin-bottom: 15px;
            background: #fff;
        }
        
        /* O retângulo do "X" (Imagem) */
        .placeholder-img {
            width: 100%;
            height: 100px;
            background: #e0e0e0;
            border: 1px solid black;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 30px;
            color: #777;
            margin-bottom: 10px;
        }

        .titulo-curso { font-weight: bold; font-size: 16px; margin-bottom: 5px; }
        .info-extra { font-size: 12px; color: #555; }
        
        /* Simula as etiquetas de status (como as notas do seu código original) */
        .tag { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; border: 1px solid black; margin-right: 5px;}
        .tag-novo { background-color: #ddd; }
        .tag-destaque { background-color: #333; color: white; }

    </style>
</head>
<body>

    <header>
        <span class="material-symbols-outlined">menu</span>
        <div style="font-weight:bold;">APP CARREIRA</div>
        <span class="material-symbols-outlined">person</span>
    </header>

    <main>
        <h2>Cursos Recomendados</h2>
        <p>Baseado no seu perfil:</p>

        <cursos-component></cursos-component>

    </main>

    <script>
        class CursosComponent extends HTMLElement {
            constructor() {
                super();
                // Removi o shadowDOM para simplificar o estilo global neste exemplo
                // this.attachShadow({ mode: 'open' }); 
            }

            connectedCallback() {
                this.loadData();
            }

            // Simulação do fetch (para funcionar sem servidor local)
            async loadData() {
                // Aqui entraria o seu fetch('cursos.json')
                // Estou simulando os dados para você ver funcionando agora:
                const cursosSimulados = [
                    { titulo: "Python para Análise de Dados", duracao: "40h", status: "Novo" },
                    { titulo: "Liderança Ágil e Scrum", duracao: "20h", status: "Destaque" },
                    { titulo: "Inglês Técnico para Devs", duracao: "60h", status: "Novo" }
                ];
                
                this.render(cursosSimulados);
            }

            render(cursos) {
                // Gera o HTML dinâmico
                this.innerHTML = `
                    <div>
                        ${cursos.map(c => `
                            <div class="comp-curso">
                                <div class="placeholder-img">X</div>
                                
                                <div class="titulo-curso">${c.titulo}</div>
                                
                                <div class="info-extra">
                                    <span class="tag ${c.status === 'Novo' ? 'tag-novo' : 'tag-destaque'}">
                                        ${c.status.toUpperCase()}
                                    </span>
                                    Duração: <b>${c.duracao}</b>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
            }
        }

        // Definindo o componente
        customElements.define('cursos-component', CursosComponent);
    </script>

</body>
</html>
