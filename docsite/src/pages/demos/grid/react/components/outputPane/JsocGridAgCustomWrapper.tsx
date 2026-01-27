import { DefaultNavigator, type JsocGridCustomWrapper } from '@jsoc/react/grid';

export const OutputGridAg: JsocGridCustomWrapper<'ag'> = ({ children }) => {
	return (
		<div className='h-full w-full border border-[color-mix(in_srgb,transparent,#181d1f_15%)] rounded-[8px] bg-[color-mix(in_srgb,#fff,#181d1f_2%)]'>
			<div className='h-[52px] max-h-[52px] flex items-center px-[6px]'>
				<DefaultNavigator />
			</div>
			<div style={{ height: '85%' }}>{children}</div>
		</div>
	);
};
