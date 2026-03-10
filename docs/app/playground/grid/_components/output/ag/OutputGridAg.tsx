import { JsocGrid } from '@jsoc/react/grid';
import { OutputGridAgWrapper } from './OutputGridAgWrapper';
import { useOutputPaneBodyContext } from '../OutputPaneBody';

export function OutputGridAg() {
	const { gridData, selectedJsonOption } = useOutputPaneBodyContext();

	return (
		<JsocGrid
			data={gridData}
			ui={'ag'}
			uiProps={{
				custom: {
					gridId: selectedJsonOption,
				},
			}}
			CustomWrapper={OutputGridAgWrapper}
		/>
	);
}
