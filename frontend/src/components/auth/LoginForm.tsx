'use client'

import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { logIn } from "@/lib/auth_api";

interface LoginFormProps {
  onSwitchToRegister?: () => void;
}

const LoginForm = ({ onSwitchToRegister }: LoginFormProps) => {
  const { updateAuthStatus } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await logIn(formData);
    console.log(result);
    if (result) {
      console.log('login callback  succesuful');
      updateAuthStatus();
      router.replace(`${pathname}`);
      router.refresh();
    }
  }

  return (
    <div className="bg-white h-full w-full rounded-[15px] p-[15px]">
      {/* <div></div>to add later */}
      <div>
        <h1>Log In</h1>
        <p>
          By continuing, you agree to our
          <a href="#">User Agreement</a>
          and acknowledge that you understand the
          <a href="#">Privacy Policy</a>
        </p>
        <div>Continue with Google</div>
        <div>
          <hr />
          <div>OR</div>
          <hr />
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" name="username" placeholder="Email or username" required />
          </div>
          <div>
            <input type="password" name="password" placeholder="Password" required />
          </div>

          <input type="hidden" name="pathname" value={pathname} />
          
          <div>
            New to Reddit?
            {onSwitchToRegister ? (
              <button onClick={onSwitchToRegister}>Register</button>
            ) : (
              <Link href="/register">Register</Link>
            )}
          </div>

          <div>
            <button type="submit">Log In</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
