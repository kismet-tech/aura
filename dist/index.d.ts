import React from 'react';
import { CalendarDateRange as CalendarDateRange$1 } from '@/models/core/date/CalendarDateRange';
import { RenderableItineraryHotelRoomOffer as RenderableItineraryHotelRoomOffer$1 } from '@/models/bifrost/RenderableItineraryOffer';
import { BifrostFormQuestion as BifrostFormQuestion$1 } from '@/models';
import { BifrostFormQuestionWithResponse as BifrostFormQuestionWithResponse$1 } from '@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionWithResponse';
import { BifrostFormQuestionResponse as BifrostFormQuestionResponse$1 } from '@/models/bifrost/BifrostFormQuestions/BifrostFormQuestionResponse';
import { BifrostGroupBookingCheckoutSessionSummary as BifrostGroupBookingCheckoutSessionSummary$1, BifrostGroupBookingCheckoutCart as BifrostGroupBookingCheckoutCart$1 } from '@/providers/saas/BifrostGroupBookingCheckoutStateProvider/models';
import { AuthenticatedGuestUser } from '@/models/guests/AuthenticatedGuestUser';

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

declare enum BifrostFormQuestionType {
    TEXT_INPUT = "TEXT_INPUT",
    EMAIL = "EMAIL",
    PHONE = "PHONE",
    TEXT_AREA = "TEXT_AREA",
    TOGGLE_BUTTON_GROUP = "TOGGLE_BUTTON_GROUP",
    SELECT_DATE_RANGE = "SELECT_DATE_RANGE",
    MULTI_SELECT_DATE_RANGE = "MULTI_SELECT_DATE_RANGE",
    SPLIT_TEXT_INPUT = "SPLIT_TEXT_INPUT"
}
interface BaseRenderableBifrostFormQuestion {
    type: BifrostFormQuestionType;
    bifrostFormQuestionId: string;
    chatLabel: string;
}
interface SingleRenderableBifrostFormQuestion extends BaseRenderableBifrostFormQuestion {
    label: string;
    required?: boolean;
}
interface RenderableTextInputBifrostFormQuestion extends SingleRenderableBifrostFormQuestion {
    type: BifrostFormQuestionType.TEXT_INPUT;
    autocomplete?: string;
}
interface RenderableEmailInputBifrostFormQuestion extends SingleRenderableBifrostFormQuestion {
    type: BifrostFormQuestionType.EMAIL;
    autocomplete?: string;
}
interface RenderablePhoneInputBifrostFormQuestion extends SingleRenderableBifrostFormQuestion {
    type: BifrostFormQuestionType.PHONE;
    autocomplete?: string;
}
interface RenderableTextAreaBifrostFormQuestion extends SingleRenderableBifrostFormQuestion {
    type: BifrostFormQuestionType.TEXT_AREA;
}
interface RenderableToggleButtonGroupBifrostFormQuestionOption {
    label: string;
    value: string;
}
interface RenderableToggleButtonGroupBifrostFormQuestion extends SingleRenderableBifrostFormQuestion {
    type: BifrostFormQuestionType.TOGGLE_BUTTON_GROUP;
    options: RenderableToggleButtonGroupBifrostFormQuestionOption[];
}
interface RenderableSelectDateRangeBifrostFormQuestion extends SingleRenderableBifrostFormQuestion {
    type: BifrostFormQuestionType.SELECT_DATE_RANGE;
}
interface RenderableMultiSelectDateRangeBifrostFormQuestion extends SingleRenderableBifrostFormQuestion {
    type: BifrostFormQuestionType.MULTI_SELECT_DATE_RANGE;
}
interface RenderableSplitTextInputBifrostFormQuestion extends BaseRenderableBifrostFormQuestion {
    type: BifrostFormQuestionType.SPLIT_TEXT_INPUT;
    label?: string;
    left: RenderableTextInputBifrostFormQuestion;
    right: RenderableTextInputBifrostFormQuestion;
}
type BifrostFormQuestion = RenderableTextInputBifrostFormQuestion | RenderableEmailInputBifrostFormQuestion | RenderablePhoneInputBifrostFormQuestion | RenderableTextAreaBifrostFormQuestion | RenderableToggleButtonGroupBifrostFormQuestion | RenderableSelectDateRangeBifrostFormQuestion | RenderableMultiSelectDateRangeBifrostFormQuestion | RenderableSplitTextInputBifrostFormQuestion;

interface CalendarDate {
    /**
     * Year of the date
     * @type {number}
     * @memberof CalendarDate
     */
    year: number;
    /**
     * One-indexed month of the date (January is 1)
     * @type {number}
     * @memberof CalendarDate
     */
    month: number;
    /**
     * Day of the date
     * @type {number}
     * @memberof CalendarDate
     */
    day: number;
    /**
     * Timezone of the date. Provided by Intl.DateTimeFormat().resolvedOptions().timeZone. All options viewable by Intl.supportedValuesOf(\"timeZone\")
     * @type {string}
     * @memberof CalendarDate
     */
    timeZone?: string;
}

