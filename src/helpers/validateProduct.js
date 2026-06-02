export const validateProduct = (req) =>{


    const { name, price, stock } = req.body; // Extraemos los campos a validar
// === 1. VALIDACIÓN DEL NOMBRE ===
        // Comprobamos que exista, que no sea nulo, indefinido o un string vacío (quitando espacios)
        if (name === undefined || name === null || (typeof name === 'string' && name.trim() === '')) {
            return "El nombre del producto no puede estar vacío o nulo." ;
        }

        // === 2. VALIDACIÓN DEL PRECIO ===
        // Comprobamos que no sea nulo/indefinido
        if (price === undefined || price === null) {
            return "El precio es obligatorio." ;
        }
        // Comprobamos que sea un número válido y que no sea menor a cero
        if ( price < 0) {
            return  "El precio debe ser un número válido y mayor o igual a cero." ;
        }

        // === 3. VALIDACIÓN DEL STOCK (CANTIDAD) ===
        // Comprobamos que no sea nulo/indefinido
        if (stock === undefined || stock === null) {
            return "El stock (cantidad) es obligatorio." ;
        }
        // Comprobamos que sea un número válido y que no sea menor a cero
        if (stock < 0) {
            return "El stock debe ser un número válido y mayor o igual a cero." ;
        }

        return null; // Si todo está bien, devuelve null
}