import { CalendarDateRange } from "@/models/core/date/CalendarDateRange";
import { EitherResponseType } from "@/models/core/monads";
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
