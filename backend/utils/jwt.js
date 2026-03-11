import jwt from "jsonwebtoken";

export const veryfyToken = (string) => {
    const secret = process.env.JWT_SECRET;
    try {
       return jwt.verify(string, secret);
    } catch (error) {
        return false;
    }
}

export const generateToken = (payload) => {
    const secret = process.env.JWT_SECRET;
    return jwt.sign(payload, secret, { expiresIn: "1d" });
}