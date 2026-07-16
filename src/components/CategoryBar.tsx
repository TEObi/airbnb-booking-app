"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface Category {
  label: string;
  icon: React.ReactNode;
}

const categories: Category[] = [
  {
    label: "Beach",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
        <path d="M17.5 8a4.5 4.5 0 1 0-9 0c0 4.5 4.5 11 4.5 11s4.5-6.5 4.5-11Z" />
        <path d="M3 21h18" />
      </svg>
    ),
  },
  {
    label: "Mountains",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      </svg>
    ),
  },
  {
    label: "Cabins",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: "Pools",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
        <path d="M2 12h20" />
        <path d="M2 18c2.5-2 5-2 7.5 0s5 2 7.5 0" />
        <path d="M2 6c2.5-2 5-2 7.5 0s5 2 7.5 0" />
      </svg>
    ),
  },
  {
    label: "Islands",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
  {
    label: "Lake",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
        <path d="M2 18c2.5-2 5-2 7.5 0s5 2 7.5 0" />
        <path d="M3 6c1.5-1 3.5-1 5 0l4-4 4 4c1.5-1 3.5-1 5 0" />
        <path d="M2 12c2.5-2 5-2 7.5 0s5 2 7.5 0" />
      </svg>
    ),
  },
  {
    label: "Skiing",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
        <path d="m20 16-4-4-4 2-4-2-4 4" />
        <path d="m4 8 2-2 4 2 4-2 4 2 2-2" />
      </svg>
    ),
  },
  {
    label: "Castles",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
        <path d="M22 20v-9H2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z" />
        <path d="M18 11V4H6v7" />
        <path d="M15 22v-4a3 3 0 0 0-3-3v0a3 3 0 0 0-3 3v4" />
        <path d="M22 11V4" />
        <path d="M2 11V4" />
        <path d="M6 4V2" />
        <path d="M18 4V2" />
        <path d="M10 4V2" />
        <path d="M14 4V2" />
      </svg>
    ),
  },
  {
    label: "Camping",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
        <path d="M3 17h18" />
        <path d="M12 3 3 17h18L12 3z" />
        <path d="M10 17v4" />
        <path d="M14 17v4" />
      </svg>
    ),
  },
  {
    label: "Arctic",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
        <line x1="12" x2="12" y1="2" y2="22" />
        <path d="m17 7-5-5-5 5" />
        <path d="m17 17-5 5-5-5" />
        <path d="m2 12 5-3-5-3" />
        <path d="m22 6-5 3 5 3" />
      </svg>
    ),
  },
  {
    label: "Desert",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
    ),
  },
  {
    label: "Barns",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
        <path d="M3 21V8l9-5 9 5v13" />
        <path d="M9 21v-6h6v6" />
        <path d="M3 8h18" />
      </svg>
    ),
  },
  {
    label: "Luxe",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    label: "Treehouses",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
        <path d="M12 22V11" />
        <path d="M5 11a7 7 0 0 1 14 0" />
        <path d="M3 18h18" />
        <path d="M7 18v-2" />
        <path d="M17 18v-2" />
      </svg>
    ),
  },
];

export function CategoryBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? "";

  const handleSelect = useCallback(
    (label: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (activeCategory === label) {
        params.delete("category");
      } else {
        params.set("category", label);
      }
      router.push(`/?${params.toString()}`);
    },
    [activeCategory, router, searchParams]
  );

  return (
    <nav aria-label="Property categories">
      <div className="mx-auto max-w-[2520px] px-4 sm:px-6 xl:px-20">
        {/* Scrollable row */}
        <div className="flex items-center gap-6 overflow-x-auto py-3 scrollbar-hide">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.label;
            return (
              <button
                key={cat.label}
                type="button"
                onClick={() => handleSelect(cat.label)}
                aria-pressed={isActive}
                className={`flex shrink-0 flex-col items-center gap-1.5 pb-1 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 rounded-sm
                  ${isActive
                    ? "border-b-2 border-gray-800 text-gray-800"
                    : "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-b border-gray-100" />
    </nav>
  );
}
