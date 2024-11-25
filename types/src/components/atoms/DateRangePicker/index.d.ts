import * as React from "react";
import { DateRange } from "react-day-picker";
export interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
    dateRange: DateRange | undefined;
    setDateRange: (dateRange: DateRange | undefined) => void;
    className?: string;
}
export declare function DateRangePicker({ dateRange, setDateRange, className, }: DateRangePickerProps): React.JSX.Element;
