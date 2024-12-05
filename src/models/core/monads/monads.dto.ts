import { EitherResponseType } from ".";

export interface ErrorResponseDataDto {
  reason: string;
  errorMessage?: string;
  additionalErrorInformation?: string;
}
export interface ErrorResponseDto {
  type: EitherResponseType.ERROR;
  error: ErrorResponseDataDto;

  statusCode?: number;
}
