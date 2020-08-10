const typeorm = require('typeorm');

typeorm.createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    database: "luxdb",
    synchronize: true,
    entitySchema: [
        require('./entities/role'),
        require('./entities/user'),
        require('./entities/productCategory'),
        require('./entities/product'),
        require('./entities/transHeader'),
        require('./entities/transactionDetail'),
    ]
});

