export declare enum EitherResponseType {
    SUCCESS = "SUCCESS",
    ERROR = "ERROR"
}
export type SuccessResponse<T> = {
    type: EitherResponseType.SUCCESS;
    success: T;
};
export type ErrorResponse<E> = {
    type: EitherResponseType.ERROR;
    error: E;
};
export type EitherResponse<T, E> = SuccessResponse<T> | ErrorResponse<E>;
export declare const successResponse: <T>(data: T) => SuccessResponse<T>;
export declare const errorResponse: <E>(error: E) => ErrorResponse<E>;