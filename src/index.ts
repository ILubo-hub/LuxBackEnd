import "reflect-metadata";
import Express from 'express';
import { createConnection } from "typeorm";

const main = async () => {
    await createConnection();
    const app = Express();
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Listenin on port ${PORT}`);
    })
}
main();
