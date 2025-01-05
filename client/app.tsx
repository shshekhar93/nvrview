import React, { useEffect, useMemo, useState } from "react";
import { Layout } from "./layout";
import { Player } from "./player";
import { useStyletron } from "styletron-react";
import { chunkify } from "./utils";
import { LAYOUTS, NUM_STREAMS, VIDEO_ASPECT_RATIO } from "./config/constants";

const App: React.FC = () => {
  const [streams, setStreams] = useState<string[]>([]);
  const [hqStreamId, setHqStreamId] = useState<string>("");

  const [css] = useStyletron();

  const loadNextStream = () => {
    setStreams((prev) =>
      prev.length >= NUM_STREAMS ? prev : [...prev, `${prev.length + 1}`],
    );
  };

  useEffect(() => {
    loadNextStream();
  }, []);

  const [rows, columns] = useMemo(() => {
    const layout = [...LAYOUTS[streams.length]];
    const screenAspectRatio = window.innerWidth / window.innerHeight;
    return screenAspectRatio < VIDEO_ASPECT_RATIO ? layout : layout.reverse();
  }, [streams.length]);

  return (
    <Layout>
      <div
        className={`videos-container ${css({
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          maxWidth: "calc(100vw - 2rem)",
          height: "100%",
        })}`}
      >
        {chunkify(streams, columns ?? 0).map((streams) => (
          <div
            key={streams.join("-")}
            className={css({
              display: "flex",
              maxHeight: `calc(100% / ${rows})`,
              justifyContent: "center",
            })}
          >
            {streams.map((streamId) => (
              <Player
                key={streamId}
                streamId={streamId}
                onPlayerLoaded={loadNextStream}
                hqStreamId={hqStreamId}
                onFullscreenToggle={() =>
                  setHqStreamId((old) => (old === streamId ? "" : streamId))
                }
              />
            ))}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default App;
