import { BifrostGroupBookingCheckoutCart, BifrostGroupBookingCheckoutSessionSummary } from "@/providers/saas/BifrostGroupBookingCheckoutStateProvider/models";
import React from "react";
interface BifrostGroupBookingCheckoutHeaderProps {
    cart: BifrostGroupBookingCheckoutCart;
    checkoutSessionSummary: BifrostGroupBookingCheckoutSessionSummary;
}
export declare function BifrostGroupBookingCheckoutHeader({ cart, checkoutSessionSummary, }: BifrostGroupBookingCheckoutHeaderProps): React.JSX.Element;
export {};
