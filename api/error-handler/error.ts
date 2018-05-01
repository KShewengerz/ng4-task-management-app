export interface Error {
  duplicate: ErrorResponse;
  notFound: ErrorResponse;
}

export interface ErrorResponse {
  code: number;
  message: string;
}

export enum ErrorType {
  Duplicate = "duplicate",
  NotFound = "notFound"
}