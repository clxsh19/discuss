'use client'

import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { logIn } from "@/lib/auth_api";

const LoginForm = () => {
  const { updateAuthStatus } = useAuth();
  // const pathname = usePathname();
  const router = useRouter();
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await logIn(formData);
    console.log(result);
    if (result) {
      console.log('login callback  succesuful');
      updateAuthStatus();
      router.back();
      // router.replace(`${pathname}`);
      // router.refresh();
    }
  }

  return (
    <div className="flex w-full justify-center text-white">
      <div className="mt-10 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6">Login to Discuss</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="flex items-center space-x-4">
            <label
              htmlFor="username"
              className="w-24 text-sm font-medium text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              className="flex-1 px-4 py-2 text-base bg-neutral-800 text-gray-100 border border-neutral-600 rounded-md focus:ring-blue-400 focus:border-blue-400 hover:border-white"
              required
            />
          </div>

          {/* Password Field */}
          <div className="flex items-center space-x-4">
            <label
              htmlFor="password"
              className="w-24 text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              className="flex-1 px-4 py-2 text-base bg-neutral-800 text-gray-100 border border-neutral-600 rounded-md focus:ring-blue-400 focus:border-blue-400 hover:border-white"
              required
            />
          </div>

          {/* Register Link */}
          <div className="space-x-1 text-sm text-gray-400">
            <span>New to discuss?</span>
            <Link href="/register" className="text-blue-400 hover:underline">
                Create an account
              </Link>
          </div>

          {/* Submit Button */}
          <div className="text-end">
            <button
              type="submit"
              className="px-4 py-2 text-base font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
</div>

    
    
  );
};

export default LoginForm;
