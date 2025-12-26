import { SplitView } from '../../../components/SplitView';

export function SplitViewTest() {
	return (
		<div className='flex flex-col min-h-full py-pageY'>
			<SplitView>
				<SplitView.Pane header="First">First</SplitView.Pane>
				<SplitView.Pane header="Second">Second</SplitView.Pane>
			</SplitView>
		</div>
	);
}
