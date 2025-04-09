import type { Request, Response, NextFunction } from "express";

export function corsHeaders(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.origin) return next();
  if (allowedOrigins.includes(req.headers.origin)) {
    // res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
  }
}
export const allowedOrigins = [
  "http://localhost:5000/api",
  "http://192.168.0.149:3000/",
  process.env.FRONTEND_URL ?? "",
  process.env.API_URL ?? "",
];
