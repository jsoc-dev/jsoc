import { insertTextAtCursor } from '../domOperations/textManipulation';
import { applyEdit, type StateUpdater } from './utils';

export function onPaste(
	event: React.ClipboardEvent<HTMLPreElement>,
	stateUpdater: StateUpdater
) {
	const text = event.clipboardData.getData('text/plain');

	applyEdit(event, () => insertTextAtCursor(text), stateUpdater);
}
