// UpvoteIcon.js
export const UpvoteIcon = ({ color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill={color}  // Use the color prop here
    viewBox="0 0 20 20"
  >
    <path d="M12.877 19H7.123A1.125 1.125 0 0 1 6 17.877V11H2.126a1.114 1.114 0 0 1-1.007-.7 1.249 1.249 0 0 1 .171-1.343L9.166.368a1.128 1.128 0 0 1 1.668.004l7.872 8.581a1.25 1.25 0 0 1 .176 1.348 1.113 1.113 0 0 1-1.005.7H14v6.877A1.125 1.125 0 0 1 12.877 19ZM7.25 17.75h5.5v-8h4.934L10 1.31 2.258 9.75H7.25v8ZM2.227 9.784l-.012.016c.01-.006.014-.01.012-.016Z" />
  </svg>
);

// DownvoteIcon.js
export const DownvoteIcon = ({ color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill={color} // Set fill to none at the SVG level
    viewBox="0 0 20 20"
>
    <path d="M10 20a1.122 1.122 0 0 1-.834-.372l-7.872-8.581A1.251 1.251 0 0 1 1.118 9.7 1.114 1.114 0 0 1 2.123 9H6V2.123A1.125 1.125 0 0 1 7.123 1h5.754A1.125 1.125 0 0 1 14 2.123V9h3.874a1.114 1.114 0 0 1 1.007.7 1.25 1.25 0 0 1-.171 1.345l-7.876 8.589A1.128 1.128 0 0 1 10 20Zm-7.684-9.75L10 18.69l7.741-8.44H12.75v-8h-5.5v8H2.316Zm15.469-.05c-.01 0-.014.007-.012.013l.012-.013Z" />  // Set the path fill to lime
</svg>

);


export const CommentIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="currentColor"
    aria-hidden="true"
    className="icon-comment"
  >
    <path d="M7.725 19.872a.718.718 0 0 1-.607-.328.725.725 0 0 1-.118-.397V16H3.625A2.63 2.63 0 0 1 1 13.375v-9.75A2.629 2.629 0 0 1 3.625 1h12.75A2.63 2.63 0 0 1 19 3.625v9.75A2.63 2.63 0 0 1 16.375 16h-4.161l-4 3.681a.725.725 0 0 1-.489.191ZM3.625 2.25A1.377 1.377 0 0 0 2.25 3.625v9.75a1.377 1.377 0 0 0 1.375 1.375h4a.625.625 0 0 1 .625.625v2.575l3.3-3.035a.628.628 0 0 1 .424-.165h4.4a1.377 1.377 0 0 0 1.375-1.375v-9.75a1.377 1.377 0 0 0-1.374-1.375H3.625Z" />
  </svg>
)

export const ShareIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="currentColor"
    aria-hidden="true"
    className="icon-share"
  >
    <path d="m18.8 8.286-6.466-7.064a.759.759 0 0 0-1.295.537v3.277C5.623 5.365 1 9.918 1 15.082v2.907h1.274C2.516 15 5.81 12.62 9.834 12.62h1.205v3.226a.757.757 0 0 0 1.315.515l6.422-7.021A.756.756 0 0 0 19 8.8a.736.736 0 0 0-.2-.514Zm-6.508 6.3V12a.625.625 0 0 0-.625-.625H9.834A9.436 9.436 0 0 0 2.26 14.7c.228-4.536 4.525-8.435 9.4-8.435a.626.626 0 0 0 .625-.625V3.023L17.576 8.8l-5.284 5.786Zm5.586-6.107a.176.176 0 0 0-.023.024.171.171 0 0 1 .02-.028l.003.004Zm-.011.642a.53.53 0 0 0-.003-.004l.003.004Z" />
  </svg>
)

