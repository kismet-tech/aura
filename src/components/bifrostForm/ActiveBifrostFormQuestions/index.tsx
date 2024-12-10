import { BifrostFormQuestionResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionResponse";
import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import React, { useCallback, useEffect, useState } from "react";
import {
  RenderedBifrostFormQuestion,
  RenderedBifrostFormQuestionProps,
} from "../bifrostFormQuestions/RenderedBifrostFormQuestion";
import { updateBifrostFormQuestionWithResponse } from "@/utilities/bifrostFormQuestions/updateBifrostFormQuestionWithResponse";
import { deepEqual } from "@/utilities/core/deepEqual";
import { deepClone } from "@/utilities/core/deepClone";

export interface ActiveBifrostFormQuestionsProps {
  activeBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
  setBifrostFormQuestionWithResponse: ({
    updatedBifrostFormQuestionWithResponse,
  }: {
    updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
  }) => void;
  setAreAllResponsesValid: ({
    areAllResponsesValid,
  }: {
    areAllResponsesValid: boolean;
  }) => void;
  setBifrostFormQuestionIdsRespondedTo: ({
    bifrostFormQuestionIdsRespondedTo,
  }: {
    bifrostFormQuestionIdsRespondedTo: string[];
  }) => void;
}

const MemoizedRenderedBifrostFormQuestion = React.memo(
  RenderedBifrostFormQuestion,
  (
    prevProps: Readonly<RenderedBifrostFormQuestionProps>,
    nextProps: Readonly<RenderedBifrostFormQuestionProps>
  ): boolean => deepEqual(prevProps, nextProps)
);

export function ActiveBifrostFormQuestions({
  activeBifrostFormQuestionsWithResponses,
  setBifrostFormQuestionWithResponse,
  setAreAllResponsesValid,
  setBifrostFormQuestionIdsRespondedTo,
}: ActiveBifrostFormQuestionsProps) {
  const [
    mapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments,
    setMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments,
  ] = useState<
    Record<
      string,
      { isResponseValid: boolean; hasQuestionBeenRespondedTo: boolean }
    >
  >({});

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

      console.log(
        `useEffect 111 updatedMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments: ${JSON.stringify(
          updatedMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments,
          null,
          4
        )}`
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
    console.log(
      `useEffect mapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments: ${JSON.stringify(
        mapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments
      )}`
    );

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

    setAreAllResponsesValid({
      areAllResponsesValid: areAllFormQuestionResponsesValid,
    });

    console.log(
      `setHaveAllQuestionBeenRespondedTo ActiveBifrostFormQuestions: ${JSON.stringify(
        haveAllQuestionBeenRespondedTo
      )}`
    );

    if (bifrostFormQuestionIdsRespondedTo.length > 0) {
      setBifrostFormQuestionIdsRespondedTo({
        bifrostFormQuestionIdsRespondedTo,
      });
    }
  }, [
    mapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments,
    setAreAllResponsesValid,
    setBifrostFormQuestionIdsRespondedTo,
  ]);

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

          // if (
          //   updatedMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments[
          //     formQuestionId
          //   ] === undefined
          // ) {
          //   updatedMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments[
          //     formQuestionId
          //   ] = {
          //     isResponseValid,
          //     hasQuestionBeenRespondedTo: false,
          //   };
          // } else {
          //   updatedMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments[
          //     formQuestionId
          //   ] = {
          //     ...updatedMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments[
          //       formQuestionId
          //     ],
          //     isResponseValid,
          //   };
          // }

          // console.log(
          //   `handleSetIsResponseValid: ${JSON.stringify(
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

          console.log(
            `handleSetQuestionResponseFulfillments: ${JSON.stringify(
              updatedMapOfBifrostFormQuestionIdsToQuestionValiditiesAndFullfilments
            )}`
          );

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
              className="mb-4"
              key={
                bifrostFormQuestionWithResponse.bifrostFormQuestion
                  .bifrostFormQuestionId
              }
            >
              <MemoizedRenderedBifrostFormQuestion
                bifrostFormQuestionWithResponse={
                  bifrostFormQuestionWithResponse
                }
                setBifrostFormQuestionResponse={({
                  updatedBifrostFormQuestionResponse,
                }: {
                  updatedBifrostFormQuestionResponse: BifrostFormQuestionResponse;
                }) => {
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
              />
            </div>
          );
        }
      )}
    </>
  );
}
