import { promises, constants } from 'fs';
import xlsx from 'xlsx';

export function checkFiles(pathList: string[]) {
  return Promise.all(pathList.map(path => promises.access(path, constants.F_OK)));
}

export function exportAsJson(data: any[], filePath: string) {
  return promises.writeFile(filePath, JSON.stringify(data), 'utf8');
}

export function exportAsCsv(data: any[], filePath: string) {
  const header = Object.keys(data[0]);
  return new Promise((resolve, reject) => {
    try {
      const workBook = xlsx.utils.book_new();
      const workSheet = xlsx.utils.json_to_sheet(data, { header });
      xlsx.utils.book_append_sheet(workBook, workSheet, 'sheet1');
      xlsx.writeFile(workBook, filePath);
      resolve(true);
    } catch (err) {
      reject(err);
    }
  });
}
