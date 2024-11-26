import React from "react";

export interface UserBadgeProps {
  name: string;
}

export function UserBadge({ name }: UserBadgeProps) {
  return (
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-stone-400 text-white font-bold">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}
