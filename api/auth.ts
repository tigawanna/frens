// import { PrismaClient } from "@/db/generated/client";
import { allowedOrigins } from "@/middleware/cors-stuff";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { openAPI, admin,apiKey } from "better-auth/plugins";
import { prisma } from "./prisma/client";
// const prisma = new PrismaClient();

export const auth = betterAuth({
  trustedOrigins:allowedOrigins,
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  logger:{
    disabled: false,

  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [openAPI(), admin(), 
    apiKey({
      customAPIKeyGetter(ctx) {
        const bearer_token = ctx.headers?.get('Authorization')
        if(!bearer_token) return null
        const token = bearer_token.split(' ')
        if(token[0] !== 'Bearer') return null
        if(token.length !== 2) return null
        return token[1]
      },
  }) ],
});

// ctx.headers?.get("AUTHORIZATION")
// ctx.headers?.get('Authorization')
// ctx.headers?.get('authorization')
