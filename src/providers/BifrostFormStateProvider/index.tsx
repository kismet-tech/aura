import React, { createContext, useCallback, useMemo, useState } from "react";
import {
  BifrostFormStateContextValue,
  BifrostFormStateProviderProps,
} from "./models/models";
import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { BifrostFormApplicationStage } from "./models/BifrostFormApplicationStage";
import { handleSetActiveBifrostFormQuestionsWithResponses } from "./handlers/handleSetActiveBifrostFormQuestionsWithResponses";
import { handleStepBackToPreviousBifrostFormApplicationStage } from "./handlers/handleStepBackToPreviousBifrostFormApplicationStage";
// import { handleProgressToNextBifrostFormApplicationStage } from "./handlers/handleProgressToNextBifrostFormApplicationStage";
import { handleGetActiveBifrostFormQuestionsWithResponses } from "./handlers/handleGetActiveBifrostFormQuestionsWithResponses";
import { RenderablePendingItinerary } from "@/components/bifrostForm/PendingItineraryPlanner/models/RenderablePendingItinerary";
import { getRenderablePendingItinerary } from "./utilities/getRenderablePendingItinerary";
import { getHistoricalBifrostFormQuestionsWithResponses } from "./utilities/getHistoricalBifrostFormQuestionsWithResponses";
import { handleSetBifrostFormQuestionsWithResponses } from "./handlers/handleSetBifrostFormQuestionsWithResponses";
import { RenderableItineraryOffer } from "@/models/bifrost/RenderableItineraryOffer";
import { handleSubmitBifrostFormQuestion } from "./handlers/handleSubmitActiveBifrostFormQuestions";
import { handleBeginUserSession } from "./handlers/handleBeginUserSession";
import { getPaymentsPageUrl } from "@/apis/apiConfig";
import { handleGetHotelId } from "./handlers/handleGetHotelId";
import { handleUpdateItineraryOfferHotelRoomCount } from "./handlers/handleUpdateItineraryOfferHotelRoomCount";
import { handleSetBifrostFormQuestionWithResponse } from "./handlers/handleSetBifrostFormQuestionWithResponse";
import {
  mockBifrostFormQuestionWithSplitTextResponseOne,
  mockBifrostFormQuestionWithEmailResponseOne,
  mockBifrostFormQuestionWithPhoneNumberResponseOne,
} from "@/mockData/bifrost/bifrostFormQuestions/mockBifrostFormQuestionWithResponses";

export const BifrostFormStateContext = createContext(
  {} as BifrostFormStateContextValue
);

