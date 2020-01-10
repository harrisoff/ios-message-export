import path = require('path');
import fs = require('fs');

const smsFileName = '3d0d7e5fb2ce288813306e4d4636395e047a3d28';
const contactsFileName = '31bb7ba8914766d4ba40d6dfb6113c8b614be442';

const packageJson = fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8');
const outputFileName = JSON.parse(packageJson).name;

export const rootPath = path.resolve(__dirname, '../');
export const smsPath = path.resolve(rootPath, smsFileName);
export const contactsPath = path.resolve(rootPath, contactsFileName);
export const outputExcelPath = path.resolve(rootPath, `${outputFileName}.csv`);
export const outputJsonPath = path.resolve(rootPath, `${outputFileName}.json`);

export const mapHandleContactFileName = 'map-handle-contact';
