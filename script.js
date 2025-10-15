let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];


function atualizarContador() {
    document.getElementById("contadorCarrinho").textContent = carrinho.length;
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}


function mostrarAlerta(mensagem) {
    const alerta = document.getElementById("alertaPersonalizado");
    alerta.textContent = mensagem;
    alerta.style.display = "block";
    setTimeout(() => { alerta.style.display = "none"; }, 3000);
}


function adicionarAoCarrinho(nome, preco, imagem) {
    const itemExistente = carrinho.find(item => item.nome === nome);
    if (itemExistente) itemExistente.qtd += 1;
    else carrinho.push({ nome, preco, qtd: 1, imagem });

    atualizarContador();
    pulsarIcone();
    mostrarAlerta(`${nome} adicionado ao carrinho!`);
}

function pulsarIcone() {
    const icone = document.getElementById("iconeCarrinho");
    icone.classList.add("pulsando");
    setTimeout(() => { icone.classList.remove("pulsando"); }, 400);
}

function mostrarCarrinho() {
    const modal = document.getElementById("modalCarrinho");
    const lista = document.getElementById("itensCarrinho");
    const totalElem = document.getElementById("totalCarrinho");

    if (carrinho.length === 0) {
        mostrarAlerta("O carrinho está vazio!");
        modal.classList.remove("show");
        return;
    }

    lista.innerHTML = "";
    let total = 0;

    carrinho.forEach((item, index) => {
        const li = document.createElement("li");

        const img = document.createElement("img");
        img.src = item.imagem;
        img.alt = item.nome;
        img.style.width = "60px";
        img.style.height = "60px";
        img.style.objectFit = "cover";
        img.style.borderRadius = "8px";

        const span = document.createElement("span");
        span.textContent = `${item.nome} - R$${item.preco},00`;

        const qtdContainer = document.createElement("div");

        const btnMenos = document.createElement("button");
        btnMenos.textContent = "-";
        btnMenos.onclick = () => alterarQuantidade(index, -1);

        const qtdSpan = document.createElement("span");
        qtdSpan.textContent = item.qtd;
        qtdSpan.style.margin = "0 8px";

        const btnMais = document.createElement("button");
        btnMais.textContent = "+";
        btnMais.onclick = () => alterarQuantidade(index, 1);

        qtdContainer.appendChild(btnMenos);
        qtdContainer.appendChild(qtdSpan);
        qtdContainer.appendChild(btnMais);
        qtdContainer.style.display = "flex";
        qtdContainer.style.alignItems = "center";

        const btnRemover = document.createElement("button");
        btnRemover.textContent = "Remover";
        btnRemover.onclick = () => removerItem(index);

        li.appendChild(img);
        li.appendChild(span);
        li.appendChild(qtdContainer);
        li.appendChild(btnRemover);
        lista.appendChild(li);

        total += item.preco * item.qtd;
    });


    const entrega = document.querySelector('input[name="entrega"]:checked').value;
    let infoEntrega = entrega === "retirar" ? "Retirar no local" : "Entrega (a calcular)";

    totalElem.textContent = `Total: R$${total},00 (${infoEntrega})`;

    modal.classList.add("show");
}

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector("#modalCarrinho .modal-content");
  if (modal && !document.getElementById("observacao")) {
    const textArea = document.createElement("textarea");
    textArea.id = "observacao";
    textArea.placeholder = "Observações";
    modal.insertBefore(textArea, document.getElementById("endereco"));
  }
});

function alterarQuantidade(index, delta) {
    carrinho[index].qtd += delta;
    if (carrinho[index].qtd <= 0) carrinho.splice(index, 1);
    atualizarContador();
    mostrarCarrinho();
}

function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarContador();
    mostrarCarrinho();
}


function fecharCarrinho() {
    document.getElementById("modalCarrinho").classList.remove("show");
    document.getElementById("iconeCarrinho").classList.remove("modal-aberto");
}

window.onclick = function(event) {
    const modal = document.getElementById("modalCarrinho");
    if (event.target == modal) fecharCarrinho();
};

function enviarParaWhatsApp() {
    if (carrinho.length === 0) {
        mostrarAlerta("O carrinho está vazio!");
        return;
    }

    const nomeCliente = document.getElementById("nomeCliente").value.trim();
    if (!nomeCliente) {
        mostrarAlerta("Preencha seu nome!");
        return;
    }

    let mensagem = `Olá! Meu nome é ${nomeCliente}.\n\nPedido:\n`;
    let total = 0;

    carrinho.forEach(item => {
        mensagem += `- ${item.nome} x${item.qtd}: R$${item.preco * item.qtd},00\n`;
        total += item.preco * item.qtd;
    });

    const entrega = document.querySelector('input[name="entrega"]:checked').value;
    mensagem += entrega === "retirar" ? `\nRetirar no local(endereco)` : `\nEntrega (a calcular)`;

    mensagem += `\nTotal: R$${total},00`;

    const link = `https://wa.me/5519989283180?text=${encodeURIComponent(mensagem)}`;
    window.open(link, "_blank");
}

window.onload = () => {
    atualizarContador();''

    document.querySelectorAll('input[name="entrega"]').forEach(radio => {
        radio.addEventListener("change", () => {
            const enderecoDiv = document.getElementById("enderecoEntrega");
            enderecoDiv.style.display = document.querySelector('input[name="entrega"]:checked').value === "entrega" ? "flex" : "none";
            mostrarCarrinho();
        });
    });

    document.querySelectorAll(".adicionar").forEach(botao => {
        botao.addEventListener("click", () => {
            const nome = botao.dataset.nome;
            const preco = parseFloat(botao.dataset.preco);
            const imagem = botao.dataset.img;
            adicionarAoCarrinho(nome, preco, imagem);
        });
    });
};

