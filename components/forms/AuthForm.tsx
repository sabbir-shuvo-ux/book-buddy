"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// schema
import { AuthFormSchema, AuthFormSchemaType } from "@/schemas/authSchema";

// components
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/FormInput";
import { HOME, LOGIN } from "@/constents/middlewareRoutes";
import { Login, SignUp } from "@/actions/authActions";

type Props = {
  actionType: "LOGIN" | "SIGNUP";
};

const AuthForm = ({ actionType }: Props) => {
  const router = useRouter();

  // initialize form.
  const form = useForm<AuthFormSchemaType>({
    resolver: zodResolver(AuthFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // handle form submit
  async function onSubmit(values: AuthFormSchemaType) {
    const authAction = actionType === "SIGNUP" ? SignUp : Login;
    const successMessage =
      actionType === "SIGNUP"
        ? "Awesome! Your account is ready."
        : "You’ve successfully logged in.";
    const redirectPath = actionType === "SIGNUP" ? LOGIN : HOME;

    const res = await authAction(values);

    // handle error response
    if (!res.success) {
      toast.error(res.message);
      console.log(res.message);
      return;
    }

    toast.success(successMessage);
    router.push(redirectPath);
    router.refresh();
  }

  // reset form
  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [form, form.formState.isSubmitSuccessful]);

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
        <Button disabled={form.formState.isSubmitting} type="submit">
          {form.formState.isSubmitting
            ? actionType === "SIGNUP"
              ? "Setting Things Up..."
              : "Signing In..."
            : actionType === "SIGNUP"
            ? "Create Your Profile"
            : "Sign In"}
        </Button>
      </form>
    </Form>
  );
};

export default AuthForm;
