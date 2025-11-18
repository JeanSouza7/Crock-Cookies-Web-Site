<?php

function createCardapio($pdo, $data) {
    if (empty($data['nome']) || empty($data['preco'])) {
        http_response_code(400);
        return ["message" => "Nome e preço são obrigatórios."];
    }

    $sql = "INSERT INTO cardapio (categoria, nome, preco, imagem, descricao)
            VALUES (?, ?, ?, ?, ?)";

    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $data['categoria'] ?? null,
            $data['nome'],
            $data['preco'],
            $data['imagem'] ?? null,
            $data['descricao'] ?? null
        ]);

        http_response_code(201);
        return ["message" => "Item criado com sucesso.", "id" => $pdo->lastInsertId()];

    } catch (PDOException $e) {
        http_response_code(503);
        return ["message" => "Erro ao criar item: " . $e->getMessage()];
    }
}

function readCardapio($pdo, $id) {

    if ($id) {
        $sql = "SELECT * FROM cardapio WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$id]);
        $item = $stmt->fetch();

        if ($item) {
            http_response_code(200);
            return $item;
        }

        http_response_code(404);
        return ["message" => "Item não encontrado."];
    }

    $sql = "SELECT * FROM cardapio ORDER BY id ASC";
    $stmt = $pdo->query($sql);
    return $stmt->fetchAll();
}

function updateCardapio($pdo, $id, $data) {
    if (!$id) {
        http_response_code(400);
        return ["message" => "ID é obrigatório."];
    }

    $sql = "UPDATE cardapio SET categoria=?, nome=?, preco=?, imagem=?, descricao=?
            WHERE id=?";

    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $data['categoria'] ?? null,
            $data['nome'] ?? null,
            $data['preco'] ?? null,
            $data['imagem'] ?? null,
            $data['descricao'] ?? null,
            $id
        ]);

        http_response_code(200);
        return ["message" => "Item atualizado."];

    } catch (PDOException $e) {
        http_response_code(503);
        return ["message" => "Erro ao atualizar: " . $e->getMessage()];
    }
}
function deleteCardapio($pdo, $id) {
    if (!$id) {
        http_response_code(400);
        return ["message" => "ID é obrigatório."];
    }

    $sql = "DELETE FROM cardapio WHERE id=?";

    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$id]);

        http_response_code(200);
        return ["message" => "Item removido."];

    } catch (PDOException $e) {
        http_response_code(503);
        return ["message" => "Erro ao remover: " . $e->getMessage()];
    }
}
?>
