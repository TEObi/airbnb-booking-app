export function PropertyCardSkeleton() {
  return (
    <div className="flex flex-col gap-2 animate-pulse" aria-hidden="true">
      {/* Image placeholder */}
      <div className="aspect-square w-full rounded-xl bg-gray-200" />
      {/* Text placeholders */}
      <div className="flex flex-col gap-1.5">
        <div className="h-4 w-3/4 rounded bg-gray-200" />
        <div className="h-3.5 w-1/2 rounded bg-gray-200" />
        <div className="h-3.5 w-2/3 rounded bg-gray-200" />
        <div className="h-4 w-1/3 rounded bg-gray-200" />
      </div>
    </div>
  );
}
