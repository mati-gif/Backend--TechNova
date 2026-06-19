import { User } from "../models/User/User.js";
import { Role } from "../models/Role/Role.js";
import {
  validateLoginUser,
  validateOnlyPassword,
  validateRegisterUser,
} from "../helpers/validations.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NOW } from "sequelize";
import { validateEmail } from "../helpers/validateEmail.js";
import { Order } from "../models/Order/Order.js";

export const registerUser = async (req, res) => {
  const result = validateRegisterUser(req);

  if (result.error) {
    return res.status(400).send({ message: result.message });
  }
  const { name, email, password } = req.body;

  const user = await User.findOne({
    where: { email },
  });

  if (user) return res.status(400).json({ message: "El usuario ya existe" });

  let roleNameToFind = validateEmail(email);

  let existsRoleEntity = await Role.findOne({
    where: {
      name: roleNameToFind.toUpperCase(),
    },
  });
  if (!existsRoleEntity) {
    return res
      .status(404)
      .json({
        message: "Error interno: el rol especificado no existe en el sistema.",
      });
  }

  console.log(`El rol encontrado es: ${roleNameToFind}`);

  const saltRound = 10;

  const salt = await bcrypt.genSalt(saltRound);

  console.log(salt);

  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    roleId: existsRoleEntity.id,
    creationDate: new Date(),
    modificationDate: new Date(),
  });

  res
    .status(201)
    .json({ message: "¡Usuario registrado exitosamente!", id: newUser.id });
};

export const loginUser = async (req, res) => {
  const result = validateLoginUser(req.body);
  if (result.error) {
    return res.status(400).send({ message: result.message });
  }

  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email, active: true },
    include: {
      model: Role,
    },
  });

  console.log("Usuario activo", user);
  if (!user)
    return res
      .status(401)
      .json({ message: "El usuario no existe, debe registrarse para acceder" });

  const comparison = await bcrypt.compare(password, user.password);

  if (!comparison)
    return res.status(401).json({ message: "Error en la contraseña" });

  const secretKey = "programacion3-1C-2026-techNova";

  const payload = {
    id: user.id,
    name: user.name,
    email: email,
    role: user.role.name.toLowerCase(),
  };

  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

  return res
    .status(200)
    .json({ message: "¡Usuario logueado exitosamente!", token: token });
};

export const retrieveAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { active: true },
      include: {
        model: Role,
      },
    });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No se encontraron usuarios" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);

    res.status(500).send({ message: "Ocurrió un error al traer los usuarios" });
  }
};

// Baja lógica del usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Buscar si el usuario existe
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Validar si ya está dado de baja
    if (!user.active) {
      return res
        .status(400)
        .json({ message: "El usuario ya se encuentra dado de baja" });
    }

    // 2. Aplicar la baja lógica
    user.active = false;
    user.modificationDate = new Date();
    await user.save();

    console.log(`Baja lógica aplicada al usuario con ID ${id}`);
    return res
      .status(200)
      .json({ message: "Usuario dado de baja exitosamente (Inactivo)" });
  } catch (error) {
    console.error("Error en adminDeleteUser:", error);
    return res
      .status(500)
      .json({
        message: "Ocurrió un error al dar de baja al usuario",
        error: error.message,
      });
  }
};

// Cambiar rol del usuario
export const changeUserRole = async (req, res) => {
  try {
    // El ID del usuario que viene en la URL
    const { id } = req.params; 
    // El frontend  manda { "roleName": "admin" }
    const { roleName } = req.body; 

    // 1. Validar que llegue el texto
    if (!roleName || typeof roleName !== "string") {
      return res
        .status(400)
        .json({ message: "Debe proporcionar una opción de rol válida" });
    }

    // 2. Buscar el ID de ese rol en la base de datos (pasándolo a mayúsculas )
    const existsRole = await Role.findOne({
      where: { name: roleName.trim().toUpperCase() },
    });

    if (!existsRole) {
      return res
        .status(404)
        .json({ message: `El rol '${roleName}' no existe en el sistema` });
    }

    // 3. Buscar al usuario
    const user = await User.findByPk(id);
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // 4. Actualizar
    user.roleId = existsRole.id;
    user.modificationDate = new Date();
    await user.save();

    console.log(`Rol del usuario con ID ${id} modificado a ${existsRole.name}`);
    return res.status(200).json({ message: "Rol actualizado exitosamente" });
  } catch (error) {
    console.error("Error en adminChangeUserRole:", error);
    return res
      .status(500)
      .json({
        message: "Ocurrió un error al cambiar el rol",
        error: error.message,
      });
  }
};

// Cambiar la contraseña de un usuario (solo para el superadmin)

export const changeUserPassword = async (req, res) => {
  try {
    // ID del usuario a modificar
    const { id } = req.params; 

    const { newPw } = req.body;

    const result = validateOnlyPassword(newPw);
    console.log(result);

    if (result.error) {
      return res.status(400).send({ message: result.message });
    }

    // Buscar si el usuario existe
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Encriptar la nueva contraseña de forma segura
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hashedPassword = await bcrypt.hash(newPw, salt);

    // Actualizar contraseña y la fecha de modificación
    user.password = hashedPassword;
    user.modificationDate = new Date();
    await user.save();

    console.log(
      `¡Contraseña del usuario con ID ${id} restablecida por el SuperAdmin!`,
    );
    return res
      .status(200)
      .json({
        message: "¡Contraseña actualizada exitosamente por el administrador!",
      });
  } catch (error) {
    console.error("Error en changeUserPassword:", error);
    return res
      .status(500)
      .json({
        message: "Ocurrió un error al cambiar la contraseña",
        error: error.message,
      });
  }
};

export const findUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      include: [
        {
          model: Order,
        },
      ],
    });

    if (!user) {
      console.log(`No se encontró el usuario con el id ${id}`);

      return res
        .status(404)
        .send({ message: "No se encontró el usuario solicitado" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);

    res
      .status(500)
      .send({ message: "Ocurrió un error al traer los productos" });
  }
};