interface CalendarDateRange {
    startCalendarDate: CalendarDate;
    endCalendarDate: CalendarDate;
}
interface PendingCalendarDateRange {
    startCalendarDate?: CalendarDate;
    endCalendarDate?: CalendarDate;
}

declare enum BifrostFormQuestionResponseType {
    TEXT = "TEXT",
    PHONE_NUMBER = "PHONE_NUMBER",
    EMAIL = "EMAIL",
    CALENDAR_DATE_RANGE = "CALENDAR_DATE_RANGE",
    MULTI_CALENDAR_DATE_RANGE = "MULTI_CALENDAR_DATE_RANGE",
    SPLIT_TEXT = "SPLIT_TEXT"
}
interface BaseBifrostFormQuestionResponse {
    type: BifrostFormQuestionResponseType;
}
interface BifrostFormQuestionTextResponse {
    type: BifrostFormQuestionResponseType.TEXT;
    responseValue: string;
}
interface BifrostFormQuestionPhoneNumberResponse {
    type: BifrostFormQuestionResponseType.PHONE_NUMBER;
    responseValue: string;
}
interface BifrostFormQuestionEmailResponse {
    type: BifrostFormQuestionResponseType.EMAIL;
    responseValue: string;
}
interface BifrostFormQuestionCalendarDateRangeResponse {
    type: BifrostFormQuestionResponseType.CALENDAR_DATE_RANGE;
    responseValue: PendingCalendarDateRange;
}
interface BifrostFormQuestionMultiCalendarDateRangeResponse {
    type: BifrostFormQuestionResponseType.MULTI_CALENDAR_DATE_RANGE;
    responseValue: PendingCalendarDateRange[];
}
interface BifrostFormQuestionSplitTextResponse {
    type: BifrostFormQuestionResponseType.SPLIT_TEXT;
    responseValue: {
        left: string;
        right: string;
    };
}
type BifrostFormQuestionResponse = BifrostFormQuestionTextResponse | BifrostFormQuestionPhoneNumberResponse | BifrostFormQuestionEmailResponse | BifrostFormQuestionCalendarDateRangeResponse | BifrostFormQuestionMultiCalendarDateRangeResponse | BifrostFormQuestionSplitTextResponse;

interface BaseBifrostFormQuestionWithResponse {
    responseType: BifrostFormQuestionResponseType;
    bifrostFormQuestion: BifrostFormQuestion;
    responseData: BifrostFormQuestionResponse;
}
interface BifrostTextInputFormQuestionWithTextResponse {
    responseType: BifrostFormQuestionResponseType.TEXT;
    bifrostFormQuestion: RenderableTextInputBifrostFormQuestion;
    responseData: BifrostFormQuestionTextResponse;
}
interface BifrostTextAreaFormQuestionWithTextResponse {
    responseType: BifrostFormQuestionResponseType.TEXT;
    bifrostFormQuestion: RenderableTextAreaBifrostFormQuestion;
    responseData: BifrostFormQuestionTextResponse;
}
interface BifrostToggleButtonGroupFormQuestionWithTextResponse {
    responseType: BifrostFormQuestionResponseType.TEXT;
    bifrostFormQuestion: RenderableToggleButtonGroupBifrostFormQuestion;
    responseData: BifrostFormQuestionTextResponse;
}
type BifrostFormQuestionWithTextResponse = BifrostTextInputFormQuestionWithTextResponse | BifrostTextAreaFormQuestionWithTextResponse | BifrostToggleButtonGroupFormQuestionWithTextResponse;
interface BifrostFormQuestionWithPhoneNumberResponse {
    responseType: BifrostFormQuestionResponseType.PHONE_NUMBER;
    bifrostFormQuestion: RenderablePhoneInputBifrostFormQuestion;
    responseData: BifrostFormQuestionPhoneNumberResponse;
}
interface BifrostFormQuestionWithEmailResponse {
    responseType: BifrostFormQuestionResponseType.EMAIL;
    bifrostFormQuestion: RenderableEmailInputBifrostFormQuestion;
    responseData: BifrostFormQuestionEmailResponse;
}
interface BifrostFormQuestionWithCalendarDateRangeResponse {
    responseType: BifrostFormQuestionResponseType.CALENDAR_DATE_RANGE;
    bifrostFormQuestion: RenderableSelectDateRangeBifrostFormQuestion;
    responseData: BifrostFormQuestionCalendarDateRangeResponse;
}
interface BifrostFormQuestionWithMultiCalendarDateRangeResponse {
    responseType: BifrostFormQuestionResponseType.MULTI_CALENDAR_DATE_RANGE;
    bifrostFormQuestion: RenderableMultiSelectDateRangeBifrostFormQuestion;
    responseData: BifrostFormQuestionMultiCalendarDateRangeResponse;
}
interface BifrostFormQuestionWithSplitTextResponse {
    responseType: BifrostFormQuestionResponseType.SPLIT_TEXT;
    bifrostFormQuestion: RenderableSplitTextInputBifrostFormQuestion;
    responseData: BifrostFormQuestionSplitTextResponse;
}
type BifrostFormQuestionWithResponse = BifrostFormQuestionWithTextResponse | BifrostFormQuestionWithPhoneNumberResponse | BifrostFormQuestionWithEmailResponse | BifrostFormQuestionWithCalendarDateRangeResponse | BifrostFormQuestionWithMultiCalendarDateRangeResponse | BifrostFormQuestionWithSplitTextResponse;

