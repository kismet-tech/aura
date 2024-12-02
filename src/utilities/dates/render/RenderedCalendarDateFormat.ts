export enum RenderedCalendarDateFormat {
  // Example: 12/13/2027
  MM_SLASH_DD_SLASH_YY = "MM_SLASH_DD_SLASH_YY",

  // Example: Dec 13 (current year is hidden)
  // Example: Dec 13, 2027 (non-current year is shown)
  ABBREVIATED_MONTH_DAY_OPTIONAL_YEAR = "ABBREVIATED_MONTH_DAY_OPTIONAL_YEAR",

  // Example: January 3, 2025
  MONTH_DAY_YEAR = "MONTH_DAY_YEAR",

  // Example: January
  MONTH = "MONTH",
}
