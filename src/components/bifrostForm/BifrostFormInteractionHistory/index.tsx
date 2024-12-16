import {
  BifrostFormQuestionWithResponse,
  CalendarDateRange,
} from "@kismet_ai/foundation";
import React, { useCallback } from "react";
import {
  RenderedBifrostFormQuestion,
  RenderedBifrostFormQuestionProps,
} from "../bifrostFormQuestions/RenderedBifrostFormQuestion";
import { deepEqual } from "@/utilities/core/deepEqual";
import { BifrostFormQuestionResponse } from "@kismet_ai/foundation";
import { updateBifrostFormQuestionWithResponse } from "@/utilities/bifrostFormQuestions/updateBifrostFormQuestionWithResponse";

export interface BifrostFormInteractionHistoryProps {
  bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
  setBifrostFormQuestionWithResponse: ({
    updatedBifrostFormQuestionWithResponse,
  }: {
    updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
  }) => void;

  suggestCalendarDateRangesFromConstraints: ({
    descriptionOfPotentialCalendarDates,
  }: {
    descriptionOfPotentialCalendarDates: string;
  }) => Promise<CalendarDateRange[]>;
  onMountBifrostFormQuestion?: ({
    bifrostFormQuestionId,
    element,
  }: {
    bifrostFormQuestionId: string;
    element: HTMLDivElement | null;
  }) => void;
}

const MemoizedRenderedBifrostFormQuestion = React.memo(
  RenderedBifrostFormQuestion,
  (
    prevProps: Readonly<RenderedBifrostFormQuestionProps>,
    nextProps: Readonly<RenderedBifrostFormQuestionProps>
  ): boolean => deepEqual(prevProps, nextProps)
);

export function BifrostFormInteractionHistory({
  bifrostFormQuestionsWithResponses,
  setBifrostFormQuestionWithResponse,
  suggestCalendarDateRangesFromConstraints,
  onMountBifrostFormQuestion,
}: BifrostFormInteractionHistoryProps) {
  const handleSetBifrostFormQuestionResponse = useCallback(
    (
        previousBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse
      ) =>
      ({
        updatedBifrostFormQuestionResponse,
      }: {
        updatedBifrostFormQuestionResponse: BifrostFormQuestionResponse;
      }) => {
        const updatedBifrostFormQuestionWithResponse =
          updateBifrostFormQuestionWithResponse({
            previousBifrostFormQuestionWithResponse,
            updatedBifrostFormQuestionResponse,
          });

        setBifrostFormQuestionWithResponse({
          updatedBifrostFormQuestionWithResponse,
        });
      },
    [bifrostFormQuestionsWithResponses, setBifrostFormQuestionWithResponse]
  );

  return (
    <>
      {bifrostFormQuestionsWithResponses.map(
        (
          bifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse,
          index: number
        ) => {
          return (
            <div
              className="mb-4"
              key={
                bifrostFormQuestionWithResponse.bifrostFormQuestion
                  .bifrostFormQuestionId
              }
              ref={(element: HTMLDivElement | null) =>
                onMountBifrostFormQuestion?.({
                  bifrostFormQuestionId:
                    bifrostFormQuestionWithResponse.bifrostFormQuestion
                      .bifrostFormQuestionId,

                  element,
                })
              }
            >
              <MemoizedRenderedBifrostFormQuestion
                bifrostFormQuestionWithResponse={
                  bifrostFormQuestionWithResponse
                }
                setBifrostFormQuestionResponse={handleSetBifrostFormQuestionResponse(
                  bifrostFormQuestionWithResponse
                )}
                setIsResponseValid={() => {}}
                setHasQuestionBeenRespondedTo={() => {}}
                suggestCalendarDateRangesFromConstraints={
                  suggestCalendarDateRangesFromConstraints
                }
              />
            </div>
          );
        }
      )}
    </>
  );
}
