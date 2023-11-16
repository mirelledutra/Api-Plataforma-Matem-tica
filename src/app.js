//importar sempre que vocÊ deseja se comunicar entre arquivos

import express from "express";
import db from "./config/dbConect.js";
import routes from "./routes/index.js"
import cors from "cors";

db.on("error", console.log.bind(console, "Conexão com o banco falhou!"));
db.once("open", () => {
    console.log('Conexão com o banco estabelecida! ')
});

//instanciando o express
const app = express()

app.use(cors({origin: 'http://localhost:3001'}))

//habilitando o uso de json pelo express
app.use(express.json())

routes(app)

export default app