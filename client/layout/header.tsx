import { useStyletron } from "styletron-react";
import { useTheme } from "./theme";

export function Header() {
  const [css] = useStyletron();
  const theme = useTheme();

  return (
    <div
      className={css({
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1rem",
        gridArea: "header",
        fontSize: "2.5rem",
        background: theme.app.header,
      })}
    >
      <div
        className={`app-logo ${css({
          fontStyle: "italic",
        })}`}
      >
        NVR View
      </div>
      <div className="menu">⚙</div>
    </div>
  );
}
