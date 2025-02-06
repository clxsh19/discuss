"use client";

import { useState, useEffect } from 'react';
import { subscribeUser, unsubscribeUser } from '@/lib/create_api';
import Link from 'next/link';

const JoinAndCreateSub = ({ sub_name, subreddit_id, user_role }: { sub_name: string, subreddit_id: number, user_role: string }) => {
  // Initialize state based on the user_role prop
  const [userSubscribed, setUserSubscribed] = useState(user_role === 'member');

  useEffect(() => {
    setUserSubscribed(user_role === 'member');
  }, [user_role]);

  const changeSubStatus = async () => {
    if (userSubscribed) {
      await unsubscribeUser(subreddit_id);
      setUserSubscribed(false);  // Update state after unsubscribing
    } else {
      await subscribeUser(subreddit_id);
      setUserSubscribed(true);   // Update state after subscribing
    }
  };

  return (
    <div className="flex flex-col font-serif">
      {/* <CreatePostButton sub_name={sub_name} /> */}
      <Link className="p-1 text-lg bg-green-500 border rounded-md hover:bg-green-600" href={`/create_post?sub_name=${sub_name}`}>
        Create Post
      </Link>
      <button className="p-1 text-lg bg-green-500 border rounded-md hover:bg-green-600" onClick={changeSubStatus}>
        {userSubscribed ? 'Unsubscribe' : 'Subscribe'}  
      </button>
    </div>
  );
};

export default JoinAndCreateSub;
