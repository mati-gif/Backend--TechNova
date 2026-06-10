import express from "express";
import { sequelize } from "../db.js";
import "./models/relations/relations.js"
import userRoutes from "./routes/user.routes.js"
import productRoutes from "./routes/product.routes.js"
import categoryRoutes from "./routes/category.routes.js"
import shippingAddress from "./routes/shippingAddress.routes.js"
import order from "./routes/order.routes.js"
import orderProduct  from "./routes/orderProduct.routes.js";
import contactFormRoutes from "./routes/contactForm.routes.js";


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
    
    app.use(productRoutes);
    app.use(userRoutes)
    app.use(categoryRoutes)
    app.use(shippingAddress)
    app.use(order)
    app.use(orderProduct)
    app.use(contactFormRoutes);

    await sequelize.sync();

    app.listen(port)
    console.log(`App escuchando en el puerto ${port}`);

} catch(error){
    console.log("Hubo un error inicializando el servidor");
}