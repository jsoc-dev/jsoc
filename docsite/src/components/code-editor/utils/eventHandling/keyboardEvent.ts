import {
	deleteBackward,
	deleteForward,
	insertTextAtCursor,
} from '../domOperations/textManipulation';
import { applyEdit, type StateUpdater } from './utils';

export function isCharacterKey(e: React.KeyboardEvent) {
	const key = e.key;

	if (e.ctrlKey || e.metaKey || e.altKey) {
		// let browser handle combination input
		return false;
	}

	return key.length === 1;
}

export function onKeyDown(
	event: React.KeyboardEvent<HTMLPreElement>,
	stateUpdater: StateUpdater
) {
	const key = event.key;

	switch (key) {
		case 'Control': {
			// TODO: Implement Undo, Redo
			break;
		}
		case 'Shift': {
			// let browser handle
			break;
		}
		case 'Backspace': {
			applyEdit(event, deleteBackward, stateUpdater);
			break;
		}
		case 'Delete': {
			applyEdit(event, deleteForward, stateUpdater);
			break;
		}
		case 'Enter': {
			applyEdit(event, () => insertTextAtCursor('\n'), stateUpdater);
			break;
		}
		case 'Tab': {
			applyEdit(event, () => insertTextAtCursor('\t'), stateUpdater);
			break;
		}
		default: {
			if (isCharacterKey(event)) {
				applyEdit(event, () => insertTextAtCursor(key), stateUpdater);
			}
		}
	}
}
