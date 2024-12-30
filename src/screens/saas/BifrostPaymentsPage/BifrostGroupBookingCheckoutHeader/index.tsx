import React from "react";
import {
  BifrostGroupBookingCheckoutCart,
  BifrostGroupBookingCheckoutSessionSummary,
} from "@kismet_ai/foundation";
import { KismetShoppingCartIcon } from "@/components/atoms/icons/KismetShoppingCartIcon";
import { UserAvatar } from "@/components/atoms/UserAvatar";
import { AuthenticatedGuestUser } from "@/models/guests/AuthenticatedGuestUser";
import { Skeleton } from "@/components/shadcn/skeleton";
import { Settings, Calendar, Users } from "lucide-react";

interface BifrostGroupBookingCheckoutHeaderProps {
  authenticatedGuestUser: AuthenticatedGuestUser | undefined;
  cart: BifrostGroupBookingCheckoutCart;
  checkoutSessionSummary: BifrostGroupBookingCheckoutSessionSummary | undefined;
  variant?: "host" | "attendee" | "saas";
  onClickLogin: () => void;
  onClickCart: () => void;
  onClickEvents?: () => void;
  onClickRoomBlock?: () => void;
  onClickSettings?: () => void;
}

export function BifrostGroupBookingCheckoutHeader({
  authenticatedGuestUser,
  cart,
  checkoutSessionSummary,
  variant = "attendee",
  onClickLogin,
  onClickCart,
  onClickEvents,
  onClickRoomBlock,
  onClickSettings,
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

  const showNavLinks = variant === "host" || variant === "saas";

  return (
    <div className="flex items-center border-b border-black w-full pb-4">
      <div className="text-4xl font-light font-palatino">
        {checkoutSessionSummary ? (
          checkoutSessionSummary.hotelName
        ) : (
          <Skeleton className="w-[100px] h-[20px] rounded-full" />
        )}
      </div>

      {showNavLinks && (
        <div className="ml-8 flex items-center space-x-6">
          <button
            onClick={onClickEvents}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <Calendar className="w-4 h-4" />
            <span>Events</span>
          </button>
          <button
            onClick={onClickRoomBlock}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <Users className="w-4 h-4" />
            <span>Room Block</span>
          </button>
          <button
            onClick={onClickSettings}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </div>
      )}

      <div className="ml-auto flex items-center">
        <KismetShoppingCartIcon
          className="cursor-pointer"
          onClick={onClickCart}
        />
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
