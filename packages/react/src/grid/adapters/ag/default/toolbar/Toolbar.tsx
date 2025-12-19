import { DefaultNavigator } from '../../../../components';

export function DefaultToolbarAg() {
	return (
		<>
			<style>{`
				.DefaultToolbarAg {
					height: 15%;
					border-bottom: 1px solid var(--ag-border-color);
					background: var(--ag-header-background-color);
					display: flex;
					align-items: center;
					padding: 0px 6px;
				}
			`}</style>
			<div className='DefaultToolbarAg'>
				<DefaultNavigator />
			</div>
		</>
	);
}
