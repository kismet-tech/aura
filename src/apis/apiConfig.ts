export const getPaymentsPageUrl = ({
  hotelId,
  userSessionId,
}: {
  hotelId: string;
  userSessionId: string;
}): string => {
  return `https://makekismet.com/groups/${hotelId}/${userSessionId}`;
};
