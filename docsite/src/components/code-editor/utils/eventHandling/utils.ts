import type { Code } from "../../CodeEditor";

export type DomUpdater = () => boolean;
export type StateUpdater = (code: Code) => void;

export function applyEdit(
	event:
		| React.KeyboardEvent<HTMLPreElement>
		| React.ClipboardEvent<HTMLPreElement>,
	domUpdater: DomUpdater,
	stateUpdater: StateUpdater
) {
	event.preventDefault();

	if (domUpdater()) {
		stateUpdater(event.currentTarget.innerHTML);
	}
}
