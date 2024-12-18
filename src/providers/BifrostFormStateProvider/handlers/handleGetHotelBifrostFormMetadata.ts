import {
  BifrostFormQuestionType,
  BifrostFormQuestionWithResponse,
  mockBifrostSelectorFormQuestionWithTextResponse,
  RenderableSelectorBifrostFormQuestion,
  ReservedBifrostFormQuestionIds,
  HotelBifrostFormMetadata,
  BifrostSelectorFormQuestionWithTextResponse,
  BifrostFormQuestionResponseType,
} from "@kismet_ai/foundation";

export interface HandleGetHotelBifrostFormMetadataProps {}

export const handleGetHotelBifrostFormMetadata =
  ({}: HandleGetHotelBifrostFormMetadataProps): HotelBifrostFormMetadata => {
    //   const currentUrl = window.location.href;
    //   console.log(`currentUrl: ${currentUrl}`); // e.g., 'http://example.com/page?name=value'

    //   const pathname = window.location.pathname;
    //   console.log(`pathname: ${pathname}`); // e.g., 'http://example.com/page?name=value'

    const hostname = window.location.hostname;
    //   const urlPathname = window.location.pathname;

    let includeExtendedStay: boolean = true;
    let hotelId: string = "mews-grand-hotel";
    let assignedSalesAgentName: string = "Jason";
    const additionalBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[] =
      [];

    if (hostname.includes("knollcroft")) {
      // hotelId = "mews-grand-hotel";

      hotelId = "nbhd";

      const renderableSelectorBifrostFormQuestionAskingLocation: RenderableSelectorBifrostFormQuestion =
        {
          type: BifrostFormQuestionType.SELECTOR,
          bifrostFormQuestionId: ReservedBifrostFormQuestionIds.STAY_LOCATION,
          chatLabel: "",
          label: "Where are you staying?",
          options: [
            {
              label: "Lincoln Park",
              value: "Lincoln Park",
              optionCategory: "Chicago",
            },
            {
              label: "Grand Beach, MI",
              value: "Grand Beach, MI",
              optionCategory: "Michigan",
            },
            {
              label: "New Buffalo, MI",
              value: "New Buffalo, MI",
              optionCategory: "Michigan",
            },
            {
              label: "Little Italy",
              value: "Little Italy",
              optionCategory: "Chicago",
            },
          ],
        };

      const renderableSelectorBifrostFormQuestionAskingLocationWithResponse: BifrostSelectorFormQuestionWithTextResponse =
        {
          responseType: BifrostFormQuestionResponseType.TEXT,
          bifrostFormQuestion:
            renderableSelectorBifrostFormQuestionAskingLocation,
          responseData: {
            type: BifrostFormQuestionResponseType.TEXT,
            responseValue: "",
          },
        };

      additionalBifrostFormQuestionsWithResponses.push(
        renderableSelectorBifrostFormQuestionAskingLocationWithResponse
      );
      assignedSalesAgentName = "Matt";
    } else if (hostname.includes("theneighborhoodhotel")) {
      hotelId = "nbhd";

      const renderableSelectorBifrostFormQuestionAskingLocation: RenderableSelectorBifrostFormQuestion =
        {
          type: BifrostFormQuestionType.SELECTOR,
          bifrostFormQuestionId: ReservedBifrostFormQuestionIds.STAY_LOCATION,
          chatLabel: "",
          label: "Where are you staying?",
          options: [
            {
              label: "Lincoln Park",
              value: "Lincoln Park",
              optionCategory: "Chicago",
            },
            {
              label: "Grand Beach, MI",
              value: "Grand Beach, MI",
              optionCategory: "Michigan",
            },
            {
              label: "New Buffalo, MI",
              value: "New Buffalo, MI",
              optionCategory: "Michigan",
            },
            {
              label: "Little Italy",
              value: "Little Italy",
              optionCategory: "Chicago",
            },
          ],
        };

      const renderableSelectorBifrostFormQuestionAskingLocationWithResponse: BifrostSelectorFormQuestionWithTextResponse =
        {
          responseType: BifrostFormQuestionResponseType.TEXT,
          bifrostFormQuestion:
            renderableSelectorBifrostFormQuestionAskingLocation,
          responseData: {
            type: BifrostFormQuestionResponseType.TEXT,
            responseValue: "",
          },
        };

      additionalBifrostFormQuestionsWithResponses.push(
        renderableSelectorBifrostFormQuestionAskingLocationWithResponse
      );
      assignedSalesAgentName = "Matt";
    } else {
      additionalBifrostFormQuestionsWithResponses.push(
        mockBifrostSelectorFormQuestionWithTextResponse
      );
    }

    console.log(
      `hotelBifrostFormMetadata: ${JSON.stringify(
        {
          hotelId,
          additionalBifrostFormQuestionsWithResponses,
          assignedSalesAgentName,
          includeExtendedStay,
        },
        null,
        4
      )}`
    );

    return {
      hotelId,
      additionalBifrostFormQuestionsWithResponses,
      assignedSalesAgentName,
      includeExtendedStay,
    };
  };
