import { parseISO, isValid } from 'date-fns';
export function isConvertibleToDate(input: unknown): boolean {
    if (typeof input !== "string") return false;

    // Reject numeric-only strings like "01082002"
    if (!isNaN(Number(input))) return false;

    const date = parseISO(input);
    return isValid(date);
}