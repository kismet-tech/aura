import React, { useState, useEffect } from "react";
import { Calendar, Users, DoorOpen, ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";
import { DateRangePicker } from "@/components/atoms/DateRangePicker";
import { DateRange } from "react-day-picker";
import { BifrostGroupBookingCheckoutSessionSummary, RenderableItineraryHotelRoomOffer } from "@kismet_ai/foundation";
import { DescriptionAccordion } from "@/components/atoms/DescriptionAccordion";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/shadcn/hover-card";

/**
 * @julian
 * Need API endpoint for nightly pricing that handles:
 * 1. Block dates: Return discounted rates from the group block
 * 2. Extended dates: If user selects dates outside the block:
 *    - Fetch standard rates from PMS for those dates
 *    - Return a combined price list with block rates + standard rates
 *    - Update the displayed average price/night accordingly
 * 
 * Example response shape:
 * {
 *   rates: {
 *     "2024-06-15": { price: 299, isBlockRate: true },
 *     "2024-06-16": { price: 299, isBlockRate: true },
 *     "2024-06-17": { price: 399, isBlockRate: false } // Standard rate from PMS
 *   },
 *   averagePrice: 332.33
 * }
 * 
 * This will allow us to:
 * 1. Show accurate nightly rates in the hover card
 * 2. Distinguish block vs standard rates visually
 * 3. Display the correct average price/night
 */

export interface BifrostSelectRoomAttendeeProps {
  name: string;
  price: number;
  originalPrice: number;
  quantity: number;
  imageUrl: string;
  checkoutSessionSummary?: BifrostGroupBookingCheckoutSessionSummary;
  roomsInCart: number;
  hotelRoomDescription: string;
  images?: string[];
  maxGuests?: number;
}

export function BifrostSelectRoomAttendee({
  name,
  price,
  originalPrice,
  quantity,
  imageUrl,
  checkoutSessionSummary,
  roomsInCart,
  hotelRoomDescription,
  images = [imageUrl],
  maxGuests = 4,
}: BifrostSelectRoomAttendeeProps) {
  const defaultDateRange: DateRange | undefined = checkoutSessionSummary ? {
    from: new Date(
      checkoutSessionSummary.groupBookingCheckoutSessionCalendarDateRange.startCalendarDate.year,
      checkoutSessionSummary.groupBookingCheckoutSessionCalendarDateRange.startCalendarDate.month - 1,
      checkoutSessionSummary.groupBookingCheckoutSessionCalendarDateRange.startCalendarDate.day
    ),
    to: new Date(
      checkoutSessionSummary.groupBookingCheckoutSessionCalendarDateRange.endCalendarDate.year,
      checkoutSessionSummary.groupBookingCheckoutSessionCalendarDateRange.endCalendarDate.month - 1,
      checkoutSessionSummary.groupBookingCheckoutSessionCalendarDateRange.endCalendarDate.day
    )
  } : undefined;

  const [dateRange, setDateRange] = useState<DateRange | undefined>(defaultDateRange);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);

  useEffect(() => {
    if (!isHovering) {
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isHovering]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    setShowControls(true);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    setShowControls(true);
  };

  const incrementGuests = () => {
    if (guestCount < maxGuests) {
      setGuestCount(prev => prev + 1);
    }
  };

  const decrementGuests = () => {
    if (guestCount > 1) {
      setGuestCount(prev => prev - 1);
    }
  };

  const incrementRooms = () => {
    if (roomCount < quantity) {
      setRoomCount(prev => prev + 1);
    }
  };

  const decrementRooms = () => {
    if (roomCount > 1) {
      setRoomCount(prev => prev - 1);
    }
  };

  // Function to generate dates between start and end date
  const getDatesInRange = (startDate: Date, endDate: Date) => {
    const dates = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  // Function to format date as "Day, Month Date"
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <div className="w-full bg-white">
      <div className="relative">
        {/* Rooms in cart badge */}
        {roomsInCart > 0 && (
          <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-md z-10">
            {roomsInCart}
          </div>
        )}
        
        {/* Main image with navigation */}
        <div 
          className="relative"
          onMouseEnter={() => {
            setIsHovering(true);
            setShowControls(true);
          }}
          onMouseLeave={() => {
            setIsHovering(false);
          }}
        >
          <img
            src={images[currentImageIndex]}
            alt={`${name} - Image ${currentImageIndex + 1}`}
            className="w-full h-64 object-cover"
          />
          
          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={previousImage}
                className={`absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full transition-opacity duration-300 ${
                  showControls ? 'opacity-100' : 'opacity-0'
                }`}
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className={`absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full transition-opacity duration-300 ${
                  showControls ? 'opacity-100' : 'opacity-0'
                }`}
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Carousel dots */}
          {images.length > 1 && (
            <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}>
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setShowControls(true);
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold">{name}</h2>

        {/* Room Description */}
        <div className="mb-6">
          <DescriptionAccordion 
            renderableItineraryHotelRoomOffer={
              {
                hotelRoomDescription
              } as RenderableItineraryHotelRoomOffer
            } 
          />
        </div>

        {/* Price and discount section */}
        <div className="flex items-baseline gap-2 mb-6">
          <HoverCard>
            <HoverCardTrigger>
              <button className="text-2xl font-bold hover:text-gray-700 transition-colors">
                ${price}/night
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 p-4 bg-white border border-gray-200 shadow-lg rounded-lg">
              <div className="space-y-2">
                <h3 className="font-semibold text-sm">Daily Rates</h3>
                {dateRange?.from && dateRange?.to ? (
                  <div className="space-y-1">
                    {getDatesInRange(dateRange.from, dateRange.to).map((date, index) => (
                      <div key={date.toISOString()} className="flex justify-between text-sm">
                        <span className="text-gray-600">{formatDate(date)}</span>
                        <span className="font-medium">${price}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Select dates to see daily rates</p>
                )}
              </div>
            </HoverCardContent>
          </HoverCard>
          {originalPrice > price && (
            <>
              <span className="text-base line-through text-gray-400">
                ${originalPrice}
              </span>
              <span className="text-base text-gray-500">
                ({((1 - price / originalPrice) * 100).toFixed(0)}% off)
              </span>
            </>
          )}
        </div>

        {/* Room info with icons */}
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center justify-between text-base text-gray-600 p-2 rounded-md hover:border hover:border-gray-200 transition-all">
            <div className="flex items-center gap-3">
              <DoorOpen className="w-5 h-5" />
              <span>{roomCount} {roomCount === 1 ? 'room' : 'rooms'}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={decrementRooms}
                disabled={roomCount <= 1}
                className={`p-1 rounded-full hover:bg-gray-100 ${roomCount <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-label="Decrease room count"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={incrementRooms}
                disabled={roomCount >= quantity}
                className={`p-1 rounded-full hover:bg-gray-100 ${roomCount >= quantity ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-label="Increase room count"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-2 rounded-md hover:border hover:border-gray-200 transition-all">
            <DateRangePicker
              dateRange={dateRange}
              setDateRange={setDateRange}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between text-base text-gray-600 p-2 rounded-md hover:border hover:border-gray-200 transition-all">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5" />
              <span>{guestCount} {guestCount === 1 ? 'guest' : 'guests'}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={decrementGuests}
                disabled={guestCount <= 1}
                className={`p-1 rounded-full hover:bg-gray-100 ${guestCount <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-label="Decrease guest count"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={incrementGuests}
                disabled={guestCount >= maxGuests}
                className={`p-1 rounded-full hover:bg-gray-100 ${guestCount >= maxGuests ? 'opacity-50 cursor-not-allowed' : ''}`}
                aria-label="Increase guest count"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 