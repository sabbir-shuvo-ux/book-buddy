"use client";

import { Logout } from "@/actions/authActions";
import { Button } from "@/components/ui/button";
import { IoExit } from "react-icons/io5";
const LogoutButton = () => {
  const handleLogout = async () => {
    await Logout();
  };

  return (
    <Button variant={"destructive"} size={"lg"} onClick={handleLogout}>
      Logout
      <IoExit />
    </Button>
  );
};

export default LogoutButton;
