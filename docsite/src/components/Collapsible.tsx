import { useCallback, useEffect, useState } from 'react';

export type CollapsibleProps<R extends HTMLElement> = {
	children: React.ReactNode;
	targetRef: React.RefObject<R | null>;
	targetDefaultHeight: string;
	targetSetHeight: React.Dispatch<React.SetStateAction<string>>;
	CollapseToggle: React.FC<CollapseToggleProps>;
	hideCollapseToggle: boolean;
};
export function Collapsible<R extends HTMLElement>({
	children,
	targetRef,
	targetDefaultHeight,
	targetSetHeight,
	CollapseToggle,
	hideCollapseToggle,
}: CollapsibleProps<R>) {
	const [isCollapsed, setIsCollapsed] = useState(true);

	const syncHeight = useCallback(() => {
		const el = targetRef.current;
		if (!el) return;

		targetSetHeight(
			isCollapsed ? targetDefaultHeight : `${el.scrollHeight}px`
		);
	}, [isCollapsed]);

	useEffect(syncHeight, [isCollapsed]);

	return (
		<>
			{children}

			{!hideCollapseToggle && (
				<CollapseToggle
					isCollapsed={isCollapsed}
					setIsCollapsed={setIsCollapsed}
				/>
			)}
		</>
	);
}

export type CollapseToggleProps = {
	isCollapsed: boolean;
	setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};
