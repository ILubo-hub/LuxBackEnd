
import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import * as bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import auth from "./routes/auth";
import userRoute from "./routes/userRoute";

createConnection()
    .then(async connection  => {

    const app = express();

    //call middlewars
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    //Set all routes from routes folder
    app.use("/", auth);
    app.use("/", userRoute);


    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Listenin on port ${PORT}`);
    })
}).catch(error => console.log(error));
