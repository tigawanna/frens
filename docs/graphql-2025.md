# I used GraphQL again (in 2025)

This time we had to build our own server asper the requirements for it to have 
- nodejs 
- express
- graphql
- prisma
- postgresql
- typescript

The challenge was to find ools that work nice with each other. and offer nice end to end typesafety guarantees.

Preferably i'd like the types to be derived from the database schema.so i looked around and aftre sifting through a few options i was left with 2 viable options

- ~~nexus~~ (doesn't support latest versions of prisma)
- typegraphql
- pothos 

I've already tried `typegraphql` in the past and it workd pretty nice with `typeorm` but the prisma schema is a tottaly different model that i wasn't sure how it would lend itself to the class heavy approach of `typegraphql`.

Pothos on the other hand has a prisma generator that looks like it would work well with the prisma schema. So i decided to give it a try.

upon digging further into the docs i found that it also has nice relay support which was very nice in my case because i was on the edge about using relay or apollo on the client side. I ended up going with relay because it has a nicer typesafe way of handling pagination and filtering.


## The setup

After scaffolding the project with express and typescript [fullstup](https://github.com/tigawanna/frens) here.

The project itself was supposed to be simple social network . 
in order to zoom in on just the graphql specifics we'll ignore the setup specifics

to see the cool benefits poths + relay grats us let's focs on the posts model 


```prisma
generator client {
  provider = "prisma-client-js"
  output   = "./generated/client"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator pothos {
  provider = "prisma-pothos-types"
}

model User {
  id            String    @id
  name          String
  email         String
  emailVerified Boolean
  image         String?
  createdAt     DateTime
  updatedAt     DateTime
  sessions      Session[]
  accounts      Account[]

  // Social aspects
  posts      Post[]
  likes      Like[]
  comments   Comment[]
  // Follow relationships
  followers  Follow[]  @relation("following")
  following  Follow[]  @relation("follower")
  role       String?
  banned     Boolean?
  banReason  String?
  banExpires DateTime?

  apikeys Apikey[]

  @@unique([email])
  @@map("user")
}

model Post {
  id        String    @id @default(ulid())
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  content   String
  imageUrl  String?
  // Relations
  author    User      @relation(fields: [authorId], references: [id], onDelete: Cascade)
  authorId  String
  likes     Like[]
  comments  Comment[]
}

model Like {
  id        String   @id @default(ulid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  // Relations
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId    String
  post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
  postId    String

  // Ensure a user can only like a post once
  @@unique([userId, postId])
}

```

### pothos setup

```ts
export type PothosBuilderGenericTYpe = {
  PrismaTypes: PrismaTypes;
  Context: {
    currentUser?: Pick<User, "id" | "email" | "name">;
  };
};

export const builder = new SchemaBuilder<PothosBuilderGenericTYpe>({
  plugins: [PrismaPlugin, RelayPlugin],
  relay: {},
  prisma: {
    client: prisma,
    exposeDescriptions: true,
    // defaults to false, uses /// comments from prisma schema as descriptions
    // for object types, relations and exposed fields.
    // descriptions can be omitted by setting description to false
    // exposeDescriptions: boolean | { models: boolean, fields: boolean },
    // use where clause from prismaRelatedConnection for totalCount (defaults to true)
    filterConnectionTotalCount: true,
    // warn when not using a query parameter correctly
    onUnusedQuery: process.env.NODE_ENV === "production" ? null : "warn",
  },
});
```

and pass into our graphql server 

```ts
//graphql/builder.ts
import { lexicographicSortSchema, printSchema } from "graphql";
export const pothosSchema = builder.toSchema();

// export const schemaAsString = printType(lexicographicSortSchema(pothosSchema))
export const pothosSchemaString = printSchema(
  lexicographicSortSchema(pothosSchema),
);


//index.ts

const yoga = createYoga<{
  req: express.Request;
  res: express.Response;
}>({
  // use the apollo sandbox instead of the default graphql yoga playground
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

// other express stuff...

app.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
  console.log(`🚀 Server ready at http://localhost:${port}/`);
  // console.log('Running a GraphQL API server at http://localhost:4000/graphql')
});

```


using the pothos builder we can define our root query that's requreid in graphql

```ts
// root query type
builder.queryType({
  fields: (t) => ({
    hello: t.string({
      resolve: () => "Hello world!",
    })
  }),
});
```
