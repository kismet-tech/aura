import { BifrostApiInterface } from "@/apis/bifrostApi/models";

const LOCAL_STORAGE_BIFROST_TRAVELER_ID_KEY = "bifrostTravelerId";

interface HandleGetBifrostTravelerIdProps {
  setBifrostTravelerId: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  bifrostApi: BifrostApiInterface;
}

export const handleGetBifrostTravelerId = async ({
  setBifrostTravelerId,
  bifrostApi,
}: HandleGetBifrostTravelerIdProps): Promise<void> => {
  const maybeExistingBifrostTravelerId: string | null = localStorage.getItem(
    LOCAL_STORAGE_BIFROST_TRAVELER_ID_KEY
  );

  if (
    maybeExistingBifrostTravelerId &&
    !["", "undefined"].includes(maybeExistingBifrostTravelerId)
  ) {
    localStorage.removeItem(LOCAL_STORAGE_BIFROST_TRAVELER_ID_KEY);
    localStorage.setItem(
      LOCAL_STORAGE_BIFROST_TRAVELER_ID_KEY,
      maybeExistingBifrostTravelerId
    );

    setBifrostTravelerId(maybeExistingBifrostTravelerId);
    return;
  }

  const { bifrostTravelerId } = await bifrostApi.getOrCreateBifrostTravelerId(
    {}
  );
  localStorage.setItem(
    LOCAL_STORAGE_BIFROST_TRAVELER_ID_KEY,
    bifrostTravelerId
  );
  return;
};
