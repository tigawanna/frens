import { PrismaClient } from "@/db/generated/client";
import { allowedOrigins } from "@/middleware/cors-stuff";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { openAPI, admin } from "better-auth/plugins";
const prisma = new PrismaClient();

export const auth = betterAuth({
  trustedOrigins:allowedOrigins,
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [openAPI(), admin()],
});
