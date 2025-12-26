import type { Code } from "../../CodeEditor";

export type DomUpdater = () => boolean;
export type StateUpdater = (code: Code) => void;

export function applyEdit(
	e:
		| React.KeyboardEvent<HTMLPreElement>
		| React.ClipboardEvent<HTMLPreElement>,
	domUpdater: DomUpdater,
	stateUpdater: StateUpdater
) {
	e.preventDefault();

	if (domUpdater()) {
		stateUpdater(e.currentTarget.innerHTML);
	}
}
