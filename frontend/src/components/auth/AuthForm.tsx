'use client';

import { useRouter } from "next/navigation";
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { showErrorToast } from '../ui/Toasts';
import TextInput from '../ui/Form/TextInput';
import Button from "../ui/Button";
import LinkHref from "../ui/LinkHref";
import AuthFormProps from '@/interface/auth/AuthFormProps';

const textInputStyle = {
  container: "flex items-center space-x-4",
  label: "w-24 text-sm font-medium text-gray-300",
  input: "flex-1 px-4 py-2 bg-neutral-800 text-gray-100 border border-neutral-600 \
          rounded-md ring-0 hover:border-white"
}

const AuthForm = ({ linkText, linkLabel, submitText, authSubmit }: AuthFormProps) => {
  const { updateAuthStatus } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const result = await authSubmit(formData);

      if (!result.error) {
        await updateAuthStatus();
        // router.refresh();
        router.back();
      } else {
        showErrorToast(result.error);
      }

    } catch {
      showErrorToast("An unexpected error occurred!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <TextInput
        name="username"
        label="Username"
        placeholder="Enter your username"
        containerStyle={textInputStyle.container}
        labelStyle={textInputStyle.label}
        inputStyle={textInputStyle.input}
      />
      <TextInput
        name="password"
        label="Password"
        placeholder="Enter your password"
        containerStyle={textInputStyle.container}
        labelStyle={textInputStyle.label}
        inputStyle={textInputStyle.input}
      />

      <div className="space-x-1 text-sm text-gray-400">
        <span>{linkText}</span>
        <LinkHref
          href={`/${linkLabel}`}
          style="text-blue-400 hover:underline"
        >
          {linkLabel}
        </LinkHref>
      </div>

      <div className="text-end">
        <Button
          type="submit"
          label={submitText}
          style="px-4 py-2 text-end font-medium text-white rounded-md bg-blue-700 hover:bg-blue-600"
          isLoading={isLoading}
        />
      </div>
    </form>
  );
};

export default AuthForm;
