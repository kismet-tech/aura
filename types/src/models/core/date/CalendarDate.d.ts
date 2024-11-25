export interface CalendarDate {
    /**
     * Year of the date
     * @type {number}
     * @memberof CalendarDate
     */
    year: number;
    /**
     * One-indexed month of the date (January is 1)
     * @type {number}
     * @memberof CalendarDate
     */
    month: number;
    /**
     * Day of the date
     * @type {number}
     * @memberof CalendarDate
     */
    day: number;
    /**
     * Timezone of the date. Provided by Intl.DateTimeFormat().resolvedOptions().timeZone. All options viewable by Intl.supportedValuesOf(\"timeZone\")
     * @type {string}
     * @memberof CalendarDate
     */
    timeZone?: string;
}
