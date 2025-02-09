"use server";

import { signIn, signOut } from "@/lib/auth";
import { executeAction } from "@/lib/executeAction";
import { prisma } from "@/lib/prisma";
import { AuthFormSchema, AuthFormSchemaType } from "@/schemas/authSchema";
import bcryptjs from "bcryptjs";

// sign up
const SignUp = async (data: AuthFormSchemaType) => {
  return executeAction({
    actionFn: async () => {
      // validate form data in server
      const { email, password } = AuthFormSchema.parse(data);

      // check is user already exits or not if true throw error
      const user = await prisma.user.findFirst({ where: { email } });
      if (user) {
        throw new Error("User Already Exits");
      }

      // Hash the password before saving it to the database
      const hashedPassword = await bcryptjs.hash(password, 10);

      // create a new user
      await prisma.user.create({
        data: { email: email, password: hashedPassword },
      });
    },
  });
};

// login
const Login = async (data: AuthFormSchemaType) => {
  return await executeAction({
    actionFn: async () => {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      return res;
    },
  });
};

// logout
const Logout = async () => {
  await signOut({ redirectTo: "/login" });
};

export { Login, Logout, SignUp };
