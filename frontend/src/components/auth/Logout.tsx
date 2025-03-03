'use client'

import { showErrorToast } from "../ui/toasts";
import { userLogout } from "@/lib/auth_api";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
const Logout = () => {
  console.log("Component rendered")
  const router = useRouter();
  const [isLogout, setIsLogout ] = useState(false);

  useEffect(() => {
    console.log("reload", isLogout);
  }, [isLogout]); 
  

  const logOut = async () => {
    try {
      const res = await userLogout();
      console.log(res);
      if (!res.error && res.message) {
        setIsLogout(prevState => {
          console.log("Previous State:", prevState); // Logs old value
          return true;
        });
        
      } else {
        showErrorToast(res.error);
      }
    } catch (error) {
      console.error("logout failed", error);
      showErrorToast("An unexpected error occurred!");
    }
  };
  

  return (
    <div onClick={logOut}>Logout</div>
  )
}

export default Logout;
