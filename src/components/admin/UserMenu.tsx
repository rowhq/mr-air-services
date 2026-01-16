"use client";

import { signOut, useSession } from "next-auth/react";
import { UserIcon, LogOutIcon } from "./icons";

interface UserMenuProps {
  collapsed: boolean;
}

export function UserMenu({ collapsed }: UserMenuProps) {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  const userEmail = session?.user?.email || "admin@mrairservices.com";
  const userName = session?.user?.name || "Admin";

  if (collapsed) {
    return (
      <div className="p-2 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="
            group relative w-full flex items-center justify-center
            p-2.5 rounded-lg text-gray-400
            hover:bg-gray-800 hover:text-white
            transition-colors
          "
          title="Sign out"
        >
          <LogOutIcon className="w-5 h-5" />

          {/* Tooltip */}
          <div className="
            absolute left-full ml-2 px-2 py-1
            bg-gray-900 text-white text-sm font-medium
            rounded-md whitespace-nowrap
            opacity-0 invisible group-hover:opacity-100 group-hover:visible
            transition-all duration-150 z-50
            shadow-lg border border-gray-700
          ">
            Sign out
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="p-3 border-t border-gray-800">
      <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-gray-800/50">
        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
          <UserIcon className="w-5 h-5 text-white" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">{userName}</p>
          <p className="text-xs text-gray-400 truncate">{userEmail}</p>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          title="Sign out"
        >
          <LogOutIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
