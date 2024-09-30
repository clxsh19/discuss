
import Link from 'next/link';
import UserDropdown from '@/components/ui/UserDropDown';
import { MenuIcon,  RedditIcon, RedditWord, SearchIcon, ChatIcon, AddIcon,} from './Icons';
import { userStatus } from '@/lib/data_api';
import LoginButton from './ui/LoginButton';

const HeaderNav = async () => {
  const authStatus: boolean = await userStatus();

  // console.log('server user status: ',authStatus);

  return (
    
    <nav className='h-10 flex flex-row mt-4'>
      <div className='flex flex-row p-2' >
        <button className='mx-2'>
          <MenuIcon />
        </button>
        <Link href="/" className='flex flex-row items-center'>
          <div className='ml-2'><RedditIcon /></div>
          <div className='mx-2'><RedditWord /></div>
        </Link>
      </div>
      <div className=' w-3/5 flex flex-row items-center border bg-slate-200 rounded-3xl shadow-sm'>
        <div className='mx-3'><SearchIcon /></div>
        <input className='w-3/5 bg-inherit outline-none text-sm placeholder:text-slate-600' type='text' placeholder='Search Reddit'/>
      </div>
      <div>
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