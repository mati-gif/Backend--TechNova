import { Product } from "../models/Product/Product.js"

export const retrieveAllProducts = async (req, res) => {

    try {
        const products = await Product.findAll();

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No se encontraron productos" });
        }
        return res.status(200).json(products);

    } catch (error) {
        console.error(error);

        res.status(500).send({ message: "Ocurrio un error al traer los productos" })
    }

}


export const findById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);

        if (!product) {
            console.log(`no se encontro el producto con el id ${id}`);

            return res.status(404).send({ message: "No se encontro el producto solicitado" })
        }
    } catch (error) {
        console.error(error);

        res.status(500).send({ message: "Ocurrio un error al traer los productos" })
    }
}

export const createNewProduct = async (req, res) => {

    try {

        //agregar metodo para validar los campos que vienen en el req (campos vacios o nulos)
        const product = req.body;

        const existProduct = await Product.findOne({
            where: { slug: product.slug },
        })

        if (existProduct) {
            console.log("Actualizando el stock de un producto existente");

            existProduct.stock = existProduct.stock + product.stock;

            await existProduct.save();
            return res.status(200).json(existProduct);

        }

        const newProduct = await Product.create(product)

        return res.status(201).json(newProduct.id)

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Ocurrió un error al crear el producto", error: error.message });
    }
}