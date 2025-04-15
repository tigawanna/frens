
# Revisiting GraphQL in 2025: A Type-Safe Stack with Pothos and Relay

*This article explores building a GraphQL server in 2025 using a modern, type-safe stack. We'll cover the tooling choices, backend setup with Pothos and Prisma, and frontend integration using Relay, highlighting the benefits for developer experience and application robustness.*

## Section 1: Setting the Stage - Choosing the Right Tools for Type Safety

*This section outlines the project requirements, the specific technology stack chosen, and the critical decision-making process for selecting libraries that ensure end-to-end type safety, ultimately leading to Pothos and Relay.*

When tasked with building a new GraphQL server in 2025, the core requirements mandated the use of:

* Node.js
* Express
* GraphQL
* Prisma
* PostgreSQL
* TypeScript

The primary challenge was identifying tools that integrate seamlessly and provide strong end-to-end type safety guarantees. In an ideal scenario, the GraphQL types would be directly derived from the database schema managed by Prisma, minimizing type drift and manual synchronization efforts.

After evaluating several options, the choice narrowed down to two main contenders for building the GraphQL schema layer on top of Prisma:

1.  **Nexus:** While a popular choice in the past, it appeared to lack support for the latest versions of Prisma at the time of evaluation, making it less suitable.
2.  **TypeGraphQL:** Having used `TypeGraphQL` previously with `TypeORM`, I knew it worked well in that ecosystem. However, Prisma's schema-first approach differs significantly from TypeORM's entity-based model. I was uncertain how well Prisma's schema definition would align with the decorator-heavy, class-based approach central to `TypeGraphQL`.
3.  **Pothos:** This library stood out due to its dedicated Prisma plugin (`prisma-pothos-types`), specifically designed to generate GraphQL types directly from the Prisma schema. This seemed like a natural fit for the project's goals.

Further investigation into Pothos revealed excellent support for Relay, including helpers for connections and node interfaces. This was a significant advantage, as the decision between using Relay or Apollo on the client-side was still pending. The strong type-safety features Relay offers, particularly for handling pagination and filtering, ultimately tipped the scales in its favor. Consequently, Pothos became the clear choice for the schema builder.

## Section 2: Backend Implementation - Pothos, Prisma, and Express Integration

*Here, we delve into the practical backend setup. This includes defining the database models with Prisma, configuring the Pothos schema builder, integrating it into an Express application using GraphQL Yoga, and creating GraphQL types, including derived fields.*

The project itself was envisioned as a simple social network. For brevity and focus, we'll concentrate on the GraphQL-specific aspects, particularly around the `Post` model, omitting the general Express and TypeScript boilerplate. (The complete setup can be found [here](https://github.com/tigawanna/frens)).

Let's examine the core Prisma schema, focusing on the `User` and `Post` models:

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "./generated/client"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Pothos generator to create types from Prisma models
generator pothos {
  provider = "prisma-pothos-types"
}

model User {
  id            String    @id
  name          String
  email         String    @unique
  emailVerified Boolean
  image         String?
  createdAt     DateTime  @default(now()) // Corrected: Added default
  updatedAt     DateTime  @updatedAt
  sessions      Session[]
  accounts      Account[]

  // Social aspects
  posts         Post[]
  likes         Like[]
  comments      Comment[]
  // Follow relationships
  followers     Follow[]  @relation("following")
  following     Follow[]  @relation("follower")
  role          String?
  banned        Boolean?
  banReason     String?
  banExpires    DateTime?

  apikeys       Apikey[]

  @@map("user")
}

