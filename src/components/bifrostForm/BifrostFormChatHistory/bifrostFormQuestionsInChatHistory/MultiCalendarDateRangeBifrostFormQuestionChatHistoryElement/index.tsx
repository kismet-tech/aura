import { BifrostChatText } from "@/components/atoms/BifrostChatText";
import React from "react";
import { KismetChatHistoryMessage } from "../../KismetChatHistoryMessage";
import { GuestChatHistoryMessage } from "../../GuestChatHistoryMessage";
import { BifrostFormQuestionWithMultiCalendarDateRangeResponse } from "@kismet_ai/foundation";
import { renderCalendarDateRange } from "@/utilities/dates/render/renderCalendarDateRange";
import { CalendarDateRange } from "@kismet_ai/foundation";
import { RenderedCalendarDateFormat } from "@/utilities/dates/render/RenderedCalendarDateFormat";
import { RenderedCalendarDateRangeJoinFormat } from "@/utilities/dates/render/RenderedCalendarDateRangeJoinFormat";

export interface MultiCalendarDateRangeBifrostFormQuestionChatHistoryElementProps {
  guestFirstName: string;
  bifrostFormQuestionWithMultiCalendarDateRangeResponse: BifrostFormQuestionWithMultiCalendarDateRangeResponse;
  onClick: () => void;
}

export function MultiCalendarDateRangeBifrostFormQuestionChatHistoryElement({
  guestFirstName,
  bifrostFormQuestionWithMultiCalendarDateRangeResponse,
  onClick,
}: MultiCalendarDateRangeBifrostFormQuestionChatHistoryElementProps) {
  return (
    <div onClick={onClick}>
      <KismetChatHistoryMessage>
        <BifrostChatText>
          {
            bifrostFormQuestionWithMultiCalendarDateRangeResponse
              .bifrostFormQuestion.chatLabel
          }
        </BifrostChatText>
      </KismetChatHistoryMessage>

      <GuestChatHistoryMessage guestName={guestFirstName}>
        <BifrostChatText>
          {bifrostFormQuestionWithMultiCalendarDateRangeResponse.responseData.responseValue.map(
            (calendarDateRange) => {
              return (
                <div>
                  {renderCalendarDateRange({
                    calendarDateRange: calendarDateRange as CalendarDateRange,
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
              );
            }
          )}
        </BifrostChatText>
      </GuestChatHistoryMessage>
    </div>
  );
}
