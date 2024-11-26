import { BifrostChatText } from "@/components/atoms/BifrostChatText";
import React from "react";
import { KismetChatHistoryMessage } from "../../KismetChatHistoryMessage";
import { GuestChatHistoryMessage } from "../../GuestChatHistoryMessage";
import { BifrostFormQuestionWithPhoneNumberResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { formatPhoneNumber } from "@/utilities/formatting/formatPhoneNumber";

export interface PhoneInputBifrostFormQuestionChatHistoryElementProps {
  guestFirstName: string;
  bifrostFormQuestionWithPhoneNumberResponse: BifrostFormQuestionWithPhoneNumberResponse;
  onClick: () => void;
}

export function PhoneInputBifrostFormQuestionChatHistoryElement({
  guestFirstName,
  bifrostFormQuestionWithPhoneNumberResponse,
  onClick,
}: PhoneInputBifrostFormQuestionChatHistoryElementProps) {
  console.log(
    `phoneNumber: ${JSON.stringify(bifrostFormQuestionWithPhoneNumberResponse)}`
  );
  console.log(
    `phoneNumber: ${bifrostFormQuestionWithPhoneNumberResponse.responseData.responseValue}`
  );

  return (
    <div onClick={onClick}>
      <KismetChatHistoryMessage>
        <BifrostChatText>
          {
            bifrostFormQuestionWithPhoneNumberResponse.bifrostFormQuestion
              .chatLabel
          }
        </BifrostChatText>
      </KismetChatHistoryMessage>

      <GuestChatHistoryMessage guestName={guestFirstName}>
        <BifrostChatText>
          <div>
            {formatPhoneNumber({
              phoneNumber:
                bifrostFormQuestionWithPhoneNumberResponse.responseData
                  .responseValue,
            })}
          </div>
        </BifrostChatText>
      </GuestChatHistoryMessage>
    </div>
  );
}
