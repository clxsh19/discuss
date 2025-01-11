interface SubHeaderProps {
  link_banner_url?: string,
  link_logo_url?: string,
  sub_name: string,
}

// maybe use layout in the path
const SubHeader = ({ link_banner_url, link_logo_url, sub_name} : SubHeaderProps) => {
  return (
    <div className="relative w-full h-56 bg-white">
      {/* Banner */}
      <div className="w-full h-40">
        {link_banner_url ? (
          <img src={link_banner_url} alt="Subreddit Banner" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
      </div>

      {/* Logo and Sub Name */}
      <div className="relative transform -translate-y-1/3 flex items-center space-x-4 px-4">
        <div className="w-24 h-24 bg-white rounded-full border-4 border-white">
          {link_logo_url ? (
            <img src={link_logo_url} alt="Subreddit Logo" className="w-full h-full object-cover rounded-full" />
          ) : (
            <div className="w-full h-full bg-gray-300 rounded-full" />
          )}
        </div>
        <div className="text-2xl pt-8 font-bold">
          r/{sub_name}
        </div>
      </div>
    </div>
  )
}

export default SubHeader;