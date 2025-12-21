import { deleteKeys } from '@jsoc/core/utils';
import { useCallback } from 'react';

export type InputTextCustomProps = {
	setValue: React.Dispatch<React.SetStateAction<string>>;
};
export type InputTextCustomPropsName = keyof InputTextCustomProps;
export const InputTextCustomPropsList: InputTextCustomPropsName[] = [
	'setValue',
];

export type InputTextNativeProps = React.InputHTMLAttributes<HTMLInputElement>;
export type InputTextProps = InputTextNativeProps & InputTextCustomProps;
export function InputText(props: InputTextProps) {
	const { setValue } = props;
	const onChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const raw = e.target.value;
			setValue(raw);
		},
		[setValue]
	);

	return (
		<>
			<input
				onChange={onChange}
				{...deleteKeys(props, InputTextCustomPropsList)}
				type='text'
			/>
		</>
	);
}