model Post {
  id        String   @id @default(ulid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  content   String
  imageUrl  String?
  // Relations
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
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

Next, we configure the Pothos schema builder, specifying the Prisma client and enabling plugins like Relay support:

```typescript
// Define the generic types for the Pothos builder, including Prisma types and Context
export type PothosBuilderGenericType = { // Corrected Typo: PothosBuilderGenericTYpe -> PothosBuilderGenericType
  PrismaTypes: PrismaTypes;
  Context: {
    currentUser?: Pick<User, "id" | "email" | "name">; // Context includes optional current user
  };
};

// Instantiate the builder with necessary plugins and configurations
export const builder = new SchemaBuilder<PothosBuilderGenericType>({ // Corrected Typo: PothosBuilderGenericTYpe -> PothosBuilderGenericType
  plugins: [PrismaPlugin, RelayPlugin], // Enable Prisma and Relay plugins
  relay: {}, // Basic Relay configuration
  prisma: {
    client: prisma, // Provide the Prisma client instance
    // Expose Prisma schema /// comments as GraphQL descriptions
    exposeDescriptions: true,
    // Use Prisma's filtering capabilities for Relay connection total counts
    filterConnectionTotalCount: true,
    // Warn about unused query parameters during development
    onUnusedQuery: process.env.NODE_ENV === "production" ? null : "warn",
  },
});
```

This builder is then used to generate the executable GraphQL schema, which is passed to the GraphQL Yoga server integrated with Express:

```typescript
// graphql/builder.ts
import { lexicographicSortSchema, printSchema } from "graphql";
// Generate the schema object from the Pothos builder
export const pothosSchema = builder.toSchema();

// Export the schema definition as a string (SDL)
export const pothosSchemaString = printSchema(lexicographicSortSchema(pothosSchema));


// index.ts - Server setup
import express from 'express'; // Added import for clarity
import { createYoga } from 'graphql-yoga'; // Added import for clarity
import { fromNodeHeaders } from '@whatwg-node/server'; // Added import for clarity
import { auth } from './auth'; // Assuming auth setup exists
import { prisma } from './prismaClient'; // Assuming prisma client export exists
import { PothosBuilderGenericType, builder, pothosSchema, pothosSchemaString } from './graphql/builder'; // Assuming builder exports exist
// import { PrismaClient, User } from '@prisma/client'; // Assuming Prisma types import

const app = express(); // Added instantiation
const port = process.env.PORT || 4000; // Added port definition

// Configure GraphQL Yoga server
const yoga = createYoga<{
  req: express.Request;
  res: express.Response;
}>({
  // Use Apollo Sandbox for the GraphiQL interface
  renderGraphiQL: () => {
    // HTML to embed Apollo Sandbox
    return `
        <!DOCTYPE html>
        <html lang="en">
          <body style="margin: 0; overflow-x: hidden; overflow-y: hidden">
          <div id="sandbox" style="height:100vh; width:100vw;"></div>
          <script src="https://embeddable-sandbox.cdn.apollographql.com/_latest/embeddable-sandbox.umd.production.min.js"></script>
          <script>
          new window.EmbeddedSandbox({
            target: "#sandbox",
            initialEndpoint: "http://localhost:${port}/graphql", // Dynamic port
          });
          </script>
          </body>
        </html>`;
  },
  schema: pothosSchema, // Pass the generated Pothos schema
  // Define the context function to inject data (like authenticated user) into resolvers
  context: async (ctx): Promise<PothosBuilderGenericType['Context']> => { // Typed context return
    try {
      const session = await auth.api.getSession({ // Assuming auth setup provides getSession
        headers: fromNodeHeaders(ctx.req.headers),
      });
      if (!session?.user) { // Check specifically for user object in session
        return {
          currentUser: undefined, // Explicitly undefined if no user
        };
      }
      // Provide relevant user details to the context
      return {
        currentUser: {
          id: session.user.id,
          email: session.user.email ?? undefined, // Handle potentially null email
          name: session.user.name ?? undefined,   // Handle potentially null name
        },
      };
    } catch (error) {
      console.error("Error resolving context:", error); // Add error logging
      return { currentUser: undefined };
    }
  },
  graphiql: true, // Enable GraphiQL interface
  logging: true, // Enable logging
  cors: true, // Enable CORS
});

// Bind GraphQL Yoga to the /graphql endpoint
// @ts-expect-error - Yoga types might mismatch slightly with Express middleware types
app.use(yoga.graphqlEndpoint, yoga);

// Define a simple root query required by GraphQL
builder.queryType({
  fields: (t) => ({
    hello: t.string({
      resolve: () => "Hello world!",
    }),
    // Other root queries will be added here...
  }),
});

// Placeholder for other express routes/middleware
// app.get('/', (req, res) => res.send('Server is running!'));

app.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
  console.log(`🚀 GraphQL Playground available at http://localhost:${port}/graphql`); // Adjusted log message
});
```

With the basic server running, we can define GraphQL types based on our Prisma models. Pothos makes this straightforward. We could create a direct 1-to-1 mapping:

```typescript
// Example of a simple Post type mapping (Not the final version used)
/*
export const SimplePostType = builder.prismaNode("Post", {
  id: { field: "id" },
  fields: (t) => ({
    postId: t.exposeString("id", { nullable: false }), // Expose Prisma 'id' as 'postId'
    content: t.exposeString("content"),
    imageUrl: t.exposeString("imageUrl"),
    createdAt: t.exposeString("createdAt", { // Directly expose createdAt as string
      type: "String", // Define the GraphQL type
    }),
    updatedAt: t.exposeString("updatedAt", { // Directly expose updatedAt as string
      type: "String",
    }),
    // Example resolver for the author relation
    postedBy: t.relation("author", {
       type: UserType // Assuming UserType is defined elsewhere
    })
  }),
});
*/
```

However, for a feed, we often need derived data specific to the viewing user (e.g., "Have I liked this post?"). Pothos allows defining *variants* of Prisma types or adding custom fields easily. Here's the `FeedPost` type incorporating `likeCount` and `likedByMe`:

```typescript
// Define the Fren (User) type first if not already defined
// Assuming a basic User type 'Fren' exists or is defined similarly
export const Fren = builder.prismaNode("User", { // Example Fren type definition
  id: { field: "id" },
  fields: (t) => ({
    frenId: t.exposeString("id"), // Expose 'id' as 'frenId'
    name: t.exposeString("name"),
    email: t.exposeString("email"),
    image: t.exposeString("image"),
    // Add other user fields as needed
  }),
});


