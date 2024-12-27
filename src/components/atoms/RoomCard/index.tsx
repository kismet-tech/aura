import React, { useState } from "react";
import { RenderableItineraryHotelRoomOffer } from "@kismet_ai/foundation";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { DescriptionAccordion } from "../DescriptionAccordion";

/**
 * The RoomCard variant determines what information is displayed:
 * 
 * - "host": Full management view for hosts/planners
 *   Shows availability, discounted rates, quantity controls, and guest list access
 * 
 * - "attendee": Booking view for event attendees
 *   Shows availability, discounted rates, and quantity controls for booking
 *   Clicking the card opens the BifrostGroupBookingSheetSequenceCartContentRoomCard
 * 
 * - "saas": Administrative view for venue managers
 *   Shows total inventory and rack rates without booking controls
 * 
 * Note to backend engineer: Please ensure RenderableItineraryHotelRoomOffer includes 
 * hotelRoomImageUrls array for all room images, not just the hero image.
 */
type RoomCardVariant = "host" | "attendee" | "saas";

interface RoomCardProps {
  room: RenderableItineraryHotelRoomOffer & {
    badgeText?: string;
  };
  onUpdateCount: (updatedCount: number) => void;
  variant: RoomCardVariant;
  className?: string;
  onClick?: (room: RenderableItineraryHotelRoomOffer) => void;
}

export function RoomCard({ room, onUpdateCount, variant, className = "", onClick }: RoomCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = room.hotelRoomImageUrls || [room.heroImageUrl];
  const hasMultipleImages = images.length > 1;

  const handleClick = () => {
    if (onClick) {
      onClick(room);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const renderQuantityControls = () => {
    if (variant === "saas") return null;

    return (
      <div className="absolute bottom-4 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUpdateCount(Math.max(0, (room.countOffered || 0) - 1));
            }}
            className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100"
          >
            -
          </button>
          <span className="w-8 text-center bg-white rounded-full shadow py-1">{room.countOffered || 0}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUpdateCount(Math.min(room.countAvailable, (room.countOffered || 0) + 1));
            }}
            className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>
    );
  };

  const renderBadges = () => {
    if (variant === "saas") {
      return (
        <div className="absolute top-2 left-2 bg-white rounded-full px-2 py-1 text-sm">
          {room.countAvailable} total
        </div>
      );
    }

    return (
      <div className="absolute top-2 left-2 flex gap-2">
        {(room.countOffered || 0) > 0 && (
          <span className="bg-white rounded-full px-2 py-1 text-sm">
            {room.countOffered}
          </span>
        )}
        {room.badgeText && (
          <span className="bg-white rounded-full px-2 py-1 text-sm">
            {room.badgeText.slice(0, 22)}
          </span>
        )}
      </div>
    );
  };

  const renderPrice = () => {
    if (variant === "saas") {
      return (
        <div className="mt-1 space-y-0.5">
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-sm">${room.listPriceInCents / 100}/night</span>
          </div>
          <div className="text-sm text-gray-500">Rack Rate</div>
        </div>
      );
    }

    return (
      <div className="mt-1 space-y-0.5">
        <div className="flex items-baseline gap-2">
          {room.listPriceInCents > room.offerPriceInCents && (
            <span className="line-through text-gray-400 text-sm">
              ${room.listPriceInCents / 100}
            </span>
          )}
          <span className="font-semibold text-sm">${room.offerPriceInCents / 100}/night</span>
        </div>
        {room.listPriceInCents > room.offerPriceInCents && (
          <div className="text-sm text-gray-500">
            ({Math.round((1 - room.offerPriceInCents / room.listPriceInCents) * 100)}% off)
          </div>
        )}
      </div>
    );
  };

  const renderMoreInfo = () => {
    if (variant === "host") {
      return (
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <span>Guest List</span>
          <ChevronRight className="h-4 w-4 cursor-pointer" onClick={(e) => {
            e.stopPropagation();
            // Handle guest list click
          }} />
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`border border-gray-300 overflow-hidden group ${className}`}>
      <div className="relative">
        <div className="relative cursor-pointer" onClick={handleClick}>
          <img
            src={images[currentImageIndex]}
            alt={`${room.hotelRoomName} - Image ${currentImageIndex + 1}`}
            className="w-full aspect-[4/3] object-cover"
          />
          {hasMultipleImages && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full ${
                      index === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
          {renderBadges()}
          {renderQuantityControls()}
        </div>
        <div className="p-4">
          <h3
            className="font-semibold text-sm cursor-pointer hover:text-gray-600"
            onClick={handleClick}
          >
            {room.hotelRoomName}
          </h3>
          {renderMoreInfo()}
          {renderPrice()}
          <div className="mt-2">
            <DescriptionAccordion renderableItineraryHotelRoomOffer={room} />
          </div>
        </div>
      </div>
    </div>
  );
} 