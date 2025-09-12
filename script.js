let carrinho = [];

// Atualiza contador de itens no carrinho
function atualizarContador() {
    document.getElementById("contadorCarrinho").textContent = carrinho.length;
}

// Mostra alerta personalizado (aparece e some sozinho)
function mostrarAlerta(mensagem) {
    const alerta = document.getElementById("alertaPersonalizado");
    alerta.textContent = mensagem;
    alerta.style.display = "block";

    setTimeout(() => {
        alerta.style.display = "none";
    }, 3000); // some em 3 segundos
}

// Adiciona item ao carrinho
function adicionarAoCarrinho(nome, preco, imagem) {
    const itemExistente = carrinho.find(item => item.nome === nome);
    if (itemExistente) {
        itemExistente.qtd += 1;
    } else {
        carrinho.push({ nome, preco, qtd: 1, imagem });
    }

    atualizarContador();
    pulsarIcone();
    mostrarAlerta(`${nome} adicionado ao carrinho!`);
}

// Anima o ícone do carrinho
function pulsarIcone() {
    const icone = document.getElementById("iconeCarrinho");
    icone.classList.add("pulsando");
    setTimeout(() => { icone.classList.remove("pulsando"); }, 400);
}

// Exibe o carrinho no modal
function mostrarCarrinho() {
    if (carrinho.length === 0) {
        mostrarAlerta("O carrinho está vazio!");
        return;
    }

    document.getElementById("iconeCarrinho").classList.add("modal-aberto");

    const modal = document.getElementById("modalCarrinho");
    const lista = document.getElementById("itensCarrinho");
    const totalElem = document.getElementById("totalCarrinho");

    lista.innerHTML = "";
    let total = 0;

    carrinho.forEach((item, index) => {
        let li = document.createElement("li");

        let img = document.createElement("img");
        img.src = item.imagem;
        img.alt = item.nome;
        img.style.width = "60px";
        img.style.height = "60px";
        img.style.objectFit = "cover";
        img.style.borderRadius = "8px";
        img.style.marginRight = "10px";

        let span = document.createElement("span");
        span.textContent = `${item.nome} - R$${item.preco},00`;

        let qtdContainer = document.createElement("div");

        let btnMenos = document.createElement("button");
        btnMenos.textContent = "-";
        btnMenos.onclick = function () { alterarQuantidade(index, -1); };

        let qtdSpan = document.createElement("span");
        qtdSpan.textContent = item.qtd;
        qtdSpan.style.margin = "0 8px";

        let btnMais = document.createElement("button");
        btnMais.textContent = "+";
        btnMais.onclick = function () { alterarQuantidade(index, 1); };

        qtdContainer.appendChild(btnMenos);
        qtdContainer.appendChild(qtdSpan);
        qtdContainer.appendChild(btnMais);
        qtdContainer.style.display = "flex";
        qtdContainer.style.alignItems = "center";

        let btnRemover = document.createElement("button");
        btnRemover.textContent = "Remover";
        btnRemover.onclick = function () { removerItem(index); };

        li.appendChild(img);
        li.appendChild(span);
        li.appendChild(qtdContainer);
        li.appendChild(btnRemover);
        lista.appendChild(li);

        total += item.preco * item.qtd;
    });

    totalElem.textContent = `Total: R$${total},00`;
    modal.classList.add("show");
}

// Altera quantidade no carrinho
function alterarQuantidade(index, delta) {
    carrinho[index].qtd += delta;
    if (carrinho[index].qtd <= 0) { carrinho.splice(index, 1); }
    mostrarCarrinho();
    atualizarContador();
}

// Remove item do carrinho
function removerItem(index) {
    carrinho.splice(index, 1);
    mostrarCarrinho();
    atualizarContador();
}

// Fecha o carrinho
function fecharCarrinho() {
    document.getElementById("modalCarrinho").classList.remove("show");
    document.getElementById("iconeCarrinho").classList.remove("modal-aberto");
}

// Fecha modal clicando fora
window.onclick = function (event) {
    const modal = document.getElementById("modalCarrinho");
    if (event.target == modal) { fecharCarrinho(); }
}

// Envia pedido para o WhatsApp
function enviarParaWhatsApp() {
    if (carrinho.length === 0) {
        mostrarAlerta("O carrinho está vazio!");
        return;
    }

    const nomeCliente = document.getElementById("nomeCliente").value.trim();

    if (!nomeCliente) {
        mostrarAlerta("Por favor, preencha seu nome para finalizar o pedido.");
        return;
    }

    let mensagem = `Olá! Meu nome é ${nomeCliente}.\n\nGostaria de fazer o pedido:\n`;
    let total = 0;
    carrinho.forEach(item => {
        mensagem += `- ${item.nome} x${item.qtd}: R$${item.preco * item.qtd},00\n`;
        total += item.preco * item.qtd;
    });
    mensagem += `Total: R$${total},00`;

    let link = `https://wa.me/5519992480787?text=${encodeURIComponent(mensagem)}`;
    window.open(link, "_blank");
}

window.onload = function () { atualizarContador(); }
