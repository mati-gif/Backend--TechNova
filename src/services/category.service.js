import { Category } from "../models/Category/Category.js";


export const retrieveAllCategories = async (req,res)=>{

    try {
            const categories = await Category.findAll();
    
            if (!categories || categories.length === 0) {
                return res.status(404).json({ message: "No se encontraron categorias" });
            }
            return res.status(200).json(categories);
    
        } catch (error) {
            console.error(error);
    
            res.status(500).send({ message: "Ocurrio un error al traer los categorias" })
        }
}