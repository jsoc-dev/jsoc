import { JsocError } from '../jsoc/JsocError';

export class JsocGridError extends JsocError {
	constructor(public message: string) {
		super(message);
		this.name = "JsocGridError";
	}
}




