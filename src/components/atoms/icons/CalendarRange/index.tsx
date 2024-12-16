import React from "react";
import { CalendarRange as LucideCalendarRange } from "lucide-react";

type CalendarRangeIconProps = React.ComponentProps<typeof LucideCalendarRange>;

export function CalendarRange({ className = "w-4 h-4", ...props }: CalendarRangeIconProps) {
  return <LucideCalendarRange className={className} {...props} />;
} 