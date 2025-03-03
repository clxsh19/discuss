import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { DownIcon } from '../Icons';
import { SortDropDownProps } from "@/interface/feed/SortDropDownProps";

const SortDropDown = ({ onSortChange, isSorting }: SortDropDownProps) => {
  return (
      <DropdownMenu.Root >
        <DropdownMenu.Trigger asChild disabled={isSorting}>
          <button className="flex items-end space-x-4 outline-none">
            <span>Top</span>
            <DownIcon />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content sideOffset={10} className='ml-2 bg-neutral-950 rounded-lg' style={{ zIndex: 10 }}>
          <DropdownMenu.Item 
            className="px-4 py-2 cursor-pointer outline-none rounded-t-lg hover:bg-gray-100 focus:bg-gray-800"
            onClick={() => onSortChange('top', 'day')}
          >
            Today
          </DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item 
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer outline-none focus:bg-gray-800"
            onClick={() => onSortChange('top', 'week')}
          >
            Week
          </DropdownMenu.Item>
          <DropdownMenu.Item 
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer outline-none focus:bg-gray-800"
            onClick={() => onSortChange('top', 'month')}
          >
            Month
          </DropdownMenu.Item>
          <DropdownMenu.Item 
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer outline-none focus:bg-gray-800"
            onClick={() => onSortChange('top', 'year')}
          >
            Year
          </DropdownMenu.Item>
          <DropdownMenu.Item 
            className="px-4 py-2 cursor-pointer outline-none rounded-b-lg hover:bg-gray-100 focus:bg-gray-800"
            onClick={() => onSortChange('top', 'all')}
          >
            All Time
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    
  )
} 

export default SortDropDown;

