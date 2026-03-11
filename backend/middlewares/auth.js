import { veryfyToken } from "../utils/jwt.js";
import prisma from "../config/database.js";
function authMiddleWare(req, res, next) {
  if (!req.headers.authorization )
    res.status(401).json({ message: "Unauthorized" }).end();
  const authHeader = req.headers.authorization || req.headers["Authorization"];
  console.log(authHeader, "authHeader");
  if (!authHeader || !authHeader.startsWith("Bearer "))
    res.status(401).json({ message: "Unauthorized" }).end();

  const token = authHeader.split(" ")[1];
    console.log("Header", req.get("Authorization"));
  const user = veryfyToken(token);
  console.log(user)
  if(!user) res.status(401).json({ message: "Unauthorized" }).end();
  
  req.user = user;
  next();
}

export default authMiddleWare;
