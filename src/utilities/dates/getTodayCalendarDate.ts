import { CalendarDate } from "@kismet_ai/foundation";

interface GetTodayCalendarDateProps {
  timeZone?: string;
}

export const getTodayCalendarDate = ({
  timeZone,
}: GetTodayCalendarDateProps): CalendarDate => {
  const today = new Date();

  return {
    year: today.getFullYear(),
    month: today.getMonth() + 1, // Convert to one-indexed month
    day: today.getDate(),
    timeZone,
  };
};
