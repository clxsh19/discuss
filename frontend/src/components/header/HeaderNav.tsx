import RightSection from './RightSection';
import { DiscussLogo } from '../Icons';
import LinkHref from '../ui/LinkHref';
import Link from 'next/link';

const HeaderNav = () => {
  return (
    <div>
      <nav className="w-4/5 flex flex-row items-center mt-1 mx-auto p-2">
        {/* Left Section */}

        {/* Logo */}
        <Link href="/" className="flex items-center text-white">
          <DiscussLogo />
          <span className="text-xl font-medium ml-2">Discuss</span>
        </Link>

        {/* Create Post, Community Link and Communities Link */}
        <div className="flex items-center space-x-7 font-medium text-gray-400 text-sm ml-4 mt-1 ">
          <LinkHref
            href="/create_post"
            style='hover:underline'
            children="Create Post"
          />
          <LinkHref
            href="/create_community"
            style='hover:underline'
            children="Create Community"
          />
          <LinkHref
            href="/communities"
            style='hover:underline'
            children="Communities"
          />
        </div>

        {/* Right Section */}
        <RightSection />
      </nav>
    </div>
  );
};


export default HeaderNav;
