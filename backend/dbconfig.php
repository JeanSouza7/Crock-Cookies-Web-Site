<?php

define('DB_DRIVER', 'mysql'); 

define('DB_HOST', '127.0.0.1'); 
define('DB_PORT', 3306); 
define('DB_NAME', 'crock_cookies'); 
define('DB_USER', 'root');
define('DB_PASS', ''); 

function getDbConnection() {
    
    $dsn = DB_DRIVER . ":host=" . DB_HOST . 
           ";port=" . DB_PORT . 
           ";dbname=" . DB_NAME . 
           ";charset=utf8mb4"; 

    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, 
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,       
        PDO::ATTR_EMULATE_PREPARES   => false,                  
        PDO::ATTR_TIMEOUT => 120,
    ];

    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        
        return $pdo;
    } catch (\PDOException $e) {

        http_response_code(500);

        die(json_encode(array("message" => "Erro de conexão com o banco de dados MySQL: " . $e->getMessage())));
    }
}
?>