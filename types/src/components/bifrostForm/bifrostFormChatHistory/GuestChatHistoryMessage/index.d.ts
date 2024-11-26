import React from "react";
export interface GuestChatHistoryMessageProps {
    guestName: string;
    children: React.ReactNode;
}
export declare function GuestChatHistoryMessage({ guestName, children, }: GuestChatHistoryMessageProps): React.JSX.Element;
