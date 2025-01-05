import React from "react";
import { Header } from "./header";
import { Content } from "./content";
import { Footer } from "./footer";
import { useStyletron } from "styletron-react";
import { footerHeight, headerHeight } from "../config/constants";
import { useTheme } from "./theme";

export function Layout({ children }: { children: React.ReactNode }) {
  const [css] = useStyletron();
  const theme = useTheme();
  return (
    <div
      id="nvrview-root"
      className={css({
        display: "grid",
        height: "100vh",
        gridTemplateRows: `${headerHeight}px auto ${footerHeight}px`,
        gridTemplateAreas: `
        "header"
        "content"
        "footer"
      `,
        rowGap: "0.5rem",
        background: theme.app.background,
        color: theme.app.foreground,
      })}
    >
      <Header />
      <Content>{children}</Content>
      <Footer />
    </div>
  );
}
