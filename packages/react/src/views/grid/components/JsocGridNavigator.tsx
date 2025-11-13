import { Fragment, useContext } from 'react';
import JsocGridNavigatorItem from './JsocGridNavigatorItem';
import { JsocGridContext } from '../JsocGridContext';

type JsocGridNavigatorProps = {};
export function JsocGridNavigator({}: JsocGridNavigatorProps) {
	const { gridNavigatorStack, setGridNavigatorStack } =
		useContext(JsocGridContext);

	return gridNavigatorStack.map((_, index, __) => (
		<Fragment key={index}>
			<JsocGridNavigatorItem index={index} />
		</Fragment>
	));
}
