export const handleGetHotelId = (): string => {
  //   const currentUrl = window.location.href;
  //   console.log(`currentUrl: ${currentUrl}`); // e.g., 'http://example.com/page?name=value'

  //   const pathname = window.location.pathname;
  //   console.log(`pathname: ${pathname}`); // e.g., 'http://example.com/page?name=value'

  const hostname = window.location.hostname;
  //   const urlPathname = window.location.pathname;

  if (hostname === "www.knollcroft.com") {
    return "mews-grand-hotel";
  } else {
    return "mews-grand-hotel";
  }
};
