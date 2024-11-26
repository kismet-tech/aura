import React from "react";

export interface BifrostChatTextProps {
  children: React.ReactNode;
}

export function BifrostChatText({ children }: BifrostChatTextProps) {
  return <div>{children}</div>;
}
