import React from "react";

export type RotatingKismetLogoProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export function RotatingKismetLogo(props: RotatingKismetLogoProps) {
  const url =
    "https://storage.googleapis.com/kismet-assets/rotating_logo_icon.gif";

  return <img src={url} {...props} />;
}
