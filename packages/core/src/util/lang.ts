export function isSymbol(arg: unknown): arg is symbol {
	return typeof arg === 'symbol';
}

export function isFunction(arg: unknown): arg is Function {
	return typeof arg === 'function';
}

