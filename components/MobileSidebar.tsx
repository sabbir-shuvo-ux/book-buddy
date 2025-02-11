"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CiMenuBurger } from "react-icons/ci";
import MenuList from "./header/MenuList";
import LogoutButton from "./ui/LogoutButton";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const MobileSidebar = ({ className }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className={cn(className)} asChild>
        <Button variant="ghost">
          <CiMenuBurger size={30} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle />
          <SheetDescription />
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <MenuList setIsOpen={setIsOpen} className="flex-col" isMobile />
          <LogoutButton />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
