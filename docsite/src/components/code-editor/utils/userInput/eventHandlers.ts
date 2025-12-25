// domMutators
import type { Code } from '../../CodeEditor';
import { deleteBackward, insertTextAtCursor } from './domMutators';

type DomUpdater = () => boolean;
type StateUpdater = (code: Code) => void;

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
	} else if (e.key === 'Backspace') { //TODO handle delete, selection + backspace,delete
		applyEdit(e, deleteBackward, stateUpdater);
	}
}

export function onPaste(
	e: React.ClipboardEvent<HTMLPreElement>,
	stateUpdater: StateUpdater
) {
	const text = e.clipboardData.getData('text/plain');

	applyEdit(e, () => insertTextAtCursor(text), stateUpdater);
}

function applyEdit(
	e:
		| React.KeyboardEvent<HTMLPreElement>
		| React.ClipboardEvent<HTMLPreElement>,
	domUpdater: DomUpdater,
	stateUpdater: StateUpdater
) {
	e.preventDefault();

	if (domUpdater()) {
		stateUpdater(e.currentTarget.textContent ?? '');
	}
}
