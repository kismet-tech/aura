import React from "react";
import { Users as LucideUsers } from "lucide-react";

type OrnateConciergeBellProps = React.ComponentProps<typeof LucideUsers>;

export function OrnateConciergeBell({
  className = "w-4 h-4",
  ...props
}: OrnateConciergeBellProps) {
  return <LucideUsers className={className} {...props} />;
}
