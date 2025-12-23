import type { Code, CodeLine } from '../CodeEditor';

export function codeToLines(code: Code): CodeLine[] {
	return code.split('\n');
}

export function linesToCode(lines: CodeLine[]): Code {
	return lines.join('\n');
}
