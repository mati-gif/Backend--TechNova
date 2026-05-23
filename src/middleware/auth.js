import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    const header = req.header("Authorization") || "";
    console.log("Header recibido:", header);
    const token = header.split(" ")[1];
    console.log("El token obtenido es :",token);
    
    if(!token)
        return res.status(401).json({ message: "No está autorizado"});

    try{
        const payload = jwt.verify(token, "programacion3-1C-2026-techNova");
        console.log(payload);
        next();

    }
    catch (error){
        return res.status(401).json({ message: "No está autorizado"});
    }

}