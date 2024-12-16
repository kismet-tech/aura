import React from "react";
import { Users as LucideUsers } from "lucide-react";

type UsersIconProps = React.ComponentProps<typeof LucideUsers>;

export function Users({ className = "w-4 h-4", ...props }: UsersIconProps) {
  return <LucideUsers className={className} {...props} />;
}
