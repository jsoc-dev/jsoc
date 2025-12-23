import type { Code, CodeLine } from '../CodeEditor';

export function codeToLine(code: Code): CodeLine[] {
	return code.trim().split('\n');
}

export function linesToCode(lines: CodeLine[]): Code {
	return lines.join('\n');
}
