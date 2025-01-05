import { createRoot } from "react-dom/client";
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import App from "./app";
import { ThemeProvider } from "./layout/theme";

const engine = new Styletron();

// @ts-expect-error getElementById can return null
const root = createRoot(document.getElementById("app"));

root.render(
  <StyletronProvider value={engine}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StyletronProvider>,
);
