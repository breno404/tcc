SELECT
    products.id,
    products.name,
    products.price,
    products.category,
    inventories.quantity
FROM
    inventories
    INNER JOIN products ON inventories.productId = products.id
ORDER BY
    ASC products.category;

    -- DROP TABLE users;
    -- DROP TABLE files;
    -- DROP TABLE categories;
    -- DROP TABLE files_categories;
    -- DROP TABLE files_users;
    -- DROP TABLE customers;
    -- DROP TABLE suppliers;
    -- DROP TABLE products;
    -- DROP TABLE inventories;
    -- DROP TABLE purchases;
    -- DROP TABLE sales;