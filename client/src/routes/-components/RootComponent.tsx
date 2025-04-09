import { MainNavbar } from "@/components/navigation/navbar/MainNavbar";
import { TailwindIndicator } from "@/components/navigation/tailwind-indicator";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "react-hot-toast";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from "@apollo/client";
import { useQuery } from "@tanstack/react-query";
export function RootComponent() {
  const client = new ApolloClient({
    uri: "https://flyby-router-demo.herokuapp.com/",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div className="content min-h-screen w-full">
        <TailwindIndicator />
        <Outlet />
        <TanStackRouterDevtools position="bottom-left" />
        <ReactQueryDevtools buttonPosition="bottom-right" />
        <Toaster reverseOrder />
      </div>
    </ApolloProvider>
  );
}
