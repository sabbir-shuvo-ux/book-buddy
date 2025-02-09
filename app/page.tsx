import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

const HomePage = async () => {
  const session = await auth();
  console.log(session);
  return (
    <div>
      <div className="">hello, {session?.user?.email}</div>
      <Button>Hello</Button>
    </div>
  );
};

export default HomePage;