// Define the enhanced FeedPost type using prismaNode and custom fields
export const FeedPost = builder.prismaNode("Post", {
  // Using a variant allows multiple GraphQL types based on the same Prisma model if needed
  // variant: "FeedPost", // Optional: Define a variant name
  id: { field: "id" }, // Map the 'id' field for Relay Node interface
  fields: (t) => ({
    postId: t.exposeString("id", { nullable: false }), // Expose DB 'id' as 'postId'
    content: t.exposeString("content"),
    imageUrl: t.exposeString("imageUrl", { nullable: true }), // Explicitly nullable
    // Custom resolver for ISO string date format
    createdAt: t.field({
      type: "String",
      resolve: (post) => post.createdAt.toISOString(),
    }),
    // Custom resolver for ISO string date format
    updatedAt: t.field({
      type: "String",
      resolve: (post) => post.updatedAt.toISOString(), // Corrected: use updatedAt
    }),
    // Field resolving the User who posted this
    postedBy: t.field({
      type: Fren, // Reference the 'Fren' (User) type
      nullable: false, // Author should always exist
      resolve: async (parent, args, context) => {
        // Fetch the author using the authorId from the parent Post
        const author = await prisma.user.findUnique({
          where: { id: parent.authorId },
        });
        if (!author) {
          // Handle case where author is somehow not found, though schema constraints should prevent this
          throw new Error(`Author not found for post ${parent.id}`);
        }
        return author;
      },
    }),
    // Custom field to calculate the number of likes
    likeCount: t.field({
      type: "Int",
      resolve: async (parent) => {
        // Count likes associated with the parent Post's id
        return prisma.like.count({
          where: { postId: parent.id },
        });
      },
    }),
    // Custom field to check if the current user liked this post
    likedByMe: t.field({
      type: "Boolean",
      resolve: async (parent, args, context) => {
        // If no user is logged in, they haven't liked it
        if (!context.currentUser?.id) return false;
        // Check if a Like record exists for this user and post
        const like = await prisma.like.findUnique({ // Use findUnique for efficiency
          where: {
            userId_postId: { // Use the @@unique constraint defined in Prisma
              userId: context.currentUser.id,
              postId: parent.id,
            }
          },
        });
        // Return true if a like exists, false otherwise
        return !!like;
      },
    }),
  }),
});
```

Finally, we add a query to fetch posts, utilizing Pothos's Relay connection helper (`prismaConnection`) for automatic pagination setup:

```typescript
// Extend the root query type with a field to fetch feed posts
builder.queryType({
  fields: (t) => ({
    // ... existing fields like 'hello'
    hello: t.string({ // Keeping the hello query from before
      resolve: () => "Hello world!",
    }),
    // Define the feedPosts query using Relay connections
    feedPosts: t.prismaConnection({
      type: FeedPost, // The type of nodes in the connection
      cursor: "id", // Field used for cursor-based pagination
      resolve: (query, parent, args, context, info) => {
        // Resolve by fetching posts from Prisma, applying connection arguments (like 'first', 'after')
        return prisma.post.findMany({
          ...query, // Spreads Relay arguments (first, after, etc.) into Prisma query
          orderBy: {
            createdAt: "desc", // Order posts by creation date, newest first
          },
        });
      },
    }),
  }),
});
```

## Section 3: Frontend Integration - Consuming the API with Relay Fragments

*This section transitions to the frontend, demonstrating how to leverage Relay's fragment-driven architecture. We'll cover fetching the schema, defining GraphQL fragments co-located with React components, and using Relay hooks to fetch and display data.*

Pothos's built-in support for Relay connections is crucial here. The `t.prismaConnection` helper automatically generates the necessary GraphQL types for Relay pagination (like `QueryFeedPostsConnection` and `QueryFeedPostsConnectionEdge`), saving significant boilerplate.

```graphql
# Auto-generated GraphQL types by Pothos prismaConnection
type QueryFeedPostsConnection {
  edges: [QueryFeedPostsConnectionEdge] # List of edges (cursor + node)
  pageInfo: PageInfo!                  # Information about the current page
}

