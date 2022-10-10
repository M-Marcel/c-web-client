import * as React from "react";

const TezozIcon = (props) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17.9 19.68A9.41 9.41 0 0 1 11.42 22c-5.17-.14-9.2-4.59-9.2-9.76V5.21c0-.45.54-.67.85-.35L17.9 19.68ZM6.22 4.3A9.332 9.332 0 0 1 12.65 2c5.13.14 9.12 4.55 9.12 9.68v6.96c0 .45-.54.67-.85.35L6.22 4.3Z"
      fill={props.color || "#B9B9C0"}
    />
  </svg>
);

export default TezozIcon;
