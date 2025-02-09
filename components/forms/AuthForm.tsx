"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// schema
import { AuthFormSchema, AuthFormSchemaType } from "@/schemas/authSchema";

// components
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/ui/FormInput";
import { SignUp } from "@/actions/authActions";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
    if (actionType === "SIGNUP") {
      const res = await SignUp(values);
      console.log(res.message);
      if (res.success) {
        toast.success("Awesome! Your account is ready.");
        router.push("/login");
      }

      toast.error(res.message);
    }
  }

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
