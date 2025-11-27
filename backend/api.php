<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once "dbconfig.php";
include_once "cardapio_dao.php";
include_once "promocoes_dao.php";

$pdo = getDbConnection();
$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents("php://input"), true);

$resource = $_GET['resource'] ?? null;
$id = $_GET['id'] ?? null;
$id = $_GET['id'] ?? null;

if ($method === "DELETE") {
    parse_str(file_get_contents("php://input"), $deleteVars);
    if (!$id && isset($deleteVars['id'])) {
        $id = $deleteVars['id'];
    }
}

$response = [];

switch ($resource) {

    case 'cardapio':
        switch ($method) {
            case "GET":    $response = readCardapio($pdo, $id); break;
            case "POST":   $response = createCardapio($pdo, $data); break;
            case "PUT":    $response = updateCardapio($pdo, $id, $data); break;
            case "DELETE": $response = deleteCardapio($pdo, $id); break;
            default:
                http_response_code(405);
                $response = ["message" => "Método não permitido"];
        }
    break;

    case 'promocoes':
        switch ($method) {
            case "GET":    $response = readPromocoes($pdo, $id); break;
            case "POST":   $response = createPromocao($pdo, $data); break;
            case "PUT":    $response = updatePromocao($pdo, $id, $data); break;
            case "DELETE": $response = deletePromocao($pdo, $id); break;
            default:
                http_response_code(405);
                $response = ["message" => "Método não permitido"];
        }
    break;

    default:
        http_response_code(404);
        $response = ["message" => "Recurso inválido. Use cardapio ou promocoes"];
}

echo json_encode($response);
