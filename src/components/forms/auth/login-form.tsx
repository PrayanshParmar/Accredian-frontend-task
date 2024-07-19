"use client";

import CardWrapper from "./card-wrapper";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { LoginUserHandler } from "@/api/user/user";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { UserSuccess } from "@/lib/res_types";

const loginSchema = z.object({
  email: z.string().email("Email is required"),
  password: z
    .string()
    .min(4, "Mininum 4 character's is required")
    .max(30, "Password can be upto 30 character's"),
});

const LoginForm = () => {
  const navigate = useNavigate();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: LoginUserMutate, isPending: LoginUserIsPending } =
    useMutation({
      mutationKey: ["login-user"],
      mutationFn: LoginUserHandler,
      onError: (error: Error) => {
        toast({
          title: error.message,
          variant: "destructive",
        });
      },
      onSuccess: (data: UserSuccess) => {
        toast({
          title: data.message,
          variant: "success",
        });
        navigate("/dashboard");
      },
    });
  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    LoginUserMutate(values);
  };
  return (
    <>
      <CardWrapper
        headerLabel="Welcome back"
        backButtonLabel="Don't have an account?"
        backButtonHref="/register"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={LoginUserIsPending}
                        {...field}
                        type="email"
                        placeholder="Enter email"
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
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        disabled={LoginUserIsPending}
                        autoComplete=""
                        {...field}
                        type="password"
                        placeholder="Enter password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              disabled={LoginUserIsPending}
              type="submit"
              className="w-full"
            >
              login
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </>
  );
};

export default LoginForm;
