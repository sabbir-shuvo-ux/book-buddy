"use client";

import { Logout } from "@/actions/authActions";
import { Button } from "@/components/ui/button";

const LogoutButton = () => {
  const handleLogout = async () => {
    await Logout();
  };

  return (
    <Button variant={"destructive"} size={"lg"} onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
