import { RenderableItineraryHotelRoomOffer, CalendarDateRange, BifrostFormQuestionWithResponse, RenderableItineraryOffer, BifrostFormQuestion, BifrostFormQuestionResponse } from '@kismet_ai/foundation';
import React, { ReactNode } from 'react';
import { RenderablePendingItinerary } from '@/components/bifrostForm/PendingItineraryPlanner/models/RenderablePendingItinerary';
import { BifrostApiInterface as BifrostApiInterface$1 } from '@/apis/bifrostApi/models';
import { BifrostGroupBookingCheckoutSessionSummary as BifrostGroupBookingCheckoutSessionSummary$1, BifrostGroupBookingCheckoutCart as BifrostGroupBookingCheckoutCart$1 } from '@/providers/saas/BifrostGroupBookingCheckoutStateProvider/models';
import { AuthenticatedGuestUser } from '@/models/guests/AuthenticatedGuestUser';

interface CreateUserSessionFromBifrostRequestDto {
    hotelId: string;
    bifrostTravelerId?: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    phoneNumber: string;
    additionalBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
}
interface CreateUserSessionFromBifrostSuccessResponseDataDto {
    userSessionId: string;
    nextQuestionWithResponse: BifrostFormQuestionWithResponse;
}

interface SubmitBifrostFormQuestionsWithResponsesRequestDto {
    hotelId: string;
    userSessionId: string;
    bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
}
interface SubmitBifrostFormQuestionsWithResponsesSuccessResponseDataDto {
    nextQuestionWithResponse?: BifrostFormQuestionWithResponse;
}

interface UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountRequestDto {
    userSessionId: string;
    itineraryOfferId: string;
    hotelRoomOfferId: string;
    updatedCountOffered: number;
}
interface UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountSuccessResponseDataDto {
    itineraryOfferId: string;
    hotelRoomOfferId: string;
    updatedCountOffered: number;
}

interface GetOrCreateBifrostTravelerIdRequestDto {
}
interface GetOrCreateBifrostTravelerIdSuccessResponseDataDto {
    bifrostTravelerId: string;
}

interface SuggestCalendarDateRangesFromConstraintsRequestDto {
    descriptionOfPotentialCalendarDates: string;
}
interface SuggestCalendarDateRangesFromConstraintsSuccessResponseDataDto {
    calendarDateRanges: CalendarDateRange[];
}

interface SelectBifrostItineraryOfferRequestDto {
    itineraryOfferId: string;
}
interface SelectBifrostItineraryOfferSuccessResponseDataDto {
}

interface GetBifrostFormItineraryOffersRequestDto {
    hotelId: string;
    userSessionId: string;
    bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
}
interface GetBifrostFormItineraryOffersSuccessResponseDataDto {
    renderableItineraryOffers?: RenderableItineraryOffer[];
}

interface BifrostApiInterface {
    getOrCreateBifrostTravelerId: (requestBody: GetOrCreateBifrostTravelerIdRequestDto) => Promise<GetOrCreateBifrostTravelerIdSuccessResponseDataDto>;
    createUserSessionFromBifrost: (requestBody: CreateUserSessionFromBifrostRequestDto) => Promise<CreateUserSessionFromBifrostSuccessResponseDataDto>;
    submitBifrostFormQuestionWithResponse: (requestBody: SubmitBifrostFormQuestionsWithResponsesRequestDto) => Promise<SubmitBifrostFormQuestionsWithResponsesSuccessResponseDataDto>;
    getBifrostFormItineraryOffers: (requestBody: GetBifrostFormItineraryOffersRequestDto) => Promise<GetBifrostFormItineraryOffersSuccessResponseDataDto>;
    guestUpdateCustomRenderableItineraryOfferHotelRoomOfferCount: (requestBody: UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountRequestDto) => Promise<UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountSuccessResponseDataDto>;
    selectBifrostItineraryOffer: (requestBody: SelectBifrostItineraryOfferRequestDto) => Promise<SelectBifrostItineraryOfferSuccessResponseDataDto>;
    suggestCalendarDateRangesFromConstraints: (requestBody: SuggestCalendarDateRangesFromConstraintsRequestDto) => Promise<SuggestCalendarDateRangesFromConstraintsSuccessResponseDataDto>;
}

