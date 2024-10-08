INSERT INTO users (first_name, last_name, email, password) VALUES ('Luiz Fernando', 'Angeli,', 'fernando@hotmail.com', '$2a$10$ocxs8qS.b/D3VPzdwyYi1eC5YoLXC7E0LgZOEsTAA6I70Y0p0JcdW'); -- senha: 12345
INSERT INTO users (first_name, last_name, email, password) VALUES ('Marcelo', 'Nicolai,', 'marcelo@hotmail.com', '$2a$10$ocxs8qS.b/D3VPzdwyYi1eC5YoLXC7E0LgZOEsTAA6I70Y0p0JcdW'); -- senha: 12345

INSERT INTO tb_role (authority) VALUES ('ROLE_OPERATOR');
INSERT INTO tb_role (authority) VALUES ('ROLE_ADMIN');

INSERT INTO tb_user_role (user_id, role_id) VALUES (1, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 2);
