import { RenderablePendingItinerary } from "@/components/bifrostForm/PendingItineraryPlanner/models/RenderablePendingItinerary";
import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { ReservedBifrostFormQuestionIds } from "@/models/BifrostFormQuestions/ReservedBifrostFormQuestionIds";
import { CalendarDateRange } from "@/models/core/date/CalendarDateRange";

interface GetRenderablePendingItineraryProps {
  bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
}

export const getRenderablePendingItinerary = ({
  bifrostFormQuestionsWithResponses,
}: GetRenderablePendingItineraryProps): RenderablePendingItinerary => {
  const maybeGuestFirstNameQuestionWithResponse =
    bifrostFormQuestionsWithResponses.find(
      (bifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse) => {
        return (
          bifrostFormQuestionWithResponse.bifrostFormQuestion
            .bifrostFormQuestionId === ReservedBifrostFormQuestionIds.FIRST_NAME
        );
      }
    );

  const guestFirstName: string | undefined =
    maybeGuestFirstNameQuestionWithResponse?.responseData
      .responseValue as string;

  const maybeCountOfHotelRoomsInItineraryQuestionWithResponse =
    bifrostFormQuestionsWithResponses.find(
      (bifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse) => {
        return (
          bifrostFormQuestionWithResponse.bifrostFormQuestion
            .bifrostFormQuestionId ===
          ReservedBifrostFormQuestionIds.COUNT_OF_ROOMS_NEEDED
        );
      }
    );

  const countOfHotelRoomsInItinerary: number | undefined =
    maybeCountOfHotelRoomsInItineraryQuestionWithResponse
      ? parseInt(
          maybeCountOfHotelRoomsInItineraryQuestionWithResponse.responseData
            .responseValue as string
        )
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

  const calendarDateRangeInItinerary: CalendarDateRange | undefined =
    maybeCalendarDateRangeQuestionWithResponse
      ? (maybeCalendarDateRangeQuestionWithResponse.responseData
          .responseValue as CalendarDateRange)
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
