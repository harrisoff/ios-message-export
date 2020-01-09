import path = require('path');

const smsFileName = '3d0d7e5fb2ce288813306e4d4636395e047a3d28';
const contactsFileName = '31bb7ba8914766d4ba40d6dfb6113c8b614be442';
const outputFileName = 'result';

export const rootPath = path.resolve(__dirname, '../');
export const dataSetPath = path.resolve(rootPath, 'dataset');
export const smsPath = path.resolve(dataSetPath, smsFileName);
export const contactsPath = path.resolve(dataSetPath, contactsFileName);
export const outputExcelPath = path.resolve(rootPath, 'output', `${outputFileName}.csv`);
export const outputJsonPath = path.resolve(rootPath, 'output', `${outputFileName}.json`);

export const mapHandleContactFileName = 'map-handle-contact';
