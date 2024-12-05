import React, { useState } from "react";
import { GuestAuthenticationPopup } from "./GuestAuthenticationPopup";

export interface LoginPanelProps {}

export function LoginPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleAuthSuccess = ({ accessToken }: { accessToken: string }) => {
    setIsAuthenticated(true);
    // Proceed with authenticated actions, e.g., fetch user data
  };

  const renderedAuthenticationPopup = isAuthenticated ? null : (
    <GuestAuthenticationPopup onAuthSuccess={handleAuthSuccess} />
  );

  return (
    <div className="h-full overflow-auto">
      <div>Login Button</div>
      {renderedAuthenticationPopup}
    </div>
  );
}
