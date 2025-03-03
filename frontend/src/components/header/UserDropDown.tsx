'use client'

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { DownIcon } from '../Icons';

import { useState, useEffect, useTransition } from "react";
import { userLogout } from "@/lib/auth_api";
import { showErrorToast } from "../ui/toasts";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
const UserDropdown = ({ username }: { username: string | undefined }) => {

  // const [isLogout, setIsLogout] = useState(false);
  // const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const {updateAuthStatus} = useAuth()

  // useEffect(() => {
  //   if (isLogout && !isPending) {
  //     window.location.reload();
  //   };
  // }, [isLogout, isPending]);

  const logOut = async () => {
    // startTransition(async () => {
      try {
        const res = await userLogout();
        if (!res.error && res.message) {
          // setIsLogout(true);
          await updateAuthStatus();
          // router.refresh();
          router.push("/");
        } else {
          showErrorToast(res.error);
        }
      } catch (error) {
        console.error("logout failed", error);
        showErrorToast("An unexpected error occurred!");
      }
    // })
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-end px-2 py-1 rounded-lg outline-none 
          data-[state=open]:ring-1
          data-[state=open]:ring-neutral-600 
          data-[state=closed]:ring-0">
          <span className="font-medium text-white text-sm">{username}</span>
          <DownIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content sideOffset={6} className='text-white text-sm bg-neutral-950 z-[1]'>
        <DropdownMenu.Item className="px-3 py-1 outline-none rounded-t-lg hover:bg-green-400 ">
          Profile
        </DropdownMenu.Item>
        <DropdownMenu.Item className="px-3 py-1 cursor-pointer outline-none hover:bg-green-400 "
          onClick={async (e) => {
            e.preventDefault();
            await logOut();
          }}
        >
          Logout
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item className="px-3 py-1 cursor-pointer outline-none rounded-b-lg hover:bg-green-400 ">
          Setting
        </DropdownMenu.Item>
      </DropdownMenu.Content>

    </DropdownMenu.Root>
  )

}

export default UserDropdown;
