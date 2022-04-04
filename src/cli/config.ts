import path from 'path';

const MESSAGE_FILE = '3d0d7e5fb2ce288813306e4d4636395e047a3d28';
const PERSON_FILE = '31bb7ba8914766d4ba40d6dfb6113c8b614be442';

export const rootPath = path.resolve(__dirname, '../../');

export const messageFilePath = path.resolve(rootPath, MESSAGE_FILE);
export const personFilePath = path.resolve(rootPath, PERSON_FILE);
// export const outputBasePath = path.resolve(rootPath, outputFileName);
