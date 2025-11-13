import './App.css';
import { Jsoc } from '@jsoc/react';
import user from '../../../api-responses/users.json';

function App() {
	return (
		// The JSOC library does not wrap the rendered adapter component inside any DOM element.
		// All intermediate components (Jsoc, JsocView, JsocViewAdapter) are "transparent":
		// they only pass data and context but do NOT render any HTML.
		//
		// This is intentional. It gives the consumer full control over layout and styling,
		// exactly as if they were rendering the adapter component directly.
		//
		// Because of this, it is the consumer’s responsibility to provide the required layout.
		// For example, some adapters (like the MUI DataGrid) require their container to have
		// explicit, non-zero dimensions. If the parent wrapper has no size, the grid may fail
		// to render correctly. See: https://mui.com/x/react-data-grid/layout/
		//
		// Therefore: always wrap <Jsoc> inside an appropriate container when needed.
		// In this example, we give the grid a 500px height and full width.

		<div style={{ height: '500px', width: '100%' }}>
			<Jsoc data={user} view='grid' ui='mui' />
		</div>
	);
}

export default App;
