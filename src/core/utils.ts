import dayjs from 'dayjs';

/**
 * times are relative to 2001-01-01 00:00:00
 * rather than 1970-01-01 00:00:00,
 * so we need to add the offset.
 * @see https://stmorse.github.io/journal/iMessage.html
 * @see https://www.theiphonewiki.com/wiki/Messages#message
 */
function swiftTimeToTimestamp(swiftTime: number): number {
  return swiftTime ? swiftTime / 1000000 + 978307200000 : 0;
}

export function formatTime(timestamp: string): string {
  if (timestamp) {
    return dayjs(swiftTimeToTimestamp(parseInt(timestamp, 10))).format('YYYY-MM-DD HH:mm:ss');
  }
  return '';
}