type QueryFeedPostsConnectionEdge {
  cursor: String!                       # Opaque cursor for pagination
  node: FeedPost                        # The actual Post data
}

# Standard Relay PageInfo type
type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}
```

Why is this structure important? Relay relies heavily on this standardized connection model for efficient pagination and data fetching.

To integrate with the frontend (assuming a React setup with Relay configured), a common first step is to fetch the latest GraphQL Schema Definition Language (SDL) generated by our backend API. This allows the Relay compiler to validate queries and generate types.

```typescript
// Example API endpoint to serve the SDL
// (Add this within your Express setup in index.ts or a separate routes file)
app.get("/sdl", (req, res) => {
  res.type("application/graphql").send(pothosSchemaString); // Set content type
});

// Example script on the frontend (e.g., scripts/fetchSdl.ts)
import "dotenv/config"; // If using environment variables for API URL
import fs from "fs/promises";

export async function getSdl() {
  try {
    const apiUrl = process.env.VITE_API_URL || "http://localhost:4000"; // Default or from env
    console.log(`Workspaceing SDL from ${apiUrl}/sdl...`);
    const res = await fetch(`${apiUrl}/sdl`);
    if (!res.ok) {
      throw new Error(`Failed to fetch SDL: ${res.status} ${res.statusText}`);
    }
    const sdl = await res.text();
    await fs.writeFile("./schema.graphql", sdl); // Save to root or specified path
    console.log("✅ SDL fetched and saved to schema.graphql");
  } catch (error) {
    console.error("❌ Error fetching SDL: ", error); // Improved error logging
  }
}

