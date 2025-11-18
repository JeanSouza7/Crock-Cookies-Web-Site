<?php

function createPromocao($pdo, $data) {
    if (empty($data['nome']) || empty($data['preco'])) {
        http_response_code(400);
        return ["message" => "Nome e preço são obrigatórios."];
    }

    $sql = "INSERT INTO promocoes (categoria, nome, descricao, preco, imagem)
            VALUES (?, ?, ?, ?, ?)";

    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $data['categoria'] ?? null,
            $data['nome'],
            $data['descricao'] ?? null,
            $data['preco'],
            $data['imagem'] ?? null
        ]);

        http_response_code(201);
        return ["message" => "Promoção criada.", "id" => $pdo->lastInsertId()];

    } catch (PDOException $e) {
        http_response_code(503);
        return ["message" => "Erro ao criar promoção: " . $e->getMessage()];
    }
}
function readPromocoes($pdo, $id) {
    if ($id) {
        $sql = "SELECT * FROM promocoes WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$id]);
        $item = $stmt->fetch();

        if ($item) {
            http_response_code(200);
            return $item;
        }

        http_response_code(404);
        return ["message" => "Promoção não encontrada."];
    }

    $sql = "SELECT * FROM promocoes ORDER BY id ASC";
    $stmt = $pdo->query($sql);
    return $stmt->fetchAll();
}

function updatePromocao($pdo, $id, $data) {
    if (!$id) {
        http_response_code(400);
        return ["message" => "ID obrigatório."];
    }

    $sql = "UPDATE promocoes SET categoria=?, nome=?, descricao=?, preco=?, imagem=?
            WHERE id=?";

    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $data['categoria'] ?? null,
            $data['nome'] ?? null,
            $data['descricao'] ?? null,
            $data['preco'] ?? null,
            $data['imagem'] ?? null,
            $id
        ]);

        http_response_code(200);
        return ["message" => "Promoção atualizada."];

    } catch (PDOException $e) {
        http_response_code(503);
        return ["message" => "Erro ao atualizar promoção: " . $e->getMessage()];
    }
}

function deletePromocao($pdo, $id) {
    if (!$id) {
        http_response_code(400);
        return ["message" => "ID obrigatório."];
    }

    $sql = "DELETE FROM promocoes WHERE id=?";

    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$id]);

        http_response_code(200);
        return ["message" => "Promoção removida."];
        
    } catch (PDOException $e) {
        http_response_code(503);
        return ["message" => "Erro ao remover promoção: " . $e->getMessage()];
    }
}
?>