export const RedditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlSpace="preserve"
    width={30}
    height={30}
    viewBox="0 0 216 216"
  >
    <defs>
      <radialGradient
        id="snoo-radial-gragient"
        cx={169.75}
        cy={92.19}
        r={50.98}
        fx={169.75}
        fy={92.19}
        gradientTransform="matrix(1 0 0 .87 0 11.64)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopColor="#feffff" />
        <stop offset={0.4} stopColor="#feffff" />
        <stop offset={0.51} stopColor="#f9fcfc" />
        <stop offset={0.62} stopColor="#edf3f5" />
        <stop offset={0.7} stopColor="#dee9ec" />
        <stop offset={0.72} stopColor="#d8e4e8" />
        <stop offset={0.76} stopColor="#ccd8df" />
        <stop offset={0.8} stopColor="#c8d5dd" />
        <stop offset={0.83} stopColor="#ccd6de" />
        <stop offset={0.85} stopColor="#d8dbe2" />
        <stop offset={0.88} stopColor="#ede3e9" />
        <stop offset={0.9} stopColor="#ffebef" />
      </radialGradient>
      <radialGradient
        xlinkHref="#snoo-radial-gragient"
        id="snoo-radial-gragient-2"
        cx={47.31}
        r={50.98}
        fx={47.31}
      />
      <radialGradient
        xlinkHref="#snoo-radial-gragient"
        id="snoo-radial-gragient-3"
        cx={109.61}
        cy={85.59}
        r={153.78}
        fx={109.61}
        fy={85.59}
        gradientTransform="matrix(1 0 0 .7 0 25.56)"
      />
      <radialGradient
        id="snoo-radial-gragient-4"
        cx={-6.01}
        cy={64.68}
        r={12.85}
        fx={-6.01}
        fy={64.68}
        gradientTransform="matrix(1.07 0 0 1.55 81.08 27.26)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopColor="#f60" />
        <stop offset={0.5} stopColor="#ff4500" />
        <stop offset={0.7} stopColor="#fc4301" />
        <stop offset={0.82} stopColor="#f43f07" />
        <stop offset={0.92} stopColor="#e53812" />
        <stop offset={1} stopColor="#d4301f" />
      </radialGradient>
      <radialGradient
        xlinkHref="#snoo-radial-gragient-4"
        id="snoo-radial-gragient-5"
        cx={-73.55}
        cy={64.68}
        r={12.85}
        fx={-73.55}
        fy={64.68}
        gradientTransform="matrix(-1.07 0 0 1.55 62.87 27.26)"
      />
      <radialGradient
        id="snoo-radial-gragient-6"
        cx={107.93}
        cy={166.96}
        r={45.3}
        fx={107.93}
        fy={166.96}
        gradientTransform="matrix(1 0 0 .66 0 57.4)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0} stopColor="#172e35" />
        <stop offset={0.29} stopColor="#0e1c21" />
        <stop offset={0.73} stopColor="#030708" />
        <stop offset={1} />
      </radialGradient>
      <radialGradient
        xlinkHref="#snoo-radial-gragient"
        id="snoo-radial-gragient-7"
        cx={147.88}
        cy={32.94}
        r={39.77}
        fx={147.88}
        fy={32.94}
        gradientTransform="matrix(1 0 0 .98 0 .54)"
      />
      <radialGradient
        id="snoo-radial-gragient-8"
        cx={131.31}
        cy={73.08}
        r={32.6}
        fx={131.31}
        fy={73.08}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.48} stopColor="#7a9299" />
        <stop offset={0.67} stopColor="#172e35" />
        <stop offset={0.75} />
        <stop offset={0.82} stopColor="#172e35" />
      </radialGradient>
      <style>
        {
          ".snoo-cls-11,.snoo-cls-9{stroke-width:0}.snoo-cls-9{fill:#842123}.snoo-cls-11{fill:#ffc49c}"
        }
      </style>
    </defs>
    <path
      d="M108 0C48.35 0 0 48.35 0 108c0 29.82 12.09 56.82 31.63 76.37l-20.57 20.57C6.98 209.02 9.87 216 15.64 216H108c59.65 0 108-48.35 108-108S167.65 0 108 0Z"
      style={{
        fill: "#ff4500",
        strokeWidth: 0,
      }}
    />
    <circle
      cx={169.22}
      cy={106.98}
      r={25.22}
      style={{
        strokeWidth: 0,
        fill: "url(#snoo-radial-gragient)",
      }}
    />
    <circle
      cx={46.78}
      cy={106.98}
      r={25.22}
      style={{
        fill: "url(#snoo-radial-gragient-2)",
        strokeWidth: 0,
      }}
    />
    <ellipse
      cx={108.06}
      cy={128.64}
      rx={72}
      ry={54}
      style={{
        fill: "url(#snoo-radial-gragient-3)",
        strokeWidth: 0,
      }}
    />
    <path
      d="M86.78 123.48c-.42 9.08-6.49 12.38-13.56 12.38s-12.46-4.93-12.04-14.01c.42-9.08 6.49-15.02 13.56-15.02s12.46 7.58 12.04 16.66Z"
      style={{
        fill: "url(#snoo-radial-gragient-4)",
        strokeWidth: 0,
      }}
    />
    <path
      d="M129.35 123.48c.42 9.08 6.49 12.38 13.56 12.38s12.46-4.93 12.04-14.01c-.42-9.08-6.49-15.02-13.56-15.02s-12.46 7.58-12.04 16.66Z"
      style={{
        fill: "url(#snoo-radial-gragient-5)",
        strokeWidth: 0,
      }}
    />
    <ellipse
      cx={79.63}
      cy={116.37}
      className="snoo-cls-11"
      rx={2.8}
      ry={3.05}
    />
    <ellipse
      cx={146.21}
      cy={116.37}
      className="snoo-cls-11"
      rx={2.8}
      ry={3.05}
    />
    <path
      d="M108.06 142.92c-8.76 0-17.16.43-24.92 1.22-1.33.13-2.17 1.51-1.65 2.74 4.35 10.39 14.61 17.69 26.57 17.69s22.23-7.3 26.57-17.69c.52-1.23-.33-2.61-1.65-2.74-7.77-.79-16.16-1.22-24.92-1.22Z"
      style={{
        fill: "url(#snoo-radial-gragient-6)",
        strokeWidth: 0,
      }}
    />
    <circle
      cx={147.49}
      cy={49.43}
      r={17.87}
      style={{
        fill: "url(#snoo-radial-gragient-7)",
        strokeWidth: 0,
      }}
    />
    <path
      d="M107.8 76.92c-2.14 0-3.87-.89-3.87-2.27 0-16.01 13.03-29.04 29.04-29.04 2.14 0 3.87 1.73 3.87 3.87s-1.73 3.87-3.87 3.87c-11.74 0-21.29 9.55-21.29 21.29 0 1.38-1.73 2.27-3.87 2.27Z"
      style={{
        fill: "url(#snoo-radial-gragient-8)",
        strokeWidth: 0,
      }}
    />
    <path
      d="M62.82 122.65c.39-8.56 6.08-14.16 12.69-14.16 6.26 0 11.1 6.39 11.28 14.33.17-8.88-5.13-15.99-12.05-15.99s-13.14 6.05-13.56 15.2c-.42 9.15 4.97 13.83 12.04 13.83h.52c-6.44-.16-11.3-4.79-10.91-13.2ZM153.3 122.65c-.39-8.56-6.08-14.16-12.69-14.16-6.26 0-11.1 6.39-11.28 14.33-.17-8.88 5.13-15.99 12.05-15.99 7.07 0 13.14 6.05 13.56 15.2.42 9.15-4.97 13.83-12.04 13.83h-.52c6.44-.16 11.3-4.79 10.91-13.2Z"
      className="snoo-cls-9"
    />
  </svg>
)

