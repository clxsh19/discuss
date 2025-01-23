'use client'

import * as React from 'react';
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Logout from '../auth/Logout';
import { DownIcon } from '../Icons';


const UserDropdown = ({username} : {username: string|undefined}) => {
  return (
    <>
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
        <DropdownMenu.Item className="px-3 py-1 cursor-pointer outline-none hover:bg-green-400 ">
          <Logout />
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item className="px-3 py-1 cursor-pointer outline-none rounded-b-lg hover:bg-green-400 ">
          Setting
        </DropdownMenu.Item>
      </DropdownMenu.Content>

    </DropdownMenu.Root>
    </>
  )

}

export default UserDropdown;