'use client'

import AuthForm from "./AuthForm";
import { userRegister, userLogin } from "@/lib/auth_api";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthContainer = ({ isRegister }: { isRegister: boolean }) => {  
  const { loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/');
    }
  }, [loading, isAuthenticated]);

  if (loading || isAuthenticated) return null;

  const formConfig= {
    register: {
      heading: "Create Account",
      linkText: "Already have an account?",
      linkLabel: "login",
      submitText: "Register",
    },
    login: {
      heading: "Login to Discuss",
      linkText: "New to discuss?",
      linkLabel: "register",
      submitText: "Login",
    } 
  }
  const formContent = isRegister? formConfig["register"] : formConfig["login"];
  const authSubmit = isRegister? userRegister : userLogin;

  return (
    <div className="flex w-full justify-center text-white">
      <div className="mt-10 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6">
          {formContent.heading}
        </h1>
        <AuthForm 
          linkText={formContent.linkText}
          linkLabel={formContent.linkLabel}
          submitText={formContent.submitText}
          authSubmit={authSubmit}
        />
      </div>
    </div>
  );
};

export default AuthContainer;
