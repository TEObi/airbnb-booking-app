"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useAuthModal } from "@/store/authModal";

interface FavoriteButtonProps {
  propertyId: string;
  initialFavorited: boolean;
}

export function FavoriteButton({ propertyId, initialFavorited }: FavoriteButtonProps) {
  const { isAuthenticated } = useAuth();
  const { openLogin } = useAuthModal();
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(initialFavorited);
  const [isPending, setIsPending] = useState(false);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault(); // prevent navigating to property page
    e.stopPropagation();

    if (!isAuthenticated) {
      openLogin();
      return;
    }

    if (isPending) return;
    setIsPending(true);

    // Optimistic update
    setIsFavorited((prev) => !prev);

    try {
      const res = await fetch(`/api/favorites/${propertyId}`, {
        method: "POST",
      });

      if (!res.ok) {
        // Revert on failure
        setIsFavorited((prev) => !prev);
      } else {
        router.refresh();
      }
    } catch {
      setIsFavorited((prev) => !prev);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={isFavorited}
      disabled={isPending}
      className="absolute right-3 top-3 z-10 rounded-full p-1 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-not-allowed"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="h-6 w-6 drop-shadow"
        aria-hidden="true"
      >
        {/* White stroke outline for contrast on any background */}
        <path
          d="M16 28c-1-.8-10-7.4-10-14a7 7 0 0 1 10-6.3A7 7 0 0 1 26 14c0 6.6-9 13.2-10 14z"
          fill={isFavorited ? "#FF385C" : "rgba(0,0,0,0.5)"}
          stroke="white"
          strokeWidth="2"
        />
      </svg>
    </button>
  );
}
