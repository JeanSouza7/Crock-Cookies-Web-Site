<?php

$response = [];

switch ($resource) {

    case 'cardapio':

        switch ($method) {
            case 'GET':
                $response = readCardapio($pdo, $id);
                break;

            case 'POST':
                if ($id) {
                    http_response_code(405);
                    $response = ["message" => "POST não deve conter ID. Use POST api.php?resource=cardapio"];
                } else {
                    $response = createCardapio($pdo, $data);
                }
                break;

            case 'PUT':
                if ($id) {
                    $response = updateCardapio($pdo, $id, $data);
                } else {
                    http_response_code(400);
                    $response = ["message" => "ID é obrigatório no PUT (ex: ?resource=cardapio&id=1)"];
                }
                break;

            case 'DELETE':
                if ($id) {
                    $response = deleteCardapio($pdo, $id);
                } else {
                    http_response_code(400);
                    $response = ["message" => "ID é obrigatório no DELETE"];
                }
                break;

            default:
                http_response_code(405);
                $response = ["message" => "Método não permitido para cardapio"];
                break;
        }
        break;

    case 'promocoes':

        switch ($method) {
            case 'GET':
                $response = readPromocoes($pdo, $id);
                break;

            case 'POST':
                if ($id) {
                    http_response_code(405);
                    $response = ["message" => "POST não deve conter ID. Use POST api.php?resource=promocoes"];
                } else {
                    $response = createPromocao($pdo, $data);
                }
                break;

            case 'PUT':
                if ($id) {
                    $response = updatePromocao($pdo, $id, $data);
                } else {
                    http_response_code(400);
                    $response = ["message" => "ID é obrigatório no PUT (ex: ?resource=promocoes&id=1)"];
                }
                break;

            case 'DELETE':
                if ($id) {
                    $response = deletePromocao($pdo, $id);
                } else {
                    http_response_code(400);
                    $response = ["message" => "ID é obrigatório no DELETE"];
                }
                break;

            default:
                http_response_code(405);
                $response = ["message" => "Método não permitido para promocoes"];
                break;
        }
        break;

    default:
        http_response_code(404);
        $response = ["message" => "Recurso inválido. Use ?resource=cardapio ou ?resource=promocoes"];
        break;
}

echo json_encode($response);
?>
