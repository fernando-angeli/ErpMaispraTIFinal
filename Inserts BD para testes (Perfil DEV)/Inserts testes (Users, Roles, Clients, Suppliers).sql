INSERT INTO tb_users (first_name, last_name, email, password) 
VALUES ('Luiz Fernando', 'Angeli', 'fernando@hotmail.com', '$2a$10$ocxs8qS.b/D3VPzdwyYi1eC5YoLXC7E0LgZOEsTAA6I70Y0p0JcdW'),
		('Marcelo', 'Nicolai', 'marcelo@hotmail.com', '$2a$10$ocxs8qS.b/D3VPzdwyYi1eC5YoLXC7E0LgZOEsTAA6I70Y0p0JcdW'),
		('Emerson Gremista', 'Fã do Renato', 'emerson@hotmail.com', '$2a$10$ocxs8qS.b/D3VPzdwyYi1eC5YoLXC7E0LgZOEsTAA6I70Y0p0JcdW');
-- senha padrao: 12345

INSERT INTO tb_roles (authority) 
VALUES ('ROLE_OPERATOR'), ('ROLE_ADMIN'), ('ROLE_MANAGER');

INSERT INTO tb_user_role (user_id, role_id) 
VALUES (1, 1), (1, 2), (2, 1), (2, 2), (3, 1), (3, 2), (3, 3);

INSERT INTO tb_clients (full_name, type_pf_or_pj, gender, cpf_cnpj, rg_ie, phone_number, email, address, number, district, zip_code, city, state, country, birth_date, credit_limit, notes, status) 
VALUES ('Ana Carolina', 'PF', 'F', '314.559.980-15', '200-891', '(11) 9886-3347', 'ana.carolina@gmail.com', 'Av. Paulista', '1234', 'Bela Vista', '01.013-001', 'São Paulo', 'SP', 'Brasil', '1990-07-12', 35000.00, 'Faz compras regulares.', 'ACTIVE'),
		('Marcelo', 'PF', 'M', '685.341.320-20', '125-554', '(51) 3543-4811', 'marcelo_mnicolai@gmail.com', 'Rua Casemiro Alves', 'S/N', 'Centro', '95.650-000', 'Cachoeirinha', 'RS', 'Brasil', '1982-03-29', 50000.00, 'Gremistão e bom pagador.', 'ACTIVE'),
		('João Silva', 'PF', 'M', '493.874.229-70', '157-987', '(21) 9223-4556', 'joao.silva@yahoo.com', 'Rua dos Andradas', '276', 'Centro', '20.010-000', 'Rio de Janeiro', 'RJ', 'Brasil', '1985-05-14', 15000.00, 'Cliente antigo, bom pagador.', 'ACTIVE'),
		('Lucas Santos', 'PF', 'M', '485.623.748-34', '254-778', '(31) 9732-8876', 'lucas.santos@hotmail.com', 'Rua Amazonas', '567', 'Savassi', '30.140-000', 'Belo Horizonte', 'MG', 'Brasil', '1995-08-09', 20000.00, 'Sem histórico de inadimplência.', 'ACTIVE'),
		('Mariana Oliveira', 'PF', 'F', '521.998.666-01', '300-452', '(41) 9845-6598', 'mariana.oliveira@outlook.com', 'Rua XV de Novembro', '908', 'Centro Cívico', '80.020-000', 'Curitiba', 'PR', 'Brasil', '1992-11-23', 45000.00, 'Ótima cliente, paga sempre em dia.', 'ACTIVE');

INSERT INTO tb_suppliers (full_name, type_pf_or_pj, cpf_cnpj, rg_ie, phone_number, email, address, number, district, zip_code, city, state, country, credit_limit, notes, status) 
VALUES ('Marcelo', 'PF', '685.341.320-20', '125-554', '(51) 3543-4811', 'marcelo_mnicolai@gmail.com', 'Rua Casemiro Alves', 'S/N', 'Centro', '95.650-000', 'Cachoeirinha', 'RS', 'Brasil', 50000.00, 'Gremistão e bom pagador.', 'ACTIVE'),
		('Ana Carolina', 'PF', '314.559.980-15', '200-891', '(11) 9886-3347', 'ana.carolina@gmail.com', 'Av. Paulista', '1234', 'Bela Vista', '01.013-001', 'São Paulo', 'SP', 'Brasil', 35000.00, 'Faz compras regulares.', 'ACTIVE'),
		('João Silva', 'PF', '493.874.229-70', '157-987', '(21) 9223-4556', 'joao.silva@yahoo.com', 'Rua dos Andradas', '276', 'Centro', '20.010-000', 'Rio de Janeiro', 'RJ', 'Brasil', 15000.00, 'Cliente antigo, bom pagador.', 'ACTIVE'),
		('Lucas Santos', 'PF', '485.623.748-34', '254-778', '(31) 9732-8876', 'lucas.santos@hotmail.com', 'Rua Amazonas', '567', 'Savassi', '30.140-000', 'Belo Horizonte', 'MG', 'Brasil', 20000.00, 'Sem histórico de inadimplência.', 'ACTIVE'),
		('Mariana Oliveira', 'PF', '521.998.666-01', '300-452', '(41) 9845-6598', 'mariana.oliveira@outlook.com', 'Rua XV de Novembro', '908', 'Centro Cívico', '80.020-000', 'Curitiba', 'PR', 'Brasil', 45000.00, 'Ótima cliente, paga sempre em dia.', 'ACTIVE');