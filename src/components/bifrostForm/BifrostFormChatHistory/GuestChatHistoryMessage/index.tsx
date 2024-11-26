import { UserBadge } from "@/components/atoms/UserBadge";
import React from "react";

export interface GuestChatHistoryMessageProps {
  guestName: string;
  children: React.ReactNode;
}

export function GuestChatHistoryMessage({
  guestName,
  children,
}: GuestChatHistoryMessageProps) {
  return (
    <div className="flex items-center justify-end space-x-4 pb-4 ml-8">
      <div className="max-w-xs rounded-lg bg-stone-400 text-white px-4 py-2 text-right">
        {children}
      </div>
      <div className="shrink-0">
        <UserBadge name={guestName} />
      </div>
    </div>
  );
}
