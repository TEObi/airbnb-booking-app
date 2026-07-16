"use client";

import { Logo } from "./Logo";
import { SearchBar } from "./SearchBar";
import { UserMenu } from "./UserMenu";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-[2520px] items-center justify-between gap-3 px-4 sm:px-6 xl:px-20">
        {/* Logo */}
        <div className="shrink-0">
          <Logo />
        </div>

        {/* Search bar — centred */}
        <div className="flex flex-1 justify-center px-2">
          <SearchBar />
        </div>

        {/* Right side: host link + user menu */}
        <div className="flex shrink-0 items-center gap-2">
          <a
            href="/host/properties/new"
            className="hidden md:flex items-center rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors whitespace-nowrap"
          >
            Airbnb your home
          </a>

          {/* Globe icon */}
          <button
            type="button"
            aria-label="Select language"
            className="hidden md:flex items-center justify-center rounded-full p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
          </button>

          <UserMenu />
        </div>
      </div>
    </header>
  );
}