declare class BifrostApi implements BifrostApiInterface {
    Api: any;
    constructor({ apiBaseUrl }: {
        apiBaseUrl: string;
    });
    getOrCreateBifrostTravelerId(requestBody: GetOrCreateBifrostTravelerIdRequestDto): Promise<GetOrCreateBifrostTravelerIdSuccessResponseDataDto>;
    createUserSessionFromBifrost(requestBody: CreateUserSessionFromBifrostRequestDto): Promise<CreateUserSessionFromBifrostSuccessResponseDataDto>;
    submitBifrostFormQuestionWithResponse(requestBody: SubmitBifrostFormQuestionsWithResponsesRequestDto): Promise<SubmitBifrostFormQuestionsWithResponsesSuccessResponseDataDto>;
    getBifrostFormItineraryOffers(requestBody: GetBifrostFormItineraryOffersRequestDto): Promise<GetBifrostFormItineraryOffersSuccessResponseDataDto>;
    guestUpdateCustomRenderableItineraryOfferHotelRoomOfferCount(requestBody: UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountRequestDto): Promise<UpdateGuestCustomRenderableItineraryOfferHotelRoomOfferCountSuccessResponseDataDto>;
    selectBifrostItineraryOffer(requestBody: SelectBifrostItineraryOfferRequestDto): Promise<SelectBifrostItineraryOfferSuccessResponseDataDto>;
    suggestCalendarDateRangesFromConstraints(requestBody: SuggestCalendarDateRangesFromConstraintsRequestDto): Promise<SuggestCalendarDateRangesFromConstraintsSuccessResponseDataDto>;
}

interface KismetHeaderProps {
    children: React.ReactNode;
}
declare function KismetHeader({ children }: KismetHeaderProps): React.JSX.Element;

interface KismetSectionHeaderProps {
    children: React.ReactNode;
}
declare function KismetSectionHeader({ children }: KismetSectionHeaderProps): React.JSX.Element;

interface ImageUploadProps {
    images: Array<{
        file: File;
        preview: string;
        id: string;
    }>;
    onImagesChange: (images: Array<{
        file: File;
        preview: string;
        id: string;
    }>) => void;
    label?: string;
    maxSize: number;
    maxFiles: number;
}
declare function ImageUpload({ images, onImagesChange, maxSize, maxFiles, }: ImageUploadProps): React.JSX.Element;

interface ExistingImage {
    imageId: string;
    url: string;
}
interface ImageUploadWithExistingProps {
    existingImages: ExistingImage[];
    onImagesChange: (params: {
        newImages: Array<{
            file: File;
            preview: string;
            id: string;
        }>;
        imageIdsToDelete: string[];
        imagesOrdering: string[];
    }) => void;
    label?: string;
    maxSize: number;
    maxFiles: number;
}
declare function ImageUploadWithExisting({ existingImages, onImagesChange, maxSize, maxFiles, label, }: ImageUploadWithExistingProps): React.JSX.Element;

declare function KismetLogo(): React.JSX.Element;

declare enum BifrostFormApplicationStage {
    LAUNCH_SCREEN = "LAUNCH_SCREEN",
    INTERACTIVE_LOOP_SCREEN = "INTERACTIVE_LOOP_SCREEN",
    ITINERARY_OFFER_PRESENTATION_SCREEN = "ITINERARY_OFFER_PRESENTATION_SCREEN"
}

