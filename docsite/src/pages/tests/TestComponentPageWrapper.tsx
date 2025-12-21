import { CodeInline } from '../../components/CodeInline';
import { Section } from '../../components/Section';

export function TestComponentPageWrapper({
	name,
	TestComponent,
}: {
	name: string;
	TestComponent: React.FC;
}) {
	return (
		<>
			<Section
				isHeading
				title={
					<>
						Sample usages of{' '}
						<CodeInline>{name.replace('Test', '')}</CodeInline>
					</>
				}
			/>
			<TestComponent />
		</>
	);
}
