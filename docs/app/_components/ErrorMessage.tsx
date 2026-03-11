export function ErrorMessage({
  type,
  message,
}: {
  type: string;
  message: string;
}) {
  return (
    <div
      className="
				flex flex-col gap-2
				bg-destructive/10
				border border-destructive/50 rounded-md
				p-4	
			"
    >
      <p className="font-semibold text-xl text-destructive">{type}</p>
      <div className="text-sm text-muted-foreground">
        <pre className="inline whitespace-pre-wrap">{message}</pre>
      </div>
    </div>
  );
}
