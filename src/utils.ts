import fs = require('fs');
import moment = require('moment');
import xlsx = require('xlsx');
import _ = require('lodash');

export function exportAsJson(data: Result[], filePath: string) {
  filePath = _.endsWith('.json') ? filePath : `${filePath}.json`;
  fs.writeFile(filePath, JSON.stringify(data), 'utf8', err => {
    if (err) console.log(err);
  });
}

export function exportAsCsv(result: Result[], filePath: string) {
  const header = Object.keys(result[0]);
  return new Promise((resolve, reject) => {
    try {
      const workBook = xlsx.utils.book_new();
      const workSheet = xlsx.utils.json_to_sheet(result, { header });
      xlsx.utils.book_append_sheet(workBook, workSheet, 'sheet1');
      xlsx.writeFile(workBook, filePath);
      resolve(true);
    } catch (err) {
      reject(err);
    }
  });
}

export function formatTimestamp(timestamp: number): string {
  if (timestamp) {
    return moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
  }
  return '';
}

// 短信的时间戳基准为 2001-01-01 00:00:00，而不是 1970-01-01 00:00:00
// 加上1970年到2001年的偏移量，单位 ms
// ref:
// 1. https://stmorse.github.io/journal/iMessage.html
// 2. https://www.theiphonewiki.com/wiki/Messages#message
export function formatSwiftTime(rawTime: number): number {
  return rawTime ? rawTime / 1000000 + 978307200000 : 0;
}
