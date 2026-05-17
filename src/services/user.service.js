import { User } from "../models/User/User.js";
import { validateLoginUser, validateRegisterUser } from "../helpers/validations.js";

export const registerUser = async (req,res) =>{

    const {name,email,password} = req.body

    const result = validateRegisterUser(req.body)

    if (result.error) {
        return res.status(400).send({ message: result.message })
    }

}

export const loginUser = async (req,res) =>{

    const result = validateLoginUser(req.body)
    if (result.error) {
        return res.status(400).send({ message: result.message })
    }

}