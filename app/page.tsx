import LogoutButton from "@/components/ui/LogoutButton";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import Link from "next/link";

const HomePage = async () => {
  const session = await auth();
  console.log(session);
  return (
    <div className="grid gap-8">
      <h2>Hello This is Landing Page {session?.user?.email}</h2>

      <div className="my-8">
        <LogoutButton />
      </div>

      <div className="flex gap-4">
        <Button asChild>
          <Link href={"/login"}>Login</Link>
        </Button>
        <Button asChild>
          <Link href={"/signup"}>Sign Up</Link>
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
