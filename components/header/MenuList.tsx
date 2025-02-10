"use client";

import { Button } from "@/components/ui/button";
import { menuData } from "@/constents/menuData";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuList = () => {
  const pathName = usePathname();

  return (
    <ul className="flex gap-4">
      {menuData.map((item) => (
        <li key={item.id}>
          <Button
            asChild
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