// Run the script (e.g., via package.json script)
getSdl();
```

Relay encourages a "colocation" principle: data requirements (fragments) are defined alongside the components that use them. This differs from traditional REST approaches where a parent component might fetch all data and pass it down. In Relay, leaf components define their data needs via fragments, which are composed upwards into parent fragments and finally into a single page query.

Here's how fragments might look for our social feed:

```graphql
# src/components/FeedCard.tsx (or similar) - Fragment defining data needed by a single post card
# Naming Convention: ComponentName_propName
export const FeedCardFragment = graphql`
  fragment FeedCard_post on FeedPost {
    id # Global Relay ID
    postId # Our application-specific ID
    content
    imageUrl
    createdAt
    likeCount
    likedByMe
    updatedAt
    postedBy {
      # We can include fragments from other components here too if needed
      # Or specify the fields directly:
      frenId # User's ID (exposed as frenId in our Fren type)
      name
      email
      image
      # Assuming 'amFollowing' fields were added to the 'Fren' type on the backend
      # amFollowing
    }
  }
`;

# src/components/MainFeed.tsx - Fragment defining the list of posts needed by the feed container
export const MainFeedFragment = graphql`
  # Fragment on the Query type, defining arguments for pagination
  fragment MainFeed_feedPosts on Query @argumentDefinitions(
    first: { type: "Int", defaultValue: 10 }, # How many items to fetch
    after: { type: "String" } # Cursor for pagination
  ) {
    # Use the feedPosts connection field defined in our backend query
    feedPosts(first: $first, after: $after) {
      edges {
        node {
          id # Needed for mapping and keys
          ...FeedCard_post # Include the data requirements from the child component
        }
      }
      pageInfo { # Needed for pagination logic
        hasNextPage
        endCursor
      }
    }
  }
`;


# src/pages/FeedPage.tsx (or container component) - The main query for the page
export const MainFeedQuery = graphql`
  # This query includes the MainFeed fragment, passing arguments down
  query MainFeedContainerQuery($first: Int!, $after: String) {
    ...MainFeed_feedPosts @arguments(first: $first, after: $after)
  }
`;

```

> **Note:** The Relay compiler requires these `graphql` tagged literals to be in the same file as the component that uses the corresponding fragment or query. After defining these, run the Relay compiler (`relay-compiler`) to generate TypeScript types and runtime artifacts.

Here's how these fragments and queries are used in React components:

```tsx
// src/pages/FeedPage.tsx - Root component for the feed view
import React from 'react';
import { useLazyLoadQuery } from 'react-relay';
import { MainFeedContainerQuery } from './__generated__/MainFeedContainerQuery.graphql'; // Import generated types
import { MainFeedQuery } from './MainFeed'; // Import the query definition
import { MainFeed } from '../components/MainFeed'; // Import the component using the fragment

export function FeedPage() { // Renamed component for clarity
  // Fetch the initial data for the page using the main query
  const queryData = useLazyLoadQuery<MainFeedContainerQuery>(MainFeedQuery, { first: 10 }); // Fetch initial 10 posts

  return (
    <div className="w-full py-4">
      {/* Pass the query data (specifically the part matching the fragment) to the MainFeed component */}
      <MainFeed queryRef={queryData} />
    </div>
  );
}


// src/components/MainFeed.tsx - Component rendering the list of posts
import React from 'react';
import { useFragment } from 'react-relay';
import { MainFeed_feedPosts$key } from './__generated__/MainFeed_feedPosts.graphql'; // Import fragment type
import { MainFeedFragment } from './MainFeed'; // Import fragment definition (assuming it's here or imported)
import { PostCard } from "./FeedCard"; // Import the child component

interface FeedProps {
  queryRef: MainFeed_feedPosts$key; // Prop type expects the fragment $key
}

