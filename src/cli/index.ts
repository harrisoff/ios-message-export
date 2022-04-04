import path from 'path';
import { Command } from 'commander';

import { exportAsCsv, exportAsJson, checkFiles } from './utils';

import { initDatabase, exportRawMessageList, exportRawPersonList, exportAggregatedList } from '../core';

const rootPath = path.resolve(__dirname, '../../');
const messageDbPath = path.resolve(rootPath, '3d0d7e5fb2ce288813306e4d4636395e047a3d28');
const personDbPath = path.resolve(rootPath, '31bb7ba8914766d4ba40d6dfb6113c8b614be442');
const messageExportPath = path.resolve(rootPath, 'message');
const personExportPath = path.resolve(rootPath, 'person');
const aggregatedExportPath = path.resolve(rootPath, 'aggregated');

async function main() {
  try {
    await checkFiles([messageDbPath, personDbPath]);

    const program = new Command();
    program.option('-f, --format', 'csv or json', 'csv');
    program.parse(process.argv);
    const options = program.opts();

    if (!['csv', 'json'].includes(options.format)) {
      throw new Error(`invalid format: ${options.format}`);
    }

    const messageDatabase = initDatabase(messageDbPath);
    const personDatabase = initDatabase(personDbPath);

    const messageList = await exportRawMessageList(messageDatabase);
    const personList = await exportRawPersonList(personDatabase);
    const resultList = await exportAggregatedList(personDatabase, messageDatabase);

    if (options.format === 'csv') {
      await exportAsCsv(resultList, `${aggregatedExportPath}.csv`);
      await exportAsCsv(messageList, `${messageExportPath}.csv`);
      await exportAsCsv(personList, `${personExportPath}.csv`);
    } else {
      await exportAsJson(resultList, `${aggregatedExportPath}.json`);
      await exportAsJson(messageList, `${messageExportPath}.json`);
      await exportAsJson(personList, `${personExportPath}.json`);
    }
  } catch (err) {
    console.log((err as any).message);
    process.exit(1);
  }
}

main();
