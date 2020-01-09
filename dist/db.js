"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sqlite3 = require("sqlite3");
var _ = require("lodash");
var utils = require("./utils");
var formatSwiftTime = utils.formatSwiftTime, formatTimestamp = utils.formatTimestamp;
function initDatabase(path) {
    var db = sqlite3.verbose();
    return new Promise(function (resolve, reject) {
        try {
            var database = new db.Database(path);
            resolve(database);
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.initDatabase = initDatabase;
function getAllContacts(contactsDB) {
    var query = "\n  select\n    c0First,\n    c1Last,\n    c16Phone\n  from ABPersonFullTextSearch_content\n  ";
    return new Promise(function (resolve, reject) {
        contactsDB.all(query, function (err, result) {
            if (err) {
                reject(err);
            }
            else if (result.length) {
                var nameTelMap = result.map(function (row) {
                    var c0First = row.c0First, c1Last = row.c1Last, c16Phone = row.c16Phone;
                    var fullName = '';
                    if (c1Last) {
                        fullName += c1Last;
                    }
                    if (c0First) {
                        fullName += c0First;
                    }
                    var telList = _.trimEnd(c16Phone).split(' ');
                    return {
                        name: fullName,
                        telList: telList,
                    };
                });
                resolve(nameTelMap);
            }
            else {
                resolve([]);
            }
        });
    });
}
exports.getAllContacts = getAllContacts;
function getAllHandle(smsDB) {
    var query = "\n  select\n    id,\n    service,\n    ROWID\n  from handle\n  ";
    return new Promise(function (resolve, reject) {
        smsDB.all(query, function (err, result) {
            if (err) {
                reject(err);
            }
            else {
                var formattedResult = result.map(function (row) {
                    var id = row.id, service = row.service, ROWID = row.ROWID;
                    return {
                        tel: id,
                        service: service,
                        handleId: ROWID,
                    };
                });
                resolve(formattedResult);
            }
        });
    });
}
exports.getAllHandle = getAllHandle;
function getAllMessages(smsDB) {
    var query = "\n  select\n    guid,\n    text,\n    handle_id,\n    account,\n    account_guid,\n    date,\n    date_read,\n    is_from_me\n  from message\n  ";
    return new Promise(function (resolve, reject) {
        smsDB.all(query, function (err, result) {
            if (err) {
                reject(err);
            }
            else {
                var formattedResult = result.map(function (row) {
                    var guid = row.guid, text = row.text, handle_id = row.handle_id, account = row.account, account_guid = row.account_guid, date = row.date, date_read = row.date_read, is_from_me = row.is_from_me;
                    return {
                        id: guid,
                        text: text,
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
exports.getAllMessages = getAllMessages;
