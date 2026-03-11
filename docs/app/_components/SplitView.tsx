import cn from "clsx";
import { Children, type ReactElement, type ReactNode } from "react";

Pane.Head = PaneHead;
Pane.Body = PaneBody;
SplitView.Pane = Pane;

/* ───────── Types ───────── */

export type SplitViewProps = {
  className?: string;
  children: [PaneElement, PaneElement];
};

export type SplitViewPaneProps = {
  children: [PaneHeadElement, PaneBodyElement];
};

export type PaneElement = ReactElement<
  { children: [PaneHeadElement, PaneBodyElement] },
  typeof Pane
>;

export type PaneHeadElement = ReactElement<
  { children: ReactNode },
  typeof PaneHead
>;

export type PaneBodyElement = ReactElement<
  { children: ReactNode },
  typeof PaneBody
>;

/* ───────── Components ───────── */

export function SplitView({ className = "", children }: SplitViewProps) {
  const splitViewPanes = Children.toArray(children) as PaneElement[];

  return (
    <div
      className={cn(
        "border border-border rounded-xl shadow-xl bg-card",
        "flex flex-col svrow:flex-row",
        "overflow-hidden",
        className,
      )}
    >
      {splitViewPanes.map((splitViewPane, index) => (
        <div
          key={index}
          className={cn(
            "flex flex-col svrow:w-1/2",
            index === 0 &&
              "border-b border-border svrow:border-b-0 svrow:border-r",
          )}
        >
          {splitViewPane}
        </div>
      ))}
    </div>
  );
}

function Pane({ children }: SplitViewPaneProps) {
  return <>{children}</>;
}

function PaneHead({ children }: { children: ReactNode }) {
  return (
    <div className="bg-muted/50 border-b border-border h-10 w-full px-4 md:px-6">
      {children}
    </div>
  );
}

function PaneBody({ children }: { children: ReactNode }) {
  return (
    <div className="bg-muted/20 h-96 w-full overflow-auto px-4 md:px-6 py-6 svrow:flex-1">
      {children}
    </div>
  );
}
