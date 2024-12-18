import React from "react";
import { EventOfferCarouselItem, EventOfferCarouselItemProps } from "@/components/atoms/EventOfferCarouselItem";
import { cn } from "@/lib/utils";

export interface EventOfferCarouselProps {
    /**
     * Array of event offers to display in the carousel/grid
     */
    items: Omit<EventOfferCarouselItemProps, 'className'>[];
    /**
     * Optional className for custom styling
     */
    className?: string;
}

/**
 * A responsive component that displays EventOfferCarouselItems in a horizontal 
 * scrollable carousel on mobile and a grid layout on larger screens.
 */
export function EventOfferCarousel({ items, className }: EventOfferCarouselProps) {
    return (
        <div className={cn(
            "w-full overflow-hidden",
            className
        )}>
            <div
                className={cn(
                    "flex gap-4 pb-4 -mb-4", // negative margin to hide scrollbar
                    "overflow-x-auto scrollbar-hide",
                    // Enable smooth scrolling
                    "scroll-smooth",
                    // Enable snap scrolling
                    "snap-x snap-mandatory"
                )}
            >
                {items.map((item) => (
                    <div
                        key={item.eventOffer.eventOfferId}
                        className={cn(
                            "flex-none w-[90%] md:w-[45%] lg:w-[30%]",
                            "snap-start"
                        )}
                    >
                        <EventOfferCarouselItem
                            {...item}
                            className="h-full"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
} 