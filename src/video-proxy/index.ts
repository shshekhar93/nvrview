import rtspRelay from "rtsp-relay";
import { Application } from "express-ws";

export function setupVideoProxy(app: Application) {
  const { proxy, scriptUrl } = rtspRelay(app);

  app.ws("/api/stream/:stream", (ws, req) => {
    const hq = req.query.hq === "true";
    proxy({
      url: `${process.env.RTSP_BASE_URL}/${req.params.stream}${hq ? "01" : "02"}`,
      verbose: true,
    })(ws);
  });
  app.get("/rtsp-relay/browser.js", (_, res) => res.redirect(scriptUrl));
}
