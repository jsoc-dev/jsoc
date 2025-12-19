import { useCallback } from 'react';

export type InputTextProps = {
	setValue: React.Dispatch<React.SetStateAction<string>>;
	native: React.InputHTMLAttributes<HTMLInputElement>;
};

export function InputText(props: InputTextProps) {
	const { native, setValue } = props;
	const onChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const raw = e.target.value;
			setValue(raw);
		},
		[setValue]
	);

	return (
		<>
			<input {...native} type='text' onChange={onChange}  />
		</>
	);
}
