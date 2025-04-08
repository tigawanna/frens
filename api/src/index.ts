import "dotenv/config";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import * as middlewares from "./middlewares.ts";
import cookieParser from "cookie-parser";
import { allowedOrigins, corsHeaders } from "./middleware/cors-stuff.ts";
import requestIp from "request-ip";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import { resolvers, typeDefs, type ApolloContext } from "./graphql/index.ts";
import { nexusSchema } from "./graphql/schema/root.nexus.schema.ts";

declare global {
  namespace Express {
    interface Request {
      // user: UserJWTPayload;
    }
  }
}

const app = express();

app.use(morgan("dev"));
app.use(requestIp.mw());
app.use(cookieParser());

// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       directives: {
//         defaultSrc: ["'self'"],
//         scriptSrc: ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net"],
//         styleSrc: ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net"],
//         imgSrc: ["'self'", "data:", "cdn.jsdelivr.net"],
//         connectSrc: ["'self'", "cdn.jsdelivr.net"],
//       },
//     },
//   }),
// );

app.use(corsHeaders);

app.use(
  cors({
    origin: (origin, callback) => {
      if(!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    optionsSuccessStatus: 200,
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "welcome to frens api" });
});
app.get("/api", (req, res) => {
  res.json({ message: "welcome to frens api" });
});

// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.

const httpServer = http.createServer(app);

// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const server = new ApolloServer<ApolloContext>({
  // typeDefs,
  // resolvers,
  schema:nexusSchema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  introspection: true,
});
// Ensure we wait for our server to start
await server.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
  "/graphql",
  cors<cors.CorsRequest>(),
  // express.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  // @ts-expect-error
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  }),
);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 5000;
await new Promise<void>((resolve) => httpServer.listen({ port }, resolve))
  .then(() => {
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
    console.log(`🚀 Server ready at http://localhost:${port}/`);
  })
  .catch((err) => {
    console.error("Error starting server:", err);
    process.exit(1);
  });

// console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
// console.log(`🚀 Server ready at http://localhost:${port}/`);
