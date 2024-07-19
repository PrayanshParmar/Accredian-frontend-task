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
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { RegisterUserHandler } from "@/api/user/user";
import { useNavigate } from "react-router-dom";
import { UserSuccess } from "@/lib/res_types";

const registerSchema = z.object({
  email: z.string().email("Email is required"),
  password: z
    .string()
    .min(4, "Mininum 4 character's is required")
    .max(30, "Password can be upto 30 character's"),
});

const RegisterForm = () => {
  const navigate = useNavigate();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: RegisterUserMutate, isPending: RegisterUserIsPending } =
    useMutation({
      mutationKey: ["register-user"],
      mutationFn: RegisterUserHandler,
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
        navigate("/login");
      },
    });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    RegisterUserMutate(values);
  };
  return (
    <>
      <CardWrapper
        headerLabel="Create an account"
        backButtonLabel="Already have an account?"
        backButtonHref="/login"
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
                        disabled={RegisterUserIsPending}
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
                        disabled={RegisterUserIsPending}
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
              disabled={RegisterUserIsPending}
              type="submit"
              className="w-full"
            >
              Register
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </>
  );
};

export default RegisterForm;
