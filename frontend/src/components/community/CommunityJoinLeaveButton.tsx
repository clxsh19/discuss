"use client";

import { useState } from 'react';
import { subscribeUser, unsubscribeUser } from '@/lib/create_api';
import { useAuth } from '../context/AuthContext';
import { showErrorToast } from '../ui/Toasts';
import { CommunityJoinLeaveButtonProps } from '@/interface/community/CommunityProps';

const CommunityJoinLeaveButton = ({ subreddit_id, user_role }: CommunityJoinLeaveButtonProps) => {
  const [userSubscribed, setUserSubscribed] = useState(user_role === 'member');
  const { isAuthenticated } = useAuth();

  // useEffect(() => {
  //   setUserSubscribed(user_role === 'member');
  // }, [user_role]);

  const changeSubStatus = async () => {
    if (!isAuthenticated) {
      showErrorToast("Not Authenticated")
      return;
    }
    try {
      userSubscribed ? await unsubscribeUser(subreddit_id) : await subscribeUser(subreddit_id);
      setUserSubscribed(prev => !prev);
    } catch (err) {
      showErrorToast(`Failed to ${userSubscribed ? 'leave' : 'join'} the community`);
    }
  };

  return (
    // Subscribe and Unsubscribe button
    <button
      className={`p-1 t rounded-md  ${userSubscribed ? 'bg-red-500 hover:bg-red-500 ' : 'bg-blue-500 hover:bg-blue-600'} `}
      onClick={changeSubStatus}
    >
      {userSubscribed ? 'Unsubscribe' : 'Subscribe'}
    </button>
  );
};

export default CommunityJoinLeaveButton;
