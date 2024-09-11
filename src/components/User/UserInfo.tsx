"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function UserInfo() {
  const { data: session } = useSession();

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-8 bg-tertiary flex flex-col gap-2 my-6">
        <div>
          Name: <span className="font-bold">{session?.user?.firstName}</span>
        </div>
        <div>
          Email: <span className="font-bold">{session?.user?.email}</span>
        </div>
        <button
          className="btn btn-accent"
          onClick={() => {
            signOut({ callbackUrl: "/", redirect: true });
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
