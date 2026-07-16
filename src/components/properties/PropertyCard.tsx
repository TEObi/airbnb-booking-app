"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FavoriteButton } from "./FavoriteButton";
import type { PropertyListItem } from "@/types/property";

interface PropertyCardProps {
  property: PropertyListItem;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [imgIndex, setImgIndex] = useState(0);

  const images = property.images;
  const hasImages = images.length > 0;
  const currentImage = hasImages ? images[imgIndex]?.url : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  return (
    <Link
      href={`/properties/${property.id}`}
      className="group flex flex-col gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 rounded-xl"
      aria-label={`${property.title} — ${property.location} — $${property.price} per night`}
    >
      {/* Image container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
        {currentImage ? (
          <Image
            src={currentImage}
            alt={property.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={false}
          />
        ) : (
          /* Placeholder when no image */
          <div className="flex h-full w-full items-center justify-center bg-gray-200" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-12 w-12 text-gray-400">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
        )}

        {/* Favorite button */}
        <FavoriteButton
          propertyId={property.id}
          initialFavorited={property.isFavorited}
        />

        {/* Image navigation — only shown when multiple images */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus-visible:opacity-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus-visible:opacity-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1" aria-hidden="true">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    i === imgIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-0.5">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold text-gray-900 line-clamp-1 flex-1">
            {property.location}
          </p>
          {/* Star rating */}
          {property.averageRating !== null && (
            <span className="flex shrink-0 items-center gap-0.5 text-sm font-medium text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17 5.8 21.3l2.4-7.4L2 9.4h7.6z" />
              </svg>
              <span>{property.averageRating.toFixed(1)}</span>
            </span>
          )}
        </div>

        <p className="text-sm text-gray-500 line-clamp-1">{property.title}</p>

        <p className="text-sm text-gray-500">
          {property.guestCount} guest{property.guestCount !== 1 ? "s" : ""} &middot;{" "}
          {property.roomCount} room{property.roomCount !== 1 ? "s" : ""} &middot;{" "}
          {property.bathroomCount} bath{property.bathroomCount !== 1 ? "s" : ""}
        </p>

        <p className="mt-0.5 text-sm text-gray-900">
          <span className="font-semibold">${property.price.toLocaleString()}</span>
          <span className="font-normal text-gray-600"> night</span>
        </p>
      </div>
    </Link>
  );
}
