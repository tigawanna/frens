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
- ✨ Motion (formerly Framer Motion): For smooth animations and transitions

#### State Management & Routing
- 🛣️ TanStack Router: For strongly typed routes and search params

```ts
// filepath: /home/dennis/Desktop/frens/client/src/routes/profile.tsx
import { createFileRoute } from '@tanstack/react-router'

// Type-safe route params
export const Route = createFileRoute('/profile/$username')({
    component: ProfilePage,
})

function ProfilePage() {
    // Type-safe access to route params
    const { username } = Route.useParams()
    // Type-safe search params
    const { tab } = Route.useSearch()
    
    return (
        // Component implementation
    )
}
```

- 🔄 TanStack Query: Managing non-GraphQL state with automatic refetching, caching, and invalidation

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

### Backend

#### Core Technologies
- 🚀 Node.js & Express: Server-side logic and request handling
- 🎯 GraphQL Yoga: Integrated as an Express middleware for GraphQL functionality
- 🗄️ Prisma ORM: Database interaction with PostgreSQL
- 🐘 PostgreSQL: Main database for storing application data

#### GraphQL Schema
- 🏗️ Pothos: Code-first GraphQL schema builder with Prisma plugin integration

#### Authentication
- 🔐 Better Auth: Comprehensive authentication system with:
    - Email/password authentication
    - OAuth providers (GitHub currently enabled)
    - API key generation for third-party integrations
    - Rate limiting and account management capabilities
    - Session-based authentication with cookie caching

## 📐 Architecture Decisions

### Frontend Architecture
- Component Organization: Using custom hooks with kebab-case naming convention (e.g., `use-scroll-direction`)
- GraphQL Fragment Strategy: Fragments are defined at the bottom of components, not inlined in query hooks
- State Management Approach: Search params for shareable UI state, Relay for GraphQL data, TanStack Query for REST data

### Backend Architecture
- Code-First GraphQL: Using Pothos over SDL-first approach for end-to-end type safety
- Relay-Compliant API: Enables frontend features like optimistic updates and automatic refetching
- Authentication Strategy: Session-based with cookie caching to minimize database hits

### Development Practices
- Named exports for most components
- Named functions preferred (except for nested functions)
- TypeScript type annotations for all function inputs
- Tailwind + DaisyUI color variables (avoiding hardcoded colors)
