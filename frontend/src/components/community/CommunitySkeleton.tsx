import React from "react";
// Loading skeleton component
const CommunitySkeletonItem = () => (
  <div className="grid grid-cols-5 gap-1 items-center border-b border-zinc-800 py-3 rounded animate-pulse">
    {/* Logo + Name skeleton */}
    <div className="flex items-center gap-2 col-span-1">
      <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
      <div className="h-4 bg-gray-700 rounded w-20"></div>
    </div>
    {/* Members skeleton */}
    <div className="h-4 bg-gray-700 rounded w-12"></div>
    {/* Description skeleton */}
    <div className="col-span-2 space-y-2">
      <div className="h-3 bg-gray-700 rounded w-full"></div>
      <div className="h-3 bg-gray-700 rounded w-3/4"></div>
    </div>
    {/* Button skeleton */}
    <div className="flex ml-8">
      <div className="h-8 bg-gray-700 rounded-md w-16"></div>
    </div>
  </div>
)
export default CommunitySkeletonItem;
