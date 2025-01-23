
import Link from 'next/link';
import UserDropdown from './ui/UserDropDown';
import { DiscussLogo} from './Icons';
import { userData } from '@/lib/data_api';

const HeaderNav = async () => {
  const data = await userData();

  return (
    <div>
      <nav className="w-4/5 flex flex-row items-center mt-1 mx-auto p-2">
        {/* Logo */}
        <Link href="/" className="flex items-center text-white">
            <DiscussLogo />
            <span className="text-xl font-medium ml-2">Discuss</span>
          </Link>
        {/* Left Section */}
        <div className="flex items-center space-x-3 font-medium text-gray-400 text-sm ml-4 mt-1">
          {/* Create Post and Community */}
          <Link href="/create_post" className="">
            Create Post
          </Link>
          <Link href="/" className="">
            Create Community
          </Link>
        </div>

        {/* Right Section */}
        <div className="ml-auto">
          {(data.status && data.user) ? (
            <UserDropdown username={data.user.username} />
          ) : (
            <div className="flex items-center space-x-4 text-sm font-medium text-gray-400 mt-1">
              {/* Login And SignUp */}
              <Link href="/login" className="">
                Login
              </Link>
              <Link href="/register" className="">
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