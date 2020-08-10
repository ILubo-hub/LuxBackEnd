const Express = require('express');
const typeorm = require('typeorm');

const app = Express();

typeorm.createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    database: "luxdb",
    synchronize: true,
    entitySchema: [
        require('./src/entities/role'),
        require('./src/entities/user'),
        require('./src/entities/productCategory'),
        require('./src/entities/product'),
        require('./src/entities/transHeader'),
        require('./src/entities/transactionDetail'),
    ]
});

app.use(Express.json({extended: true}));
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
