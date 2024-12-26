import {
  BifrostFormQuestionResponse,
  CalendarDateRange,
  HotelBifrostFormMetadata,
} from "@kismet_ai/foundation";
import { BifrostFormQuestionWithResponse } from "@kismet_ai/foundation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  RenderedBifrostFormQuestion,
  RenderedBifrostFormQuestionProps,
} from "../bifrostFormQuestions/RenderedBifrostFormQuestion";
import { updateBifrostFormQuestionWithResponse } from "@/utilities/bifrostFormQuestions/updateBifrostFormQuestionWithResponse";
import { deepEqual } from "@/utilities/core/deepEqual";
import { deepClone } from "@/utilities/core/deepClone";

export interface ActiveBifrostFormQuestionsProps {
  activeBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
  bifrostFormMetadata: HotelBifrostFormMetadata;
  setBifrostFormQuestionWithResponse: ({
    updatedBifrostFormQuestionWithResponse,
  }: {
    updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
  }) => void;
  setBifrostFormQuestionIdsWithValidResponses: ({
    bifrostFormQuestionIdsWithValidResponses,
  }: {
    bifrostFormQuestionIdsWithValidResponses: string[];
  }) => void;
  setBifrostFormQuestionIdsRespondedTo: ({
    bifrostFormQuestionIdsRespondedTo,
  }: {
    bifrostFormQuestionIdsRespondedTo: string[];
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
  ): boolean => {
    return deepEqual(prevProps, nextProps);
  }
);

export function ActiveBifrostFormQuestions({
  activeBifrostFormQuestionsWithResponses,
  bifrostFormMetadata,
  setBifrostFormQuestionWithResponse,
  setBifrostFormQuestionIdsWithValidResponses,
  setBifrostFormQuestionIdsRespondedTo,
  suggestCalendarDateRangesFromConstraints,
  onMountBifrostFormQuestion,
}: ActiveBifrostFormQuestionsProps) {
  const questionIds = activeBifrostFormQuestionsWithResponses.map(
    (q) => q.bifrostFormQuestion.bifrostFormQuestionId
  );

  const [
    mapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments,
    setMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments,
  ] = useState<
    Record<
      string,
      { isResponseValid: boolean; hasQuestionBeenRespondedTo: boolean }
    >
  >({});

  console.log(
    `mapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments: ${JSON.stringify(
      mapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments,
      null,
      4
    )}`
  );

  const internalScrollRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const updatedActiveBifrostFormQuestionIds: string[] =
      activeBifrostFormQuestionsWithResponses.map(
        (q) => q.bifrostFormQuestion.bifrostFormQuestionId
      );

    const existingActiveBifrostFormQuestionIds: string[] = Object.keys(
      mapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments
    ).map((formQuestionId) => formQuestionId);

    if (
      !deepEqual(
        updatedActiveBifrostFormQuestionIds,
        existingActiveBifrostFormQuestionIds
      )
    ) {
      const updatedMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments: Record<
        string,
        { isResponseValid: boolean; hasQuestionBeenRespondedTo: boolean }
      > = updatedActiveBifrostFormQuestionIds.reduce(
        (
          accum: Record<
            string,
            { isResponseValid: boolean; hasQuestionBeenRespondedTo: boolean }
          >,
          formQuestionId
        ) => {
          accum[formQuestionId] = {
            isResponseValid: false,
            hasQuestionBeenRespondedTo: false,
          };
          return accum;
        },
        {}
      );

      setMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments(
        updatedMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments
      );
    }
  }, [
    activeBifrostFormQuestionsWithResponses,
    setMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments,
  ]);

  useEffect(() => {
    const areAllFormQuestionResponsesValid: boolean =
      Object.values(
        mapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments
      ).every(({ isResponseValid }) => isResponseValid) &&
      Object.keys(
        mapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments
      ).length > 0;

    const haveAllQuestionBeenRespondedTo: boolean =
      Object.values(
        mapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments
      ).every(
        ({ hasQuestionBeenRespondedTo }) => !!hasQuestionBeenRespondedTo
      ) &&
      Object.keys(
        mapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments
      ).length > 0;

    const bifrostFormQuestionIdsRespondedTo: string[] = Object.entries(
      mapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments
    )
      .filter(
        ([, { hasQuestionBeenRespondedTo }]) => hasQuestionBeenRespondedTo
      )
      .map(([formQuestionId]) => formQuestionId);

    const bifrostFormQuestionIdsWithValidResponses: string[] = Object.entries(
      mapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments
    )
      .filter(([, { isResponseValid }]) => isResponseValid)
      .map(([formQuestionId]) => formQuestionId);

    if (bifrostFormQuestionIdsRespondedTo.length > 0) {
      setBifrostFormQuestionIdsRespondedTo({
        bifrostFormQuestionIdsRespondedTo,
      });
    }

    setBifrostFormQuestionIdsRespondedTo({
      bifrostFormQuestionIdsRespondedTo,
    });
    setBifrostFormQuestionIdsWithValidResponses({
      bifrostFormQuestionIdsWithValidResponses,
    });
  }, [
    mapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments,
    setBifrostFormQuestionIdsWithValidResponses,
    setBifrostFormQuestionIdsRespondedTo,
  ]);

  useEffect(() => {
    Object.values(internalScrollRefs.current)
      .filter(Boolean)[0]
      ?.scrollIntoView({ behavior: "smooth", block: "end" }); // JASON may want nearest instead of end here let him decide
    console.log(
      "aabaa",
      Object.values(internalScrollRefs.current).filter(Boolean)[0]
    );
  }, questionIds);

  const handleSetIsResponseValid = useCallback(
    ({
      formQuestionId,
      isResponseValid,
    }: {
      formQuestionId: string;
      isResponseValid: boolean;
    }) => {
      setMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments(
        (
          previousMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments
        ) => {
          const updatedMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments =
            deepClone(
              previousMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments
            );

          if (
            updatedMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments[
              formQuestionId
            ] !== undefined
          ) {
            updatedMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments[
              formQuestionId
            ].isResponseValid = isResponseValid;
          }

          if (
            deepEqual(
              previousMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments,
              updatedMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments
            )
          ) {
            return previousMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments;
          }

          return updatedMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments;
        }
      );
    },
    [setMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments]
  );

  const handleSetQuestionResponseFulfillments = useCallback(
    ({
      formQuestionId,
      hasQuestionBeenRespondedTo,
    }: {
      formQuestionId: string;
      hasQuestionBeenRespondedTo: boolean;
    }) => {
      setMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments(
        (
          previousMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments
        ) => {
          const updatedMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments =
            deepClone(
              previousMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments
            );

          if (
            updatedMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments[
              formQuestionId
            ] !== undefined
          ) {
            updatedMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments[
              formQuestionId
            ].hasQuestionBeenRespondedTo = hasQuestionBeenRespondedTo;
          }

          // if (
          //   updatedMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments[
          //     formQuestionId
          //   ] === undefined
          // ) {
          //   updatedMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments[
          //     formQuestionId
          //   ] = {
          //     isResponseValid: false,
          //     hasQuestionBeenRespondedTo,
          //   };
          // } else {
          //   updatedMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments[
          //     formQuestionId
          //   ] = {
          //     ...updatedMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments[
          //       formQuestionId
          //     ],
          //     hasQuestionBeenRespondedTo,
          //   };
          // }

          // console.log(
          //   `handleSetQuestionResponseFulfillments: ${JSON.stringify(
          //     updatedMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments,
          //     null,
          //     4
          //   )}`
          // );

          if (
            deepEqual(
              previousMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments,
              updatedMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments
            )
          ) {
            return previousMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments;
          }

          return updatedMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments;
        }
      );
    },
    []
  );

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
    [
      activeBifrostFormQuestionsWithResponses,
      setBifrostFormQuestionWithResponse,
    ]
  );

  return (
    <>
      {activeBifrostFormQuestionsWithResponses.map(
        (bifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse) => {
          return (
            <div
              className="mb-1.5"
              key={
                bifrostFormQuestionWithResponse.bifrostFormQuestion
                  .bifrostFormQuestionId
              }
              ref={(element: HTMLDivElement | null) => {
                onMountBifrostFormQuestion?.({
                  bifrostFormQuestionId:
                    bifrostFormQuestionWithResponse.bifrostFormQuestion
                      .bifrostFormQuestionId,

                  element,
                });
                internalScrollRefs.current[
                  bifrostFormQuestionWithResponse.bifrostFormQuestion.bifrostFormQuestionId
                ] = element;
              }}
            >
              <MemoizedRenderedBifrostFormQuestion
                bifrostFormMetadata={bifrostFormMetadata}
                bifrostFormQuestionWithResponse={
                  bifrostFormQuestionWithResponse
                }
                setBifrostFormQuestionResponse={({
                  updatedBifrostFormQuestionResponse,
                }: {
                  updatedBifrostFormQuestionResponse: BifrostFormQuestionResponse;
                }) => {
                  console.log(
                    `MemoizedRenderedBifrostFormQuestion UPDATE: ${JSON.stringify(
                      updatedBifrostFormQuestionResponse,
                      null,
                      4
                    )}`
                  );

                  handleSetBifrostFormQuestionResponse(
                    bifrostFormQuestionWithResponse
                  )({ updatedBifrostFormQuestionResponse });
                }}
                setIsResponseValid={({
                  isResponseValid,
                }: {
                  isResponseValid: boolean;
                }) =>
                  handleSetIsResponseValid({
                    formQuestionId:
                      bifrostFormQuestionWithResponse.bifrostFormQuestion
                        .bifrostFormQuestionId,
                    isResponseValid,
                  })
                }
                setHasQuestionBeenRespondedTo={({
                  hasQuestionBeenRespondedTo,
                }: {
                  hasQuestionBeenRespondedTo: boolean;
                }) => {
                  console.log(
                    `setHasQuestionBeenRespondedTo called: ${bifrostFormQuestionWithResponse.bifrostFormQuestion.bifrostFormQuestionId} | hasQuestionBeenRespondedTo: ${hasQuestionBeenRespondedTo}`
                  );

                  handleSetQuestionResponseFulfillments({
                    formQuestionId:
                      bifrostFormQuestionWithResponse.bifrostFormQuestion
                        .bifrostFormQuestionId,
                    hasQuestionBeenRespondedTo,
                  });
                }}
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
