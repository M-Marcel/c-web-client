import * as React from "react";

const SecureIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="#2257E7"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2zm10-10V7a4 4 0 0 0-8 0v4h8z"
    />
  </svg>
);

export default SecureIcon;