export function MainFeed({ queryRef }: FeedProps) { // Renamed component
  // Use the useFragment hook to read data defined by the MainFeedFragment
  const data = useFragment(
    MainFeedFragment,
    queryRef
  );

  // Extract post nodes safely
  const posts = data?.feedPosts?.edges?.map(edge => edge?.node) ?? []; // Use optional chaining and nullish coalescing

  // Render the list of posts, passing each post's data (as a fragment ref) to PostCard
  return (
    <div className="w-full max-w-2xl mx-auto">
      {posts.map((post) => post && (
        // Pass the individual post fragment reference to the PostCard
        <PostCard key={post.id} postRef={post} />
      ))}
      {/* Pagination controls will be added later */}
    </div>
  );
}


// src/components/FeedCard.tsx - Component rendering a single post
import React from 'react';
import { useFragment } from 'react-relay';
import { FeedCard_post$key } from "./__generated__/FeedCard_post.graphql"; // Import fragment type
import { FeedCardFragment } from './FeedCard'; // Import fragment definition (assuming it's here or imported)
// Assuming Card components are imported from a UI library like ShadCN/UI
import { Card, CardContent /* ... other Card parts */ } from '@/components/ui/card';


interface PostCardProps {
  postRef: FeedCard_post$key; // Prop type expects the fragment $key for a single post
  // viewer?: BetterAuthViewer; // Example of passing other props if needed
}

export function PostCard({ postRef }: PostCardProps) { // Removed viewer prop for simplicity
  // Use useFragment to read the data defined by FeedCardFragment
  const postData = useFragment<FeedCard_post$key>(FeedCardFragment, postRef);

  // Early return if postData is somehow null/undefined (though Relay usually prevents this if ref is valid)
  if (!postData) {
    return null;
  }

  // Example: Using derived data or formatting
  // const postIdFirstChars = postData?.id.substring(0, 2).toUpperCase();

  return (
    <Card className="w-full mb-4 border-none bg-base-300">
      <CardContent className="pt-6">
        {/* Display post content, author info, like button, etc. using postData */}
        <p>{postData.content}</p>
        {/* ... other card elements ... */}
        <span>Likes: {postData.likeCount}</span>
        <span>{postData.likedByMe ? 'You liked this' : 'Like'}</span>
      </CardContent>
    </Card>
  )
}
```

## Section 4: Advanced Relay - Effortless Pagination and Mutation Handling

*This final section covers more advanced Relay capabilities facilitated by Pothos and Relay's design. We'll implement infinite scrolling/pagination using `usePaginationFragment` and demonstrate how Relay handles data mutations (updates, creates, deletes) with automatic and manual cache management.*

While the initial setup fetches posts, real-world feeds require pagination (e.g., infinite scroll or "Load More"). Relay excels here, especially when combined with Pothos's connection fields.

First, we modify the `MainFeedFragment` to make it suitable for pagination using the `@refetchable` and `@connection` directives:

```graphql
# src/components/MainFeed.tsx - Updated fragment for pagination
export const MainFeedFragment = graphql`
  fragment MainFeed_feedPosts on Query
  # Define arguments for pagination, Relay needs these defined here
  @argumentDefinitions(
    first: { type: "Int", defaultValue: 10 }, # Default items per page
    after: { type: "String" } # Cursor to fetch items after
  )
  # Make this fragment refetchable, generating a MainFeedPaginationQuery
  @refetchable(queryName: "MainFeedPaginationQuery") {
    # Specify the connection field
    feedPosts(first: $first, after: $after)
    # Identify this specific connection in the Relay store
    @connection(key: "MainFeed_feedPosts", filters: []) {
      edges {
        cursor # Needed for pagination
        node {
          id
          ...FeedCard_post # Include child fragment
        }
      }
      pageInfo {
        endCursor
        hasNextPage # Crucial for knowing if more data is available
        # Optional:
        # hasPreviousPage
        # startCursor
      }
    }
  }
`;
```

Now, the `MainFeed` component can use the `usePaginationFragment` hook provided by Relay:

```tsx
// src/components/MainFeed.tsx - Updated component using usePaginationFragment
import React from 'react';
// Import the specific pagination query type generated by @refetchable
import { MainFeedPaginationQuery } from "./__generated__/MainFeedPaginationQuery.graphql";
import { MainFeed_feedPosts$key } from './__generated__/MainFeed_feedPosts.graphql';
import { usePaginationFragment } from 'react-relay';
import { PostCard } from "./FeedCard";
import { MainFeedFragment } from './MainFeed'; // Import fragment definition
// Assuming Button and Loader components are imported
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface FeedProps {
  queryRef: MainFeed_feedPosts$key;
}

