"use client";

import { Logout } from "@/actions/authActions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoExit } from "react-icons/io5";

type Props = {
  className?: string;
};

const LogoutButton = ({ className }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  // handle logout
  const handleLogout = async () => {
    setLoading(true);
    toast
      .promise(Logout(), {
        loading: "Processing...",
        success: () => "You're now logged out. See you soon!",
        error: (err) => err.message || "An error occurred",
      })
      .finally(() => setLoading(false));
  };

  return (
    <Button
      className={cn(className)}
      disabled={loading}
      variant={"destructive"}
      size={"lg"}
      onClick={handleLogout}
    >
      Logout
      <IoExit />
    </Button>
  );
};

export default LogoutButton;