interface BifrostFormStateProviderProps {
    children: ReactNode;
    bifrostApi: BifrostApiInterface$1;
}
interface BifrostFormStateContextValue {
    bifrostFormApplicationStage: BifrostFormApplicationStage;
    stepBackToPreviousBifrostFormApplicationStage: () => Promise<void>;
    beginUserSession: () => Promise<void>;
    submitBifrostFormQuestion: () => Promise<void>;
    paymentsPageUrl: string;
    bifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    setBifrostFormQuestionsWithResponses: ({ updatedBifrostFormQuestionsWithResponses, }: {
        updatedBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    }) => void;
    setBifrostFormQuestionWithResponse: ({ updatedBifrostFormQuestionWithResponse, }: {
        updatedBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
    }) => void;
    suggestCalendarDateRangesFromConstraints: ({ descriptionOfPotentialCalendarDates, }: {
        descriptionOfPotentialCalendarDates: string;
    }) => Promise<CalendarDateRange[]>;
    activeBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    setActiveBifrostFormQuestionsWithResponses: ({ updatedActiveBifrostFormQuestionsWithResponses, }: {
        updatedActiveBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    }) => void;
    historicalBifrostFormQuestionsWithResponses: BifrostFormQuestionWithResponse[];
    renderablePendingItinerary: RenderablePendingItinerary;
    renderableItineraryOffersFromKismetAI: RenderableItineraryOffer[] | undefined;
    customRenderableItineraryOfferFromGuest: RenderableItineraryOffer | undefined;
    setRenderableItineraryOffersFromKismetAI: ({ updatedRenderableItineraryOffers, }: {
        updatedRenderableItineraryOffers: RenderableItineraryOffer[];
    }) => void;
    updateItineraryOfferHotelRoomCount: ({ itineraryOfferId, hotelRoomOfferId, updatedCountOffered, }: {
        itineraryOfferId: string;
        hotelRoomOfferId: string;
        updatedCountOffered: number;
    }) => Promise<{
        updatedItineraryOfferId: string;
    }>;
    selectItineraryOffer: ({ itineraryOfferId, }: {
        itineraryOfferId: string;
    }) => Promise<void>;
}

declare const BifrostFormStateContext: React.Context<BifrostFormStateContextValue>;
declare const BifrostFormStateProvider: ({ children, bifrostApi, }: BifrostFormStateProviderProps) => React.JSX.Element;

interface BifrostGroupBookingCheckoutCart {
    hotelRooms: RenderableItineraryHotelRoomOffer[];
}
interface BifrostGroupBookingCheckoutSessionSummary {
    hotelName: string;
    groupBookingCheckoutSessionHeroImageUrl: string;
    groupBookingCheckoutSessionTitle: string;
    groupBookingCheckoutSessionCalendarDateRange: CalendarDateRange;
}
interface BifrostGroupBookingCheckoutStateContextValue {
    cart: BifrostGroupBookingCheckoutCart;
}

interface BundleBifrostFormQuestionWithResponseProps {
    bifrostFormQuestion: BifrostFormQuestion;
}
declare const bundleBifrostFormQuestionWithResponse: ({ bifrostFormQuestion, }: BundleBifrostFormQuestionWithResponseProps) => {
    bifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
};

interface UpdateBifrostFormQuestionWithResponseProps {
    previousBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse;
    updatedBifrostFormQuestionResponse: BifrostFormQuestionResponse;
}
declare const updateBifrostFormQuestionWithResponse: ({ previousBifrostFormQuestionWithResponse, updatedBifrostFormQuestionResponse, }: UpdateBifrostFormQuestionWithResponseProps) => BifrostFormQuestionWithResponse;

declare function BifrostFormApplication(): React.JSX.Element;

interface BifrostGroupBookingCheckoutRootPageProps {
    authenticatedGuestUser: AuthenticatedGuestUser | undefined;
    checkoutSessionSummary: BifrostGroupBookingCheckoutSessionSummary$1 | undefined;
    cart: BifrostGroupBookingCheckoutCart$1;
    availableHotelRooms: RenderableItineraryHotelRoomOffer[];
    onClickLogin: () => void;
    onClickUpdateHotelRoomCountInCart: ({ updatedCountOffered, hotelRoomOfferId, }: {
        updatedCountOffered: number;
        hotelRoomOfferId: string;
    }) => void;
    onClickCheckout: () => void;
}
declare function BifrostGroupBookingCheckoutRootPage({ authenticatedGuestUser, checkoutSessionSummary, cart, availableHotelRooms, onClickLogin, onClickUpdateHotelRoomCountInCart, onClickCheckout, }: BifrostGroupBookingCheckoutRootPageProps): React.JSX.Element;

export { BifrostApi, BifrostFormApplication, BifrostFormStateContext, BifrostFormStateProvider, BifrostGroupBookingCheckoutCart, BifrostGroupBookingCheckoutRootPage, BifrostGroupBookingCheckoutSessionSummary, BifrostGroupBookingCheckoutStateContextValue, ExistingImage, ImageUpload, ImageUploadProps, ImageUploadWithExisting, ImageUploadWithExistingProps, KismetHeader, KismetHeaderProps, KismetLogo, KismetSectionHeader, KismetSectionHeaderProps, bundleBifrostFormQuestionWithResponse, updateBifrostFormQuestionWithResponse };
