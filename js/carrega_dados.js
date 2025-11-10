document.addEventListener("DOMContentLoaded", () => {
  // Descobre a página atual
  const pagina = window.location.pathname.split("/").pop();

  // Define qual seção carregar
  let secao = "";
  if (pagina.includes("cardapio")) secao = "cardapio";
  else if (pagina.includes("promocoes")) secao = "promocoes";
  else return; // se for index.html, não faz nada

  // Busca os dados
  fetch("dados.json")
    .then(response => {
      if (!response.ok) throw new Error("Erro ao carregar o JSON");
      return response.json();
    })
    .then(dados => {
      const secaoDados = dados[secao]; // Ex: dados.cardapio ou dados.promocoes
      exibirCategorias(secaoDados);
    })
    .catch(error => {
      console.error("Erro:", error);
    });
});

function exibirCategorias(secaoDados) {
  const container = document.querySelector(".cards-container");
  if (!container) return;

  container.innerHTML = ""; // limpa

  for (const categoria in secaoDados) {
    // cria um wrapper para o título que vai antes e ocupará a linha inteira
    const titulo = document.createElement("h2");
    titulo.classList.add("secao-titulo");
    titulo.textContent = categoria;
    container.appendChild(titulo);

    // ao invés de criar um div.cards-categoria, vamos criar os cards direto no container
    // marcamos com uma classe para facilitar estilizar se for preciso
    secaoDados[categoria].forEach(produto => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}">
        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>
        <span class="preco">R$${produto.preco.toFixed(2)}</span>
        <button class="adicionar">Adicionar</button>
      `;
      container.appendChild(card);
    });
  }
}

function exibirProdutos(produtos, container) {
  produtos.forEach(produto => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>${produto.descricao}</p>
      <span class="preco">R$${produto.preco.toFixed(2)}</span>
      <button class="adicionar">Adicionar</button>
    `;

    container.appendChild(card);
  });
}

