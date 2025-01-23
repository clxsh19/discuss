import Link from "next/link";
import { userRegister } from "@/lib/auth_api";

const RegisterForm = () => {

  return (
    <div className="flex w-full justify-center text-white">
    <div className="mt-10 w-full max-w-md">
      <h1 className="text-2xl font-semibold mb-6">Create Account</h1>
      <form className="space-y-6" action={userRegister}>
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
          <span>Already have an account?</span>
          <Link href="/register" className="text-blue-400 hover:underline">
              Login
            </Link>
        </div>

        {/* Submit Button */}
        <div className="text-end">
          <button
            type="submit"
            className="px-4 py-2 text-base font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Register
          </button>
        </div>
      </form>
    </div>
</div>

  );
};

export default RegisterForm;