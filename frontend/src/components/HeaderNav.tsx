
import Link from 'next/link';
import UserDropdown from '@/components/ui/UserDropDown';
import { DiscussLogo} from './Icons';
import { userData } from '@/lib/data_api';
import LoginButton from './ui/LoginButton';
import CreateSubredditButton from './subreddit/create_subreddit/CreateSubredditButton';

const HeaderNav = async () => {
  const user = await userData();

  return (
    <div>
      <nav className="w-4/5 flex flex-row items-center mx-auto my-1 p-2">
        {/* Logo */}
        <Link href="/" className="flex items-center text-white">
            <DiscussLogo />
            <span className="text-xl font-medium ml-2">Discuss</span>
          </Link>
        {/* Left Section */}
        <div className="flex items-center space-x-3 font-medium text-gray-400 text-sm ml-4 mt-1">
          {/* Create Post and Community */}
          <Link href="/" className="">
            Create Post
          </Link>
          <Link href="/" className="">
            Create Community
          </Link>
        </div>

        {/* Right Section */}
        <div className="ml-auto">
          {user.status ? (
            <UserDropdown />
          ) : (
            <div className="flex items-center space-x-4 text-sm font-medium text-gray-400 mt-1">
              {/* Login And SignUp */}
              <Link href="/" className="">
                Login
              </Link>
              <Link href="/" className="">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};


export default HeaderNav;