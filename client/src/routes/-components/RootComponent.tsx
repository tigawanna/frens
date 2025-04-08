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
  const { data } = useQuery({
    queryKey: ["getUser"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/")
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      return data;
    },
  })
  return (
    <ApolloProvider client={client}>
      <div className="content min-h-screen w-full">
        {JSON.stringify(data)}
        <TailwindIndicator />
        <Outlet />
        <TanStackRouterDevtools position="bottom-left" />
        <ReactQueryDevtools buttonPosition="bottom-right" />
        <Toaster reverseOrder />
      </div>
    </ApolloProvider>
  );
}
