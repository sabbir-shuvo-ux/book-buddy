"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// schema
import { AuthFormSchema, AuthFormSchemaType } from "@/schemas/authSchema";

// components
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/FormInput";

type Props = {
  actionType: "LOGIN" | "SIGNUP";
};

const AuthForm = ({ actionType }: Props) => {
  // initialize form.
  const form = useForm<AuthFormSchemaType>({
    resolver: zodResolver(AuthFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // handle form submit
  function onSubmit(values: AuthFormSchemaType) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-[400px] mx-auto"
      >
        <FormInput
          form={form}
          name="email"
          placeholder="Enter Your Email"
          label="Email"
          type="email"
        />

        <FormInput
          form={form}
          name="password"
          placeholder="Enter Your Password"
          label="Password"
          type="password"
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AuthForm;
