import SortDropDown from "./SortDropDown";
import { FeedSortingProps } from "@/interface/feed/FeedSortingProps";

const FeedSorting = ({sort, handleSortChange, isSorting}: FeedSortingProps) => {
  return (
    <div className="flex items-center space-x-0.5 mb-2 text-white">
      <button
        className={`p-2 rounded-l-lg border border-gray-800 
          ${sort === 'hot' ? 'bg-neutral-800' : 'hover:bg-neutral-900'}`}
        onClick={() => handleSortChange('hot')}
        disabled={isSorting}
      >
        Hot
      </button>
      <button
        className={`p-2 border border-gray-800
          ${sort === 'new' ? 'bg-neutral-800' : 'hover:bg-neutral-900'}`}
        onClick={() => handleSortChange('new')}
        disabled={isSorting}
      >
        New
      </button>
      <div className={`flex items-center p-2 rounded-r-lg border border-gray-800 cursor-pointer
        ${sort === 'top' ? 'bg-neutral-800' : 'hover:bg-neutral-900'}`}>
        <SortDropDown onSortChange={handleSortChange} isSorting={isSorting}/>
      </div>
    </div>
  )
}

export default FeedSorting;
