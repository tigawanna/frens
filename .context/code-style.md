- prefer named functions unless if in inside other functions
- custom hooks files should use this format`use-scroll-direction`

- we're using motion formerly known asframer motion

- we're using tailwindcss + daisyui so adhere to the daisyui color variables and avoid hard coding colrs where possible

- prefer named export from compoments unless if defualt export is necessary
  
- we are using typescript and all function inputs should have type annotations
  
 - we're using react with vite and tanstack router + apollo
  
 - the backend is a nodejs graphql server with express + prisma orm and nexus for code first graphql schema generation 
  
- everything is in turborepo monorepo
  - prisma orm will be in the packages/database as reccomemnded in their docs https://www.prisma.io/docs/guides/turborepo
  
  which will be imported as a package in the server and client packages like so 
  ```sh
  {
  "dependencies": {
    "@repo/db": "workspace:*"
  }
 ```

this is our final objective

You are tasked to build a basic social media feed where users can register, log in, post updates, like posts, and follow/unfollow other users. The focus is on delivering a clean, well-architected full-stack application strictly using the specified technologies. 
Frontend 
- React (Vite): For building dynamic user interfaces. 
- TypeScript: Ensure type safety across your React Components 
- Tailwind CSS: Style the application with a modern, utility-first CSS framework. 
Backend 
- Node.js & Express: create the server-side logic and handle requests. - GraphQL: Design and implement the API to serve client data. Use GraphQL to efficiently fetch the data required by your frontend. 
- Prisma ORM & PostgreSQL: manage your database interactions, design your schema, and perform queries through Prisma while persisting data in PostgreSQL. 

i need a very basic password email auth setup too
