import React from "react";

type ThreeSettingSliderProps = React.SVGProps<SVGSVGElement>;

export function ThreeSettingSlider(props: ThreeSettingSliderProps) {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.1627 22.9125C14.0627 22.9125 12.3002 21.4125 11.8877 19.425H1.6877C1.2377 19.425 0.825195 19.05 0.825195 18.5625C0.825195 18.075 1.2002 17.7 1.6877 17.7H11.8877C12.3002 15.75 14.0627 14.25 16.1627 14.25C18.2627 14.25 20.0252 15.75 20.4377 17.7375H22.6877C23.1377 17.7375 23.5502 18.1125 23.5502 18.6C23.5502 19.0875 23.1752 19.4625 22.6877 19.4625H20.4377C20.0252 21.4125 18.2627 22.9125 16.1627 22.9125ZM16.1627 15.9375C14.7002 15.9375 13.5002 17.1375 13.5002 18.5625C13.5002 19.9875 14.7002 21.1875 16.1627 21.1875C17.6252 21.1875 18.8252 19.9875 18.8252 18.5625C18.8252 17.1375 17.6252 15.9375 16.1627 15.9375ZM9.56269 16.3125C7.4627 16.3125 5.7002 14.8125 5.2877 12.825H1.6877C1.2377 12.825 0.825195 12.45 0.825195 11.9625C0.825195 11.5125 1.2002 11.1 1.6877 11.1H5.2877C5.7002 9.1125 7.4627 7.6125 9.56269 7.6125C11.6627 7.6125 13.4252 9.1125 13.8377 11.1H22.7252C23.1752 11.1 23.5877 11.475 23.5877 11.9625C23.5877 12.4125 23.2127 12.825 22.7252 12.825H13.8002C13.4252 14.8125 11.6627 16.3125 9.56269 16.3125ZM9.56269 9.375C8.10019 9.375 6.9002 10.575 6.9002 12C6.9002 13.4625 8.10019 14.625 9.56269 14.625C11.0252 14.625 12.2252 13.425 12.2252 12C12.2252 10.5375 11.0252 9.375 9.56269 9.375ZM19.2002 9.75C17.1002 9.75 15.3377 8.25 14.9252 6.2625H1.6877C1.2377 6.2625 0.825195 5.8875 0.825195 5.4C0.825195 4.9125 1.2002 4.5375 1.6877 4.5375H14.9252C15.3377 2.55 17.1002 1.05 19.2002 1.05C21.6002 1.05 23.5502 3 23.5502 5.3625C23.5502 7.725 21.6002 9.75 19.2002 9.75ZM19.2002 2.775C17.7377 2.775 16.5377 3.975 16.5377 5.4C16.5377 6.825 17.7377 8.025 19.2002 8.025C20.6627 8.025 21.8627 6.825 21.8627 5.4C21.8627 3.975 20.6627 2.775 19.2002 2.775Z"
        fill="#111928"
      />
    </svg>
  );
}