export class ReactGridError extends Error {
  constructor(
    public message: string,
    public cause?: unknown,
  ) {
    super(message, { cause });
    this.name = "ReactGridError";
  }
}
