import { CalendarDateRange } from "@kismet_ai/foundation";
import { EitherResponseType } from "@kismet_ai/foundation";
export interface SuggestCalendarDateRangesFromConstraintsRequestDto {
    descriptionOfPotentialCalendarDates: string;
}
export interface SuggestCalendarDateRangesFromConstraintsSuccessResponseDataDto {
    calendarDateRanges: CalendarDateRange[];
}
export interface SuggestCalendarDateRangesFromConstraintsSuccessResponseDto {
    type: EitherResponseType.SUCCESS;
    success: SuggestCalendarDateRangesFromConstraintsSuccessResponseDataDto;
}
