import { SplitView } from '../../../components/SplitView';

export function SplitViewTest() {
	return (
		<>
			<SplitView>
				<SplitView.Pane header="First">First</SplitView.Pane>
				<SplitView.Pane header="Second">Second</SplitView.Pane>
			</SplitView>
		</>
	);
}
