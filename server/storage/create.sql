CREATE TABLE
    users (
        id VARCHAR(255) NOT NULL,
        userName VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        active BIT NOT NULL DEFAULT 1,
        phone VARCHAR(15) NOT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    files (
        id VARCHAR(255) NOT NULL,
        path TEXT NOT NULL,
        name VARCHAR(255) NOT NULL,
        ext VARCHAR(10) NOT NULL,
        lastModified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    );

CREATE TABLE
    categories (
        id VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        parent VARCHAR(255),
        PRIMARY KEY (id),
        FOREIGN KEY (parent) REFERENCES categories (id)
    );

CREATE TABLE
    files_categories (
        fileId VARCHAR(255) NOT NULL,
        categoryId VARCHAR(255) NOT NULL,
        PRIMARY KEY (fileId, categoryId),
        FOREIGN KEY (fileId) REFERENCES files (id),
        FOREIGN KEY (categoryId) REFERENCES categories (id)
    );

CREATE TABLE
    files_users (
        fileId VARCHAR(255) NOT NULL,
        userId VARCHAR(255) NOT NULL,
        PRIMARY KEY (fileId, userId),
        FOREIGN KEY (fileId) REFERENCES files (id),
        FOREIGN KEY (userId) REFERENCES users (id)
    );

CREATE TABLE
    files_suppliers (
        fileId VARCHAR(255) NOT NULL,
        supplierId VARCHAR(255) NOT NULL,
        PRIMARY KEY (fileId, supplierId),
        FOREIGN KEY (fileId) REFERENCES files (id),
        FOREIGN KEY (supplierId) REFERENCES suppliers (id)
    );

CREATE TABLE
    files_customers (
        fileId VARCHAR(255) NOT NULL,
        customerId VARCHAR(255) NOT NULL,
        PRIMARY KEY (fileId, customerId),
        FOREIGN KEY (fileId) REFERENCES files (id),
        FOREIGN KEY (customerId) REFERENCES customers (id)
    );

CREATE TABLE
    customers (
        id VARCHAR(255) NOT NULL,
        companyName VARCHAR(255),
        fantasyName VARCHAR(255) DEFAULT NULL,
        cnae VARCHAR(255),
        entityType VARCHAR(255),
        cnpj CHAR(18),
        cep CHAR(9) DEFAULT NULL,
        district VARCHAR(255) DEFAULT NULL,
        street VARCHAR(255) DEFAULT NULL,
        streetNumber VARCHAR(255) DEFAULT NULL,
        city VARCHAR(255) DEFAULT NULL,
        phone VARCHAR(14) DEFAULT NULL,
        email VARCHAR(255) DEFAULT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    suppliers (
        id VARCHAR(255) NOT NULL,
        companyName VARCHAR(255),
        fantasyName VARCHAR(255) DEFAULT NULL,
        cnae VARCHAR(255),
        entityType VARCHAR(255),
        cnpj CHAR(18),
        cep CHAR(9) DEFAULT NULL,
        district VARCHAR(255) DEFAULT NULL,
        street VARCHAR(255) DEFAULT NULL,
        streetNumber VARCHAR(255) DEFAULT NULL,
        city VARCHAR(255) DEFAULT NULL,
        phone VARCHAR(14) DEFAULT NULL,
        email VARCHAR(255) DEFAULT NULL,
        PRIMARY KEY (id)
    );

CREATE TABLE
    products (
        id VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2),
        category VARCHAR(255),
        PRIMARY KEY (id)
    );

CREATE TABLE
    inventories (
        id VARCHAR(255) NOT NULL,
        productId VARCHAR(255) NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        lastModified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (productId) REFERENCES products (id)
    );

CREATE TABLE
    purchases (
        id VARCHAR(255) NOT NULL,
        purchaseDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        productId VARCHAR(255) NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        price DECIMAL(10, 2),
        supplierId VARCHAR(255) NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (productId) REFERENCES products (id),
        FOREIGN KEY (supplierId) REFERENCES suppliers (id)
    );

CREATE TABLE
    sales (
        id VARCHAR(255) NOT NULL,
        saleDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        productId VARCHAR(255) NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        price DECIMAL(10, 2),
        customerId VARCHAR(255) NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (productId) REFERENCES products (id),
        FOREIGN KEY (customerId) REFERENCES customers (id)
    );