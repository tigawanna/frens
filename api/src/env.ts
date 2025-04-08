import "dotenv/config";
import { z } from "zod";

// export const env = {
//   port: parseInt(process.env.PORT || "5000"),
//   dbUrl: process.env.DATABASE_URL,
//   NODE_ENV: process.env.NODE_ENV,


// };

const envScheme = z.object({
  DATABASE_URL: z.string(),
  PORT: z.coerce.number(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  API_URL: z.string(),
  FRONTEND_URL: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  BREVO_API_KEY: z.string(),
  BREVO_USER: z.string(),
  EMAIL_FROM: z.string(),

});

export const envVariables = envScheme.parse(process.env);
