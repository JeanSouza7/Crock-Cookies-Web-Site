document.addEventListener("DOMContentLoaded", () => {
  const pagina = window.location.pathname.split("/").pop();
  let secao = "";

  if (pagina.includes("cardapio")) secao = "cardapio";
  else if (pagina.includes("promocoes")) secao = "promocoes";
  else return;

  fetch("dados.json")
    .then(response => {
      if (!response.ok) throw new Error("Erro ao carregar o JSON");
      return response.json();
    })
    .then(dados => {
      const secaoDados = dados[secao];
      exibirCategorias(secaoDados);
    })
    .catch(error => console.error("Erro:", error));
});

function exibirCategorias(secaoDados) {
  const container = document.querySelector(".cards-container");
  if (!container) return;

  container.innerHTML = "";

  for (const categoria in secaoDados) {
    const titulo = document.createElement("h2");
    titulo.classList.add("secao-titulo");
    titulo.textContent = categoria;

        const categoriasComFundo = [
 
      "Cookies Tradicionais e Especiais (70g)",
      "Cookies Recheados (100g)",
      "Sobremesas",

      "Combos Cookies Tradicionais",
      "Combos Cookies Recheados",
      "Combos Cookies Mix"
    ];

    if (categoriasComFundo.includes(categoria)) {
      titulo.classList.add("sub-titulo");
    }
    container.appendChild(titulo);

    secaoDados[categoria].forEach(produto => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>
        <span class="preco">R$${produto.preco.toFixed(2)}</span>
        <button 
          class="adicionar" 
          data-nome="${produto.nome}" 
          data-preco="${produto.preco}" 
          data-img="${produto.imagem}">
          Adicionar
        </button>
      `;

      container.appendChild(card);
    });
  }


  registrarEventosDeAdicao();
}

function registrarEventosDeAdicao() {

  document.querySelectorAll(".adicionar").forEach(botao => {
    botao.addEventListener("click", () => {
      const nome = botao.dataset.nome;
      const preco = parseFloat(botao.dataset.preco);
      const imagem = botao.dataset.img;

      if (typeof window.adicionarAoCarrinho === "function") {
        window.adicionarAoCarrinho(nome, preco, imagem);
      } else {
        console.error("Função adicionarAoCarrinho() não encontrada!");
      }
    });
  });
}
