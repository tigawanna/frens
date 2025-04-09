import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card";
import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import { useState } from "react";
import { authClient } from "@/lib/better-auth/auth-client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Loader2, X } from "lucide-react";
import { PasswordInput } from "@/components/shadcn/ui/password-input";
import { FaGithub } from "react-icons/fa";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/shadcn/ui/form";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { makeHotToast } from "@/components/toasters";

const signupSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    passwordConfirmation: z.string().min(8, "Password confirmation is required"),
    image: z.string().url().optional(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

export function SignUpCard() {
  const { returnTo } = useSearch({
    from: "/auth/signup",
  });
  const navigate = useNavigate()
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      image: undefined,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: SignupFormValues) => {
      return await authClient.signUp.email({
        email: data.email,
        password: data.password,
        callbackURL: returnTo,
        image: data.image,
        name: data.name,
      });
    },
    onSuccess: (data) => {
      if(data.error) {
        makeHotToast({
          title: "Signup failed",
          description: data.error.message,
          variant: "error",
          duration: 5000,
        });
      }else{
        makeHotToast({
          title: "Welcome",
          description: `Welcome ${data?.data?.user.name}`,
          variant: "success",
        });
        navigate({ to: returnTo })

      }
    },
    onError: (error) => {
      makeHotToast({
        title: "Signup failed",
        description: error.message,
        variant: "error",
      });
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    mutation.mutate(data);
  };
  const imagePreview = form.watch("image");

  const loading = mutation.isPending;
  return (
    <Card className="bg-base-200 rounded-lg border-none w-[95%] sm:max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl md:text-4xl">Sign Up</CardTitle>
        <CardDescription className="text-sm">
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid gap-0.5">
                    <Label htmlFor="first-name">First</Label>
                    <FormControl>
                      <Input
                        id="first-name"
                        placeholder="Max"
                        className="ring-[1px] ring-base-content/40"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid gap-0.5">
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

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid gap-0.5">
                  <Label htmlFor="password">Password</Label>
                  <FormControl>
                    <PasswordInput
                      id="password"
                      // name="password"
                      type="password"
                      className="ring-[1px] ring-base-content/40"
                      autoComplete="new-password"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem className="grid gap-0.5">
                  <Label htmlFor="passwordConfirmation">Confirm Password</Label>
                  <FormControl>
                    <PasswordInput
                      id="passwordConfirmation"
                      // name="passwordConfirmation"
                      className="ring-[1px] ring-base-content/40"
                      autoComplete="new-password"
                      placeholder="Confirm Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-0.5">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="grid gap-0.5">
                    <Label htmlFor="image">Profile Image link (optional)</Label>
                    <div className="flex flex-col  gap-4">
                      {imagePreview && (
                        <div className="overflow-hidden">
                          <img
                            src={imagePreview}
                            alt="Profile preview"
                            height={264}
                            width={264}
                            className="w-full rounded-xl h-auto object-cover aspect-square"
                          />
                        </div>
                      )}
                      <div className="flex items-center gap-2 w-full">
                        <Input
                          id="image"
                          type="url"
                          className="ring-[1px] ring-base-content/40"
                          {...field}
                        />
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              <div className="border-b norder-primary h-2 my-5" />
            </div>
            <Link className="btn btn-link" to="/auth" search={{ returnTo }}>
              Already have an account?
            </Link>
            <button type="submit" className="w-full btn btn-primary" disabled={loading}>
              {loading ? <Loader2 size={16} className="animate-spin" /> : "Create an account"}
            </button>
          </form>
        </Form>

        <div className="flex flex-wrap items-center gap-2 w-full mt-4">
          <button
            className="gap-2 flex-1 btn btn-primary btn-outline border-[1px] w-full py-4"
            onClick={async () => {
              await authClient.signIn.social({
                provider: "github",
              });
            }}>
            <FaGithub className="h-4 w-4" />
            Continue with Github
          </button>
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
