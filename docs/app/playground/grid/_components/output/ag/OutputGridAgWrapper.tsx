import { DefaultNavigator, type JsocGridCustomWrapper } from "@jsoc/react/grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useTheme } from "next-themes";
import { useMemo } from "react";

export const OutputGridAgWrapper: JsocGridCustomWrapper<"ag"> = ({
  children,
}) => {
  const { resolvedTheme } = useTheme();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: resolvedTheme === "dark" ? "dark" : "light",
        },
      }),
    [resolvedTheme],
  );

  return (
    <ThemeProvider theme={theme}>
      <div className="h-full w-full border border-border rounded-lg bg-background overflow-hidden flex flex-col">
        <div className="h-[52px] max-h-[52px] flex items-center px-[6px] shrink-0">
          <DefaultNavigator />
        </div>
        <div className="flex-1 min-h-0">{children}</div>
      </div>
    </ThemeProvider>
  );
};
