// sub classes of Error
export class JsocError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'JsocError';
	}
}
