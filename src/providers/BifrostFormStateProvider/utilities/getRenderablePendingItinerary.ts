import { RenderablePendingItinerary } from "@/components/bifrostForm/PendingItineraryPlanner/models/RenderablePendingItinerary";
import {
  mockRenderableSplitTextInputBifrostFormQuestionOne,
  mockRenderableSplitTextInputBifrostFormQuestionTwo,
} from "@/mockData/bifrost/bifrostFormQuestions/mockRenderableBifrostFormQuestions";
import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { ReservedBifrostFormQuestionIds } from "@/models/bifrost/BifrostFormQuestions/ReservedBifrostFormQuestionIds";
import {
  CalendarDateRange,
  PendingCalendarDateRange,
} from "@/models/core/date/CalendarDateRange";

interface GetRenderablePendingItineraryProps {
  bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
}

export const getRenderablePendingItinerary = ({
  bifrostFormQuestionsWithResponses,
}: GetRenderablePendingItineraryProps): RenderablePendingItinerary => {
  console.log(
    `getRenderablePendingItinerary bifrostFormQuestionsWithResponses: ${JSON.stringify(
      bifrostFormQuestionsWithResponses,
      null,
      4
    )}`
  );

  const maybeGuestFirstNameQuestionWithResponse:
    | BifrostFormQuestionWithResponse
    | undefined = bifrostFormQuestionsWithResponses.find(
    (bifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse) => {
      return (
        bifrostFormQuestionWithResponse.bifrostFormQuestion
          .bifrostFormQuestionId ===
        mockRenderableSplitTextInputBifrostFormQuestionOne.bifrostFormQuestionId
      );
    }
  );

  const guestFirstName: string | undefined = (
    maybeGuestFirstNameQuestionWithResponse?.responseData.responseValue as {
      left: string;
      right: string;
    }
  )?.left as string;

  const maybeCountOfHotelRoomsInItineraryQuestionWithResponse =
    bifrostFormQuestionsWithResponses.find(
      (bifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse) => {
        return (
          bifrostFormQuestionWithResponse.bifrostFormQuestion
            .bifrostFormQuestionId ===
          mockRenderableSplitTextInputBifrostFormQuestionTwo.bifrostFormQuestionId
        );
      }
    );

  const maybeCountOfHotelRoomsInItineraryString: string | undefined = (
    maybeCountOfHotelRoomsInItineraryQuestionWithResponse?.responseData
      .responseValue as {
      left: string;
      right: string;
    }
  )?.right as string;

  const countOfHotelRoomsInItinerary: number | undefined =
    maybeCountOfHotelRoomsInItineraryString
      ? parseInt(maybeCountOfHotelRoomsInItineraryString)
      : undefined;

  const maybeCalendarDateRangeQuestionWithResponse =
    bifrostFormQuestionsWithResponses.find(
      (bifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse) => {
        return (
          bifrostFormQuestionWithResponse.bifrostFormQuestion
            .bifrostFormQuestionId === ReservedBifrostFormQuestionIds.DATES
        );
      }
    );

  const pendingCalendarDateRangeInItinerary:
    | PendingCalendarDateRange
    | undefined = maybeCalendarDateRangeQuestionWithResponse
    ? (maybeCalendarDateRangeQuestionWithResponse.responseData
        .responseValue as PendingCalendarDateRange)
    : undefined;

  const calendarDateRangeInItinerary =
    pendingCalendarDateRangeInItinerary?.startCalendarDate &&
    pendingCalendarDateRangeInItinerary?.endCalendarDate
      ? (pendingCalendarDateRangeInItinerary as CalendarDateRange)
      : undefined;

  const itineraryImageUrl: string =
    "https://plus.unsplash.com/premium_photo-1661879252375-7c1db1932572?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww";

  const renderablePendingItinerary: RenderablePendingItinerary = {
    itineraryName: `${guestFirstName}'s Itinerary`,
    guestFirstName,
    countOfHotelRoomsInItinerary,
    calendarDateRangeInItinerary,
    itineraryImageUrl,
  };

  return renderablePendingItinerary;
};
