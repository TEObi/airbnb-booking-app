"use client";

import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthModal } from "@/store/authModal";
import { useAuth } from "@/hooks/useAuth";

export function UserMenu() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { openLogin, openRegister } = useAuthModal();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setIsOpen(false);
    await signOut({ callbackUrl: "/" });
  };

  const navigate = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="User menu"
        className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-3 py-2 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 transition-shadow"
      >
        {/* Hamburger icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-600"
          aria-hidden="true"
        >
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>

        {/* Avatar */}
        {isAuthenticated && user?.image ? (
          <Image
            src={user.image}
            alt={user.name ?? "User avatar"}
            width={30}
            height={30}
            className="rounded-full object-cover"
          />
        ) : (
          <span
            className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gray-500 text-white text-sm font-medium"
            aria-hidden="true"
          >
            {isAuthenticated && user?.name
              ? user.name.charAt(0).toUpperCase()
              : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              )}
          </span>
        )}
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-60 rounded-xl border border-gray-200 bg-white py-1 shadow-lg z-50"
        >
          {isAuthenticated ? (
            <>
              {/* Authenticated user options */}
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {user?.name ?? "User"}
                </p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>

              <MenuItem onClick={() => navigate("/trips")} role="menuitem">
                My trips
              </MenuItem>
              <MenuItem onClick={() => navigate("/favorites")} role="menuitem">
                My favorites
              </MenuItem>
              <MenuItem onClick={() => navigate("/reservations")} role="menuitem">
                My reservations
              </MenuItem>

              <div className="my-1 border-t border-gray-100" />

              <MenuItem onClick={() => navigate("/host/properties")} role="menuitem">
                Manage properties
              </MenuItem>
              <MenuItem onClick={() => navigate("/host/properties/new")} role="menuitem">
                Airbnb your home
              </MenuItem>

              <div className="my-1 border-t border-gray-100" />

              <MenuItem onClick={handleSignOut} role="menuitem">
                Log out
              </MenuItem>
            </>
          ) : (
            <>
              {/* Guest options */}
              <MenuItem
                onClick={() => { setIsOpen(false); openLogin(); }}
                bold
                role="menuitem"
              >
                Log in
              </MenuItem>
              <MenuItem
                onClick={() => { setIsOpen(false); openRegister(); }}
                role="menuitem"
              >
                Sign up
              </MenuItem>

              <div className="my-1 border-t border-gray-100" />

              <MenuItem onClick={() => navigate("/host/properties/new")} role="menuitem">
                Airbnb your home
              </MenuItem>
            </>
          )}
        </div>
      )}
    </div>
  );
}

interface MenuItemProps {
  children: React.ReactNode;
  onClick: () => void;
  bold?: boolean;
  role?: string;
}

function MenuItem({ children, onClick, bold = false }: MenuItemProps) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors ${
        bold ? "font-semibold text-gray-900" : "font-normal text-gray-700"
      }`}
    >
      {children}
    </button>
  );
}
