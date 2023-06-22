INSERT INTO
    users (id, name, userName, phone, email, password)
VALUES
    (
        '8dbdef34-2e22-4e0e-8c84-8bd22a02cd5c',
        'João',
        'jfernando',
        '(99) 99999-9999',
        'joao@example.com',
        'B9A45B4742F16F23ECA9D7250CBCCA97FD18727419BA1856C81C5E7574396AFF'
    ),
    (
        '996242ad-cab6-4b7b-8c71-b012e6aeeb07',
        'Maria',
        'msoares',
        '(99) 99999-9999',
        'maria@example.com',
        '43EAE1B2BD5D9A8AEAC7312F5AD870530BE341F4209930FEA9AE89AC335E9274'
    ),
    (
        '8b23867d-71d1-45b8-b9a2-7ed6b8a4b723',
        'Pedro',
        'pdavila',
        '(99) 99999-9999',
        'pedro@example.com',
        '79617E2E9D51A353D2639A9F02D439FD713C0D2FB947A47C1541051E8E95C2BE'
    );

INSERT INTO
    users (id, name, userName, phone, email, password)
VALUES
    (
    'd843c011-108e-4ff2-9952-49699eb3d0c5',
    'Juliana Moura',
    'jmoura',
    '(99) 99999-9999',
    'juliana@example.com',
    'B9A45B4742F16F23ECA9D7250CBCCA97FD18727419BA1856C81C5E7574396AFF'
    ),(
    'dc0238d4-97a8-4257-bbe2-8d93fcfeadbd',
    'Luiz Ribeiro',
    'lribeiro',
    '(99) 99999-9999',
    'luiz@example.com',
    'B9A45B4742F16F23ECA9D7250CBCCA97FD18727419BA1856C81C5E7574396AFF'
    ),(
    '3181d981-a361-4b24-84f4-e0498a29a7ce',
    'Arnaldo Coelho',
    'acoelho',
    '(99) 99999-9999',
    'arnaldo@example.com',
    '43EAE1B2BD5D9A8AEAC7312F5AD870530BE341F4209930FEA9AE89AC335E9274'
    ),(
    '185d54ee-ba9c-4352-8588-2d497154d6dd',
    'Julio Cocielo',
    'jcocielo',
    '(99) 99999-9999',
    'julio@example.com',
    '79617E2E9D51A353D2639A9F02D439FD713C0D2FB947A47C1541051E8E95C2BE'
    );

INSERT INTO
    customers (
        id,
        companyName,
        fantasyName,
        cnae,
        entityType,
        cnpj,
        cep,
        district,
        street,
        streetNumber,
        city
    )
VALUES
    (
        '59b7b7ef-af61-4244-8e5f-93c36a82710b',
        'CONNECTCOM TELEINFORMATICA COMERCIO E SERVICOS LTDA',
        'CONNECTCOM TELEINFORMATICA',
        '6209100: SUPORTE TÉCNICO, MANUTENÇÃO E OUTROS SERVIÇOS EM TECNOLOGIA DA INFORMAÇÃO',
        'SOCIEDADE EMPRESÁRIA LIMITADA',
        '00.308.141/0001-76',
        '04004-040',
        'PARAISO',
        'AVENIDA BERNARDINO DE CAMPOS',
        '98',
        'São Paulo'
    );

    INSERT INTO
    suppliers (
        id,
        companyName,
        fantasyName,
        cnae,
        entityType,
        cnpj,
        cep,
        district,
        street,
        streetNumber,
        city
    )
VALUES
    (
        '5baeb4dd-79e0-48c9-971e-a6769d5ec4d2',
        'APPLE COMPUTER BRASIL LTDA',
        'APPLE',
        '46516 - COMÉRCIO ATACADISTA DE COMPUTADORES, PERIFÉRICOS E SUPRIMENTOS DE INFORMÁTICA',
        'SOCIEDADE EMPRESÁRIA LIMITADA',
        '00.623.904/0001-73',
        '01454-901',
        'ITAIM BIBI',
        'R LEOPOLDO COUTO MAGALHAES JUNIOR',
        '700',
        'São Paulo'
    );

    DELETE FROM customers WHERE companyName LIKE '%ARKLOK%';

    INSERT INTO 
        products(id,name,description,price,category) 
    VALUES
        ('1f087ff4-cabc-4b74-98c8-2908bdd5607b','Licença Windows 10 for Business','Licença do SO Windows versão 10 com ferramentas e suporte específicos para empresas de todos os portes.',0,'Software'),
        ('fd0cf4a7-3d70-4208-a45f-77e2c658d535','Placa de vídeo RTX 3060','Placa gráfica de penúltima geração para computadores Desktop',0,'Hardware'),
        ('ce9fe12e-b0bc-4e16-9d12-89b1e8ef5e4d','Firewall de aplicação','Firewall next generation para controles de acesso e barragem de conexões maliciosas',0,'Equipamento');