export const validateUpdateProduct = (req) => {

    const result = {
        error: false,
        message: ''
    }

    const { name, price, stock } = req.body; // Extraemos los campos a validar

    // Comprobamos que exista, que no sea nulo, indefinido o un string vacío (quitando espacios)
    if (name === undefined || name === null || (typeof name === 'string' && name.trim() === '')) {
        return { error: true, message: "El nombre no puede estar vacío o es invalido." };
    }


    // Comprobamos que no sea nulo/indefinido
    if (price === undefined || price === null) {
        return { error: true, message: "El precio es obligatorio." };
    }
    // Comprobamos que sea un número válido y que no sea menor a cero
    if (price < 0) {
        return { error: true, message: "El precio debe ser un número válido y mayor o igual a cero." };
    }


    // Comprobamos que no sea nulo/indefinido
    if (stock === undefined || stock === null) {
        return { error: true, message: "El stock (cantidad) es obligatorio." };
    }
    // Comprobamos que sea un número válido y que no sea menor a cero
    if (stock < 0) {
        return { error: true, message: "El stock debe ser un número válido y mayor o igual a cero." };
    }

    return result; 
}


export const validateCreateProduct = (req) => {
    const result = {
        error: false,
        message: ''
    }

    const { name, brand, description, price, stock, image, categoryId, features } = req.body;

    console.log("este es el precio que llega del fe ",typeof(price));
    
    // Validar strings obligatorios (quitando espacios en blanco)
    if (!name || typeof name !== "string" || name.trim() === "") {
        return { error: true, message: "El nombre no puede estar vacío o es invalido." };
    }
    if (!brand || typeof brand !== "string" || brand.trim() === "") {
        return { error: true, message: "La marca no puede estar vacia o es invalida." };
    }
    if (!description || typeof description !== "string" || description.trim() === "") {
        return { error: true, message: "La descripcion no puede estar vacia o es invalida." };
    }
    if (!image || typeof image !== "string" || image.trim() === "") {
        return { error: true, message: "La imagen no puede estar vacia o es invalida." };
    }

    // Validar números (asegurando que existan y no sean negativos)
    if (price === undefined || price === null  || price < 0) {
        return { error: true, message: "El precio debe ser mayor o igual a 0 o es invalido." };
    }
    if (stock === undefined || stock === null  || stock < 0) {
        return { error: true, message: "El stock no puede ser negativo o es invalido." };
    }

    // Validar que la categoría sea un ID válido enviado desde el front
    if (!categoryId) {
        return { error: true, message: "La categoría es obligatoria." };
    }

    // Validar features (como el front hace split, llega un Array)
    if (!features || !Array.isArray(features) || features.length === 0) {
        return { error: true, message: "Las características no pueden estar vacías." };
    }

    return result;
}