import { RenderableItineraryOffer } from "@/models/RenderableItineraryOffer";
import { renderCalendarDateRange } from "@/utilities/dates/render/renderCalendarDateRange";
import { RenderedCalendarDateFormat } from "@/utilities/dates/render/RenderedCalendarDateFormat";
import { RenderedCalendarDateRangeJoinFormat } from "@/utilities/dates/render/RenderedCalendarDateRangeJoinFormat";
import { getRoomCountFromRenderableItineraryOffer } from "@/utilities/entities/itineraryOffer/getRoomCountFromRenderableItineraryOffer";
import { getTotalListPriceInCentsFromRenderableItineraryOffer } from "@/utilities/entities/itineraryOffer/getTotalListPriceInCentsFromRenderableItineraryOffer";
import { getTotalOfferPriceInCentsFromRenderableItineraryOffer } from "@/utilities/entities/itineraryOffer/getTotalOfferPriceInCents";
import { renderDiscount } from "@/utilities/entities/itineraryOffer/renderDiscount";
import React from "react";

export interface AlternativeItineraryOfferPreviewProps {
  renderableItineraryOffer: RenderableItineraryOffer;
  itineraryOfferIndex: number;
  onClick: () => void;
}

export function AlternativeItineraryOfferPreview({
  renderableItineraryOffer,
  itineraryOfferIndex,
  onClick,
}: AlternativeItineraryOfferPreviewProps) {
  const {
    heroImageUrl,
    startCalendarDate,
    endCalendarDate,
    guestCount,
    itineraryOfferName,
  } = renderableItineraryOffer;

  const formattedDates: string = renderCalendarDateRange({
    calendarDateRange: {
      startCalendarDate,
      endCalendarDate,
    },
    renderedCalendarDateFormat:
      RenderedCalendarDateFormat.ABBREVIATED_MONTH_DAY_OPTIONAL_YEAR,
    renderedCalendarDateRangeJoinFormat:
      RenderedCalendarDateRangeJoinFormat.SPACE_DASH_SPACE,
    collapseStrategy: {
      collapseSameDay: true,
      collapseSameMonth: true,
    },
  });

  const { totalOfferPriceInCents } =
    getTotalOfferPriceInCentsFromRenderableItineraryOffer({
      renderableItineraryOffer,
    });

  const { totalListPriceInCents } =
    getTotalListPriceInCentsFromRenderableItineraryOffer({
      renderableItineraryOffer,
    });

  const isPerPerson: boolean = Boolean(guestCount);
  const roomCount: number = getRoomCountFromRenderableItineraryOffer({
    renderableItineraryOffer,
  });

  const pricePerUnit: number = isPerPerson
    ? totalOfferPriceInCents / (guestCount || 1)
    : totalOfferPriceInCents / (roomCount || 1);

  return (
    <div
      className="flex items-center gap-4 rounded-md p-4"
      onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        onClick();
      }}
    >
      {/* Image */}
      <div
        className="w-24 h-24 bg-cover bg-center rounded-md"
        style={{ backgroundImage: `url(${heroImageUrl})` }}
      ></div>

      {/* Text Content */}
      <div className="flex flex-col">
        {/* Title */}
        <div className="text-lg">
          {itineraryOfferName} {`#${itineraryOfferIndex + 1}`}
        </div>

        {/* Dates */}
        <div className="text-sm">{formattedDates}</div>

        {/* Price */}
        <div className="text-sm">
          ${Math.round(pricePerUnit / 100) || 0}/{isPerPerson ? "pp" : "room"}{" "}
          {
            <span>
              {renderDiscount({
                listPriceInCents: totalListPriceInCents,
                offerPriceInCents: totalOfferPriceInCents,
              })}
            </span>
          }
        </div>
      </div>
    </div>
  );
}
