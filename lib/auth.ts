import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { AuthFormSchema } from "@/schemas/authSchema";
import bcryptjs from "bcryptjs";
import { CustomAuthError } from "./customAuthError";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // validate credentials
        const { email, password } = AuthFormSchema.parse(credentials);

        // check is user existence
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new CustomAuthError("Invalid email or password");
        }

        // validate password
        const isPasswordValid =
          password && user.password
            ? await bcryptjs.compare(password, user.password)
            : false;

        if (!isPasswordValid) {
          throw new CustomAuthError("Invalid email or password");
        }

        return user;
      },
    }),
  ],
});
