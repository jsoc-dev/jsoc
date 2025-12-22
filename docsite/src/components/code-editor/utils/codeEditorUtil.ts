import type { Code, CodeLines } from '../CodeEditor';

export function codeToLine(code: Code): CodeLines {
	return code.trim().split('\n');
}

export function linesToCode(lines: CodeLines): Code {
	return lines.join('\n');
}
