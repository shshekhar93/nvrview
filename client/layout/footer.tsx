import { useStyletron } from "styletron-react";
import { useTheme } from "./theme";

export function Footer() {
  const [css] = useStyletron();
  const theme = useTheme();

  return (
    <div
      className={css({
        display: "flex",
        alignItems: "center",
        padding: "0 1rem",
        gridArea: "footer",
        fontSize: "0.8rem",
        background: theme.app.footer,
      })}
    >
      &copy; Shashi Shekhar (2024)
    </div>
  );
}
