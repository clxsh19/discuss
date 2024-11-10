
import Link from 'next/link';
import UserDropdown from '@/components/ui/UserDropDown';
import { MenuIcon,  RedditIcon, RedditWord, SearchIcon, ChatIcon, AddIcon,} from './Icons';
import { userStatus } from '@/lib/data_api';
import LoginButton from './ui/LoginButton';

const HeaderNav = async () => {
  const authStatus: boolean = await userStatus();

  // console.log('server user status: ',authStatus);

  return (
    
    <nav className='flex item-center justify-between flex-row pb-1.5 border bg-white'>
      <div className='mt-2 ml-4' >
        <Link href="/" className='flex flex-row items-center'>
          <div className='ml-2'><RedditIcon /></div>
          <div className='mx-2'><RedditWord /></div>
        </Link>
      </div>
      <div className=' w-5/12 mt-1 px-1 flex flex-row items-center border bg-[#ececec] rounded-3xl shadow-sm focus-within:border-blue-500'>
        <div className='mx-3'><SearchIcon /></div>
        <input className='w-3/5 bg-inherit outline-none text-sm font-normal placeholder:text-slate-400' type='text' placeholder='Search'/>
      </div>
      <div className=''>
      { authStatus ? (
           <UserDropdown/>
        ) : (
           <LoginButton />
        )
      }
      </div>
    </nav>
  )
};

export default HeaderNav;