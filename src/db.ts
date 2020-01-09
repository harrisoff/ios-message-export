import sqlite3 = require('sqlite3');
import _ = require('lodash');

import utils = require('./utils');
const { formatSwiftTime, formatTimestamp } = utils;

export function initDatabase(path: string): Promise<sqlite3.Database> {
  const db = sqlite3.verbose();
  return new Promise((resolve: (value: sqlite3.Database) => void, reject) => {
    try {
      const database: sqlite3.Database = new db.Database(path);
      resolve(database);
    } catch (err) {
      reject(err);
    }
  });
}

export function getAllContacts(contactsDB: sqlite3.Database): Promise<NameTel[]> {
  const query = `
  select
    c0First,
    c1Last,
    c16Phone
  from ABPersonFullTextSearch_content
  `;
  return new Promise((resolve: (value: NameTel[]) => void, reject) => {
    contactsDB.all(query, (err, result) => {
      if (err) {
        reject(err);
      } else if (result.length) {
        const nameTelMap = result.map(row => {
          const { c0First, c1Last, c16Phone } = row;
          let fullName = '';
          if (c1Last) {
            fullName += c1Last;
          }
          if (c0First) {
            fullName += c0First;
          }
          const telList = _.trimEnd(c16Phone).split(' ');
          return {
            name: fullName,
            telList,
          };
        });
        resolve(nameTelMap);
      } else {
        resolve([]);
      }
    });
  });
}

export function getAllHandle(smsDB: sqlite3.Database): Promise<Handle[]> {
  const query = `
  select
    id,
    service,
    ROWID
  from handle
  `;
  return new Promise((resolve: (value: Handle[]) => void, reject) => {
    smsDB.all(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const formattedResult = result.map(row => {
          const { id, service, ROWID } = row;
          return {
            tel: id,
            service,
            handleId: ROWID,
          };
        });
        resolve(formattedResult);
      }
    });
  });
}

export function getAllMessages(smsDB: sqlite3.Database): Promise<Message[]> {
  const query = `
  select
    guid,
    text,
    handle_id,
    account,
    account_guid,
    date,
    date_read,
    is_from_me
  from message
  `;
  return new Promise((resolve: (value: Message[]) => void, reject) => {
    smsDB.all(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const formattedResult = result.map(row => {
          const { guid, text, handle_id, account, account_guid, date, date_read, is_from_me } = row;
          return {
            id: guid,
            text,
            handleId: handle_id,
            myTel: account,
            appleId: account_guid,
            time: formatTimestamp(formatSwiftTime(date)),
            readTime: formatTimestamp(formatSwiftTime(date_read)),
            fromMe: is_from_me === 0 ? '接收' : '发送',
          };
        });
        resolve(formattedResult);
      }
    });
  });
}
