import { deleteBackward, getTextByKeyboardKey, insertTextAtCursor } from "../domOperations/textManipulation";
import { applyEdit, type StateUpdater } from "./utils";

export function isPrintableKey(e: React.KeyboardEvent) {
	if (
		e.shiftKey || // SHIFT
		e.ctrlKey || // CTRL
		e.metaKey || // ⌘(macOS) / ⊞(Windows) / Super(linux)
		e.altKey // ALT
	) {
		return false;
	}

	const key = e.key;

	return key.length === 1 || key === 'Enter' || key === 'Tab';
}

export function onKeyDown(
	e: React.KeyboardEvent<HTMLPreElement>,
	stateUpdater: StateUpdater
) {
	if (isPrintableKey(e)) {
		applyEdit(
			e,
			() => insertTextAtCursor(getTextByKeyboardKey(e.key)),
			stateUpdater
		);
	} else if (e.key === 'Backspace') {
		applyEdit(e, deleteBackward, stateUpdater);
	}
}