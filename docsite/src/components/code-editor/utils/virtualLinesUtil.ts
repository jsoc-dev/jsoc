import type { Code, CodeLine } from '../CodeEditor';

/**
 * TRAILING_LINE is very critical to be inserted in the innerHTML of input element
 * It will solve the last-line quirk in browsers like chrome. ('\n' doesn't create 
 * a newline if there is no text after it.)
 * 
 * Note: Keep the <span> simple, no text content or height/width otherwise it become
 * part of selection area/navigation area within the pre element.
 */
export const TRAILING_LINE = '\n<span></span>';

export function convertToVirtualLines(code: Code): CodeLine[] {
	const lines = code.split('\n');

	return lines;
}

export function convertToInternalCode(externalCode: Code = ''): Code {
	let code = externalCode;
	if (!code.endsWith(TRAILING_LINE)) {
		code = code + TRAILING_LINE;
	}

	return code;
}

export function convertToExternalCode(internalCode: Code = ''): Code {
	let code = internalCode;
	if (code.endsWith(TRAILING_LINE)) {
		code = code.slice(0, -TRAILING_LINE.length);
	}

	return code;
}