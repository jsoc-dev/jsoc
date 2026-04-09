import {
  encode,
  isArray,
  isBoolean,
  isNumber,
  isString,
  type UJSONValue,
} from "@jsoc/utils";

export const booleanToString = (value: boolean) => {
  return value.toString();
};

/**
 * Converts a string date to a Date object for use in date columns.
 * Note: No validation is performed on the string `value`. It is
 * assumed that the string `value` is a valid date string.
 */
export const stringDateToDate = (value: string) => {
  return new Date(value);
};

export const ujsonValueToString = (value: UJSONValue) => {
  if (
    isArray(value) &&
    value.every((v) => isString(v) || isNumber(v) || isBoolean(v))
  ) {
    return value.join(", ");
  }

  return encode(value);
};
