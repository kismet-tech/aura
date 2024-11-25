import React, { createContext, useCallback, useMemo, useState } from "react";
import {
  BifrostFormStateContextValue,
  BifrostFormStateProviderProps,
} from "./models/models";
import { BifrostFormQuestionWithResponse } from "@/models/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { getUpdatedBifrostFormQuestionsWithResponses } from "./utilities/getUpdatedBifrostFormQuestionsWithResponses";
import { BifrostFormApplicationStage } from "./models/BifrostFormApplicationStage";
import { handleSetActiveBifrostFormQuestionsWithResponses } from "./handlers/handleSetActiveBifrostFormQuestionsWithResponses";
import { handleStepBackToPreviousBifrostFormApplicationStage } from "./handlers/handleStepBackToPreviousBifrostFormApplicationStage";
import { handleProgressToNextBifrostFormApplicationStage } from "./handlers/handleProgressToNextBifrostFormApplicationStage";
import { handleGetActiveBifrostFormQuestionsWithResponses } from "./handlers/handleGetActiveBifrostFormQuestionsWithResponses";

export const BifrostFormStateContext = createContext(
  {} as BifrostFormStateContextValue
);

export const BifrostFormStateProvider = ({
  children,
}: BifrostFormStateProviderProps) => {
  const [bifrostFormApplicationStage, setBifrostFormApplicationStage] =
    useState<BifrostFormApplicationStage>(
      BifrostFormApplicationStage.LAUNCH_SCREEN
    );

  const [
    bifrostFormQuestionsWithResponses,
    setBifrostFormQuestionsWithResponses,
  ] = useState<BifrostFormQuestionWithResponse[]>([]);

  const [activeBifrostFormQuestionIds, setActiveBifrostFormQuestionIds] =
    useState<string[]>([]);

  /////////////////////////
  // Navigation
  /////////////////////////

  const progressToNextBifrostFormApplicationStage = useCallback(async () => {
    handleProgressToNextBifrostFormApplicationStage({
      setBifrostFormApplicationStage,
      setActiveBifrostFormQuestionIds,
      setBifrostFormQuestionsWithResponses,
    });
  }, []);

  const stepBackToPreviousBifrostFormApplicationStage =
    useCallback(async () => {
      handleStepBackToPreviousBifrostFormApplicationStage({});
    }, []);

  /////////////////////////
  // Form Question Responses
  /////////////////////////

  const setBifrostFormQuestionWithResponse = useCallback(
    ({
      updatedBifrostFormQuestionWithResponse,
    }: {
      updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
    }) => {
      setBifrostFormQuestionsWithResponses(
        (
          previousBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[]
        ) => {
          return getUpdatedBifrostFormQuestionsWithResponses({
            previousBifrostFormQuestionsWithResponses,
            updatedBifrostFormQuestionWithResponse,
          });
        }
      );
    },
    []
  );

  /////////////////////////
  // Active Form Question
  /////////////////////////

  const activeBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[] =
    useMemo((): BifrostFormQuestionWithResponse[] => {
      return handleGetActiveBifrostFormQuestionsWithResponses({
        activeBifrostFormQuestionIds,
        bifrostFormQuestionsWithResponses,
      });
    }, [activeBifrostFormQuestionIds, bifrostFormQuestionsWithResponses]);

  const setActiveBifrostFormQuestionsWithResponses = useCallback(
    ({
      updatedActiveBifrostFormQuestionsWithResponses,
    }: {
      updatedActiveBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    }) => {
      handleSetActiveBifrostFormQuestionsWithResponses({
        updatedActiveBifrostFormQuestionsWithResponses,
        setBifrostFormQuestionsWithResponses,
        setActiveBifrostFormQuestionIds,
      });
    },
    []
  );

  const contextValue = useMemo(() => {
    const bifrostFormStateContextValue: BifrostFormStateContextValue = {
      /////////////////////////
      // Navigation
      /////////////////////////
      bifrostFormApplicationStage,
      progressToNextBifrostFormApplicationStage,
      stepBackToPreviousBifrostFormApplicationStage,

      /////////////////////////
      // Form Question Responses
      /////////////////////////
      bifrostFormQuestionsWithResponses,

      setBifrostFormQuestionWithResponse,
      /////////////////////////
      // Active Form Question
      /////////////////////////
      activeBifrostFormQuestionsWithResponses,
      setActiveBifrostFormQuestionsWithResponses,
    };

    return bifrostFormStateContextValue;
  }, [
    bifrostFormApplicationStage,
    setBifrostFormApplicationStage,
    bifrostFormQuestionsWithResponses,
    setBifrostFormQuestionsWithResponses,
    activeBifrostFormQuestionIds,
    setActiveBifrostFormQuestionIds,
    activeBifrostFormQuestionsWithResponses,
  ]);

  return (
    <BifrostFormStateContext.Provider value={contextValue}>
      {children}
    </BifrostFormStateContext.Provider>
  );
};
