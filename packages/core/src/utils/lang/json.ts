import { toStringSafe } from './string';


/**
 * Replica of native JSON.stringify, but this version fallbacks to casted string
 * instead of throwing error if the value is invalid.
 */
export function encode(
	value: unknown,
	replacer?:
		| ((this: any, key: string, value: any) => any)
		| (string | number)[]
		| null,
	space?: string | number
): string {
	try {
		return JSON.stringify(value, replacer as any, space);
	} catch {
		return toStringSafe(value);
	}
}

export function encodePretty(json: unknown) {
	return encode(json, null, 2);
}

/**
 * Replica of native JSON.parse, but this version fallbacks to null
 * instead of throwing error if the text is not a valid JSON.
 */
export function decode(
	text: string,
	reviver?: (this: any, key: string, value: any) => any
): any {
	try {
		return JSON.parse(text, reviver);
	} catch {
		return null;
	}
}

