
CREATE DATABASE crock_cookies
    CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_unicode_ci;

USE crock_cookies;

CREATE TABLE cardapio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoria VARCHAR(100) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2) NOT NULL,
    imagem VARCHAR(255)
);

INSERT INTO cardapio (categoria, nome, preco, imagem, descricao) VALUES
("Cookies Tradicionais e Especiais (70g)", "Cookies Clássico", 7.00, "img/Cookies tradicional.jpeg", "Cookie massa fofa com gotas de chocolate ao leite."),
("Cookies Tradicionais e Especiais (70g)", "Cookies Black", 7.00, "img/Coockies_Black.jpeg", "Cookie massa fofa de cacau black 100%, com gotas de chocolate ao leite."),
("Cookies Tradicionais e Especiais (70g)", "Cookies Dadinho", 8.00, "img/Cookies_dadinho.jpeg", "Cookie massa fofa, chocolate shot picado e recheio de dadinho."),
("Cookies Tradicionais e Especiais (70g)", "Cookies Negresco", 9.00, "img/Cookies_de_negresco.jpg", "Cookie massa fofa com gotas de chocolate ao leite e pedaços de Negresco."),
("Cookies Tradicionais e Especiais (70g)", "Cookies Charge", 9.00, "img/cookies_de_charge.jpg", "Cookie massa fofa com gotas de chocolate ao leite e pedaços de Charge."),
("Cookies Tradicionais e Especiais (70g)", "Cookies Amendoim", 8.00, "img/Cookie_amendoim.jpeg", "Cookie de chocolate meio amargo com amendoim crocante.");


INSERT INTO cardapio (categoria, nome, preco, imagem, descricao) VALUES
("Cookies Recheados (100g)", "Cookie recheado com Nutella", 12.00, "img/Cookies_nutella.webp", "Cookie de massa macia com recheio de Nutella."),
("Cookies Recheados (100g)", "Cookies Amendoim recheado", 10.00, "img/Cookie_amendoim.jpeg", "Cookie com chocolate meio amargo e recheio de doce de leite e amendoim.");

INSERT INTO cardapio (categoria, nome, preco, imagem, descricao) VALUES
("Sobremesas", "Pudim Tradicional", 35.00, "img/pudim.jpg", "Pudim cremoso de leite condensado (800g)."),
("Sobremesas", "Bolo de Limão", 42.00, "img/Bolo_de_limao.jpg", "Bolo de limão com cobertura de limão (1,5kg)."),
("Sobremesas", "Bolo de Cenoura", 38.00, "img/Bolo_de_chocolate.jpg", "Bolo de cenoura com cobertura de cacau 50% (1,2kg)."),
("Sobremesas", "Bolo de Cenoura com Gotas de Chocolate", 42.00, "img/Bolo_de_cenoura.jpg", "Bolo de cenoura com gotas de chocolate e cobertura de cacau black (1,2kg)."),
("Sobremesas", "Bolo de Chocolate com Maracujá", 50.00, "img/Bolo_maracuja.jpeg", "Bolo de chocolate 50% cacau com cobertura de brigadeiro de maracujá (1,3kg)."),
("Sobremesas", "Brownie", 9.00, "img/Brownie.avif", "Brownie com sabor intenso de chocolate e textura perfeita (90g)."),
("Sobremesas", "Bolo de Laranja", 25.00, "img/Bolo_laranja.jpg", "Clássico bolo de laranja (1,1kg)."),
("Sobremesas", "Bolo de Fubá", 21.00, "img/Bolo_fubá.jpg", "Clássico bolo de fubá caseiro (850g)."),
("Sobremesas", "Bolo de Fubá com Goiabada", 25.00, "img/Bolo_goiabada.webp", "Delicioso bolo de fubá com pedaços de goiabada (880g)."),
("Sobremesas", "Bolo de Chocolate com Brigadeiro", 45.00, "img/Bolo_brigadeiro.jpg", "Bolo de chocolate 50% cacau com cobertura de brigadeiro (1,6kg).");

CREATE TABLE promocoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoria VARCHAR(100) NOT NULL,
    nome VARCHAR(255),
    preco DECIMAL(10,2),
    imagem VARCHAR(255),
    descricao TEXT
);

INSERT INTO promocoes (categoria, nome, descricao, preco, imagem) VALUES
('Combos Cookies Tradicionais', 'Combo Cookies Tradicionais - 2 un', '2 Cookies tradicionais (70g) sortidos.', 13, 'img/Cookies_sortidos.jpg'),
('Combos Cookies Tradicionais', 'Combo Cookies Tradicionais - 4 un', '4 Cookies tradicionais (70g) sortidos.', 26, 'img/Cookies_sortidos.jpg'),
('Combos Cookies Tradicionais', 'Combo Cookies Tradicionais - 6 un', '6 Cookies tradicionais (70g) sortidos.', 38, 'img/Cookies_sortidos.jpg'),
('Combos Cookies Tradicionais', 'Combo Cookies Tradicionais - 12 un', '12 Cookies tradicionais (70g) sortidos.', 72, 'img/Cookies_sortidos.jpg');

INSERT INTO promocoes (categoria, nome, descricao, preco, imagem) VALUES
('Combos Cookies Recheados', 'Combo Cookies Recheados - 2 un', '2 Cookies recheados (100g) sortidos.', 21, 'img/Cookies_recheados.jpg'),
('Combos Cookies Recheados', 'Combo Cookies Recheados - 4 un', '4 Cookies recheados (100g) sortidos.', 42, 'img/Cookies_recheados.jpg'),
('Combos Cookies Recheados', 'Combo Cookies Recheados - 6 un', '6 Cookies recheados (100g) sortidos.', 63, 'img/Cookies_recheados.jpg'),
('Combos Cookies Recheados', 'Combo Cookies Recheados - 12 un', '12 Cookies recheados (100g) sortidos.', 125, 'img/Cookies_recheados.jpg');

INSERT INTO promocoes (categoria, nome, descricao, preco, imagem) VALUES
('Combos Cookies Mix', 'Combo Cookies Mix - 2 un', '2 Cookies sortidos: mix entre tradicionais (70g) e recheados (100g).', 20, 'img/Cookies_misto.jpg'),
('Combos Cookies Mix', 'Combo Cookies Mix - 4 un', '4 Cookies sortidos: mix entre tradicionais (70g) e recheados (100g).', 40, 'img/Cookies_misto.jpg'),
('Combos Cookies Mix', 'Combo Cookies Mix - 6 un', '6 Cookies sortidos: mix entre tradicionais (70g) e recheados (100g).', 60, 'img/Cookies_misto.jpg'),
('Combos Cookies Mix', 'Combo Cookies Mix - 12 un', '12 Cookies sortidos: mix entre tradicionais (70g) e recheados (100g).', 120, 'img/Cookies_misto.jpg');

