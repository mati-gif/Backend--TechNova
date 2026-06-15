import { validateCreateProduct,validateUpdateProduct } from "../helpers/validateProduct.js";
import { Product } from "../models/Product/Product.js"

export const retrieveAllProducts = async (req, res) => {

    try {
        const products = await Product.findAll({
            where: { IsActive: true },
        });

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

        return res.status(200).json(product);
    } catch (error) {
        console.error(error);

        res.status(500).send({ message: "Ocurrio un error al traer los productos" })
    }
}

export const createNewProduct = async (req, res) => {

    try {

        // 1. Ejecutamos la validación pasándole el req
        const validation = validateCreateProduct(req);
            console.log(validation.message);
            
        // Si hay algún error, frena la ejecución y avisa al Frontend
        if (validation.error) {
            return res.status(400).json({ message: validation.message });
        }

        const product = req.body;

        const existProduct = await Product.findOne({
            where: { slug: product.slug },
        })

        //Si no existe -> lo crea
        if (!existProduct) {

            const newProduct = await Product.create(product);

            return res.status(201).json({
                message: `¡Producto ${newProduct.name} procesado correctamente!`,
                product: newProduct.id
            });
        }

        //Si existe pero no esta activo -> Directamente no existe 
        if (!existProduct.isActive) {

            existProduct.isActive = true;

            await existProduct.save();

            return res.status(200).json({
                message: `El producto ${existProduct.name} ya existía y fue reactivado,ahora puede actualizarlo`,
                product: existProduct
            });
        }
        console.log(typeof existProduct.stock);
        console.log(typeof product.stock);


        //Existe y esta activo :Actualiza el stock
        existProduct.stock = existProduct.stock + product.stock;

        await existProduct.save();

        return res.status(200).json({
            message: `¡El producto ${existProduct.name} ya existia , se incrementó una unidad el stock!`,
            existProduct
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Ocurrió un error al crear el producto", error: error.message });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("id del producto a actualizar ", id);

        const dataToUpdate = req.body;

        //  Ejecutamos la validación
        const validation = validateUpdateProduct(req);

        if (validation.error) {
            return res.status(400).json({ message: validation.message });
        }

        // 1. Buscamos si el producto existe
        const product = await Product.findByPk(id);

        if (!product) {
            console.log(`No se encontró el producto con el id ${id} para actualizar`);
            return res.status(404).json({ message: "No se encontró el producto solicitado" });
        }


        // 2. Actualizamos el producto con los datos que vienen del body
        await product.update(dataToUpdate);

        console.log(`Producto con ID ${id} actualizado exitosamente`);
        return res.status(200).json({ message: `El producto ${product.name} fue actualizado con exito`, product: product.id });

    } catch (error) {
        console.error("Error en updateProduct:", error);
        return res.status(500).json({
            message: "Ocurrió un error al actualizar el producto",
            error: error.message
        });
    }
};


export const deleteAProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // 1. Buscamos si el producto existe
        const product = await Product.findByPk(id);

        if (!product) {
            console.log(`No se encontró el producto con el id ${id} para dar de baja`);
            return res.status(404).json({ message: "No se encontró el producto solicitado" });
        }

        // Validar si ya está dado de baja
        if (!product.isActive) {
            return res.status(400).json({ message: "El producto ya se encuentra dado de baja." });
        }

        // 2. Aplicamos la baja lógica cambiando el flag 'isActive' a false
        await product.update({ isActive: false });

        console.log(`Baja lógica aplicada al producto con ID ${id}`);
        return res.status(200).json({
            message: "Producto dado de baja exitosamente",
            productId: id
        });

    } catch (error) {
        console.error("Error en deleteAProduct:", error);
        return res.status(500).json({
            message: "Ocurrió un error al intentar dar de baja el producto",
            error: error.message
        });
    }
};