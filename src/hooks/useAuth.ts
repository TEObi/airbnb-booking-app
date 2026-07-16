"use client";

import { useSession } from "next-auth/react";
import type { Session } from "next-auth";

export function useAuth() {
  const { data: session, status } = useSession();

  return {
    session,
    status,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    user: session?.user,
  };
}
