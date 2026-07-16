import { Suspense } from "react";
import { CategoryBar } from "@/components/CategoryBar";
import { ListingsGrid } from "@/components/properties/ListingsGrid";
import { PropertyCardSkeleton } from "@/components/properties/PropertyCardSkeleton";

export default function HomePage() {
  return (
    <>
      <CategoryBar />
      <div className="mx-auto max-w-[2520px] px-4 sm:px-6 xl:px-20 py-8">
        <Suspense
          fallback={
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {Array.from({ length: 10 }).map((_, i) => (
                <PropertyCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <ListingsGrid />
        </Suspense>
      </div>
    </>
  );
}
