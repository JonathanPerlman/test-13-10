import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";


export const isTeacher = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ message: "Token not provided" });
            return;
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as JwtPayload;
        if (decoded.role !== "teacher") {
            res.status(403).json({ message: "Access denied: Teachers only" });
            return;
        }
        next(); 
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Invalid token" });
    }
};
