import { CalendarDate } from "./core/date/CalendarDate";
import { CalendarDateRange } from "./core/date/CalendarDateRange";
export declare enum ItineraryOfferOriginatorType {
    KISMET_AI = "KISMET_AI",
    GUEST = "GUEST",
    SALES_AGENT = "SALES_AGENT"
}
export interface RenderableItineraryOfferCriterion {
    criterionName: string;
    doesMatchCriterion: boolean;
}
export interface RenderableItineraryHotelRoomOffer {
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
export declare enum RenderableItineraryEventOfferApprovalStatus {
    PENDING = "Pending"
}
export interface RenderableItineraryEventOffer {
    eventOfferId: string;
    eventName: string;
    calendarDateRange: CalendarDateRange;
    approvalStatus: RenderableItineraryEventOfferApprovalStatus;
    imageUrl: string;
}
export interface RenderableItineraryOffer {
    itineraryOfferId: string;
    originatorType: ItineraryOfferOriginatorType;
    heroImageUrl: string;
    guestCount: number;
    startCalendarDate: CalendarDate;
    endCalendarDate: CalendarDate;
    itineraryOfferName: string;
    itineraryOfferDescription: string;
    descriptionOfAllHotelRoomOffers: string;
    hotelRoomOffers: RenderableItineraryHotelRoomOffer[];
    descriptionOfAllEventOffers: string;
    eventOffers: RenderableItineraryEventOffer[];
    criteria: RenderableItineraryOfferCriterion[];
}