declare enum ReservedBifrostFormQuestionIds {
    FIRST_NAME = "First Name",
    LAST_NAME = "Last Name",
    EMAIL = "Email",
    PHONE = "Phone",
    INQUIRY_DETAILS = "Inquiry Details",
    REASON_FOR_TRAVEL = "Reason for Travel",
    ARE_ITINERARY_DATES_FLEXIBLE = "Are Itinerary Dates Flexible",
    DATES = "Dates",
    POTENTIAL_DATES = "Potential Dates",
    FLEXIBLE_DATE_DESCRIPTION = "Flexible Date Description",
    ESTIMATED_GUEST_COUNT = "Estimated Guest Count",
    COUNT_OF_ROOMS_NEEDED = "Count of Rooms Needed",
    PAYMENT_SPLIT = "Payment Split"
}

declare enum ReservedBifrostReasonForTravelOptionValues {
    BUSINESS = "BUSINESS",
    SOCIAL = "SOCIAL",
    OTHER = "OTHER",
    EXTENDED_STAY = "EXTENDED_STAY"
}
declare enum ReservedBifrostSplitPaymentOptionValues {
    SINGLE_PAYER = "SINGLE_PAYER",
    SPLIT_PAYER = "SPLIT_PAYER"
}
declare enum ReservedBifrostDateFlexibilityOptionValues {
    FIRM_DATES = "FIRM_DATES",
    FLEXIBLE_DATES = "FLEXIBLE_DATES",
    STILL_DECIDING = "STILL_DECIDING"
}

declare enum ItineraryOfferOriginatorType {
    KISMET_AI = "KISMET_AI",
    GUEST = "GUEST",
    SALES_AGENT = "SALES_AGENT"
}
interface RenderableItineraryOfferBookingRules {
    holdDurationInDays: number;
    discountExpiresAtTimestamp: number;
    depositPercentage: number;
    depositCollectionTimestamp: number;
    paymentCollectionTimestamp: number;
}
interface RenderableItineraryOfferCriterion {
    criterionName: string;
    doesMatchCriterion: boolean;
}
interface RenderableItineraryHotelRoomOffer {
    hotelRoomId: string;
    countOffered: number;
    countAvailable: number;
    offerPriceInCents: number;
    listPriceInCents: number;
    hotelRoomName: string;
    hotelRoomDescription: string;
    verboseHotelRoomDescription: string;
    heroImageUrl: string;
    hotelRoomImageUrls: string[];
}
declare enum RenderableItineraryEventOfferApprovalStatus {
    PENDING = "Pending"
}
interface RenderableItineraryEventOffer {
    eventOfferId: string;
    eventName: string;
    calendarDateRange: CalendarDateRange;
    approvalStatus: RenderableItineraryEventOfferApprovalStatus;
    imageUrl: string;
}
interface RenderableItineraryOffer {
    itineraryOfferId: string;
    originatorType: ItineraryOfferOriginatorType;
    heroImageUrl: string;
    guestCount?: number;
    startCalendarDate: CalendarDate;
    endCalendarDate: CalendarDate;
    itineraryOfferName: string;
    itineraryOfferDescription: string;
    descriptionOfAllHotelRoomOffers: string;
    hotelRoomOffers: RenderableItineraryHotelRoomOffer[];
    descriptionOfAllEventOffers: string;
    eventOffers: RenderableItineraryEventOffer[];
    criteria: RenderableItineraryOfferCriterion[];
    bookingRules: RenderableItineraryOfferBookingRules;
}

interface BifrostGroupBookingCheckoutCart {
    hotelRooms: RenderableItineraryHotelRoomOffer$1[];
}
interface BifrostGroupBookingCheckoutSessionSummary {
    hotelName: string;
    groupBookingCheckoutSessionHeroImageUrl: string;
    groupBookingCheckoutSessionTitle: string;
    groupBookingCheckoutSessionCalendarDateRange: CalendarDateRange$1;
}
interface BifrostGroupBookingCheckoutStateContextValue {
    cart: BifrostGroupBookingCheckoutCart;
}

