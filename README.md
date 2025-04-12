# 🤝 Frens: A Social Media Application

A modern social media platform where users can register, log in, post updates, like posts, and follow/unfollow other users. Built with a focus on clean architecture, type safety, and developer experience.

## 🛠️ Tech Stack

### Frontend

#### Core Technologies
- 🔄 React (Vite): For building our dynamic user interfaces
- 📘 TypeScript: Ensuring type safety across the entire application
- 🎨 Tailwind CSS: Utility-first styling with DaisyUI extensions

#### UI/UX Libraries
- 🎯 DaisyUI: Provides CSS variables and enhanced utilities like `btn btn-primary` and `bg-primary/base/error`. Handles theming through data attributes
- 🧩 Shadcn: Used for complex components due to its modular design and strong accessibility defaults
- View transitions(Chrome and safari only) : That offer nice animations and transitions between different states of the application


#### State Management & Routing
- 🛣️ TanStack Router: For strongly typed routes and search params
    Why tanstack router over react router
    - Type Safety: TanStack Router provides type-safe route params and search params, ensuring that you catch errors at compile time rather than runtime.
    - Nested Routes: It supports nested routes, allowing for better organization of your application and more granular control over route matching.
    - Data Fetching: It has built-in support for data fetching, making it easier to manage server-side data in your components.
    - Most ergonomic File based routing: It allows you to define routes using a file-based structure, which allows for more confiuration that your average file router.
    - 
```tsx
//  just by creatinga afile under src/routes/admin , we getsome initila boilerplate code an dit gets auto configerd in our main routes
import { createFileRoute, redirect } from "@tanstack/react-router";
import { ListAllUsers } from "./-components/ListAllUsers";
import { BulkusresCreate } from "./-components/BulkusresCreate";


export const Route = createFileRoute("/admin/")({
  component: RouteComponent,
//   example of a before loader "middleware" that runs before the route is loaded
  beforeLoad(ctx) {
    // router context passed i from the top to track global variables
    if (ctx.context.viewer?.role !== "admin") {
      throw redirect({
        to: "/profile",
      });
    }
  },
//    it also supposrt loaders and many more options
});

function RouteComponent() {
        // Type-safe access to route params
    const { username } = Route.useParams()
    // or
    const { username } = useParams({
        from: "/admin",
    })
    // this would error because the route is not defined
    //  same applies to search params
    const { username } = useParams({
        from: "/admi",
    })
    // Type-safe search params
    const { tab } = Route.useSearch()

  return (
    <div className="min-h-screen flex flex-col items-center gap-3">
      <BulkusresCreate/>
      <ListAllUsers />
    </div>
  );
}

```


- 🔄 TanStack Query: Managing non-GraphQL state with automatic refetching, caching, and invalidation
   
   Why TanStack Query over Redux 
    - Simplicity: TanStack Query is simpler to set up and use compared to Redux, which requires more boilerplate code and configuration.
    - Better devtools: TanStack Query has a powerful embedded devtools for debugging and monitoring API requests.
    - Automatic caching and invalidation: TanStack Query automatically caches and invalidates data based on query keys.
    - Optimistic updates: Built-in support for optimistic updates, improving user experience during data mutations.
    - Smart data refetching: Marks data as stale and triggers refetches on:
        - Browser window refocus
        - Network reconnection
        - Configurable time intervals
        - Custom invalidation rules

```ts
// filepath: /home/dennis/Desktop/frens/client/src/hooks/use-auth-state.ts
import { useQuery } from '@tanstack/react-query'

export function useAuthState() {
    return useQuery({
        queryKey: ['authState'],
        queryFn: async () => {
            const response = await fetch('/api/me')
            if (!response.ok) return null
            return response.json()
        },
        staleTime: 1000 * 60 * 60 * 24, // 1 day
    })
}
```

- 🔄 Relay GraphQL Client: Type-safe data fetching

