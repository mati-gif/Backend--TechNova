import { ShippingAddress } from "../models/ShippingAddress/ShippingAddress.js";
import { User } from "../models/User/User.js";
import { validateShippingAddress } from "../helpers/shippingAddressValidation.js";

const MAX_ADDRESSES = 3;

//1. Trae todas las direcciones existentes (las activas y las que no)
export const getAllShippingAddresses = async (req, res) => {
    try {
        const addresses = await ShippingAddress.findAll({
            include: [{
                model: User,
                attributes: ['id', 'active', 'name', 'email'], // Solo traemos lo necesario
                where: { active: true }       // Filtro directo: solo usuarios activos
            }]


        });

        if (!addresses) {
            return res.status(404).json({
                message: "No se encontro una direccion que tenga su usuario activo",


            })
        }

        return res.status(200).json({
            message: "Direcciones asociadas a usuarios activos",
            shippingAddress: addresses
        });

    } catch (error) {
        console.error(error);

        res.status(500).send({ message: "Ocurrio un error al traer los Direcciones" })
    }
};


// 2. Obtener una dirección (activa e inactiva) por ID (verificando que su usuario esté activo)
export const getShippingAddressById = async (req, res) => {
    try {
        const { id } = req.params;
        const address = await ShippingAddress.findByPk(id, {
            include: [{
                model: User,
                where: { active: true } // Si el usuario no está activo, la consulta fallará o no traerá nada
            }]
        });

        if (!address) return res.status(404).json({ message: "Dirección no encontrada o usuario deshabilitado" });

        res.status(200).json({
            message: "Direccion encontrada con exito",
            address: address
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//-------------------- OOO --------------------------//


// 3. Crear una nueva dirección (validando antes que el usuario exista y esté activo)
export const createShippingAddress = async (req, res) => {
    try {
        
        const validation = validateShippingAddress(req);

    
        if (validation.error) {
            return res.status(400).json({ message: validation.message });
        }

        const address = req.body;
        const { userId } = req.params

        // Verificar usuario
        const user = await User.findOne({
            where: {
                id: userId,
                active: true
            }
        });

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado o inactivo" });
        }

        // Contar solamente direcciones activas
        const activeAddressesCount = await ShippingAddress.count({
            where: {
                userId,
                active: true
            }
        });

        if (activeAddressesCount >= MAX_ADDRESSES) {
            return res.status(400).json({
                message: `Solo se permiten ${MAX_ADDRESSES} direcciones activas por usuario.`
            });
        }

        const addressWithUser = {
            ...address,
            userId
        }

        const newAddress = await ShippingAddress.create(addressWithUser);

        res.status(201).json({
            message: `Nueva direccion creada para el usuario ${user.email}`,
            newAddress: newAddress
        });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la dirección: " + error.message });
    }
};

//4. Buscar todas las direcciones activas e inactivas de un usuario específico
export const getAllShippingAddressesByUserId = async (req, res) => {
    try {
        const userId = req.user.id; //lo saca del token 

        // Buscamos las direcciones filtrando directamente por el userId
        // También incluimos el usuario para verificar que esté activo
        const addresses = await ShippingAddress.findAll({
            where: {
                userId: userId
            },
            include: [{
                model: User,
                attributes: ['id', 'active', 'name', 'email'],
            }],

        });

        if (addresses.length === 0) {
            return res.status(404).json({ message: "No se encontraron direcciones para este usuario activo." });
        }

        res.status(200).json({
            message: "Direcciones encontradas con exito",
            addresses: addresses
        });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las direcciones: " + error.message });
    }
};

//5.Desactiva o activa una direccion del  usuario logueado (solo lo puede hacer el mismo usuario logueado)
// Alterna (activa/desactiva) una dirección del usuario logueado dinámicamente
export const toggleShippingAddressStatus = async (req, res) => {
    try {
        const { id } = req.params;

        console.log(id);

        const userId = req.user.id; // Se obtiene gracias al token

        // Buscamos la dirección asegurándonos de que pertenezca al usuario logueado
        const address = await ShippingAddress.findOne({
            where: {
                id: id,
                userId
            }
        });

        // Si no existe o no le pertenece a este usuario
        if (!address) {
            return res.status(404).json({
                message: "Dirección no encontrada"
            });
        }

        // Guardamos el nuevo estado (el opuesto al que tiene actualmente)
        const newStatus = !address.active;

        // Actualizamos la dirección con su nuevo estado inverso
        await address.update({
            active: newStatus
        });

        // Personalizamos dinámicamente el mensaje de respuesta para el usuario
        const actionMessage = newStatus ? "activada" : "desactivada";

        return res.status(200).json({
            message: `Dirección ${actionMessage} correctamente`,
            address
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};