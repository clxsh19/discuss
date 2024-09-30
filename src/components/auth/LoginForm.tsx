'use client'

// import { usePathname } from 'next/navigation';
import Link from "next/link";
import { logIn } from "@/lib/auth_api";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm = ({ onSwitchToRegister }: LoginFormProps) => {

  // const pathname = usePathname();
  // console.log('Current pathname:', pathname);
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
        <form action={logIn}>
          <div>
            <input type="text" name="username" placeholder="Email or username" required />
          </div>
          <div>
            <input type="password" name="password" placeholder="Password" required />
          </div>
          <div>
            New to Reddit?
            <button onClick={onSwitchToRegister}>Register</button>
            {/* <Link href="/register">Register</Link> */}
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
