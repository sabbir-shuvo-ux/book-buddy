"use client";

import { Button } from "@/components/ui/button";
import { menuData } from "@/constents/menuData";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  className?: string;
  isMobile?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};
const MenuList = ({ className, isMobile, setIsOpen }: Props) => {
  const pathName = usePathname();

  const handleClick = () => {
    if (setIsOpen) {
      setIsOpen(false);
    }
  };

  return (
    <ul className={cn("flex gap-4", className)}>
      {menuData.map((item) => (
        <li key={item.id}>
          <Button
            onClick={handleClick}
            asChild
            size={isMobile ? "icon-lg" : "default"}
            variant={pathName.startsWith(item.href) ? "default" : "ghost"}
          >
            <Link href={item.href}>{item.label}</Link>
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default MenuList;
