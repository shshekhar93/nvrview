import React, { createRef, useEffect, useMemo, useState } from "react";
import { loadPlayer, Player as JSMpegPlayer } from "rtsp-relay/browser";
import { streamURLBase } from "../config/constants";
import { useStyletron } from "styletron-react";
import { isFullScreen } from "../utils";
import { useTheme } from "../layout/theme";

export type PlayerProps = {
  streamId: string;
  onPlayerLoaded: () => void;
};

export const Player = React.memo(function Player({
  streamId,
  onPlayerLoaded,
}: PlayerProps) {
  const [loading, setLoading] = useState(false);
  const [hq, setHq] = useState(false);
  const playerRef = createRef<JSMpegPlayer>();
  const canvasRef = createRef<HTMLCanvasElement>();
  const [css] = useStyletron();
  const theme = useTheme();

  const streamURL = useMemo(
    () => `${streamURLBase}/${streamId}?hq=${hq}`,
    [streamId, hq],
  );

  const loadPlayerOnToCanvas = async () => {
    if (!canvasRef.current || loading) {
      return;
    }

    setLoading(true);
    const player = await loadPlayer({
      url: `ws://${location.host}${streamURL}`,
      canvas: canvasRef.current,
      audio: false,
    });
    playerRef.current = player;
    setLoading(false);
    onPlayerLoaded();
  };

  const onClick = () => {
    if (!canvasRef.current) {
      return;
    }

    if (isFullScreen()) {
      document.exitFullscreen();
      setHq(false);
      return;
    }

    canvasRef.current.requestFullscreen();
    setHq(true);
  };

  useEffect(() => {
    loadPlayerOnToCanvas();

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [streamURL]);

  return (
    <div
      className={`player-container ${css({
        padding: "0.5rem",
        ":first-child": {
          paddingLeft: 0,
        },
        ":last-child": {
          paddingRight: 0,
        },
      })}`}
    >
      <canvas
        ref={canvasRef}
        className={css({
          maxHeight: "100%",
          maxWidth: "100%",
          border: "1px solid green",
          backgroundColor: theme.app.background,
        })}
        onClick={onClick}
      />
    </div>
  );
});
