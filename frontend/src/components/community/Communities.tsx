'use client'
import Image from "next/image";
import { fetchByTag } from "@/lib/data_api";
import { useState, useEffect } from "react";
import LinkHref from "../ui/LinkHref";
import CommunitySkeletonItem from "./CommunitySkeleton";

const Communities = () => {
  const tags = ['All', 'Internet Culture', 'Games', 'Q&As & Stories', 'Technology',
    'Movies & TV', 'Places & Travel', 'Pop Culture', 'News & Politics', 'Business & Finance',
    'Education & Career', 'Sports', 'Music', 'Fashion & Beauty', 'Humanities & Law',
    'Vehicles', 'Home & Garden', 'Food & Drinks', 'Art', 'Anime & Cosplay', 'Reading & Writing',
    'Sciences', 'Wellness', 'Collectibles & Other Hobbies', 'Spooky', 'Nature & Outdoors'
  ]

  const [offset, setOffset] = useState<number>(0);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [communities, setCommunities] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false)

  const handleTagClick = async (tag: string) => {
    setSelectedTag(tag);
    setOffset(0);
    setIsLoading(true);
    const result = await fetchByTag(tag, 0);
    if (result) {
      setCommunities(result.communities);
      setHasMore(result.hasMore);
    }
    setIsLoading(false);

  };
  const handlePrevClick = async () => {
    const prevOffset = Math.max(0, offset - 4); // Prevent negative offset
    const result = await fetchByTag(selectedTag || 'All', prevOffset);
    setIsLoading(true);
    if (result) {
      setOffset(prevOffset);
      setCommunities(result.communities);
      setHasMore(result.hasMore);
    }
    setIsLoading(false);
  };

  const handleNextClick = async () => {
    const nextOffset = offset + 4
    setIsLoading(true);
    const result = await fetchByTag(selectedTag || 'All', nextOffset);
    if (result) {
      setOffset(nextOffset);
      setCommunities(result.communities)
      setHasMore(result.hasMore);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    const fetchDefault = async () => {
      setIsLoading(true);
      const result = await fetchByTag('All', 0);
      if (result) {
        setCommunities(result.communities);
        setSelectedTag('All');
        setHasMore(result.hasMore);
      }
      setIsLoading(false);
    };
    fetchDefault();
  }, []);

  return (
    <div className="w-4/5 h-full flex flex-col p-2 mt-2 mx-auto text-white">
      <span className="text-xl font-medium ml-2">Explore Communities</span>
      <div className="relative">
        {/* Left gradient fade */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none"></div>
        {/* Right gradient fade */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none"></div>

        <div className="flex mt-4 gap-3 px-4 overflow-x-auto scroll-smooth scrollbar-hide">
          {tags.map((tag, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-md text-xs font-medium cursor-pointer flex-shrink-0
                ${selectedTag == tag ? 'bg-zinc-600' : 'bg-zinc-800 hover:bg-zinc-700 text-white'}
                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6 px-6">
        {/* Table header */}
        <div className="grid grid-cols-5 gap-1 text-sm font-semibold text-neutral-400 border-b border-zinc-700 pb-2 mb-2">
          <div>Name</div>
          <div>Members</div>
          <div>Description</div>
          <div></div> {/* Join button header blank */}
        </div>

        {/* Table rows */}
        <div className="space-y-1">
          {isLoading ? (
            // Show skeleton loading
            <>
              <CommunitySkeletonItem />
              <CommunitySkeletonItem />
              <CommunitySkeletonItem />
              <CommunitySkeletonItem />
              <CommunitySkeletonItem />
              <CommunitySkeletonItem />
            </>
          ) : communities.length > 0 ? (
            communities.map((community) => (
              <div
                key={community.name}
                className="grid grid-cols-5 gap-1 items-center border-b border-zinc-800 py-3 rounded"
              >
                {/* Logo + Name */}
                <div className="flex items-center gap-2 col-span-1">
                  <LinkHref href={`d/${community.name}`} style="flex items-center gap-2">
                    <Image
                      src={community.logo_url || "/placeholder.png"}
                      alt={community.name}
                      width={32}
                      height={32}
                      className="rounded-full object-cover w-8 h-8" // Explicitly set both w-8 h-8 (32px)
                      sizes="32px"
                    />
                    <span className="text-sm font-medium">{community.display_name}</span>
                  </LinkHref>
                </div>

                {/* Members */}
                <div className="text-sm text-neutral-400">{community.members_count ?? "N/A"}</div>

                {/* Description */}
                <div className="text-sm text-neutral-300 line-clamp-2 col-span-2">
                  {community.description}
                </div>

                {/* View button */}
                <LinkHref href={`d/${community.name}`} style="flex ml-8 items-center gap-2">
                  <button className="bg-blue-700 hover:bg-blue-500 text-xs px-5 py-2 rounded-md text-white">
                    View
                  </button>
                </LinkHref>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-400">
              No communities found for the selected tag.
            </div>
          )}
        </div>

        {communities.length > 0 && (
          <div className="flex justify-between mt-4 px-6">
            <button
              onClick={handlePrevClick}
              disabled={offset === 0 || isLoading}
              className="bg-zinc-700 hover:bg-zinc-600 text-sm px-4 py-2 rounded-md text-white disabled:opacity-50"
            >
              ← Prev
            </button>

            <button
              onClick={handleNextClick}
              disabled={!hasMore || isLoading}
              className="bg-zinc-700 hover:bg-zinc-600 text-sm px-4 py-2 rounded-md text-white disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        )}
      </div>

    </div>
  )
}


export default Communities;
