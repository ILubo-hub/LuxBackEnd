import Express from 'express';
import pkg from 'typeorm';
import {Role} from './src/entities/role.js';
import {User} from './src/entities/user.js';
import {ProductCategory} from './src/entities/productCategory.js';
import {Product} from './src/entities/product.js';
import {Trans_Header} from './src/entities/transHeader.js';
import {Trans_Detail} from './src/entities/transactionDetail.js';
import { createUser } from './src/routing/userRoute.js';


const { EntitySchema, createConnection } = pkg; 

const app = Express();

createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    database: "luxdb",
    synchronize: true,
    entities: [
        new EntitySchema (Role),
        new EntitySchema (User),
        new EntitySchema (ProductCategory),
        new EntitySchema (Product),
        new EntitySchema (Trans_Header),
        new EntitySchema (Trans_Detail),
    ]
});

app.use(Express.json({extended: true}));
app.use('/api/user',createUser);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
