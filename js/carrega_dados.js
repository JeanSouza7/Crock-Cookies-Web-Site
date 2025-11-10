// === Carregar produtos dinamicamente via JSON ===
async function carregarProdutos() {
    try {
        const resposta = await fetch("dados.json");
        const produtos = await resposta.json();
        const container = document.getElementById("container-produtos");

        if (!container) return;

        produtos.forEach(produto => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
                <h3 class="preco">R$${produto.preco},00</h3>
                <button class="adicionar"
                    data-nome="${produto.nome}"
                    data-preco="${produto.preco}"
                    data-img="${produto.imagem}">
                    Adicionar
                </button>
            `;
            container.appendChild(card);
        });

        // Conecta com seu script.js (função adicionarAoCarrinho)
        document.querySelectorAll(".adicionar").forEach(botao => {
            botao.addEventListener("click", () => {
                const nome = botao.dataset.nome;
                const preco = parseFloat(botao.dataset.preco);
                const imagem = botao.dataset.img;
                adicionarAoCarrinho(nome, preco, imagem);
            });
        });
    } catch (erro) {
        console.error("Erro ao carregar os produtos:", erro);
    }
}

document.addEventListener("DOMContentLoaded", carregarProdutos);