export const BifrostFormStateProvider = ({
  children,
  bifrostApi,
}: BifrostFormStateProviderProps) => {
  /////////////////////////
  /////////////////////////
  /////////////////////////
  // Internal State
  /////////////////////////
  /////////////////////////
  /////////////////////////

  const hotelId: string = useMemo((): string => {
    return handleGetHotelId();
  }, []);

  const [userSessionId, setUserSessionId] = useState<string | undefined>(
    undefined
  );

  const [bifrostFormApplicationStage, setBifrostFormApplicationStage] =
    useState<BifrostFormApplicationStage>(
      BifrostFormApplicationStage.LAUNCH_SCREEN
    );

  const [
    bifrostFormQuestionsWithResponses,
    setBifrostFormQuestionsWithResponses,
  ] = useState<BifrostFormQuestionWithResponse[]>([
    mockBifrostFormQuestionWithSplitTextResponseOne,
    mockBifrostFormQuestionWithEmailResponseOne,
    mockBifrostFormQuestionWithPhoneNumberResponseOne,
  ]);

  const [activeBifrostFormQuestionIds, setActiveBifrostFormQuestionIds] =
    useState<string[]>([
      mockBifrostFormQuestionWithSplitTextResponseOne.bifrostFormQuestion
        .bifrostFormQuestionId,
      mockBifrostFormQuestionWithEmailResponseOne.bifrostFormQuestion
        .bifrostFormQuestionId,
      mockBifrostFormQuestionWithPhoneNumberResponseOne.bifrostFormQuestion
        .bifrostFormQuestionId,
    ]);

  const [
    renderableItineraryOffersFromKismetAI,
    setRenderableItineraryOffersFromKismetAI,
  ] = useState<RenderableItineraryOffer[] | undefined>(undefined);

  const [
    customRenderableItineraryOfferFromGuest,
    setCustomRenderableItineraryOfferFromGuest,
  ] = useState<RenderableItineraryOffer | undefined>(undefined);

  /////////////////////////
  // Navigation
  /////////////////////////

  // const progressToNextBifrostFormApplicationStage = useCallback(async () => {
  //   handleProgressToNextBifrostFormApplicationStage({
  //     setBifrostFormApplicationStage,
  //     setActiveBifrostFormQuestionIds,
  //     bifrostFormQuestionsWithResponses,
  //     setBifrostFormQuestionsWithResponses,
  //     setUserSessionId,
  //     hotelId,
  //     bifrostApi,
  //   });
  // }, []);

  const stepBackToPreviousBifrostFormApplicationStage =
    useCallback(async () => {
      handleStepBackToPreviousBifrostFormApplicationStage({});
    }, []);

  const beginUserSession = useCallback(async () => {
    await handleBeginUserSession({
      setBifrostFormApplicationStage,
      setActiveBifrostFormQuestionIds,
      bifrostFormQuestionsWithResponses,
      setBifrostFormQuestionsWithResponses,
      setUserSessionId,
      hotelId,
      bifrostApi,
    });
  }, [
    setBifrostFormApplicationStage,
    setActiveBifrostFormQuestionIds,
    bifrostFormQuestionsWithResponses,
    setBifrostFormQuestionsWithResponses,
    setUserSessionId,
    hotelId,
    bifrostApi,
  ]);

  const submitBifrostFormQuestion = useCallback(async () => {
    if (userSessionId) {
      return handleSubmitBifrostFormQuestion({
        userSessionId,
        bifrostFormQuestionsWithResponses,
        activeBifrostFormQuestionIds,
        setBifrostFormQuestionsWithResponses,
        setActiveBifrostFormQuestionIds,
        setRenderableItineraryOffersFromKismetAI,
        setBifrostFormApplicationStage,
        bifrostApi,
      });
    }
  }, [
    userSessionId,
    bifrostFormQuestionsWithResponses,
    activeBifrostFormQuestionIds,
    setBifrostFormQuestionsWithResponses,
    setActiveBifrostFormQuestionIds,
    setRenderableItineraryOffersFromKismetAI,
    setBifrostFormApplicationStage,
    bifrostApi,
  ]);

  const paymentsPageUrl: string = useMemo((): string => {
    if (userSessionId) {
      return getPaymentsPageUrl({
        hotelId,
        userSessionId,
      });
    }
    return "";
  }, [hotelId, userSessionId]);

  /////////////////////////
  // Form Question Responses
  /////////////////////////

  const setBifrostFormQuestionWithResponse = useCallback(
    ({
      updatedBifrostFormQuestionWithResponse,
    }: {
      updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
    }) => {
      handleSetBifrostFormQuestionWithResponse({
        updatedBifrostFormQuestionWithResponse,
        setBifrostFormQuestionsWithResponses,
      });
    },
    [
      handleSetBifrostFormQuestionWithResponse,
      setBifrostFormQuestionsWithResponses,
    ]
  );

  const setBifrostFormQuestionsWithResponsesWithCallback = useCallback(
    ({
      updatedBifrostFormQuestionsWithResponses,
    }: {
      updatedBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    }) => {
      return handleSetBifrostFormQuestionsWithResponses({
        setBifrostFormQuestionsWithResponses,
        updatedBifrostFormQuestionsWithResponses,
      });
    },
    []
  );

  /////////////////////////
  // Active Form Questions
  /////////////////////////

  console.log(
    `activeBifrostFormQuestionIds: ${JSON.stringify(
      activeBifrostFormQuestionIds,
      null,
      4
    )}`
  );

  const activeBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[] =
    useMemo((): BifrostFormQuestionWithResponse[] => {
      return handleGetActiveBifrostFormQuestionsWithResponses({
        activeBifrostFormQuestionIds,
        bifrostFormQuestionsWithResponses,
      });
    }, [
      handleGetActiveBifrostFormQuestionsWithResponses,
      activeBifrostFormQuestionIds,
      bifrostFormQuestionsWithResponses,
    ]);

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

  /////////////////////////
  // Historical Form Questions
  /////////////////////////
  const historicalBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[] =
    useMemo((): BifrostFormQuestionWithResponse[] => {
      return getHistoricalBifrostFormQuestionsWithResponses({
        activeBifrostFormQuestionIds,
        bifrostFormQuestionsWithResponses,
      });
    }, [activeBifrostFormQuestionIds, bifrostFormQuestionsWithResponses]);

  /////////////////////////
  // Pending Itinerary
  /////////////////////////

  const renderablePendingItinerary: RenderablePendingItinerary = useMemo(() => {
    return getRenderablePendingItinerary({
      bifrostFormQuestionsWithResponses,
    });
  }, [bifrostFormQuestionsWithResponses]);

  /////////////////////////
  // Itinerary Offers
  /////////////////////////

  const setRenderableItineraryOffersFromKismetAIWithCallback = useCallback(
    ({
      updatedRenderableItineraryOffers,
    }: {
      updatedRenderableItineraryOffers: RenderableItineraryOffer[];
    }) => {
      if (userSessionId) {
        return setRenderableItineraryOffersFromKismetAI(
          updatedRenderableItineraryOffers
        );
      }
    },
    [userSessionId, setRenderableItineraryOffersFromKismetAI]
  );

  const updateItineraryOfferHotelRoomCount = useCallback(
    ({
      itineraryOfferId,
      hotelRoomId,
      updatedCountOffered,
    }: {
      itineraryOfferId: string;
      hotelRoomId: string;
      updatedCountOffered: number;
    }): Promise<{ updatedItineraryOfferId: string }> => {
      if (userSessionId) {
        return handleUpdateItineraryOfferHotelRoomCount({
          userSessionId,
          itineraryOfferId,
          hotelRoomId,
          updatedCountOffered,
          renderableItineraryOffersFromKismetAI,
          customRenderableItineraryOfferFromGuest,
          setCustomRenderableItineraryOfferFromGuest,
          bifrostApi,
        });
      } else {
        throw new Error(
          `userSessionId missing but needed for handleUpdateItineraryOfferHotelRoomCount`
        );
      }
    },
    [
      userSessionId,
      renderableItineraryOffersFromKismetAI,
      customRenderableItineraryOfferFromGuest,
      setCustomRenderableItineraryOfferFromGuest,
      bifrostApi,
    ]
  );

  const contextValue = useMemo(() => {
    const bifrostFormStateContextValue: BifrostFormStateContextValue = {
      /////////////////////////
      // Navigation
      /////////////////////////
      bifrostFormApplicationStage,
      // progressToNextBifrostFormApplicationStage,
      stepBackToPreviousBifrostFormApplicationStage,
      beginUserSession,
      submitBifrostFormQuestion,
      paymentsPageUrl,

      /////////////////////////
      // Form Question Responses
      /////////////////////////
      bifrostFormQuestionsWithResponses,

      setBifrostFormQuestionsWithResponses:
        setBifrostFormQuestionsWithResponsesWithCallback,
      setBifrostFormQuestionWithResponse,
      /////////////////////////
      // Active Form Question
      /////////////////////////
      activeBifrostFormQuestionsWithResponses,
      setActiveBifrostFormQuestionsWithResponses,

      /////////////////////////
      // Historical Form Questions
      /////////////////////////
      historicalBifrostFormQuestionsWithResponses,

      /////////////////////////
      // Pending Itinerary
      /////////////////////////
      renderablePendingItinerary,

      /////////////////////////
      // Itinerary Offers
      /////////////////////////

      renderableItineraryOffersFromKismetAI,
      customRenderableItineraryOfferFromGuest,
      setRenderableItineraryOffersFromKismetAI:
        setRenderableItineraryOffersFromKismetAIWithCallback,
      updateItineraryOfferHotelRoomCount,
    };

    return bifrostFormStateContextValue;
  }, [
    /////////////////////////
    // Navigation
    /////////////////////////
    bifrostFormApplicationStage,
    // progressToNextBifrostFormApplicationStage,
    stepBackToPreviousBifrostFormApplicationStage,
    beginUserSession,
    submitBifrostFormQuestion,
    paymentsPageUrl,

    /////////////////////////
    // Form Question Responses
    /////////////////////////
    bifrostFormQuestionsWithResponses,

    setBifrostFormQuestionsWithResponsesWithCallback,
    setBifrostFormQuestionWithResponse,

    /////////////////////////
    // Active Form Question
    /////////////////////////
    activeBifrostFormQuestionsWithResponses,
    setActiveBifrostFormQuestionsWithResponses,

    /////////////////////////
    // Historical Form Questions
    /////////////////////////
    historicalBifrostFormQuestionsWithResponses,

    /////////////////////////
    // Pending Itinerary
    /////////////////////////
    renderablePendingItinerary,

    /////////////////////////
    // Itinerary Offers
    /////////////////////////
    renderableItineraryOffersFromKismetAI,
    customRenderableItineraryOfferFromGuest,
    setRenderableItineraryOffersFromKismetAIWithCallback,
    updateItineraryOfferHotelRoomCount,
  ]);

  return (
    <BifrostFormStateContext.Provider value={contextValue}>
      {children}
    </BifrostFormStateContext.Provider>
  );
};
