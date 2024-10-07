INSERT INTO tb_clients (full_name, gender, cpf_or_cnpj, rg_or_ie, phone_number, email, address, number, district, zip_code, city, state, country, birth_date, credit_limit, notes, status, created_at, updated_at) VALUES ('John Doe', 'M', '123.456.789-00', '12.345.678-9', '(11) 91234-5678', 'johndoe@example.com', '123 Main St', '101', 'centro', '12345-678', 'São Paulo', 'SP', 'Brazil', '1985-06-15', 5000.00, 'Cliente VIP', 'ACTIVE', '2024-09-25T14:30:00', '2024-09-25T14:30:00');

INSERT INTO users (first_name, last_name, email, password) VALUES ('Luiz Fernando', 'Angeli,', 'fernando@hotmail.com', '$2a$10$ocxs8qS.b/D3VPzdwyYi1eC5YoLXC7E0LgZOEsTAA6I70Y0p0JcdW'); -- senha: 12345
INSERT INTO users (first_name, last_name, email, password) VALUES ('Marcelo', 'Nicolai,', 'marcelo@hotmail.com', '$2a$10$ocxs8qS.b/D3VPzdwyYi1eC5YoLXC7E0LgZOEsTAA6I70Y0p0JcdW'); -- senha: 12345

INSERT INTO tb_role (authority) VALUES ('ROLE_OPERATOR');
INSERT INTO tb_role (authority) VALUES ('ROLE_ADMIN');

INSERT INTO tb_user_role (user_id, role_id) VALUES (1, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 2);
