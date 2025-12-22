import { decode, encodePretty } from '@jsoc/core/utils';
import type { Code, CodeError, CodeLanguage } from '../CodeEditor';

type CodeLanguageUtil = {
	name: string;
	validate?: (code: Code) => CodeError;
	beautify?: (code: Code) => Code;
};
export const CODE_LANGUAGES: Record<CodeLanguage, CodeLanguageUtil> = {
	cmd: {
		name: 'Terminal',
	},
	json: {
		name: 'JSON',
		validate: (code) => {
			const { error } = decode(code);

			if (error) {
				const { message, position, line, column } = error;
				return {
					message,
					position,
					line,
					column,
				};
			}

			return null;
		},
		beautify: encodePretty,
	},
	js: { name: 'JavaScript' },
	ts: { name: 'TypeScript' },
	tsx: { name: 'TypeScript XML' },
	jsx: { name: 'JavaScript XML' },
};

export function validateCode(code: Code, codeLang: CodeLanguage): CodeError {
	const validate = CODE_LANGUAGES[codeLang]?.validate;
	if (validate) {
		return validate(code);
	}
	return null;
}
