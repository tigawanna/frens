import type { CookieOptions, Response } from "express";
export const setCookies = (
  res: Response,
  tokens: { accessToken: string; refreshToken: string },
) => {
  res.cookie("access_token", tokens.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie("refresh_token", tokens.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/auth/refresh",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};



export const secureCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  path: "/",
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // expires in 7 days
  maxAge: 7 * 24 * 60 * 60, // expires in 7 days
} satisfies CookieOptions
;
