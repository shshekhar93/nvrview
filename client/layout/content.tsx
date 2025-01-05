import React from "react";
import { useStyletron } from "styletron-react";
import { headerHeight } from "../config/constants";

export function Content({ children }: { children: React.ReactNode }) {
  const [css] = useStyletron();
  return (
    <div
      className={css({
        minHeight: `${headerHeight}px`,
        padding: "0 1rem",
        gridArea: "content",
      })}
    >
      {" "}
      {children}{" "}
    </div>
  );
}
