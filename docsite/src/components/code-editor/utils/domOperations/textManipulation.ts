export function insertTextAtCursor(text: string): boolean {
	const ctx = getActiveTextNode();
	if (!ctx) {
		return false;
	}

	const { selection, range, textNode, offset } = ctx;

	textNode.nodeValue =
		textNode.nodeValue!.slice(0, offset) +
		text +
		textNode.nodeValue!.slice(offset);

	const newOffset = offset + text.length;
	range.setStart(textNode, newOffset);
	range.setEnd(textNode, newOffset);

	selection.removeAllRanges();
	selection.addRange(range);

	return true;
}

export function deleteBackward(): boolean {
	const ctx = getActiveTextNode();
	if (!ctx) return false;

	const { selection, range, textNode, offset } = ctx;

	if (offset === 0) return false;

	textNode.nodeValue =
		textNode.nodeValue!.slice(0, offset - 1) +
		textNode.nodeValue!.slice(offset);

	const newOffset = offset - 1;
	range.setStart(textNode, newOffset);
	range.setEnd(textNode, newOffset);

	selection.removeAllRanges();
	selection.addRange(range);

	return true;
}

export function getActiveTextNode() {
	const selection = window.getSelection();
	if (!selection || selection.rangeCount === 0) return null;

	const range = selection.getRangeAt(0);
	const node = range.startContainer;

	if (node.nodeType !== Node.TEXT_NODE) return null;

	return {
		selection,
		range,
		textNode: node as Text,
		offset: range.startOffset,
	};
}

export function getTextByKeyboardKey(keyboardKey: string) {
	if (keyboardKey === 'Enter') {
		return '\n';
	} else if (keyboardKey === 'Tab') {
		return '\t';
	}

	return keyboardKey;
}