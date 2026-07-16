"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { PropertyCard } from "./PropertyCard";
import { PropertyCardSkeleton } from "./PropertyCardSkeleton";
import type { PropertyListItem } from "@/types/property";

export function ListingsGrid() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<PropertyListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();

      const category = searchParams.get("category");
      const location = searchParams.get("location");
      const startDate = searchParams.get("startDate");
      const endDate = searchParams.get("endDate");
      const guestCount = searchParams.get("guestCount");

      if (category) params.set("category", category);
      if (location) params.set("location", location);
      if (startDate) params.set("startDate", startDate);
      if (endDate) params.set("endDate", endDate);
      if (guestCount) params.set("guestCount", guestCount);

      const res = await fetch(`/api/properties?${params.toString()}`);

      if (!res.ok) {
        throw new Error("Failed to load properties");
      }

      const data: PropertyListItem[] = await res.json();
      setProperties(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  // Loading skeletons
  if (isLoading) {
    return (
      <div
        className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
        aria-label="Loading properties"
        aria-busy="true"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <PropertyCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-4 h-12 w-12 text-gray-400" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4M12 16h.01" />
        </svg>
        <p className="text-lg font-semibold text-gray-900">Something went wrong</p>
        <p className="mt-1 text-sm text-gray-500">{error}</p>
        <button
          type="button"
          onClick={fetchProperties}
          className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
        >
          Try again
        </button>
      </div>
    );
  }

  // Empty state
  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-4 h-12 w-12 text-gray-400" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <p className="text-lg font-semibold text-gray-900">No properties found</p>
        <p className="mt-1 text-sm text-gray-500">
          Try adjusting your filters or search for a different location.
        </p>
      </div>
    );
  }

  return (
    <section aria-label="Property listings">
      <p className="sr-only">{properties.length} properties found</p>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
}
