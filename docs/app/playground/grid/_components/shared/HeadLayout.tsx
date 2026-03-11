type HeadLayoutProps = {
  heading: string;
  children: React.ReactNode;
};
export function HeadLayout({ heading, children }: HeadLayoutProps) {
  return (
    <>
      <div className="h-full w-full flex items-center">
        <div className="flex h-full items-center">
          <span className="font-semibold w-max text-foreground">{heading}</span>
          <span className="bg-border h-[50%] w-px mx-3" />
        </div>
        {children}
      </div>
    </>
  );
}
