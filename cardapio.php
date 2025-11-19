<?php
// cardapio.php — Lista dinâmica do cardápio via API

function fetchCardapio(string $api_url): array {
    try {
        $ch = curl_init($api_url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);

        if (curl_errno($ch)) throw new Exception("Erro cURL: " . curl_error($ch));

        $http = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        $data = json_decode($response, true);

        if ($http !== 200) {
            return ["items" => [], "error" => $data["message"] ?? "Erro desconhecido"];
        }

        return ["items" => $data, "error" => null];

    } catch (Exception $e) {
        return ["items" => [], "error" => $e->getMessage()];
    }
}

$API_URL = "http://localhost/Crock_Cookies/backend/api.php?resource=cardapio";
$result = fetchCardapio($API_URL);

$items = $result["items"];
$error = $result["error"];
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crock Cookies - Cardápio</title>
    <link rel="shortcut icon" href="img/icon.png">
    <link rel="stylesheet" href="style.css">
</head>

<body class="produtos">

<!-- ALERTA -->
<div id="alertaPersonalizado"></div>

<!-- CARRINHO -->
<div id="iconeCarrinho" onclick="mostrarCarrinho()">
    🛒 <span id="contadorCarrinho">0</span>
</div>
<div id="modalCarrinho" class="modal">
    <div class="modal-content">
        <span class="close" onclick="fecharCarrinho()">&times;</span>
        <h2>Seu Carrinho</h2>
        <ul id="itensCarrinho"></ul>

<div class="opcao-entrega">
    <label>
        <input type="radio" name="entrega" value="retirar" checked onclick="atualizarTotal()">
        Retirar no local
        <span class="endereco-retirada">(Endereco)</span>
    </label>
    <label>
        <input type="radio" name="entrega" value="entrega" onclick="atualizarTotal()">
        Entrega (a calcular)
    </label>
</div>

        <div id="enderecoEntrega" style="display:none; flex-direction: column; gap: 5px; text-align:left; margin-bottom:10px;">
            <input type="text" id="rua" placeholder="Rua">
            <input type="text" id="bairro" placeholder="Bairro">
            <input type="text" id="numero" placeholder="Número">
        </div>

        <textarea id="observacao" placeholder="Observações"></textarea>
        
        <p id="totalCarrinho">Total: R$0,00</p>

        <input type="text" id="nomeCliente" placeholder="Digite seu nome">

        <button onclick="enviarParaWhatsApp()">Finalizar Pedido</button>
    </div>
</div>




<header>
    <div class="header-container">
        <img src="img/icon.png" class="logo" alt="Logo">
        <div class="header-texto">
            <h1>Crock Cookies</h1>
            <p>Deliciosos cookies e sobremesas feitas com amor!</p>
        </div>
    </div>
</header>

<nav class="menu-nav">
    <a href="index.html">Home</a>
    <a href="cardapio.php" class="active">Cardápio</a>
    <a href="promocoes.php">Promoções</a>
    <a href="equipe.html">Equipe</a>
    <a href="sac.html">SAC</a>
    <button id="btnTema" class="btn-tema"></button>
</nav>

<main>
    <section class="produtos">
        <div class="cards-container">

            <?php if ($error): ?>
                <p style="color:red; font-size:18px; text-align:center;">
                    Erro ao carregar cardápio: <?= htmlspecialchars($error) ?>
                </p>

            <?php elseif (!empty($items)): ?>

                <?php
                // Agrupa categorias
                $grupos = [];
                foreach ($items as $item) {
                    $grupos[$item["categoria"]][] = $item;
                }

                foreach ($grupos as $categoria => $lista):
                ?>
                    <h2 class="secao-titulo sub-titulo"><?= htmlspecialchars($categoria) ?></h2>

                    <?php foreach ($lista as $produto): ?>
                        <div class="card">
                            <img src="<?= htmlspecialchars($produto["imagem"]) ?>" class="card-img">

                            <h3><?= htmlspecialchars($produto["nome"]) ?></h3>
                            <p><?= htmlspecialchars($produto["descricao"]) ?></p>

                            <span class="preco">R$<?= number_format($produto["preco"], 2, ',', '.') ?></span>

                            <button class="adicionar"
                                data-nome="<?= htmlspecialchars($produto["nome"]) ?>"
                                data-preco="<?= htmlspecialchars($produto["preco"]) ?>"
                                data-img="<?= htmlspecialchars($produto["imagem"]) ?>">
                                Adicionar
                            </button>
                        </div>
                    <?php endforeach; ?>

                <?php endforeach; ?>

            <?php else: ?>
                <p style="text-align:center;">Nenhum item encontrado.</p>
            <?php endif; ?>

        </div>
    </section>
</main>

<footer id="contato">
    <p>Contato: (19) 98928-3180 | WhatsApp</p>
    <p>E-mail: Jessicacs.contato@gmail.com</p>
    <a href="https://www.instagram.com/jessiicacunhas" target="_blank">Instagram</a>
    <p>© 2025 Crock Cookies. Todos os direitos reservados.</p>
</footer>

<script src="js/script.js"></script>
<script src="js/tema.js"></script>

<script>
window.onload = () => {
    atualizarContador();

document.addEventListener("click", function(e) {
    if (e.target.classList.contains("adicionar")) {

        const nome = e.target.dataset.nome;
        const preco = parseFloat(e.target.dataset.preco);
        const imagem = e.target.dataset.img;

        adicionarAoCarrinho(nome, preco, imagem);
    }
});
</script>

</body>
</html>
