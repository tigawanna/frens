import "dotenv/config";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import * as middlewares from "./middlewares.ts";
import cookieParser from "cookie-parser";
import { allowedOrigins, corsHeaders } from "./middleware/cors-stuff.ts";
import requestIp from "request-ip";
import { pothosSchema } from "./graphql/schema/root.schema.ts";
import { createSchema, createYoga } from 'graphql-yoga'


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


// app.use((req, res, next) => {
//   console.log("Request origin:", req.headers.origin);
//   next();
// })
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



const yoga = createYoga({
  schema:pothosSchema,
  // context: (req) => {
  //   const context: ApolloContext = {
  //     // authScope: req.requestIp,
  //   };
  //   return context;
  // },
  graphiql: true,
  logging: true,
  // maskedErrors: false,
  cors: true,
})
 
// Bind GraphQL Yoga to the graphql endpoint to avoid rendering the playground on any path
app.use(yoga.graphqlEndpoint, yoga)


app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 5000;



app.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
  console.log(`🚀 Server ready at http://localhost:${port}/`);
  // console.log('Running a GraphQL API server at http://localhost:4000/graphql')
})
