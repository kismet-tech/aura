import React from "react";
type User = {
    name: string;
};
export interface HeaderProps {
    user?: User;
    onLogin?: () => void;
    onLogout?: () => void;
    onCreateAccount?: () => void;
}
export declare const Header: ({ user, onLogin, onLogout, onCreateAccount, }: HeaderProps) => React.JSX.Element;
export {};
