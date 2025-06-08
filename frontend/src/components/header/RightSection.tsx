'use client'

import { useAuth } from "../context/AuthContext";
import LinkHref from '../ui/LinkHref';
import UserDropdown from "./UserDropDown";

const RightSection = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="ml-auto">
      {(isAuthenticated && user) ? (
        <UserDropdown username={user.username} />
      ) : (
        <div className="flex items-center space-x-4 text-sm font-medium text-gray-400 mt-1">
          {/* Login And SignUp */}
          <LinkHref
            href="/login"
          >
            {"Login"}
          </LinkHref>
          <LinkHref
            href="/register"
          >
            {"Sign Up"}
          </LinkHref>
        </div>
      )}
    </div>
  )
}

export default RightSection;
