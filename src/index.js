import express from "express";
import { sequelize } from "../db.js";
import "./models/relations/relations.js"


const app = express();

const port = 3000;

try{
    app.use(express.json())
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT,PATCH,DELETE");
        next();
    })
    
    app.listen(port)

    console.log(`app escuchando el puerto ${port}`);
    await sequelize.sync();
}catch(error){

        console.log("Hubo un error inicializando ");

    
}