import React, { useEffect } from "react";
import { useBifrostFormState } from "@/providers/BifrostFormStateProvider/useBifrostFormState";
import { BifrostFormQuestionWithResponse } from "@kismet_ai/foundation";
import { RenderableItineraryOffer } from "@kismet_ai/foundation";

interface MockBifrostFormStateProviderProps {
  // All questions
  mockBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];

  // Active questions
  mockActiveBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
  mockRenderableItineraryOffersFromKismetAI?: RenderableItineraryOffer[];

  createUserSession: boolean;

  children: React.ReactNode;
}

export const MockBifrostFormStateProvider = React.memo(
  ({
    mockBifrostFormQuestionsWithResponses,
    mockActiveBifrostFormQuestionsWithResponses,
    mockRenderableItineraryOffersFromKismetAI,
    createUserSession,
    children,
  }: MockBifrostFormStateProviderProps) => {
    const {
      setBifrostFormQuestionsWithResponses,
      setActiveBifrostFormQuestionsWithResponses,
      setRenderableItineraryOffersFromKismetAI,
      beginUserSession,
    } = useBifrostFormState();

    useEffect(() => {
      async function runInitializer() {
        setBifrostFormQuestionsWithResponses({
          updatedBifrostFormQuestionsWithResponses:
            mockBifrostFormQuestionsWithResponses,
        });
        setActiveBifrostFormQuestionsWithResponses({
          updatedActiveBifrostFormQuestionsWithResponses:
            mockActiveBifrostFormQuestionsWithResponses,
        });

        if (createUserSession) {
          beginUserSession();
        }

        if (mockRenderableItineraryOffersFromKismetAI) {
          setRenderableItineraryOffersFromKismetAI({
            updatedRenderableItineraryOffers:
              mockRenderableItineraryOffersFromKismetAI,
          });
        }
      }

      runInitializer();
    }, [
      mockBifrostFormQuestionsWithResponses,
      mockRenderableItineraryOffersFromKismetAI,
      mockActiveBifrostFormQuestionsWithResponses,
      setBifrostFormQuestionsWithResponses,
      setActiveBifrostFormQuestionsWithResponses,
      setRenderableItineraryOffersFromKismetAI,
    ]);

    return <>{children}</>;
  }
);
