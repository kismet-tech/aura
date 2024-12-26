import { KismetShoppingCartIcon } from "@/components/atoms/icons/KismetShoppingCartIcon";
import { UserAvatar } from "@/components/atoms/UserAvatar";
import { Skeleton } from "@/components/shadcn/skeleton";
import { AuthenticatedGuestUser } from "../../../../../src/models/guests/AuthenticatedGuestUser";
import { BifrostGroupBookingCheckoutCart } from "@/providers/saas/BifrostGroupBookingCheckoutStateProvider/models";
import React from "react";
import { BifrostGroupBookingCheckoutSessionSummary } from "@kismet_ai/foundation";

interface BifrostGroupBookingCheckoutHeaderProps {
  authenticatedGuestUser: AuthenticatedGuestUser | undefined;
  cart: BifrostGroupBookingCheckoutCart;
  checkoutSessionSummary: BifrostGroupBookingCheckoutSessionSummary | undefined;
  onClickLogin: () => void;
  onClickCart: () => void;
}

export function BifrostGroupBookingCheckoutHeader({
  authenticatedGuestUser,
  cart,
  checkoutSessionSummary,
  onClickLogin,
  onClickCart,
}: BifrostGroupBookingCheckoutHeaderProps) {
  const countOfHotelRoomsInCart = cart.hotelRooms.reduce(
    (acc, hotelRoom) => acc + hotelRoom.countOffered,
    0
  );

  let cartRoomIndicator: JSX.Element = <></>;
  if (countOfHotelRoomsInCart > 0) {
    cartRoomIndicator = (
      <div className="ml-3">
        {" "}
        {`${countOfHotelRoomsInCart} ${
          countOfHotelRoomsInCart > 1 ? "Rooms" : "Room"
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
    <div className="flex items-center border-b border-black w-full pb-4">
      <div className="text-4xl font-light font-palatino">
        {checkoutSessionSummary ? (
          checkoutSessionSummary.hotelName
        ) : (
          <Skeleton className="w-[100px] h-[20px] rounded-full" />
        )}
      </div>
      <div className="ml-auto flex items-center">
        <KismetShoppingCartIcon onClick={onClickCart} />
        {cartRoomIndicator}
        {cartAddOnIndicator}
        <div className="ml-3 items-center">
          {authenticatedGuestUser ? (
            <div className="cursor-pointer">
              <UserAvatar
                name={`${authenticatedGuestUser.firstName} ${authenticatedGuestUser.lastName}`}
              />
            </div>
          ) : (
            <button
              onClick={(
                event: React.MouseEvent<HTMLButtonElement, MouseEvent>
              ) => {
                event.preventDefault();
                onClickLogin();
              }}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
