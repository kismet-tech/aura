import { AuthenticatedGuestUser } from "@/models/guests/AuthenticatedGuestUser";
import { BifrostGroupBookingCheckoutCart, BifrostGroupBookingCheckoutSessionSummary } from "@/providers/saas/BifrostGroupBookingCheckoutStateProvider/models";
import React from "react";
interface BifrostGroupBookingCheckoutHeaderProps {
    authenticatedGuestUser: AuthenticatedGuestUser | undefined;
    cart: BifrostGroupBookingCheckoutCart;
    checkoutSessionSummary: BifrostGroupBookingCheckoutSessionSummary;
    onClickLogin: () => void;
}
export declare function BifrostGroupBookingCheckoutHeader({ authenticatedGuestUser, cart, checkoutSessionSummary, onClickLogin, }: BifrostGroupBookingCheckoutHeaderProps): React.JSX.Element;
export {};
