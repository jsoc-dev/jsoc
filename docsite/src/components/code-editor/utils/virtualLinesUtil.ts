import type { Code, CodeLine } from '../CodeEditor';

export function codeToVirtualLines(code: Code): CodeLine[] {
	return code.split('\n');
}

export function virtualLinesToCode(virtualLines: CodeLine[]): Code {
	return virtualLines.join('\n');
}

export function sanitizeCode(code: Code = ''): Code {
	return code.replaceAll(ZWSP, '')
}

// export const ZWSP = '\u200B';
export const ZWSP = '✌️';
