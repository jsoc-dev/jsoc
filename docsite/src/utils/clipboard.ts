export async function copyToClipboard(text: string) {
	if (navigator.clipboard?.writeText) {
		await navigator.clipboard.writeText(text);
	} else {
		writeTextFallback(text);
	}
}

/**
 * Alternative for `clipboard.writeText`
 * WARNING: It's functionality is not thoroughly tested
 */
export function writeTextFallback(text: string) {
	const ta = document.createElement('textarea');
	ta.value = text;
	ta.style.position = 'fixed';
	ta.style.opacity = '0';
	document.body.appendChild(ta);
	ta.focus();
	ta.select();
	document.execCommand('copy');
	document.body.removeChild(ta);
}
