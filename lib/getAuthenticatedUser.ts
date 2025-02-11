import { prisma } from "@/lib/prisma";
import { auth } from "./auth";

export const getAuthenticatedUser = async () => {
  const session = await auth();
  if (!session?.user?.email) throw new Error("User not authenticated");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) throw new Error("User not found");

  return user;
};
