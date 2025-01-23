'use client'

// import { logOut } from "@/lib/auth";
import { useRouter} from "next/navigation";
import { useAuth } from '../context/AuthContext';

const Logout = () => {
  const router = useRouter();
  const { updateAuthStatus } = useAuth();
  const logOut = async() => {
    try {
      const res = await fetch('http://localhost:5000/api/user/logout', {
        method: 'POST',
        credentials: 'include',
      });
      const res_code = await res.json();
      console.log(res_code);
      updateAuthStatus();
      // router.push('/login')
      // router.refresh();
      window.location.reload();
    } catch (error) {
      console.error('logout failed');
      throw new Error('Failed to logout.');
    }
    
  }
  return (
    <div onClick={logOut}>Logout</div>
  )
}

export default Logout;