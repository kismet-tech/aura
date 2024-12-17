import {
  BifrostFormQuestionWithResponse,
  mockBifrostSelectorFormQuestionWithTextResponse,
} from "@kismet_ai/foundation";

export interface HandleGetHotelBifrostFormMetadataProps {}

export interface HotelBifrostFormMetadata {
  hotelId: string;
  additionalBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
}

export const handleGetHotelBifrostFormMetadata =
  ({}: HandleGetHotelBifrostFormMetadataProps): HotelBifrostFormMetadata => {
    //   const currentUrl = window.location.href;
    //   console.log(`currentUrl: ${currentUrl}`); // e.g., 'http://example.com/page?name=value'

    //   const pathname = window.location.pathname;
    //   console.log(`pathname: ${pathname}`); // e.g., 'http://example.com/page?name=value'

    const hostname = window.location.hostname;
    //   const urlPathname = window.location.pathname;

    let hotelId: string = "mews-grand-hotel";
    const additionalBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[] =
      [];

    if (hostname === "www.knollcroft.com") {
      hotelId = "mews-grand-hotel";
    } else if (hostname.includes("theneighborhoodhotel")) {
      hotelId = "nbhd";
      additionalBifrostFormQuestionsWithResponses.push(
        mockBifrostSelectorFormQuestionWithTextResponse
      );
    } else {
      additionalBifrostFormQuestionsWithResponses.push(
        mockBifrostSelectorFormQuestionWithTextResponse
      );
    }

    return { hotelId, additionalBifrostFormQuestionsWithResponses };
  };
