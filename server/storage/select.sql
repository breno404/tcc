-- SELECT
--     products.id,
--     products.name,
--     products.price,
--     products.category,
--     inventories.quantity
-- FROM
--     inventories
--     INNER JOIN products ON inventories.productId = products.id
-- ORDER BY
--     ASC products.category;
-- SELECT
--     *
-- FROM
--     users;

-- SELECT
--     *
-- FROM
--     files;

-- SELECT
--     *
-- FROM
--     categories;

-- SELECT
--     *
-- FROM
--     files_categories;

-- SELECT
--     *
-- FROM
--     files_users;

-- SELECT
--     *
-- FROM
--     customers;

-- SELECT
--     *
-- FROM
--     suppliers;

-- SELECT
--     *
-- FROM
--     products;

-- SELECT
--     *
-- FROM
--     inventories;

-- SELECT
--     *
-- FROM
--     purchases;

-- SELECT
--     *
-- FROM
--     sales;

select * from customers where id = '59b7b7ef-af61-4244-8e5f-93c36a82710b';

SELECT 
	`Product`.`id`, 
	`Product`.`name`, 
	`Product`.`description`, 
	`Product`.`price`, 
	`Product`.`category`, 
	`Inventory`.`id` AS `Inventory.id`, 
	`Inventory`.`quantity` AS `Inventory.quantity`, 
	`Inventory`.`productId` AS `Inventory.productId`, 
	`Inventory`.`lastModified` AS `Inventory.lastModified`, 
	`Inventory`.`ProductId` AS `Inventory.ProductId` 
FROM 
	`products` AS `Product` 
LEFT OUTER JOIN 
	`inventories` AS `Inventory` 
ON 
	`Product`.`id` = `Inventory`.`ProductId`