import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const header = req.header("Authorization") || "";
  console.log("Header recibido:", header);
  const token = header.split(" ")[1];
  console.log("El token obtenido es :", token);

  if (!token) return res.status(401).json({ message: "No está autorizado"});

  try {
    const payload = jwt.verify(token, "programacion3-1C-2026-techNova");
    console.log(payload);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: "No está autorizado" });
  }
};

export const verifySuperAdmin = (req, res, next) => {
  // 1. Verificamos que el usuario exista en la request (por si falló el verifyToken)
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "Acceso denegado. Usuario no autenticado" });
  }

  // 2. Verificamos si su rol es "superadmin"
  if (req.user.role !== "superadmin") {
    return res.status(403).json({
      message:
        "Acceso prohibido. Se requieren permisos de Super Administrador",
    });
  }

  // 3. Si todo está bien, lo dejamos pasar al controlador
  next();
};

export const verifyAdminOrSuperAdmin = (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "Acceso denegado. Usuario no autenticado" });
  }

  if (req.user.role !== "admin" && req.user.role !== "superadmin") {
    return res.status(403).json({
      message:
        "Acceso prohibido. Se requieren permisos de administrador o super administrador",
    });
  }

  next();
};
