import { ShippingAddress } from "../models/ShippingAddress/ShippingAddress.js";
import { User } from "../models/User/User.js";


export const getAllShippingAddresses = async (req, res) => {
    try {
        const addresses = await ShippingAddress.findAll({
            include: [{
                model: User,
                attributes: ['id', 'active','name','email'], // Solo traemos lo necesario
                where: { active: true }       // Filtro directo: solo usuarios activos
            }]


        });

        if(!addresses){
            return res.status(404).json({
                message:"No se encontro una direccion que tenga su usuario activo",


            })
        }

        return res.status(200).json({
                message:"Direcciones asociadas a usuarios activos",
                shippingAddress : addresses
            });

    } catch (error) {
        console.error(error);

        res.status(500).send({ message: "Ocurrio un error al traer los Direcciones" })
    }
};


// 2. Obtener una dirección por ID (verificando que su usuario esté activo)
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
            message:"Direccion encontrada con exito",
            address: address
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// 3. Crear una nueva dirección (validando antes que el usuario exista y esté activo)
export const createShippingAddress = async (req, res) => {
    try {
        const address = req.body;
        const {userId} = req.body

        // Verificamos al usuario antes de crear
        const user = await User.findOne({ where: { id: userId, active: true } });
        
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado o inactivo" });
        }

        const newAddress = await ShippingAddress.create(address);

        res.status(201).json({message:`Nuva direccion creada para el usuario ${user.name}`,
        newAddress: newAddress
        });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la dirección: " + error.message });
    }
};

// Buscar todas las direcciones de un usuario específico
export const getShippingAddressesByUserId = async (req, res) => {
    try {
        const { userId } = req.params; 

        // Buscamos las direcciones filtrando directamente por el userId
        // También incluimos el usuario para verificar que esté activo
        const addresses = await ShippingAddress.findAll({
            where: { userId: userId },
            include: [{
                model: User,
                attributes: ['id', 'active','name','email'],
                where: { active: true } // Solo direcciones de usuarios activos
            }]
        });

        if (addresses.length === 0) {
            return res.status(404).json({ message: "No se encontraron direcciones para este usuario activo." });
        }

        res.status(200).json({
            message:"Direccion encontrada con exito",
            addresses: addresses
        });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las direcciones: " + error.message });
    }
};