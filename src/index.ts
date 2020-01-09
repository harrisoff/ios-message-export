import _ = require('lodash');

import config = require('./config');
const { smsPath, contactsPath, outputExcelPath, outputJsonPath } = config;

import db = require('./db');
const { initDatabase, getAllContacts, getAllHandle, getAllMessages } = db;

import utils = require('./utils');
const { exportAsJson, exportAsCsv } = utils;

import validation = require('./validation');
const { hasRequiredFiles } = validation;

function getHandleNameByTel(contactList: NameTel[], tel: string): string {
  const matched = contactList.find(row => row.telList.includes(tel));
  return matched ? matched.name : '';
}

function getTelAndNameByHandleId(allHandles: Handle[], handleId: number) {
  const handle = allHandles.find(row => row.handleId === handleId);
  return handle ? { fullName: handle.fullName, tel: handle.tel } : {};
}

function formatResult(rawResult: Message[]): Result[] {
  const result = rawResult.map(row => {
    let { id, text, myTel, appleId, time, readTime, fromMe, tel, fullName } = row;
    // myTel
    if (myTel === 'e:' || myTel === 'E:') {
      myTel = '';
    } else if (myTel === 'P:' || myTel === 'p:') {
      myTel = '';
    } else if (_.startsWith(myTel, 'e:') || _.startsWith(myTel, 'e:')) {
      myTel = myTel.substr(2);
    } else if (_.startsWith(myTel, 'p:') || _.startsWith(myTel, 'P:')) {
      myTel = myTel.substr(2);
    }
    return {
      id,
      text,
      myTel,
      appleId,
      time,
      readTime,
      fromMe,
      tel,
      fullName,
    };
  });
  return result;
}

async function main() {
  try {
    await hasRequiredFiles([smsPath, contactsPath]);

    const smsDB = await initDatabase(smsPath);
    const contactsDB = await initDatabase(contactsPath);
    // 通讯录
    const contactList = await getAllContacts(contactsDB);
    // 有信息往来的号码
    const allHandles = await getAllHandle(smsDB);
    // 对 allHandles 中在通讯录有记录的部分添加 fullName 字段
    allHandles.forEach(row => {
      const { tel } = row;
      const fullName = getHandleNameByTel(contactList, tel);
      row.fullName = fullName;
    });
    // createTempJsonFile(allHandles);
    const allMessages = await getAllMessages(smsDB);
    allMessages.forEach(row => {
      const { handleId } = row;
      const { fullName, tel } = getTelAndNameByHandleId(allHandles, handleId);
      if (fullName || tel) {
        row.tel = tel;
        row.fullName = fullName;
      }
    });

    const result = formatResult(allMessages);

    // exportAsJson(allMessages, outputJsonPath);
    exportAsCsv(result, outputExcelPath);
  } catch (err) {
    console.log('error');
    console.log(err);
  }
}

main();
