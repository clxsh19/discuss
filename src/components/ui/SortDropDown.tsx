import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface SortDropDownProps {
  onSortChange: (sort: string, timeframe?: string) => void;
}

const SortDropDown = ({ onSortChange }: SortDropDownProps) => {
  return (
    <div className="">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <div className="ml-4 py-2 rounded-md"> 
            Top
          </div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content sideOffset={5} className='bg-white' style={{ zIndex: 20 }}>
          {/* <DropdownMenu.Item 
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => onSortChange('top', 'day')}>
            Hourly
          </DropdownMenu.Item> */}
          <DropdownMenu.Item 
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => onSortChange('top', 'day')}
          >
            Today
          </DropdownMenu.Item>
          {/* <DropdownMenu.Separator /> */}
          <DropdownMenu.Item 
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => onSortChange('top', 'week')}
          >
            Week
          </DropdownMenu.Item>
          <DropdownMenu.Item 
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => onSortChange('top', 'month')}
          >
            Month
          </DropdownMenu.Item>
          <DropdownMenu.Item 
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => onSortChange('top', 'year')}
          >
            Year
          </DropdownMenu.Item>
          <DropdownMenu.Item 
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => onSortChange('top', 'all')}
          >
            All Time
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  )
} 

export default SortDropDown;

