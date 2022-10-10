import * as React from "react";

const EthIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={21}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m3.4 9.1 4.77-2.12c.21-.09.45-.09.65 0l4.77 2.12c.42.19.81-.32.52-.68l-5-6.11c-.34-.42-.9-.42-1.24 0l-5 6.11c-.28.36.11.87.53.68ZM3.4 14.9l4.78 2.12c.21.09.45.09.65 0l4.78-2.12c.42-.19.81.32.52.68l-5 6.11c-.34.42-.9.42-1.24 0l-5-6.11c-.3-.36.08-.87.51-.68ZM8.28 9.49l-4.13 2.06c-.37.18-.37.71 0 .89l4.13 2.06c.14.07.31.07.45 0l4.13-2.06c.37-.18.37-.71 0-.89L8.73 9.49a.508.508 0 0 0-.45 0Z"
      fill={props.color || "#B9B9C0"}
    />
  </svg>
);

export default EthIcon;
