import { BifrostChatText } from "@/components/atoms/BifrostChatText";
import React from "react";
import { KismetChatHistoryMessage } from "../../KismetChatHistoryMessage";
import { GuestChatHistoryMessage } from "../../GuestChatHistoryMessage";
import { BifrostFormQuestionWithCalendarDateRangeResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { renderCalendarDateRange } from "@/utilities/dates/render/renderCalendarDateRange";
import { CalendarDateRange } from "@/models/core/date/CalendarDateRange";
import { RenderedCalendarDateFormat } from "@/utilities/dates/render/RenderedCalendarDateFormat";
import { RenderedCalendarDateRangeJoinFormat } from "@/utilities/dates/render/RenderedCalendarDateRangeJoinFormat";

export interface CalendarDateRangeBifrostFormQuestionChatHistoryElementProps {
  guestFirstName: string;
  bifrostFormQuestionWithCalendarDateRangeResponse: BifrostFormQuestionWithCalendarDateRangeResponse;
  onClick: () => void;
}

export function CalendarDateRangeBifrostFormQuestionChatHistoryElement({
  guestFirstName,
  bifrostFormQuestionWithCalendarDateRangeResponse,
  onClick,
}: CalendarDateRangeBifrostFormQuestionChatHistoryElementProps) {
  return (
    <div onClick={onClick}>
      <KismetChatHistoryMessage>
        <BifrostChatText>
          {
            bifrostFormQuestionWithCalendarDateRangeResponse.bifrostFormQuestion
              .chatLabel
          }
        </BifrostChatText>
      </KismetChatHistoryMessage>

      <GuestChatHistoryMessage guestName={guestFirstName}>
        <BifrostChatText>
          <div>
            {renderCalendarDateRange({
              calendarDateRange:
                bifrostFormQuestionWithCalendarDateRangeResponse.responseData
                  .responseValue as CalendarDateRange,
              renderedCalendarDateFormat:
                RenderedCalendarDateFormat.ABBREVIATED_MONTH_DAY_OPTIONAL_YEAR,
              renderedCalendarDateRangeJoinFormat:
                RenderedCalendarDateRangeJoinFormat.SPACE_DASH_SPACE,
              collapseStrategy: {
                collapseSameDay: true,
                collapseSameMonth: false,
              },
            })}
          </div>
        </BifrostChatText>
      </GuestChatHistoryMessage>
    </div>
  );
}
