'use client';

import { useState, useEffect, useRef } from 'react';
import { fetchAllCommunityNames } from '@/lib/data_api';
import { useRouter } from 'next/navigation';
import { DownIcon } from '@/components/Icons';

interface Community {
  subreddit_id: number;
  name: string;
}

interface CommunitySearchBarProps {
  sub_name?: string;
}

const CommunitySearchBar = ({ sub_name }: CommunitySearchBarProps) => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [filteredCommunities, setFilteredCommunities] = useState<Community[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<string>(sub_name || '');
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Fetch communities
  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const communityNames = await fetchAllCommunityNames();
        setCommunities(communityNames);
        setFilteredCommunities(communityNames);
      } catch (err) {
        console.error('Failed to load communities:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as HTMLElement)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle input changes for search
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setFilteredCommunities(
      communities.filter((community) => community.name.toLowerCase().includes(query))
    );
  };

  return (
    <div className="w-full text-white" ref={dropdownRef}>
      <label htmlFor="communityName" className="text-sm font-medium text-white">
        Community
      </label>
      <input
        type="text"
        id="communityName"
        name="communityName"
        className={`block w-full mt-2 px-3 py-2 bg-neutral-900 rounded-lg text-sm
                    ${showDropdown ? 'ring-1 ring-blue-300': 'outline-none '}` }
        value={selectedCommunity}
        placeholder='Click to select community'
        readOnly
        required
        onClick={() => setShowDropdown((prev) => !prev)} // Toggle dropdown
      />
      {showDropdown && (
        <div className="absolute w-4/12 mt-2 z-10 bg-neutral-900 border border-neutral-500 rounded-lg">
          <div className="p-2 border-b border-b-neutral-500">
            <input
              type="text"
              placeholder="Search community"
              className="w-full px-3 py-2 bg-neutral-800 text-sm outline-none rounded-md hover:bg-gray-800 focus:bg-gray-800"
              onChange={handleSearchChange}
              autoFocus
            />
          </div>
          <ul className="max-h-40 overflow-y-auto">
            {loading ? (
              <li className="px-4 py-2 text-sm text-gray-500">Loading...</li>
            ) : filteredCommunities.length === 0 ? (
              <li className="px-4 py-2 text-sm text-gray-500">No community found</li>
            ) : (
              filteredCommunities.map((community) => (
                <li
                  key={community.subreddit_id}
                  className="px-4 py-2 cursor-pointer hover:bg-neutral-800 text-sm"
                  onClick={() => {
                    setSelectedCommunity(community.name); // Update selected value
                    setShowDropdown(false); // Close dropdown
                    router.replace(`/create_post?sub_name=${encodeURIComponent(community.name)}`)
                  }}
          
                >
                  {community.name}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CommunitySearchBar;
