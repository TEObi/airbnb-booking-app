"use client";

import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" aria-label="Airbnb home">
      {/* Full logo — visible on md+ screens */}
      <span className="hidden md:flex items-center gap-1 text-rose-500 font-bold text-xl select-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="currentColor"
          className="h-8 w-8"
          aria-hidden="true"
        >
          <path d="M16 1C9.8 1 5 9.3 5 15.8c0 4.4 2.3 7.8 5.8 9.6L16 31l5.2-5.6C24.7 23.6 27 20.2 27 15.8 27 9.3 22.2 1 16 1zm0 21.5c-3.6 0-6.5-2.9-6.5-6.5S12.4 9.5 16 9.5s6.5 2.9 6.5 6.5-2.9 6.5-6.5 6.5zm0-10c-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5 3.5-1.6 3.5-3.5-1.6-3.5-3.5-3.5z" />
        </svg>
        airbnb
      </span>

      {/* Icon only — visible on small screens */}
      <span className="flex md:hidden text-rose-500" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="currentColor"
          className="h-8 w-8"
        >
          <path d="M16 1C9.8 1 5 9.3 5 15.8c0 4.4 2.3 7.8 5.8 9.6L16 31l5.2-5.6C24.7 23.6 27 20.2 27 15.8 27 9.3 22.2 1 16 1zm0 21.5c-3.6 0-6.5-2.9-6.5-6.5S12.4 9.5 16 9.5s6.5 2.9 6.5 6.5-2.9 6.5-6.5 6.5zm0-10c-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5 3.5-1.6 3.5-3.5-1.6-3.5-3.5-3.5z" />
        </svg>
      </span>
    </Link>
  );
}
