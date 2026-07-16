"use client";

interface SearchBarProps {
  onOpen?: () => void;
}

export function SearchBar({ onOpen }: SearchBarProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Open search"
      className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 transition-shadow w-full max-w-sm md:max-w-md"
    >
      {/* Anywhere */}
      <span className="hidden sm:block text-sm font-medium text-gray-800 border-r border-gray-200 pr-3">
        Anywhere
      </span>

      {/* Any week */}
      <span className="hidden md:block text-sm font-medium text-gray-800 border-r border-gray-200 pr-3">
        Any week
      </span>

      {/* Guests */}
      <span className="text-sm text-gray-400 flex-1 text-left">
        Add guests
      </span>

      {/* Search icon */}
      <span className="flex items-center justify-center h-8 w-8 rounded-full bg-rose-500 text-white shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </span>
    </button>
  );
}
