import React, { useEffect } from "react";

interface GuestAuthenticationPopupProps {
  onAuthSuccess: ({ accessToken }: { accessToken: string }) => void;
}

export function GuestAuthenticationPopup({
  onAuthSuccess,
}: GuestAuthenticationPopupProps) {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // if (event.origin !== "https://www.page2.com") return;
      // console.log("event", JSON.stringify(event));
      console.log("Received message:", event.data);

      const accessToken: string | undefined = event.data.accessToken;

      if (accessToken) {
        onAuthSuccess({ accessToken });
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onAuthSuccess]);

  const firstName = `Julian`;
  const lastName = `Trajanson`;
  const email = `julian@makekismet.com`;
  const phoneNumber = `6466600326`;

  const iframeUrl = new URL("http://localhost:3000/groups/login");

  if (firstName) {
    iframeUrl.searchParams.set("first-name", firstName);
  }
  if (lastName) {
    iframeUrl.searchParams.set("last-name", lastName);
  }
  if (email) {
    iframeUrl.searchParams.set("email", email);
  }
  if (phoneNumber) {
    iframeUrl.searchParams.set("phone-number", `+1${phoneNumber}`);
  }

  return (
    <div style={{ height: "500px", width: "100%", display: "flex" }}>
      <iframe src={iframeUrl.toString()} />
    </div>
  );
}