```ts
// filepath: /home/dennis/Desktop/frens/client/src/components/post-card.tsx
import { useFragment } from 'react-relay'
import { graphql } from 'relay-runtime'

export function PostCard({ post }: { post: PostCard_post$key }) {
    const data = useFragment(
        graphql`
            fragment PostCard_post on Post {
                id
                content
                createdAt
                author {
                    username
                    avatarUrl
                }
                likeCount
                isLikedByViewer
            }
        `,
        post
    )
    
    return (
        // Component implementation using data
    )
}
```
Why realy over apollo
    
    - Pagination: Relay's pagination system is more sophisticated than Apollo's:
        - Uses cursor-based pagination with Connections and Edges
        - Provides built-in hooks for infinite scrolling and load-more patterns
        - Handles complex pagination scenarios like:
            - Bi-directional pagination (forward/backward)
            - Prepending/appending items
            - Refetching subsets of data
            - Automatic connection management
        - Maintains consistency across paginated lists with optimistic updates
        - Supports declarative "load more" patterns with useLoadMore hook
        - Handles edge cases like:
            - Items appearing in multiple connections
            - Items being deleted while paginating
            - Race conditions in parallel pagination requests


```graphql
export const MainFeedFragment = graphql`
  fragment MainFeed_feedPosts on Query
  @argumentDefinitions(first: { type: "Int", defaultValue: 24 }, after: { type: "String" })
  @refetchable(queryName: "MainFeedPaginationQuery") {
    feedPosts(first: $first, after: $after) @connection(key: "MainFeed_feedPosts", filters: []) {
      edges {
        cursor
        node {
          id
          ...FeedCard_post
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;
```
 
```tsx
import { MainFeed_feedPosts$key } from './__generated__/MainFeed_feedPosts.graphql';
import { MainFeedPaginationQuery } from "./__generated__/MainFeedPaginationQuery.graphql";
const fragData = usePaginationFragment<MainFeedPaginationQuery, MainFeed_feedPosts$key>(MainFeedFragment, queryRef);
```

With this simeple code we automatically get pagination and refetching for free

> [!NOTE]
> This assumes your apis are relay compliant and has connections on edges of nodes
    
### Backend

#### Core Technologies
- 🚀 Node.js & Express: Server-side logic and request handling
- 🎯 GraphQL Yoga: Integrated as an Express middleware for GraphQL functionality
- 🗄️ Prisma ORM: Database interaction with PostgreSQL
- 🐘 PostgreSQL: Main database for storing application data
- 🔨 Pothos GraphQL: Code-first GraphQL schema builder with Prisma plugin integration


#### Authentication
- 🔐 Authentication (Better Auth):
  
  While implementing authentication within our GraphQL API was considered, i chose Better Auth for several critical reasons:
  - Security risks of custom authentication implementations
- Heavy maintenance overhead for password encryption, token handling, session management
- Complex flows for password resets and account recovery
- Integration challenges with multiple OAuth providers
- Robust API key rotation and management
- Edge cases in multi-device session handling
- Advanced security features like MFA and device tracking
- Real-time session invalidation across devices
- Rate limiting and brute force protection
  - Complexity of maintaining security best practices
  
  Better Auth provides:
  - Built-in email/password authentication
  - OAuth integration (GitHub enabled)
  - Secure API key management
  - Production-ready rate limiting
  - Session management with cookie caching
  - Extensive documentation and active maintenance
  - Battle-tested security features


#### GraphQL Schema
- 🏗️ Pothos: Code-first GraphQL schema builder with Prisma plugin integration
- Most of the types oare on the root alongside the `Query` and `Mutation` types
Theres 2 iser variants 

>[!NOTE]
> Pothos variavts are a way to extend bease types in this case our prisma models and enhance them with more fields and methods , like is `followingMe` or am i `followingThem` or `followersCount` which are nice to ahve ona timeline filed but have to be derived at query time

```gql
type Follower implements Node {
  amFollowing: Boolean
  createdAt: String
  email: String!
  followerCount: Int
  followingCount: Int
  frenId: String!
  id: ID!
  image: String
  isFollowingMe: Boolean
  isMe: Boolean
  name: String!
  role: String
}

type Fren implements Node {
  amFollowing: Boolean
  createdAt: String
  email: String!
  followerCount: Int
  followers(after: String, before: String, first: Int, last: Int, sort: SortInput): FrenFollowersConnection
  following(after: String, before: String, first: Int, last: Int, sort: SortInput): FrenFollowingConnection
  followingCount: Int
  frenId: String!
  id: ID!
  image: String
  isFollowingMe: Boolean
  isMe: Boolean
  name: String!
  posts(after: String, before: String, first: Int, last: Int, sort: SortInput): FrenPostsConnection
  postsCount: Int
  role: String
}
```

Why? Because user varaint `Follow` will be te return type of the `following` and `followers` fields on the `Fren` type. 
Ideally i would love all the User types to be of variant ` Fren` but self referencing types don' work well with typescript and might lead to infinite depth queries

The `prisma pothos` plugin also allows us to create relay compliant APIs with ease

just by defining our model like this
```ts
export const Fren = builder.prismaNode("User", {
  variant: "Fren",
  id: { field: "id" },
  fields: (t) => ({
    frenId: t.exposeString("id", { nullable: false }),
    ...
```
We get 

```gql

type Fren implements Node {
  amFollowing: Boolean
  createdAt: String
  email: String!
  followerCount: Int
  ....
  }

type QueryFeedPostsConnection {
  edges: [QueryFeedPostsConnectionEdge]
  pageInfo: PageInfo!
}

type QueryFeedPostsConnectionEdge {
  cursor: String!
  node: FeedPost
}

type QueryFrensConnection {
  edges: [QueryFrensConnectionEdge]
  pageInfo: PageInfo!
}

type QueryFrensConnectionEdge {
  cursor: String!
  node: Fren
}
```

Our pothos instance als inherits context from it's gql server and offers a way to exend it with mutiple plugins like our prisma one 

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

```
we then exort this a schema and a string one fed to our graphql yoga server and the oter is eposed as a string to the clent for relay client uses

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

// .. builder.quetie and builder.mutatios somewhere here
// .. builder.quetie and builder.mutatios somewhere here


export const pothosSchema = builder.toSchema();

// export const schemaAsString = printType(lexicographicSortSchema(pothosSchema))
export const pothosSchemaString = printSchema(
  lexicographicSortSchema(pothosSchema),




  // .... in index.ts

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

app.use(yoga.graphqlEndpoint, yoga);

```

Why graphql yoga over apollo server
- Simplicity: GraphQL Yoga is simpler to set up and use compared to Apollo Server, which requires more configuration and boilerplate code.
- - cleaner intergration with express middlewware
- While pothos works with apollo server it plays nicer with graphql yoga

>[!NOTE]
> Picking an appropriate apprach for graphql api development took me the most time , i ahd to explore and dismisss old assumptions and at a point i even considered just writing my SDLs by hand but i eventually picked this approach and after getting the hang of it i can say it was the best decision i made for this project. I also considered using trpc but i wanted to try something new and i also wanted to have a relay compliant api to make use of the relay client features like optimistic updates and automatic refetching

as forthe rest of the express app 
we have 

## out=r auth stuff

```ts
  app.all("/api/auth/*", toNodeHandler(auth));

  //with thtadeclared we can not get the sessionlike so -->

app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  res.json(session);
});

// our sessions are cookie based but sould one want to call our grapql api outside the browser (apollo client or postman) they have to provide an api key for the restricted actions

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
  plugins: [openAPI(), admin(), 
    apiKey({
         // configuring better auth to look for Bearer tokens in the Authorization header
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

```
```ts
// ctx.headers?.get("AUTHORIZATION")
// ctx.headers?.get('Authorization')
// ctx.headers?.get('authorization')
```
>[!NOTE]
> fun fact i learned on this project , these three resolve to the same value

To get your access token on out fronend got to /profile/account and under the settings tab hit create

#### Shorcuts
- No tests
- Some cache invalidation might nor=t work correctly on the frontend
- No replies features
- No email verification


