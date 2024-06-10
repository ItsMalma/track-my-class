import { ClientResponseError } from "pocketbase";

export enum ApiErrorType {
  NotUnique,
  Unknown,
}

export type ApiErrors = Record<string, ApiErrorType>;

export function isApiErrors(errors: unknown): errors is ApiErrors {
  if (typeof errors !== "object") return false;
  if (errors === null) return false;

  return Object.values(errors).every(
    (value) =>
      value === ApiErrorType.NotUnique || value === ApiErrorType.Unknown
  );
}

function transformClientResponseError(err: ClientResponseError): ApiErrors {
  const errors: ApiErrors = {};

  Object.keys(err.data).forEach((key) => {
    const error = err.data[key];
    if (typeof error === "object" && typeof error.code === "string") {
      switch (error.code) {
        case "validation_not_unique":
          errors[key] = ApiErrorType.NotUnique;
          break;
        default:
          errors[key] = ApiErrorType.Unknown;
      }
    } else {
      errors[key] = ApiErrorType.Unknown;
    }
  });

  return errors;
}

export function wrapCatch(
  cb: (errors: ApiErrors) => void
): (r: unknown) => void {
  return (r) => {
    if (r instanceof ClientResponseError) {
      cb(transformClientResponseError(r));
    }
  };
}
