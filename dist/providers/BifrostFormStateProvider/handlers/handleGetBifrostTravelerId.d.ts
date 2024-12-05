/// <reference types="react" />
import { BifrostApiInterface } from "@/apis/bifrostApi/models";
interface HandleGetBifrostTravelerIdProps {
    setBifrostTravelerId: React.Dispatch<React.SetStateAction<string | undefined>>;
    bifrostApi: BifrostApiInterface;
}
export declare const handleGetBifrostTravelerId: ({ setBifrostTravelerId, bifrostApi, }: HandleGetBifrostTravelerIdProps) => Promise<void>;
export {};
