import { isSymbol } from '@jsoc/core';
import { KvmKey } from '@jsoc/core';
import { JsocGridContext } from '../JsocGridContext';
import { useContext } from 'react';

type JsocGridNavigatorNodeProps = {
	index: number;
};
export default function JsocGridNavigatorNode({
	index,
}: JsocGridNavigatorNodeProps) {
	const { gridNavigatorStack, setGridNavigatorStack } =
		useContext(JsocGridContext);
	const item = gridNavigatorStack[index];
	const lastItemIndex = gridNavigatorStack.length - 1;
	const isActive = index === lastItemIndex;
	const isClickable = !isActive;

	return (
		<>
			<span
				style={{
					fontWeight: isActive ? 700 : 500,
					textDecorationLine: isActive ? 'none' : 'underline',
					cursor: isClickable ? 'pointer' : 'auto',
				}}
				onClick={onClick}
			>
				{getText(item.gridKey)}
			</span>
			{(!isActive) && '>'}
		</>
	);

	function onClick() {
		if (isActive) {
		} else {
			const sliced = gridNavigatorStack.slice(0, index+1);
			setGridNavigatorStack(sliced);
		}
	}
}

function getText(key: KvmKey): string {
	if (isSymbol(key)) {
		const symbolStr = String(key).replace(/^Symbol\((.*)\)$/, '$1');
		return symbolStr == 'rootKey' ? 'Home' : symbolStr;
	} else {
		return key;
	}
}
