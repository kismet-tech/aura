//////////////////////////////////////////////////
// REQUEST ///////////////////////////////////////
//////////////////////////////////////////////////

import { CalendarDateRange } from "@kismet_ai/foundation";
import { EitherResponseType } from "@kismet_ai/foundation";

export interface SuggestCalendarDateRangesFromConstraintsRequestDto {
  descriptionOfPotentialCalendarDates: string;
}

//////////////////////////////////////////////////
// RESPONSE //////////////////////////////////////
//////////////////////////////////////////////////

export interface SuggestCalendarDateRangesFromConstraintsSuccessResponseDataDto {
  calendarDateRanges: CalendarDateRange[];
}

export interface SuggestCalendarDateRangesFromConstraintsSuccessResponseDto {
  type: EitherResponseType.SUCCESS;

  success: SuggestCalendarDateRangesFromConstraintsSuccessResponseDataDto;
}
