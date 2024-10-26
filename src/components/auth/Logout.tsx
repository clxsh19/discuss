'use client'

// import { logOut } from "@/lib/auth";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();
  const logOut = async() => {
    try {
      const res = await fetch('http://localhost:5000/api/user/logout', {
        method: 'POST',
        credentials: 'include',
      });
      const res_code = await res.json();
      console.log(res_code);
    } catch (error) {
      console.error('logout failed');
      throw new Error('Failed to logout.');
    }
    // router.refresh();
    router.push('/');
  }
  return (
    <div onClick={logOut}>Log Out</div>
  )
}

export default Logout;