import { SwitchPostTypeProps } from "@/interface/create/CreatePostProps"

const SwitchPostType = ({
  postType,
  handleChange
} : SwitchPostTypeProps) => {
  const activeStyle = "border-b-2 border-blue-500 font-medium";
  return (
    <div className="mb-4">
      <div className="flex space-x-4">
        <button 
          className={`py-2 px-4 ${postType === 'TEXT' ? activeStyle : 'text-gray-500'}`}
          onClick={() => handleChange('TEXT')}
        >
          Text
        </button>
        <button 
          className={`py-2 px-4 ${postType === 'MEDIA' ? activeStyle : 'text-gray-500'}`}
          onClick={() => handleChange('MEDIA')}
        >
            Media
        </button>
        <button 
          className={`py-2 px-4 ${postType === 'LINK' ? activeStyle : 'text-gray-500'}`}
          onClick={() => handleChange('LINK')}
        >
          Link
        </button>
      </div>
    </div>
  )
}

export default SwitchPostType;
