import { CodeEditorCopyAction } from './header/CodeEditorCopyAction';
import { CodeEditorTitle } from './header/CodeEditorTitle';
import { CodeEditorWrapAction } from './header/CodeEditorWrapAction';

export function CodeEditorHeader() {
	return (
		<div
			className='
				border-b border-b-outline-subtle 
				flex justify-between
				h-12 max-h-12 
				p-3 
			'
		>
			<div>
				<CodeEditorTitle />
			</div>
			<div className='flex h-full items-center gap-4'>
				<CodeEditorWrapAction />
				<CodeEditorCopyAction />
			</div>
		</div>
	);
}
