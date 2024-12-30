import { ToggleGroup, ToggleGroupItem } from "@/components/shadcn/toggle-group";
import {
  CalendarDateRange,
  renderCalendarDateRange,
  RenderedCalendarDateFormat,
  RenderedCalendarDateRangeJoinFormat,
} from "@kismet_ai/foundation";
import React, { useEffect, useMemo } from "react";

export interface MultiStageSmartDateSelectorQuestionSuggestedCalendarDateRangeSelectorProps {
  suggestedCalendarDateRanges?: CalendarDateRange[];
  setSuggestedCalendarDateRanges: ({
    updatedSuggestedCalendarDateRanges,
  }: {
    updatedSuggestedCalendarDateRanges: CalendarDateRange[];
  }) => void;
  values: CalendarDateRange[];
  setValues: ({ updatedValue }: { updatedValue: CalendarDateRange[] }) => void;
  descriptionOfPotentialCalendarDates: string;
  suggestCalendarDateRangesFromConstraints: ({
    descriptionOfPotentialCalendarDates,
  }: {
    descriptionOfPotentialCalendarDates: string;
  }) => Promise<CalendarDateRange[]>;
}

export function MultiStageSmartDateSelectorQuestionSuggestedCalendarDateRangeSelector({
  suggestedCalendarDateRanges,
  setSuggestedCalendarDateRanges,
  values,
  setValues,
  descriptionOfPotentialCalendarDates,
  suggestCalendarDateRangesFromConstraints,
}: MultiStageSmartDateSelectorQuestionSuggestedCalendarDateRangeSelectorProps) {
  console.log(
    `descriptionOfPotentialCalendarDates: ${descriptionOfPotentialCalendarDates}`
  );

  useEffect(() => {
    async function loadOptions() {
      const calendarDateRanges: CalendarDateRange[] =
        await suggestCalendarDateRangesFromConstraints({
          descriptionOfPotentialCalendarDates,
        });

      console.log(
        `THIS IS CALLED setSuggestedCalendarDateRanges: ${JSON.stringify(
          calendarDateRanges,
          null,
          4
        )}`
      );

      setSuggestedCalendarDateRanges({
        updatedSuggestedCalendarDateRanges: calendarDateRanges,
      });
    }

    if (
      !suggestedCalendarDateRanges ||
      suggestedCalendarDateRanges.length === 0
    ) {
      loadOptions();
    }
  }, [descriptionOfPotentialCalendarDates]);

  const selectedRenderedCalendarDateRanges: string[] = useMemo(() => {
    return values.map((selectedCalendarDateRange: CalendarDateRange) => {
      return renderCalendarDateRange({
        calendarDateRange: selectedCalendarDateRange,
        renderedCalendarDateFormat:
          RenderedCalendarDateFormat.ABBREVIATED_MONTH_DAY_OPTIONAL_YEAR,
        renderedCalendarDateRangeJoinFormat:
          RenderedCalendarDateRangeJoinFormat.SPACE_DASH_SPACE,
        collapseStrategy: {
          collapseSameDay: true,
          collapseSameMonth: true,
        },
      });
    });
  }, [values]);

  const suggestedRenderedCalendarDateRanges: string[] = useMemo(() => {
    return (suggestedCalendarDateRanges || []).map(
      (suggestedCalendarDateRange: CalendarDateRange) => {
        return renderCalendarDateRange({
          calendarDateRange: suggestedCalendarDateRange,
          renderedCalendarDateFormat:
            RenderedCalendarDateFormat.ABBREVIATED_MONTH_DAY_OPTIONAL_YEAR,
          renderedCalendarDateRangeJoinFormat:
            RenderedCalendarDateRangeJoinFormat.SPACE_DASH_SPACE,
          collapseStrategy: {
            collapseSameDay: true,
            collapseSameMonth: true,
          },
        });
      }
    );
  }, [values]);

  const handleSetSelectedOptions = (
    selectedRenderedCalendarDateRanges: string[]
  ) => {
    const selectedCalendarDateRanges = (
      suggestedCalendarDateRanges || []
    ).filter((suggestedCalendarDateRange: CalendarDateRange) => {
      const renderedSuggestedCalendarDateRange: string =
        renderCalendarDateRange({
          calendarDateRange: suggestedCalendarDateRange,
          renderedCalendarDateFormat:
            RenderedCalendarDateFormat.ABBREVIATED_MONTH_DAY_OPTIONAL_YEAR,
          renderedCalendarDateRangeJoinFormat:
            RenderedCalendarDateRangeJoinFormat.SPACE_DASH_SPACE,
          collapseStrategy: {
            collapseSameDay: true,
            collapseSameMonth: true,
          },
        });

      const isSelected: boolean = selectedRenderedCalendarDateRanges.includes(
        renderedSuggestedCalendarDateRange
      );

      return isSelected;
    });

    setValues({ updatedValue: selectedCalendarDateRanges });
  };

  return (
    <div>
      <ToggleGroup
        type="multiple"
        variant="outline"
        className="flex flex-wrap w-full space-x-4 py-2 justify-start items-start"
        onValueChange={handleSetSelectedOptions}
      >
        {suggestedCalendarDateRanges?.map(
          (suggestedCalendarDateRange: CalendarDateRange) => {
            const renderedSuggestedCalendarDateRange: string =
              renderCalendarDateRange({
                calendarDateRange: suggestedCalendarDateRange,
                renderedCalendarDateFormat:
                  RenderedCalendarDateFormat.ABBREVIATED_MONTH_DAY_OPTIONAL_YEAR,
                renderedCalendarDateRangeJoinFormat:
                  RenderedCalendarDateRangeJoinFormat.SPACE_DASH_SPACE,
                collapseStrategy: {
                  collapseSameDay: true,
                  collapseSameMonth: true,
                },
              });

            return (
              <ToggleGroupItem
                key={renderedSuggestedCalendarDateRange}
                value={renderedSuggestedCalendarDateRange}
                className={`!m-0 min-w-[30%] ${
                  selectedRenderedCalendarDateRanges.includes(
                    renderedSuggestedCalendarDateRange
                  )
                    ? "!bg-black !text-white"
                    : "!bg-white !text-black"
                }`}
              >
                {renderedSuggestedCalendarDateRange}
              </ToggleGroupItem>
            );
          }
        )}
      </ToggleGroup>
    </div>
  );
}
