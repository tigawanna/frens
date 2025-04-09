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
import { Link } from "@tanstack/react-router";
import {Loader2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

import { useState } from "react";

export function  LoginCard(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
//   const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <Card className="z-50 bg-base-200 rounded-lg rounded-t-none w-[95%] sm:max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              className="ring ring-primary"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
          </div>
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link to="/auth/forgort-password" className="ml-auto inline-block text-sm underline">
              Forgot your password?
            </Link>
          </div>
          <div className="grid gap-2">
            <Input
              id="password"
              className="ring ring-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="password"
              placeholder="Password"
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              onClick={() => {
                setRememberMe(!rememberMe);
              }}
            />
            <Label>Remember me</Label>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
            onClick={async () => {
              await authClient.signIn.email(
                {
                  email: email,
                  password: password,
                  callbackURL: "/dashboard",
                  rememberMe,
                },
                {
                  onRequest: () => {
                    setLoading(true);
                  },
                  onResponse: () => {
                    setLoading(false);
                  },
                  onError: (ctx) => {
                    makeHotToast({
                      title: "Login failed",
                      description: ctx.error.message,
                      variant: "error",
                    });
                  },
                }
              );
            }}>
            {loading ? <Loader2 size={16} className="animate-spin" /> : "Login"}
          </button>
          <div className="flex flex-wrap items-center gap-2 w-full">
            <button
              //   variant="outline"
              className="gap-2 flex-1 w-full py-4 btn btn-outline border-[1px]"
              onClick={async () => {
                await authClient.signIn.social({
                  provider: "github",
                });
              }}>
                <FaGithub/>
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
};

