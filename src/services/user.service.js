import { User } from "../models/User/User.js";
import { Role } from "../models/Role/Role.js";
import { validateLoginUser, validateRegisterUser } from "../helpers/validations.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const registerUser = async (req, res) => {


    const result = validateRegisterUser(req)

    if (result.error) {
        return res.status(400).send({ message: result.message })
    }
    const { name, email, password } = req.body

    const user = await User.findOne({
        where: {email}
    })

    if (user)
        return res.status(400).json({ message: "Usuario ya existe" });

    const saltRound = 10;

    const salt = await bcrypt.genSalt(saltRound);

    console.log(salt);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword
    });

    res.json(newUser.id);

}

export const loginUser = async (req, res) => {

    const result = validateLoginUser(req.body)
    if (result.error) {
        return res.status(400).send({ message: result.message })
    }

    const { email, password } = req.body;

    const user = await User.findOne({
        where: {email},
        include:{
            model:Role
        }
    })

    if (!user)
        return res.status(401).json({ message: "Error en las credenciales" });

    const comparison = await bcrypt.compare(password, user.password);

    if (!comparison)
        return res.status(401).json({ message: "Error en las credenciales" });

    const secretKey = "programacion3-1C-2026-techNova";

    const payload = {
        id : user.id,
        name:user.name,
        email:email,
        role:user.Role.name
    }

    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" })

    return res.json({ token })

}