import { ChevronSvg } from './svg/ChevronSvg';
import { Collapsible, type CollapseToggleProps } from './Collapsible';
import { useCallback, useRef, useState } from 'react';
import { decode, deleteKeys } from '@jsoc/core/utils';
import type { DemoGridError, DemoGridJson } from '../pages/demos/grid/react/GridDemo';

/**
 * Custom props of InputJson, make sure to add any new prop in InputJsonCustomPropsList also
 */
export type InputJsonCustomProps = {
	collapsible?: boolean;
	json: DemoGridJson
	setJson: React.Dispatch<React.SetStateAction<DemoGridJson>>;
	error: DemoGridError;
	setError: React.Dispatch<React.SetStateAction<DemoGridError>>;
};

export const InputJsonCustomPropsList: (keyof InputJsonCustomProps)[] = [
	'collapsible',
	'json',
	'setJson',
	'error',
	'setError',
];

export type InputJsonNativeProps =
	React.InputHTMLAttributes<HTMLTextAreaElement>;
export type InputJsonProps = InputJsonNativeProps & InputJsonCustomProps;

/**
 * Inputfield for JSON
 * 
 * TODOs: 
 * - Use or integrate CodeEditor instead, to show line numbering
 * - View and Go to Pos_ Ln_ Col_ options in bottom bar
 * - Beautify option in Toolbar (and beautify indent/Tab size option in bottom bar)
 * - View in full screen option in toolbar
 */
export function InputJson(props: InputJsonProps) {
	const { collapsible = false, json, setJson, error, setError } = props;
	const editorRef = useRef<HTMLTextAreaElement>(null);
	const editorDefaultHeight = '100%';
	const [editorHeight, setEditorHeight] = useState(editorDefaultHeight);

	const validationCls = error
		? 'border-red-500 text-red-600'
		: 'text-text-muted ';

	const onChange = useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement>) => {
			const newVal = e.target.value;
			setJson(newVal);

			const {error: decodedError} = decode(newVal);
			setError(decodedError);
		},
		[setJson, setError]
	);

	return (
		<>
			{/* editor wrapper */}
			<div
				className='border border-outline-subtle rounded-md 
					flex flex-col flex-1 
					overflow-hidden
				'
			>
				<Collapsible
					targetRef={editorRef}
					targetDefaultHeight={editorDefaultHeight}
					targetSetHeight={setEditorHeight}
					CollapseToggle={CollapseToggle}
					hideCollapseToggle={!collapsible}
				>
					{/* editor */}
					<textarea
						aria-invalid={!!error}
						className={`bg-surface-code pl-2 py-2 text-sm w-full flex resize-none focus:outline-none ${validationCls}`}
						onChange={onChange}
						placeholder='Paste your JSON here'
						spellCheck='false'
						{...deleteKeys(props, InputJsonCustomPropsList)}
						value={json}
						ref={editorRef}
						style={{
							height: editorHeight, // can't use tailwind class for height here, as height is dynamic (runtime value) but tailwind need static values to generate classes at build time
						}}
					/>
				</Collapsible>
			</div>
		</>
	);
}

function CollapseToggle({ isCollapsed, setIsCollapsed }: CollapseToggleProps) {
	return (
		<button
			type='button'
			onClick={() => setIsCollapsed((v) => !v)}
			className='bg-white flex items-center justify-center gap-1 cursor-pointer border-t border-t-outline-subtle w-full'
		>
			<ChevronSvg direction={isCollapsed ? 'down' : 'up'} />
			<span className='py-2 text-sm font-semibold select-none'>
				{isCollapsed ? 'Show more' : 'Show less'}
			</span>
		</button>
	);
}
