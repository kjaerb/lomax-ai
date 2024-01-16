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
import { RegisterSchema, registerSchema } from "@/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { register } from "@/actions/register";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ZodError } from "zod";
import { login } from "@/actions/login";
import { redirect } from "next/navigation";

interface RegisterFormProps {}

export function RegisterForm({}: RegisterFormProps) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit, control } = form;

  function submitRegister(data: RegisterSchema) {
    startTransition(async () => {
      const response = await register(data);
      if (response.success) {
        toast.success("Bruger oprettet");
        await login(data);
        redirect("/nps/segment");
      } else if (response.errors) {
        if (response.errors instanceof ZodError) {
          toast.error(response.errors.message);
        } else {
          toast.error(
            Object.keys(response.errors)
              // @ts-ignore
              .map((k) => response.errors[k])
              .join(", "),
          );
        }
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(submitRegister)} className="space-y-2">
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
        <FormField
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bekræft kodeord</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="********"
                  type="password"
                  autoComplete="new-password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isPending}>
          Opret bruger
        </Button>
      </form>
    </Form>
  );
}
