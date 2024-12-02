import { KismetShoppingCartIcon } from "@/components/atoms/icons/KismetShoppingCartIcon";
import {
  BifrostGroupBookingCheckoutCart,
  BifrostGroupBookingCheckoutSessionSummary,
} from "@/providers/saas/BifrostGroupBookingCheckoutStateProvider/models";
import React from "react";

interface BifrostGroupBookingCheckoutHeaderProps {
  cart: BifrostGroupBookingCheckoutCart;
  checkoutSessionSummary: BifrostGroupBookingCheckoutSessionSummary;
}

export function BifrostGroupBookingCheckoutHeader({
  cart,
  checkoutSessionSummary,
}: BifrostGroupBookingCheckoutHeaderProps) {
  let cartRoomIndicator: JSX.Element = <></>;
  if (cart.hotelRooms.length > 0) {
    cartRoomIndicator = (
      <div className="ml-3">
        {" "}
        {`${cart.hotelRooms.length} ${
          cart.hotelRooms.length > 1 ? "Rooms" : "Room"
        }`}
      </div>
    );
  }

  let cartAddOnIndicator: JSX.Element = <></>;
  if ((cart as any)["addOnCount"]) {
    cartAddOnIndicator = (
      <div className="ml-3">
        {" "}
        {`${(cart as any).addOnCount.length} ${
          (cart as any).addOnCount.length > 1 ? "Add-Ons" : "Add-On"
        }`}
      </div>
    );
  }

  return (
    <div className="flex items-center border-b-4 border-black w-full pb-4">
      <div className="text-4xl font-light font-palatino">
        {checkoutSessionSummary.hotelName}
      </div>
      <div className="ml-auto flex">
        <KismetShoppingCartIcon />
        {cartRoomIndicator}
        {cartAddOnIndicator}
        <button className="ml-3">Login</button>
      </div>
    </div>
  );
}
