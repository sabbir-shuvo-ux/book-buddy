import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { RiUser3Line } from "react-icons/ri";

const LandingPage = async () => {
  return (
    <section className="max-h-[700px] min-h-[400px] h-[calc(100vh-70px)] relative">
      <Image
        src={"/cover.jpg"}
        alt="Cover img"
        fill
        className="h-full w-full object-cover"
        sizes="(min-width: 720px) 100vw, 642px"
      />

      <div className="absolute w-full h-full bg-black/50 grid place-items-center">
        <div className="max-w-[700px] w-full px-4">
          <h2 className="text-white text-5xl font-bold text-center mb-4">
            Your Personal Bookshelf, <br /> Anytime, Anywhere
          </h2>
          <p className="text-white text-lg text-center">
            Keep track of the books you want to read, organize your reading
            list, and never lose sight of your next great read. Sign in to start
            building your personal library and make your reading journey
            effortless!
          </p>

          <div className="flex gap-6 items-center justify-center mt-6">
            <Button asChild variant={"outline"} size={"lg"}>
              <Link href={"/login"}>Sign In</Link>
            </Button>

            <Button asChild variant={"secondary"} size={"lg"}>
              <Link href={"/signup"}>
                <RiUser3Line /> Get Started
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