export function MainFeed({ queryRef }: FeedProps) {
  // Use usePaginationFragment hook
  const {
    data,       // The accumulated data for the connection
    loadNext,   // Function to load the next page
    hasNext,    // Boolean indicating if more pages exist
    isLoadingNext // Boolean indicating if the next page is currently loading
  } = usePaginationFragment<MainFeedPaginationQuery, MainFeed_feedPosts$key>(
    MainFeedFragment, // The fragment definition
    queryRef         // The fragment reference passed from the parent
  );

  // Function to trigger loading more posts
  const loadMorePosts = () => {
    // Prevent multiple requests or loading if no more data
    if (isLoadingNext || !hasNext) return;
    loadNext(5); // Load the next 5 items (or adjust count as needed)
  };

  // Extract post nodes from the accumulated data
  const posts = data?.feedPosts?.edges?.map(edge => edge?.node) ?? [];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {posts.map((post) => post && (
        <PostCard key={post.id} postRef={post} />
      ))}

      {/* Display a "Load More" button if there's a next page */}
      {hasNext && (
        <div className="flex justify-center my-4">
          <Button onClick={loadMorePosts} variant="outline" disabled={isLoadingNext}>
            {isLoadingNext ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading more posts...
              </>
            ) : (
              "Load More Posts"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
```

This setup provides smooth pagination with minimal manual effort. If you've wrestled with pagination logic using libraries like Apollo Client, the simplicity here is particularly noteworthy.

Finally, let's look at mutations (creating, updating, deleting data). A great feature of Relay is that if a mutation returns the same fragment that was mutated (identified by the global `id`), Relay often updates the local store automatically.

For example, an edit mutation:

```graphql
# src/components/PostDialogs.tsx (or similar) - Edit Mutation
const editPostMutation = graphql`
  mutation PostDialogsEditMutation($id: ID!, $content: String, $imageUrl: String) { # Use global ID!
    # Assume backend mutation 'updatePost' takes global ID
    updatePost(input: {id: $id, content: $content, imageUrl: $imageUrl}) { # Example input object
      # Return the fragment for the updated post
      updatedPostEdge { # Assuming mutation returns an edge or node
         node {
           ...FeedCard_post # Spreading the fragment triggers automatic update if ID matches
         }
      }
    }
  }
`;
```

However, for *creating* new items or *deleting* existing ones, the cache doesn't automatically know where the new item should go in a list (connection) or that an item should be removed. We need to provide an `updater` function.

**Creating a Post:**

```graphql
# src/components/PostDialogs.tsx - Create Mutation
const createPostMutation = graphql`
  mutation PostDialogsCreateMutation($content: String!, $imageUrl: String) {
    # Assume backend mutation 'createPost' takes content/imageUrl
    createPost(input: { content: $content, imageUrl: $imageUrl }) {
      # Return the fragment for the newly created post, wrapped in an edge
      newPostEdge { # Standard Relay practice to return the new edge
         cursor
         node {
            ...FeedCard_post # Include the fragment data
         }
      }
    }
  }
`;
```

```typescript
// src/components/PostDialogs.tsx - Usage of create mutation
import { useMutation, ConnectionHandler } from 'react-relay';
import { PostDialogsCreateMutation } from './__generated__/PostDialogsCreateMutation.graphql'; // Generated type

// Inside your component...
const [commitCreateMutation, isCreating] = useMutation<PostDialogsCreateMutation>(createPostMutation);
// Assuming 'setError' state hook exists
const setError = (e: Error | null) => { /* ... */ };
// Assuming PostFormData type exists
type PostFormData = { content: string; imageUrl?: string };

const handleCreateSubmit = (data: PostFormData) => {
  setError(null);
  commitCreateMutation({
    variables: {
      content: data.content,
      imageUrl: data.imageUrl || undefined, // Use undefined if optional
    },
    // Updater function to manually insert the new post into the connection
    updater: (store) => {
      // Get the newly created post edge from the mutation response payload
      const payload = store.getRootField("createPost"); // Matches mutation name
      const newEdge = payload?.getLinkedRecord("newPostEdge"); // Matches field in mutation response

      if (!newEdge) {
        console.error("Failed to get new edge from createPost mutation payload");
        return;
      }

      // Get the connection record from the store
      const root = store.getRoot();
      // Use the connection key defined in the @connection directive
      const connection = ConnectionHandler.getConnection(
        root,
        "MainFeed_feedPosts" // Must match the key in MainFeedFragment @connection
      );

      if (!connection) {
         console.error("Failed to find connection MainFeed_feedPosts in store");
        return;
      }

      // Insert the new edge at the beginning of the connection
      ConnectionHandler.insertEdgeBefore(connection, newEdge);
    },
    onError: (error) => {
       setError(error);
       console.error("Create post failed:", error);
    }
  });
};
```

**Deleting a Post:**

```graphql
# src/components/PostDialogs.tsx - Delete Mutation
const deletePostMutation = graphql`
  mutation PostDialogsDeleteMutation($id: ID!) { # Use global ID!
    deletePost(input: { id: $id }) {
      deletedPostId # Return the ID of the deleted post
    }
  }
`;
```

```typescript
// src/components/PostDialogs.tsx - Usage of delete mutation
import { useMutation, ConnectionHandler } from 'react-relay';
import { PostDialogsDeleteMutation } from './__generated__/PostDialogsDeleteMutation.graphql';

// Inside your component, assuming 'post' object with 'id' (global Relay ID) exists
// const post: { id: string, postId: string /* ... other fields */ };
const [commitDeleteMutation, isDeleting] =
  useMutation<PostDialogsDeleteMutation>(deletePostMutation);
const setError = (e: Error | null) => { /* ... */ };

const handleDeletePost = () => {
  setError(null);

  commitDeleteMutation({
    variables: {
      id: post.id, // Pass the global Relay ID
    },
    // Updater function to remove the node from the connection
    updater: (store) => {
      // Get the ID of the deleted post from the payload
      const payload = store.getRootField("deletePost");
      const deletedId = payload?.getValue("deletedPostId"); // Matches field in mutation

      if (typeof deletedId !== 'string') {
         console.error("Could not get deletedPostId from payload");
         return;
      }

      // Get the connection
      const root = store.getRoot();
      const connection = ConnectionHandler.getConnection(root, "MainFeed_feedPosts");

      if (!connection) {
         console.error("Failed to find connection MainFeed_feedPosts in store");
        return;
      }

      // Remove the node using its ID
      ConnectionHandler.deleteNode(connection, deletedId);
    },
    // Optimistic updater removes the item from the UI immediately
    optimisticUpdater: (store) => {
        const root = store.getRoot();
        const connection = ConnectionHandler.getConnection(root, "MainFeed_feedPosts");
        if (connection) {
          // Remove the node optimistically using its known ID
          ConnectionHandler.deleteNode(connection, post.id);
        }
    },
    onError: (error) => {
       setError(error);
       console.error("Delete post failed:", error);
    }
  });
};
```

By combining Pothos on the backend for easy schema generation and Relay integration with Relay on the frontend for its powerful data fetching, fragmentation, and cache management capabilities, we achieved a highly type-safe and efficient GraphQL setup for this 2025 project. The synergy between these tools significantly improves the developer experience when dealing with complex data interactions.




