"use client";

import { Logout } from "@/actions/authActions";
import { Button } from "./ui/button";

const LogoutButton = () => {
  const handleLogout = async () => {
    await Logout();
  };

  return (
    <Button variant={"secondary"} size={"lg"} onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
