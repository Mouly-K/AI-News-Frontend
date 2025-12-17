const STREAM_STATUS = {
  OPEN: "open",
  CLOSED: "closed",
} as const;

type StreamStatus = (typeof STREAM_STATUS)[keyof typeof STREAM_STATUS];

export { STREAM_STATUS };
export type { StreamStatus };
