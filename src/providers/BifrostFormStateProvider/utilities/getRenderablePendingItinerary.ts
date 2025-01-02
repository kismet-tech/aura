import { RenderablePendingItinerary } from "../../../components/bifrostForm/PendingItineraryPlanner/models/RenderablePendingItinerary";
import {
  mockRenderableSplitTextInputBifrostFormQuestionOne,
  mockRenderableSplitTextInputBifrostFormQuestionTwo,
} from "@/mockData/bifrost/bifrostFormQuestions/mockRenderableBifrostFormQuestions";
import {
  BifrostFormQuestionMultiStageSmartDateResponseValue,
  BifrostFormQuestionWithMultiStageSmartDateResponse,
  BifrostFormQuestionWithResponse,
} from "@kismet_ai/foundation";
import { ReservedBifrostFormQuestionIds } from "@kismet_ai/foundation";
import {
  CalendarDateRange,
  PendingCalendarDateRange,
} from "@kismet_ai/foundation";

interface GetRenderablePendingItineraryProps {
  bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
}

export const getRenderablePendingItinerary = ({
  bifrostFormQuestionsWithResponses,
}: GetRenderablePendingItineraryProps): RenderablePendingItinerary => {
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

  const maybeCountOfGuestsParticipatingInItineraryString: string | undefined = (
    maybeCountOfHotelRoomsInItineraryQuestionWithResponse?.responseData
      .responseValue as {
      left: string;
      right: string;
    }
  )?.left as string;

  const countOfHotelRoomsInItinerary: number | undefined =
    maybeCountOfHotelRoomsInItineraryString
      ? parseInt(maybeCountOfHotelRoomsInItineraryString)
      : undefined;

  const countOfGuestsParticipatingInItinerary: number | undefined =
    maybeCountOfGuestsParticipatingInItineraryString
      ? parseInt(maybeCountOfGuestsParticipatingInItineraryString)
      : undefined;

  const maybeCalendarDateRangeQuestionWithResponse =
    bifrostFormQuestionsWithResponses.find(
      (bifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse) => {
        return (
          bifrostFormQuestionWithResponse.bifrostFormQuestion
            .bifrostFormQuestionId ===
          ReservedBifrostFormQuestionIds.CALENDAR_DATES
        );
      }
    ) as BifrostFormQuestionWithMultiStageSmartDateResponse | undefined;

  const maybeBifrostDatesResponse:
    | BifrostFormQuestionMultiStageSmartDateResponseValue
    | undefined =
    maybeCalendarDateRangeQuestionWithResponse?.responseData.responseValue;

  const calendarDateRangesInItinerary = maybeBifrostDatesResponse
    ? (maybeBifrostDatesResponse.calendarDateRanges?.filter(
        (calendarDateRange) => {
          return (
            calendarDateRange.startCalendarDate &&
            calendarDateRange.endCalendarDate
          );
        }
      ) as CalendarDateRange[])
    : undefined;

  const itineraryImageUrl: string =
    "https://plus.unsplash.com/premium_photo-1661879252375-7c1db1932572?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww";

  console.log(
    "countOfHotelRoomsInItinerary",
    JSON.stringify(countOfHotelRoomsInItinerary, null, 4)
  );
  console.log(
    "countOfGuestsParticipatingInItinerary",
    JSON.stringify(countOfGuestsParticipatingInItinerary, null, 4)
  );

  const renderablePendingItinerary: RenderablePendingItinerary = {
    itineraryName: `${guestFirstName}'s Itinerary`,
    guestFirstName,
    countOfHotelRoomsInItinerary,
    countOfGuestsParticipatingInItinerary,
    calendarDateRangesInItinerary,
    itineraryImageUrl,
  };

  return renderablePendingItinerary;
};
