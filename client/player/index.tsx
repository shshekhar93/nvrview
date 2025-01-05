import React, { useEffect, useMemo, useRef, useState } from "react";
import { loadPlayer, Player as JSMpegPlayer } from "rtsp-relay/browser";
import { streamURLBase } from "../config/constants";
import { useStyletron } from "styletron-react";
import { accessibleClick } from "../utils";
import { useTheme } from "../layout/theme";
import ReactFocusLock from "react-focus-lock";

export type PlayerProps = {
  streamId: string;
  onPlayerLoaded: () => void;
  hqStreamId: string;
  onFullscreenToggle: () => void;
};

export const Player = React.memo(function Player({
  streamId,
  onPlayerLoaded,
  hqStreamId,
  onFullscreenToggle,
}: PlayerProps) {
  const [loading, setLoading] = useState(false);
  const [hq, setHq] = useState(false);
  const playerRef = useRef<JSMpegPlayer>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [css] = useStyletron();
  const theme = useTheme();

  const streamURL = useMemo(
    () => `${streamURLBase}/${streamId}?hq=${hq}`,
    [streamId, hq],
  );

  const loadPlayerOnToCanvas = async () => {
    if (!canvasRef.current || loading) {
      console.log("skipped loading");
      return;
    }

    setLoading(true);
    const player = await loadPlayer({
      url: `ws://${location.host}${streamURL}`,
      canvas: canvasRef.current,
      audio: false,
    });
    playerRef.current = player;

    if (hq) {
      canvasRef.current.focus();
    }

    setLoading(false);
    onPlayerLoaded();
  };

  const onClick = () => {
    if (!canvasRef.current) {
      return;
    }

    setHq((old) => !old);
    onFullscreenToggle();
  };

  useEffect(() => {
    // If this stream is the high quality one, or there are no HQ streams playing right now, load current stream.
    if (["", streamId].includes(hqStreamId)) {
      loadPlayerOnToCanvas();
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [streamURL, hqStreamId]);

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
      <ReactFocusLock
        className={css({
          height: "100%",
          width: "100%",

          ...(hq
            ? {
                backgroundColor: theme.app.background,
                padding: "0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }
            : {}),
        })}
        returnFocus
        autoFocus
        disabled={!hq}
      >
        <canvas
          ref={canvasRef}
          className={css({
            maxHeight: "100%",
            maxWidth: "100%",
            border: "1px solid green",
            backgroundColor: theme.app.background,

            ":focus": {
              borderRadius: "3px",
              border: "2px solid #6f8ec1",
              outline: "none",
            },
          })}
          {...accessibleClick(onClick)}
          data-autofocus={hq}
        />
      </ReactFocusLock>
    </div>
  );
});
