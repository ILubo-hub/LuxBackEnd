
import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import * as bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import routes from "./routes";
import {User} from './entities/user';
import {Role} from './entities/role';


/*
const main = async () => {
    await createConnection();
    const app = express();
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    app.use("/", routes);

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Listenin on port ${PORT}`);
    })
}
main();*/

createConnection({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '',
  database: 'luxdb',
  entities: [User, Role]
}).then(async _connection => {
    // Create a new express application instance
    const app = express();

    // Call midlewares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    //Set all routes from routes folder
    app.use("/", routes);

    app.listen(3000, () => {
      console.log("Server started on port 3000!");
    });
  })
  .catch(error => console.log(error));
