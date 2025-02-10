import { auth } from "@/lib/auth";
import logo from "@/public/bookBuddy.png";
import Image from "next/image";
import Link from "next/link";
import { RiUser3Line } from "react-icons/ri";
import MenuList from "@/components/header/MenuList";
import LogoutButton from "@/components/ui/LogoutButton";
import { Button } from "@/components/ui/button";

const TopNavbar = async () => {
  const session = await auth();

  return (
    <header className="w-full max-h-[70px] h-full flex justify-between items-center bg-white border-b border-solid border-b-cu_gray">
      <nav className="h-full flex justify-between items-center w-full container">
        {/* logo */}
        <div>
          <Link
            href={"/"}
            title="BookBuddy Home Page"
            className="flex gap-2 items-center"
          >
            <Image src={logo} alt="BookBuddy" height={40} width={40} />
            <h2 className="font-bold text-lg">BookBuddy</h2>
          </Link>
        </div>

        {session && <MenuList />}

        {session ? (
          <LogoutButton />
        ) : (
          <div className="flex gap-6 items-center">
            <Button asChild variant={"link"} className="max-[420px]:hidden">
              <Link href={"/login"}>Sign In</Link>
            </Button>

            <Button asChild className="">
              <Link href={"/signup"}>
                <RiUser3Line /> Get Started
              </Link>
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default TopNavbar;
