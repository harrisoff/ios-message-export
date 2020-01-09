import fs = require('fs');

export function hasRequiredFiles(fileList: string[]): Promise<string[]> {
  return new Promise((resolve: (value: string[]) => void, reject: (value: string[]) => void) => {
    const lackingFiles: string[] = fileList.filter(filePath => {
      return !fs.existsSync(filePath);
    });
    if (lackingFiles.length) {
      reject(lackingFiles);
    } else {
      resolve([]);
    }
  });
}
