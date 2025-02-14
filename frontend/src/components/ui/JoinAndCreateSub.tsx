"use client";

import { useState, useEffect } from 'react';
import { subscribeUser, unsubscribeUser } from '@/lib/create_api';
import { useAuth } from '../context/AuthContext';
import { showErrorToast } from './toasts';
import Link from 'next/link';

const JoinAndCreateSub = ({ sub_name, subreddit_id, user_role }: { sub_name: string, subreddit_id: number, user_role: string }) => {
  // Initialize state based on the user_role prop
  const [userSubscribed, setUserSubscribed] = useState(user_role === 'member');
  const { isAuthenticated } = useAuth();

  // useEffect(() => {
  //   setUserSubscribed(user_role === 'member');
  // }, [user_role]);

  const changeSubStatus = async () => {
    if (!isAuthenticated) {
      showErrorToast("User not logged in.")
      return;
    }
    if (userSubscribed) {
      await unsubscribeUser(subreddit_id);
      setUserSubscribed(false);  // Update state after unsubscribing
    } else {
      await subscribeUser(subreddit_id);
      setUserSubscribed(true);   // Update state after subscribing
    }
  };

  return (
    <div className="mt-4 flex flex-col space-y-3 text-lg text-white font-serif">
      {/* Create Post Button */}
      <Link 
        className="p-1 bg-green-600 rounded-md hover:bg-green-700 text-center transition"
        href={`/create_post?sub_name=${sub_name}`}
      >
        Create Post
      </Link>

      {/* Subscribe/Unsubscribe Button */}
      <button 
        className={`p-1 t rounded-md  ${userSubscribed ? 'bg-red-500 hover:bg-red-500 ': 'bg-blue-500 hover:bg-blue-600'} `}
        onClick={changeSubStatus}
      >
        {userSubscribed ? 'Unsubscribe' : 'Subscribe'}  
      </button>
    </div>
  );
};

export default JoinAndCreateSub;
