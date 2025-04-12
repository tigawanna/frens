import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import * as middlewares from "./middlewares";
import cookieParser from "cookie-parser";
import { allowedOrigins, corsHeaders } from "./middleware/cors-stuff";
import requestIp from "request-ip";
import { pothosSchema, pothosSchemaString } from "./graphql/schema/root.type";
import { createYoga } from "graphql-yoga";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "../auth";


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


app.use(corsHeaders);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    // origin:"*",
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

//  always put this before calling express.json
app.all("/api/auth/*", toNodeHandler(auth));

app.use(express.json());

app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  res.json(session);
});

app.get("/", (req, res) => {
  res.json({ message: "welcome to frens api" });
});
app.get("/sdl", (req, res) => {
  res.send(
    pothosSchemaString
  )
});

const port = process.env.PORT || 5000;
// app.use("/graphql",(req, res, next) => {
//  console.log(" Graphql Schema", schemaAsString);
// })
const yoga = createYoga<{
  req: express.Request;
  res: express.Response;
}>({
  // use the apollo sandbox
      renderGraphiQL: () => {
      return `
        <!DOCTYPE html>
        <html lang="en">
          <body style="margin: 0; overflow-x: hidden; overflow-y: hidden">
          <div id="sandbox" style="height:100vh; width:100vw;"></div>
          <script src="https://embeddable-sandbox.cdn.apollographql.com/_latest/embeddable-sandbox.umd.production.min.js"></script>
          <script>
          new window.EmbeddedSandbox({
            target: "#sandbox",
            // Pass through your server href if you are embedding on an endpoint.
            // Otherwise, you can pass whatever endpoint you want Sandbox to start up with here.
            initialEndpoint: "http://localhost:${port}/graphql",
          });
          // advanced options: https://www.apollographql.com/docs/studio/explorer/sandbox#embedding-sandbox
          </script>
          </body>
        </html>`
    },
  schema: pothosSchema,

  context: async (ctx) => {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(ctx.req.headers),
    });
    if(!session){
      return {
        currentUser: null,
      };
    }
    return {
      currentUser:{
      id: session?.user.id,
      email: session?.user.email,
      name: session?.user.name,
    }
    }
  },
  graphiql: true,
  logging: true,
  // maskedErrors: false,
  cors: true,
});

// Bind GraphQL Yoga to the graphql endpoint to avoid rendering the playground on any path
// @ts-expect-error
app.use(yoga.graphqlEndpoint, yoga);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);



export default app;
