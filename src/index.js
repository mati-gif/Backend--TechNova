import express from "express";
import { sequelize } from "../db.js";
import "./models/relations/relations.js"
import userRoutes from "./routes/user.routes.js"
import productRoutes from "./routes/product.routes.js"
import categoryRoutes from "./routes/category.routes.js"


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
    app.use(productRoutes);
    app.use(userRoutes)
    app.use(categoryRoutes)
    
    console.log(`app escuchando el puerto ${port}`);
    await sequelize.sync();
}catch(error){

        console.log("Hubo un error inicializando ");

    
}