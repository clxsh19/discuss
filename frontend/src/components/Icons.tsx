// UpvoteIcon.js
export const UpvoteIcon = ({ style = "" }) => (
  <svg
    width={28}
    height={28}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    transform="rotate(180)"
    className={style}
  >
    <g strokeWidth={0} />
    <g strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M12 7v8m-4-3 4 4 4-4"
      stroke= "currentColor"
      strokeWidth={2.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const DownvoteIcon = ({ style = "" }) => (
  <svg
    width={28}
    height={28}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transform rotate-360 ${style}`}
  >
    <g strokeWidth={0} />
    <g strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M12 7v8m-4-3 4 4 4-4"
      stroke= "currentColor"
      strokeWidth={2.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CommentIcon = () => (
  <svg
    fill="#fff"
    width={14}
    height={14}
    viewBox="0 0 1920 1920"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#fff"
  >
    <g strokeWidth={0} />
    <g strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M1662.178 0v1359.964h-648.703l-560.154 560.154v-560.154H0V0zM1511.07 151.107H151.107v1057.75h453.321v346.488l346.489-346.488h560.154zM906.794 755.55v117.53H453.32V755.55zm302.063-302.365v117.529H453.32V453.185h755.536Z"
      fillRule="evenodd"
    />
  </svg>
)

export const LinkIcon = ({ style = ""}) => (
  <svg
    viewBox="0 0 24 24"
    width={14}
    height={14}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={style}
  >
    <g strokeWidth={0} />
    <g strokeLinecap="round" strokeLinejoin="round" />
    <g stroke="#FFF" strokeWidth={1.5} strokeLinecap="round">
      <path d="M15.197 3.355c1.673-1.68 4.25-1.816 5.757-.305s1.37 4.1-.303 5.78l-2.424 2.433M10.047 14c-1.507-1.512-1.37-4.1.302-5.779L12.5 6.062" />
      <path d="M13.954 10c1.506 1.512 1.37 4.1-.303 5.779l-2.424 2.433-2.424 2.433c-1.673 1.68-4.25 1.816-5.757.305s-1.37-4.1.303-5.78l2.424-2.433" />
    </g>
  </svg>
)
export const ShareIcon = () => (
  <svg
    width={18}
    height={18}
    viewBox="0 -0.5 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#fff"
    strokeWidth={0}
  >

    <g strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M12.5 6.25a.75.75 0 0 0 0-1.5zm7.75 6.25a.75.75 0 0 0-1.5 0zm-.75-6.25a.75.75 0 0 0 0-1.5zm-4.088-1.5a.75.75 0 0 0 0 1.5zm4.838.75a.75.75 0 0 0-1.5 0zm-1.5 4.141a.75.75 0 0 0 1.5 0zm1.28-3.61a.75.75 0 0 0-1.06-1.061zm-8.06 5.939a.75.75 0 1 0 1.06 1.06zm.53-7.22h-3v1.5h3zm-3 0A4.75 4.75 0 0 0 4.75 9.5h1.5A3.25 3.25 0 0 1 9.5 6.25zM4.75 9.5v6h1.5v-6zm0 6a4.75 4.75 0 0 0 4.75 4.75v-1.5a3.25 3.25 0 0 1-3.25-3.25zm4.75 4.75h6v-1.5h-6zm6 0a4.75 4.75 0 0 0 4.75-4.75h-1.5a3.25 3.25 0 0 1-3.25 3.25zm4.75-4.75v-3h-1.5v3zM19.5 4.75h-4.088v1.5H19.5zm-.75.75v4.141h1.5V5.5zm.22-.53-7 7 1.06 1.06 7-7z"
      fill="#fff"
    />
  </svg>
)

export const DiscussLogo = () => (
  <svg
    width={24}
    height={24}
    viewBox="-1.44 -1.44 26.88 26.88"
    xmlns="http://www.w3.org/2000/svg"
    fill="#fff"
    stroke="#fff"
    strokeWidth={0}
  >
    <g />
    <g
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="#000"
      strokeWidth={0.144}
    />
    <path fill="none" d="M0 0h24v24H0z" stroke="none" />
    <path
      d="M16.8 19 14 22.5 11.2 19H6a1 1 0 0 1-1-1V7.103a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1zM2 2h17v2H3v11H1V3a1 1 0 0 1 1-1z"
      stroke="none"
    />
  </svg>
);
 
export const MenuIcon= () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={20}
    fill="currentColor"
  >
    <path d="M19 10.625H1v-1.25h18v1.25Zm0-7.875H1V4h18V2.75ZM19 16H1v1.25h18V16Z" />
  </svg>
)

export const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="currentColor"
    aria-hidden="true"
    viewBox="0 0 20 20"
  >
    <path d="M19.5 18.616 14.985 14.1a8.528 8.528 0 1 0-.884.884l4.515 4.515.884-.884ZM1.301 8.553a7.253 7.253 0 1 1 7.252 7.253 7.261 7.261 0 0 1-7.252-7.253Z" />
  </svg>
)

export const ChatIcon = (type: "small" | "big") => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="currentColor"
  >
    <path d="M11.61 19.872a10.013 10.013 0 0 0 6.51-4.035A9.999 9.999 0 0 0 12.275.264 10 10 0 0 0 8.372.132a10.05 10.05 0 0 0-8.25 8.311 9.877 9.877 0 0 0 1.202 6.491l-1.24 4.078a.727.727 0 0 0 .178.721.72.72 0 0 0 .72.19l4.17-1.193A9.87 9.87 0 0 0 9.998 20c.54 0 1.079-.043 1.612-.128ZM1.558 18.458l1.118-3.69-.145-.24A8.647 8.647 0 0 1 1.36 8.634a8.778 8.778 0 0 1 7.21-7.27 8.765 8.765 0 0 1 8.916 3.995 8.748 8.748 0 0 1-2.849 12.09 8.763 8.763 0 0 1-3.22 1.188 8.68 8.68 0 0 1-5.862-1.118l-.232-.138-3.764 1.076ZM6.006 9a1.001 1.001 0 0 0-.708 1.707A1 1 0 1 0 6.006 9Zm4.002 0a1.001 1.001 0 0 0-.195 1.981 1 1 0 1 0 .195-1.98Zm4.003 0a1.001 1.001 0 1 0 0 2.003 1.001 1.001 0 0 0 0-2.003Z" />
  </svg>
)

export const AddIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="currentColor"
  >
    <path d="M19 9.375h-8.375V1h-1.25v8.375H1v1.25h8.375V19h1.25v-8.375H19v-1.25Z" />
  </svg>
)

export const BellIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="currentColor"
  >
    <path d="M11 18h1a2 2 0 0 1-4 0h3Zm8-3.792v.673A1.12 1.12 0 0 1 17.883 16H2.117A1.12 1.12 0 0 1 1 14.881v-.673a3.947 3.947 0 0 1 1.738-3.277A2.706 2.706 0 0 0 3.926 8.7V7.087a6.07 6.07 0 0 1 12.138 0l.01 1.613a2.7 2.7 0 0 0 1.189 2.235A3.949 3.949 0 0 1 19 14.208Zm-1.25 0a2.7 2.7 0 0 0-1.188-2.242A3.956 3.956 0 0 1 14.824 8.7V7.088a4.819 4.819 0 1 0-9.638 0v1.615a3.956 3.956 0 0 1-1.738 3.266 2.7 2.7 0 0 0-1.198 2.239v.542h15.5v-.542Z" />
  </svg>
)

export const CircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="currentColor"
    className="avatar leading-normal text-center"
    viewBox="0 0 20 20"
  >
    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm.059 5a3.229 3.229 0 1 1 0 6.458 3.229 3.229 0 0 1 0-6.458ZM3.85 16.216a5.32 5.32 0 0 1 5.007-3.162h2.286a5.324 5.324 0 0 1 5.008 3.161 8.73 8.73 0 0 1-12.3 0l-.001.001Z" />
  </svg>
)
