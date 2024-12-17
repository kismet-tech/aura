import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  BifrostFormStateContextValue,
  BifrostFormStateProviderProps,
} from "./models/models";
import {
  BifrostFormQuestionWithResponse,
  CalendarDateRange,
  mockBifrostSelectorFormQuestionWithTextResponse,
} from "@kismet_ai/foundation";
import { BifrostFormApplicationStage } from "./models/BifrostFormApplicationStage";
import { handleSetActiveBifrostFormQuestionsWithResponses } from "./handlers/handleSetActiveBifrostFormQuestionsWithResponses";
import { handleStepBackToPreviousBifrostFormApplicationStage } from "./handlers/handleStepBackToPreviousBifrostFormApplicationStage";
import { handleGetActiveBifrostFormQuestionsWithResponses } from "./handlers/handleGetActiveBifrostFormQuestionsWithResponses";
import { RenderablePendingItinerary } from "@/components/bifrostForm/PendingItineraryPlanner/models/RenderablePendingItinerary";
import { getRenderablePendingItinerary } from "./utilities/getRenderablePendingItinerary";
import { getHistoricalBifrostFormQuestionsWithResponses } from "./utilities/getHistoricalBifrostFormQuestionsWithResponses";
import { handleSetBifrostFormQuestionsWithResponses } from "./handlers/handleSetBifrostFormQuestionsWithResponses";
import { RenderableItineraryOffer } from "@kismet_ai/foundation";
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
import { handleGetBifrostTravelerId } from "./handlers/handleGetBifrostTravelerId";
import {
  handleGetHotelBifrostFormMetadata,
  HotelBifrostFormMetadata,
} from "./handlers/handleGetHotelBifrostFormMetadata";

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

  const { hotelId, additionalBifrostFormQuestionsWithResponses } =
    useMemo((): HotelBifrostFormMetadata => {
      return handleGetHotelBifrostFormMetadata({});
    }, []);

  const [userSessionId, setUserSessionId] = useState<string | undefined>(
    undefined
  );

  const [bifrostFormApplicationStage, setBifrostFormApplicationStage] =
    useState<BifrostFormApplicationStage>(
      BifrostFormApplicationStage.LAUNCH_SCREEN
    );

  const [bifrostTravelerId, setBifrostTravelerId] = useState<
    string | undefined
  >(undefined);

  const [
    bifrostFormQuestionsWithResponses,
    setBifrostFormQuestionsWithResponses,
  ] = useState<BifrostFormQuestionWithResponse[]>([
    mockBifrostFormQuestionWithSplitTextResponseOne,
    mockBifrostFormQuestionWithEmailResponseOne,
    mockBifrostFormQuestionWithPhoneNumberResponseOne,
    ...additionalBifrostFormQuestionsWithResponses,
  ]);

  const [activeBifrostFormQuestionIds, setActiveBifrostFormQuestionIds] =
    useState<string[]>([
      mockBifrostFormQuestionWithSplitTextResponseOne.bifrostFormQuestion
        .bifrostFormQuestionId,
      mockBifrostFormQuestionWithEmailResponseOne.bifrostFormQuestion
        .bifrostFormQuestionId,
      mockBifrostFormQuestionWithPhoneNumberResponseOne.bifrostFormQuestion
        .bifrostFormQuestionId,
      ...additionalBifrostFormQuestionsWithResponses.map(
        (bifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse) => {
          return bifrostFormQuestionWithResponse.bifrostFormQuestion
            .bifrostFormQuestionId;
        }
      ),
    ]);

  const [
    renderableItineraryOffersFromKismetAI,
    setRenderableItineraryOffersFromKismetAI,
  ] = useState<RenderableItineraryOffer[] | undefined>(undefined);

  const [
    customRenderableItineraryOfferFromGuest,
    setCustomRenderableItineraryOfferFromGuest,
  ] = useState<RenderableItineraryOffer | undefined>(undefined);

  useEffect(() => {
    const initializeBifrostTravelerId = async () => {
      if (!bifrostTravelerId) {
        await handleGetBifrostTravelerId({ setBifrostTravelerId, bifrostApi });
      }
    };
    initializeBifrostTravelerId();
  }, [bifrostTravelerId, setBifrostTravelerId, bifrostApi]);

  /////////////////////////
  // Navigation
  /////////////////////////

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
        hotelId,
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
    hotelId,
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
  // Question Helpers
  /////////////////////////

  const suggestCalendarDateRangesFromConstraints = useCallback(
    async ({
      descriptionOfPotentialCalendarDates,
    }: {
      descriptionOfPotentialCalendarDates: string;
    }): Promise<CalendarDateRange[]> => {
      const response =
        await bifrostApi.suggestCalendarDateRangesFromConstraints({
          descriptionOfPotentialCalendarDates,
        });

      return response.calendarDateRanges;
    },
    [bifrostApi]
  );

  /////////////////////////
  // Active Form Questions
  /////////////////////////

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
      hotelRoomOfferId,
      updatedCountOffered,
    }: {
      itineraryOfferId: string;
      hotelRoomOfferId: string;
      updatedCountOffered: number;
    }): Promise<{ updatedItineraryOfferId: string }> => {
      if (userSessionId) {
        return handleUpdateItineraryOfferHotelRoomCount({
          userSessionId,
          itineraryOfferId,
          hotelRoomOfferId,
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

  const selectItineraryOffer = useCallback(
    async ({
      itineraryOfferId,
    }: {
      itineraryOfferId: string;
    }): Promise<void> => {
      await bifrostApi.selectBifrostItineraryOffer({
        itineraryOfferId,
      });
    },
    [bifrostApi]
  );

  const contextValue = useMemo(() => {
    const bifrostFormStateContextValue: BifrostFormStateContextValue = {
      /////////////////////////
      // Navigation
      /////////////////////////
      bifrostFormApplicationStage,
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
      // Question Helpers
      /////////////////////////
      suggestCalendarDateRangesFromConstraints,

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
      selectItineraryOffer,
    };

    return bifrostFormStateContextValue;
  }, [
    /////////////////////////
    // Navigation
    /////////////////////////
    bifrostFormApplicationStage,
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
    // Question Helpers
    /////////////////////////
    suggestCalendarDateRangesFromConstraints,

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
    selectItineraryOffer,
  ]);

  return (
    <BifrostFormStateContext.Provider value={contextValue}>
      {children}
    </BifrostFormStateContext.Provider>
  );
};
