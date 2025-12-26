import { insertTextAtCursor } from '../domOperations/textManipulation';
import { applyEdit, type StateUpdater } from './utils';

export function onPaste(
	e: React.ClipboardEvent<HTMLPreElement>,
	stateUpdater: StateUpdater
) {
	const text = e.clipboardData.getData('text/plain');

	applyEdit(e, () => insertTextAtCursor(text), stateUpdater);
}
