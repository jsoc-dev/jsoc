import type { Code, CodeLine } from '../CodeEditor';

/**
 * TRAILING_LINE is very critical to be inserted in the innerHTML of input element
 * It will solve the last-line quirk in browsers like chrome 
 */
export const TRAILING_LINE = '<span></span>';

export function createVirtualLines(code: Code): CodeLine[] {
	const lines = code.split('\n');

	if (lines.at(-1) !== TRAILING_LINE) {
		lines.push(TRAILING_LINE);
	}

	return lines;
}

export function convertVirtualLinesToCode(virtualLines: CodeLine[]): Code {
	return virtualLines.join('\n');
}

export function sanitizeCode(code: Code = ''): Code {
    if (code.endsWith(TRAILING_LINE)) {
        return code.slice(0, -TRAILING_LINE.length);
    }

    return code;
}