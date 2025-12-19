import { useCallback, useEffect, useState } from 'react';

export type ToggleExpandButtonProps = {
	isExpanded: boolean;
	setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

export type VerticalExpanderProps<R extends HTMLElement> = {
    monitorRef: React.RefObject<R | null>;
	children: React.ReactNode;
	ToggleExpandButton: React.FC<ToggleExpandButtonProps>;
    monitorCollapsedHeight: string
					monitorHeightSetter: React.Dispatch<React.SetStateAction<string>>;
};
export function VerticalExpander<R extends HTMLElement>({
	monitorRef,
	children,
	ToggleExpandButton,
    monitorCollapsedHeight,
    monitorHeightSetter
}: VerticalExpanderProps<R>) {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleHeight = useCallback(() => {
		const newHeight = isExpanded
			? `${monitorRef?.current?.scrollHeight || 0}px`
			: monitorCollapsedHeight;

		monitorHeightSetter(newHeight);
	}, [isExpanded]);

	useEffect(toggleHeight, [isExpanded]);

	return (
		<>
			{children}

			{/* toggle expand button  */}
			<ToggleExpandButton
				isExpanded={isExpanded}
				setIsExpanded={setIsExpanded}
			/>
		</>
	);
}
