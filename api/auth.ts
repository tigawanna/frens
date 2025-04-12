// import { PrismaClient } from "@/db/generated/client";
import { allowedOrigins } from "@/middleware/cors-stuff";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { openAPI, admin, apiKey, createAuthMiddleware } from "better-auth/plugins";
import { prisma } from "./prisma/client";
import { secureCookieOptions } from "@/utils/cookie";
// const prisma = new PrismaClient();

export const auth = betterAuth({
  trustedOrigins: [...allowedOrigins],
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  //   hooks: {
  //   after: createAuthMiddleware(async (ctx) => {
  //     function setSessionCookie(){
  //       const sessionCookie = ctx.headers?.get("cookie")
  //       const sessionToken = sessionCookie?.split("better-auth.session_token=")[1]?.split(";")[0]
  //       console.log("=== sessionToekn === ", sessionToken);
  //       if(!sessionToken) return;
  //       ctx.setCookie("better-auth.session_token", sessionToken, secureCookieOptions);
  //     }
  //     if(ctx.path.startsWith("/sign-in")){
  //       setSessionCookie();
  //       ctx.setCookie("my-cookie", "signed-up",secureCookieOptions);
  //     } else if (ctx.path === "/sign-out") {
  //       ctx.setCookie("my-cookie", "signed-out", { /* cookie options */ });
  //     }
  //   },

  // ),
  // },
  advanced: {
    // useSecureCookies: true,
    // @ts-expect-error
     cookie: {
      sameSite: 'none',
      secure: true,
      domain: process.env.FRONTEND_URL || undefined,
      path: '/',
    }
  },
  logger: {
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
  plugins: [
    openAPI(),
    admin(),
    apiKey({
      customAPIKeyGetter(ctx) {
        const bearer_token = ctx.headers?.get("Authorization");
        if (!bearer_token) return null;
        const token = bearer_token.split(" ");
        if (token[0] !== "Bearer") return null;
        if (token.length !== 2) return null;
        return token[1];
      },
    }),
  ],
});

// ctx.headers?.get("AUTHORIZATION")
// ctx.headers?.get('Authorization')
// ctx.headers?.get('authorization')
