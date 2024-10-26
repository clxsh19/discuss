'use client'

import * as React from 'react';
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Switch from '@radix-ui/react-switch';
import Logout from '../auth/Logout';
import { CircleIcon } from '../Icons';


const UserDropdown = () => {
  return (
    <>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div
            className="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center"
            aria-label="Customise options"
        > 
          <CircleIcon />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content sideOffset={5} className='z-[1]'>
        <DropdownMenu.Item className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          View Profile
        </DropdownMenu.Item>
        <DropdownMenu.Item className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          <label>
            <span >Dark Mode</span>
            <Switch.Root className="data-[state=checked]:bg-sky-500 active:data-[state=checked]:bg-sky-400 w-11 rounded-full bg-gray-700 p-px shadow-inner shadow-black/50 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 active:bg-gray-600">
              <Switch.Thumb className="data-[state=checked]:translate-x-[18px] data-[state=checked]:bg-white block h-6 w-6 rounded-full bg-gray-200 shadow-sm transition" />
            </Switch.Root>
          </label>
        </DropdownMenu.Item>
        <DropdownMenu.Item className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          <Logout />
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          Setting
        </DropdownMenu.Item>
      </DropdownMenu.Content>

    </DropdownMenu.Root>
    </>
  )

}

export default UserDropdown;