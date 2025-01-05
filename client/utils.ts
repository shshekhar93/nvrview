export function chunkify<T>(arr: T[], maxlen: number): T[][] {
  const copy = [...arr];
  const chunks = [];
  while (copy.length) {
    chunks.push(copy.splice(0, maxlen));
  }
  return chunks;
}

export function logNReturn(str: string) {
  console.log(str);
  return str;
}

export function isFullScreen() {
  return (
    document.fullscreenElement ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    !!(document as any).webkitFullscreenElement ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    !!(document as any).mozFullScreenElement
  );
}
