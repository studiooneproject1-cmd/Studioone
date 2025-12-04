"use client";

import { signOut } from "next-auth/react";
import React from "react";
import { Button } from "./ui/button";

export default function Logout() {
  return (
    <div>
      <Button
        className="bg-red-700"
        onClick={() =>
          signOut({
            callbackUrl: "/",
          })
        }
      >
        Logout
      </Button>
    </div>
  );
}
