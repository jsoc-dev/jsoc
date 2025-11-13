import { joinStringArray } from '../../util';
import { JsocError } from './JsocError';

export class JsocConfigurationError extends JsocError {
	constructor(message: string) {
		super(message);
		this.name = 'JsocConfigurationError';
	}
}

// subclasses of JsocConfigurationError
export class JsocInvalidViewError extends JsocConfigurationError {
	constructor(view: string, supportedViews: string[]) {
		const supportedViewsJoined = joinStringArray(supportedViews);
		const richMessage = `"${view}" is not a valid view. Supported views are: ${supportedViewsJoined}.`;
		super(richMessage);
	}
}

export class JsocInvalidAdapterError extends JsocConfigurationError {
	constructor(view: string, adapter: string, supportedAdapters: string[]) {
		const supportedAdaptersJoined = joinStringArray(supportedAdapters);
		const richMessage = `"${adapter}" is not a valid adapter for view "${view}". Supported adapters are: ${supportedAdaptersJoined}.`;
		super(richMessage);
	}
}
