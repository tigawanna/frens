"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Checkbox } from "@/components/shadcn/ui/checkbox";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import { makeHotToast } from "@/components/toasters";
import { authClient } from "@/lib/better-auth/auth-client";
import { Link, useSearch } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/shadcn/ui/form";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function SigninCard() {
  const { returnTo } = useSearch({
    from: "/auth/",
  });

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      return await authClient.signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: returnTo,
        rememberMe: data.rememberMe,
      });
    },
    onSuccess: (data) => {
      if (data.error) {
        makeHotToast({
          title: "Login failed",
          description: data.error.message,
          variant: "error",
          duration: 5000,
        });
      } else {
        makeHotToast({
          title: "Welcome back",
          description: `Welcome back ${data?.data?.user.name}`,
          variant: "success",
        });
      }
    },
    onError: (error) => {
      makeHotToast({
        title: "Login failed",
        description: error.message,
        variant: "error",
      });
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    mutation.mutate(data);
  };

  return (
    <Card className="bg-base-200 rounded-lg border-none w-[95%] sm:max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl md:text-4xl">Sign In</CardTitle>
        <CardDescription className="text-sm">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        className="ring-[1px] ring-base-content/40"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/auth/forgort-password"
                  className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        className="ring-[1px] ring-base-content/40"
                        autoComplete="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-center gap-2">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-center gap-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <Label className="">Remember me</Label>
                    </FormItem>
                  )}
                />
                <Link className="btn btn-link" to="/auth/signup" search={{ returnTo }}>
                  new here? Sign up instead
                </Link>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={mutation.isPending}>
                {mutation.isPending ? <Loader2 size={16} className="animate-spin" /> : "Login"}
              </button>
            </form>
          </Form>

          <div className="flex flex-wrap items-center gap-2 w-full">
            <button
              className="gap-2 flex-1 w-full py-4 btn btn-primary btn-outline  border-[1px]"
              onClick={async () => {
                // const baseURL = new URL(window.location.href);
                // const callbackURL = new URL(returnTo, baseURL).toString();
                // const newUserCallbackURL = new URL("/about", baseURL).toString();
                // const errorCallbackURL = new URL("/auth/error", baseURL).toString();

                const callbackURL = returnTo;
                const newUserCallbackURL = "/about";
                const errorCallbackURL = "/auth/error";

                await authClient.signIn.social({
                  provider: "github",
                  callbackURL,
                  newUserCallbackURL,
                  errorCallbackURL,
                });
              }}>
              <FaGithub />
              Continue with Github
            </button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-center w-full border-t py-4">
          <p className="text-center text-xs text-neutral-500">
            Secured by <span className="text-orange-400">better-auth.</span>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
