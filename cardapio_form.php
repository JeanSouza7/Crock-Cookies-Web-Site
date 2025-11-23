<?php

$action = $_GET['action'] ?? 'novo';
$id = $_GET['id'] ?? null;

?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crock Cookies - <?= $action == 'editar' ? 'Editar Item' : 'Novo Item' ?></title>
    <link rel="shortcut icon" href="img/icon.png">
    <link rel="stylesheet" href="style.css">
</head>
<body>

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

    <div class="form-container">

        <h2><?= $action == 'editar' ? 'Editar Item do Cardápio' : 'Cadastrar Novo Item' ?></h2>

        <form id="form_cardapio">

            <div class="form-grid">

                <div>
                    <label for="nome">Nome do item:</label>
                    <input type="text" id="nome" name="nome" required>
                </div>

                <div>
                    <label for="preco">Preço (R$):</label>
                    <input type="number" id="preco" name="preco" step="0.01" min="0" required>
                </div>

                <div style="grid-column: span 2;">
                    <label for="descricao">Descrição:</label>
                    <textarea id="descricao" name="descricao" required></textarea>
                </div>

                <div>
                    <label for="categoria">Categoria:</label>
                    
                    <select id="categoria" name="categoria" required>
                        <option value="" disabled selected>Selecione uma categoria</option>
                        <option value="Cookies Tradicionais e Especiais (70g)">Cookies Tradicionais e Especiais (70g)</option>
                        <option value="Cookies Recheados (100g)">Cookies Recheados (100g)</option>
                        <option value="Sobremesas">Sobremesas</option>
                    </select>
                </div>

                <div>
                    <label for="imagem">Nome do arquivo da imagem:</label>
                    <input type="text" id="imagem" name="imagem" required>
                </div>

            </div>

            <button type="submit" class="btn-submit">
                <?= $action == 'editar' ? 'Salvar Alterações' : 'Cadastrar Item' ?>
            </button>

        </form>

    </div>

</main>


<footer id="contato">
    <p>Contato: (19) 98928-3180 | WhatsApp</p>
    <p>E-mail: Jessicacs.contato@gmail.com</p>
    <a href="https://www.instagram.com/jessiicacunhas" target="_blank">Instagram</a>
    <p>© 2025 Crock Cookies. Todos os direitos reservados.</p>
</footer>
<script src="js/tema.js"></script>
<script src="js/cardapio.js"></script>

<div id="modalSucesso" style="
    display:none;
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.5);
    justify-content: center;
    align-items: center;
    z-index: 9999;
">
    <div style="
        background: white;
        padding: 20px 30px;
        border-radius: 10px;
        text-align: center;
        max-width: 350px;
        width: 90%;
    ">
        <h3 id="textoModal" style="margin-bottom: 20px; color:#333;">
            Sucesso!
        </h3>

        <button id="btnModalOK" style="
            background: #5a2e1c;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
        ">OK</button>
    </div>
</div>


<script>
    window.CARDAPIO_ACTION = "<?= $action ?>";
    window.CARDAPIO_ID = "<?= $id ?>";
</script>



</body>
</html>
