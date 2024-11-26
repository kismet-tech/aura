import { UserBadge } from "@/components/atoms/UserBadge";
import React from "react";

export interface KismetChatHistoryMessageProps {
  children: React.ReactNode;
}

export function KismetChatHistoryMessage({
  children,
}: KismetChatHistoryMessageProps) {
  return (
    <div className="flex items-center space-x-4 pb-4 mr-8">
      <div className="shrink-0">
        <UserBadge name="Kismet" />
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
}