export const RedditWord = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-[20px]"
    style={{
      color: "var(--shreddit-color-wordmark)",
    }}
    viewBox="0 0 514 149"
  >
    <g
      style={{
        fill: "currentColor",
      }}
    >
      <path d="M71.62 45.92 59.61 74.48c-1.51-.76-5.11-1.61-8.51-1.61s-6.81.85-10.12 2.46c-6.53 3.31-11.35 9.93-11.35 19.48v52.3H-.26V45.35h29.04v14.28h.57c6.81-9.08 17.21-15.79 30.74-15.79 4.92 0 9.65.95 11.54 2.08ZM65.84 96.52c0-29.41 20.15-52.68 50.32-52.68 27.33 0 46.91 19.96 46.91 48.05 0 4.92-.47 9.55-1.51 14H93.08c3.12 10.69 12.39 19.01 26.29 19.01 7.66 0 18.54-2.74 24.4-7.28l9.27 22.32c-8.61 5.86-21.75 8.7-33.29 8.7-32.25 0-53.91-20.81-53.91-52.11Zm26.67-9.36h43.03c0-13.05-8.89-19.96-19.77-19.96-12.3 0-20.62 7.94-23.27 19.96ZM419.53-.37c10.03 0 18.25 8.23 18.25 18.25s-8.23 18.25-18.25 18.25-18.25-8.23-18.25-18.25S409.51-.37 419.53-.37Zm14.94 147.49h-29.89V45.35h29.89v101.77ZM246 1.47 245.91 55h-.57c-8.23-7.85-17.12-11.07-28.75-11.07-28.66 0-47.67 23.08-47.67 52.3s17.78 52.4 46.72 52.4c12.11 0 23.55-4.16 30.93-13.62h.85v12.11h28.47V1.47H246Zm1.42 121.39h-.99l-6.67-6.93c-4.34 4.33-10.28 6.93-17.22 6.93-14.64 0-24.88-11.58-24.88-26.6s10.24-26.6 24.88-26.6 24.88 11.58 24.88 26.6v26.6ZM360.15 1.47 360.06 55h-.57c-8.23-7.85-17.12-11.07-28.75-11.07-28.66 0-47.67 23.08-47.67 52.3s17.78 52.4 46.72 52.4c12.11 0 23.55-4.16 30.93-13.62h.85v12.11h28.47V1.47h-29.89Zm1.28 121.39h-.99l-6.67-6.93c-4.34 4.33-10.28 6.93-17.22 6.93-14.64 0-24.88-11.58-24.88-26.6s10.24-26.6 24.88-26.6 24.88 11.58 24.88 26.6v26.6ZM492.44 45.35h21.85v25.44h-21.85v76.33h-29.89V70.79H440.8V45.35h21.75V17.69h29.89v27.66Z" />
    </g>
  </svg>
)
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
