"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginSchema, loginSchema } from "@/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { login } from "@/actions/login";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { ZodError } from "zod";

interface LoginFormProps {}

export function LoginForm({}: LoginFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, control } = form;

  async function submitLogin(data: LoginSchema) {
    startTransition(async () => {
      const response = await login(data);
      if (response.success) {
        redirect("/nps/dashboard");
      } else if (response.errors) {
        if (response.errors instanceof ZodError) {
          toast.error(response.errors.message);
        } else {
          toast.error(
            Object.keys(response.errors)
              // @ts-ignore
              .map((k) => d.errors[k])
              .join(", ")
          );
        }
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(submitLogin)} className="space-y-4">
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="email@lomax.dk"
                  autoComplete="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kodeord</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="********"
                  type="password"
                  autoComplete="current-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          Login
        </Button>
      </form>
    </Form>
  );
}
