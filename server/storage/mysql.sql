-- CREATE TABLE
--     users (
--         id TEXT PRIMARY KEY,
--         name VARCHAR(255) NOT NULL,
--         userName VARCHAR(255) NOT NULL,
--         email VARCHAR(255) UNIQUE NOT NULL,
--         password VARCHAR(255) NOT NULL
--     );
-- INSERT INTO
--     users (id,name,userName,email, password)
-- VALUES
--     ('8dbdef34-2e22-4e0e-8c84-8bd22a02cd5c','João','jfernando', 'joao@example.com', 'B9A45B4742F16F23ECA9D7250CBCCA97FD18727419BA1856C81C5E7574396AFF'),
--     ('996242ad-cab6-4b7b-8c71-b012e6aeeb07','Maria','msoares', 'maria@example.com', '43EAE1B2BD5D9A8AEAC7312F5AD870530BE341F4209930FEA9AE89AC335E9274'),
--     ('8b23867d-71d1-45b8-b9a2-7ed6b8a4b723','Pedro','pdavila', 'pedro@example.com', '79617E2E9D51A353D2639A9F02D439FD713C0D2FB947A47C1541051E8E95C2BE');
-- ALTER TABLE users
-- ADD COLUMN phone VARCHAR(15) NOT NULL DEFAULT '(99) 99999-9999';
-- UPDATE users SET phone = '(21) 99139-3524' WHERE name ='João';
-- UPDATE users SET phone = '(21) 96259-7572' WHERE name ='Maria';
-- UPDATE users SET phone = '(21) 98813-3224' WHERE name ='Pedro';
-- DELETE FROM users
-- WHERE
--     userName = 'mrestum';
SELECT
    *
FROM
    users;