interface BundleBifrostFormQuestionWithResponseProps {
    bifrostFormQuestion: BifrostFormQuestion$1;
}
declare const bundleBifrostFormQuestionWithResponse: ({ bifrostFormQuestion, }: BundleBifrostFormQuestionWithResponseProps) => {
    bifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse$1;
};

interface UpdateBifrostFormQuestionWithResponseProps {
    previousBifrostFormQuestionWithResponse: BifrostFormQuestionWithResponse$1;
    updatedBifrostFormQuestionResponse: BifrostFormQuestionResponse$1;
}
declare const updateBifrostFormQuestionWithResponse: ({ previousBifrostFormQuestionWithResponse, updatedBifrostFormQuestionResponse, }: UpdateBifrostFormQuestionWithResponseProps) => BifrostFormQuestionWithResponse$1;

interface BifrostGroupBookingCheckoutRootPageProps {
    authenticatedGuestUser: AuthenticatedGuestUser | undefined;
    checkoutSessionSummary: BifrostGroupBookingCheckoutSessionSummary$1;
    cart: BifrostGroupBookingCheckoutCart$1;
    availableHotelRooms: RenderableItineraryHotelRoomOffer$1[];
    onClickLogin: () => void;
    onClickUpdateHotelRoomCountInCart: ({ updatedCountOffered, hotelRoomId, }: {
        updatedCountOffered: number;
        hotelRoomId: string;
    }) => void;
    onClickCheckout: () => void;
}
declare function BifrostGroupBookingCheckoutRootPage({ authenticatedGuestUser, checkoutSessionSummary, cart, availableHotelRooms, onClickLogin, onClickUpdateHotelRoomCountInCart, onClickCheckout, }: BifrostGroupBookingCheckoutRootPageProps): React.JSX.Element;

export { BaseBifrostFormQuestionResponse, BaseBifrostFormQuestionWithResponse, BaseRenderableBifrostFormQuestion, BifrostFormQuestion, BifrostFormQuestionCalendarDateRangeResponse, BifrostFormQuestionEmailResponse, BifrostFormQuestionMultiCalendarDateRangeResponse, BifrostFormQuestionPhoneNumberResponse, BifrostFormQuestionResponse, BifrostFormQuestionResponseType, BifrostFormQuestionSplitTextResponse, BifrostFormQuestionTextResponse, BifrostFormQuestionType, BifrostFormQuestionWithCalendarDateRangeResponse, BifrostFormQuestionWithEmailResponse, BifrostFormQuestionWithMultiCalendarDateRangeResponse, BifrostFormQuestionWithPhoneNumberResponse, BifrostFormQuestionWithResponse, BifrostFormQuestionWithSplitTextResponse, BifrostFormQuestionWithTextResponse, BifrostGroupBookingCheckoutCart, BifrostGroupBookingCheckoutRootPage, BifrostGroupBookingCheckoutSessionSummary, BifrostGroupBookingCheckoutStateContextValue, BifrostTextAreaFormQuestionWithTextResponse, BifrostTextInputFormQuestionWithTextResponse, BifrostToggleButtonGroupFormQuestionWithTextResponse, ExistingImage, ImageUpload, ImageUploadProps, ImageUploadWithExisting, ImageUploadWithExistingProps, ItineraryOfferOriginatorType, KismetHeader, KismetHeaderProps, KismetLogo, KismetSectionHeader, KismetSectionHeaderProps, RenderableEmailInputBifrostFormQuestion, RenderableItineraryEventOffer, RenderableItineraryEventOfferApprovalStatus, RenderableItineraryHotelRoomOffer, RenderableItineraryOffer, RenderableItineraryOfferBookingRules, RenderableItineraryOfferCriterion, RenderableMultiSelectDateRangeBifrostFormQuestion, RenderablePhoneInputBifrostFormQuestion, RenderableSelectDateRangeBifrostFormQuestion, RenderableSplitTextInputBifrostFormQuestion, RenderableTextAreaBifrostFormQuestion, RenderableTextInputBifrostFormQuestion, RenderableToggleButtonGroupBifrostFormQuestion, RenderableToggleButtonGroupBifrostFormQuestionOption, ReservedBifrostDateFlexibilityOptionValues, ReservedBifrostFormQuestionIds, ReservedBifrostReasonForTravelOptionValues, ReservedBifrostSplitPaymentOptionValues, SingleRenderableBifrostFormQuestion, bundleBifrostFormQuestionWithResponse, updateBifrostFormQuestionWithResponse };
