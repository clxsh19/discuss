'use client'

import { useAuth } from "../context/AuthContext";
import LinkHref from '../ui/LinkHref';
import UserDropdown from "./UserDropDown";

const RightSection = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="ml-auto">
      {( isAuthenticated && user ) ? (
        <UserDropdown username={user.username} />
      ) : (
        <div className="flex items-center space-x-4 text-sm font-medium text-gray-400 mt-1">
          {/* Login And SignUp */}
          <LinkHref 
            href="/login"
            children="Login"
          />
          <LinkHref 
            href="/register"
            children="Sign Up"
          />
        </div>
      )}
    </div>
  )
}

export default RightSection;
