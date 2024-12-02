import React, { useEffect } from "react";
import { useBifrostFormState } from "@/providers/BifrostFormStateProvider/useBifrostFormState";
import { BifrostFormQuestionWithResponse } from "@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse";
import { RenderableItineraryOffer } from "@/models/bifrost/RenderableItineraryOffer";

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
