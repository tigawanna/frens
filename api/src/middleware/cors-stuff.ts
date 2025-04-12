import type { Request, Response, NextFunction } from "express";

export function corsHeaders(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.origin) return next();
  if (allowedOrigins.includes(req.headers.origin)) {
    // res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
  }
}
export const allowedOrigins = [
  process.env.FRONTEND_URL ?? "",
`${process.env.FRONTEND_URL}/graphql`,
  process.env.API_URL ?? "",
];

console.log("Allowed Origins", allowedOrigins);
