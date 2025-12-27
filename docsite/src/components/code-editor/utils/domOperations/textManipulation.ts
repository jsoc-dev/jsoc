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

export function insertTextAtCursor(text: string): boolean {
	const ctx = getActiveTextNode();
	if (!ctx) return false;

	const { selection, range, textNode } = ctx;

	let insertOffset: number;

	// 1️⃣ If selection exists → replace it
	if (!selection.isCollapsed) {
		const start = range.startOffset;
		const end = range.endOffset;

		textNode.nodeValue =
			textNode.nodeValue!.slice(0, start) +
			text +
			textNode.nodeValue!.slice(end);

		insertOffset = start + text.length;
	}
	// 2️⃣ No selection → insert at caret
	else {
		const offset = range.startOffset;

		textNode.nodeValue =
			textNode.nodeValue!.slice(0, offset) +
			text +
			textNode.nodeValue!.slice(offset);

		insertOffset = offset + text.length;
	}

	// 3️⃣ Move caret after inserted text
	range.setStart(textNode, insertOffset);
	range.setEnd(textNode, insertOffset);

	selection.removeAllRanges();
	selection.addRange(range);

	return true;
}

export function deleteSelection(
	selection: Selection,
	range: Range,
	textNode: Text
) {
	const start = range.startOffset;
	const end = range.endOffset;

	textNode.nodeValue =
		textNode.nodeValue!.slice(0, start) + textNode.nodeValue!.slice(end);

	range.setStart(textNode, start);
	range.setEnd(textNode, start);

	selection.removeAllRanges();
	selection.addRange(range);
}

export function deleteBackward(): boolean {
	const ctx = getActiveTextNode();
	if (!ctx) return false;

	const { selection, range, textNode } = ctx;

	// 1️⃣ Selection → delete it
	if (!selection.isCollapsed) {
		deleteSelection(selection, range, textNode);
		return true;
	}

	// 2️⃣ Caret at start → nothing to delete
	const offset = range.startOffset;
	if (offset === 0) return false;

	// 3️⃣ Delete previous character
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

export function deleteForward(): boolean {
	const ctx = getActiveTextNode();
	if (!ctx) return false;

	const { selection, range, textNode } = ctx;

	// 1️⃣ Selection → delete it
	if (!selection.isCollapsed) {
		deleteSelection(selection, range, textNode);
		return true;
	}

	const offset = range.startOffset;
	const value = textNode.nodeValue!;

	// 2️⃣ Caret at end or before \n of last line → nothing to delete
	if (offset + 1 >= value.length) {
		return false;
	}

	// 3️⃣ Delete next character
	textNode.nodeValue = value.slice(0, offset) + value.slice(offset + 1);

	range.setStart(textNode, offset);
	range.setEnd(textNode, offset);

	selection.removeAllRanges();
	selection.addRange(range);

	return true;
}
