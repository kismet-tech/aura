import React from "react";
interface GuestAuthenticationPopupProps {
    onAuthSuccess: ({ accessToken }: {
        accessToken: string;
    }) => void;
}
export declare function GuestAuthenticationPopup({ onAuthSuccess, }: GuestAuthenticationPopupProps): React.JSX.Element;
export {};
