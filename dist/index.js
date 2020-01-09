"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var config = require("./config");
var smsPath = config.smsPath, contactsPath = config.contactsPath, outputExcelPath = config.outputExcelPath, outputJsonPath = config.outputJsonPath;
var db = require("./db");
var initDatabase = db.initDatabase, getAllContacts = db.getAllContacts, getAllHandle = db.getAllHandle, getAllMessages = db.getAllMessages;
var utils = require("./utils");
var exportAsJson = utils.exportAsJson, exportAsCsv = utils.exportAsCsv;
var validation = require("./validation");
var hasRequiredFiles = validation.hasRequiredFiles;
function getHandleNameByTel(contactList, tel) {
    var matched = contactList.find(function (row) { return row.telList.includes(tel); });
    return matched ? matched.name : '';
}
function getTelAndNameByHandleId(allHandles, handleId) {
    var handle = allHandles.find(function (row) { return row.handleId === handleId; });
    return handle ? { fullName: handle.fullName, tel: handle.tel } : {};
}
function formatResult(rawResult) {
    var result = rawResult.map(function (row) {
        var id = row.id, text = row.text, myTel = row.myTel, appleId = row.appleId, time = row.time, readTime = row.readTime, fromMe = row.fromMe, tel = row.tel, fullName = row.fullName;
        if (myTel === 'e:' || myTel === 'E:') {
            myTel = '';
        }
        else if (myTel === 'P:' || myTel === 'p:') {
            myTel = '';
        }
        else if (_.startsWith(myTel, 'e:') || _.startsWith(myTel, 'e:')) {
            myTel = myTel.substr(2);
        }
        else if (_.startsWith(myTel, 'p:') || _.startsWith(myTel, 'P:')) {
            myTel = myTel.substr(2);
        }
        return {
            id: id,
            text: text,
            myTel: myTel,
            appleId: appleId,
            time: time,
            readTime: readTime,
            fromMe: fromMe,
            tel: tel,
            fullName: fullName,
        };
    });
    return result;
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var smsDB, contactsDB, contactList_1, allHandles_1, allMessages, result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    return [4, hasRequiredFiles([smsPath, contactsPath])];
                case 1:
                    _a.sent();
                    return [4, initDatabase(smsPath)];
                case 2:
                    smsDB = _a.sent();
                    return [4, initDatabase(contactsPath)];
                case 3:
                    contactsDB = _a.sent();
                    return [4, getAllContacts(contactsDB)];
                case 4:
                    contactList_1 = _a.sent();
                    return [4, getAllHandle(smsDB)];
                case 5:
                    allHandles_1 = _a.sent();
                    allHandles_1.forEach(function (row) {
                        var tel = row.tel;
                        var fullName = getHandleNameByTel(contactList_1, tel);
                        row.fullName = fullName;
                    });
                    return [4, getAllMessages(smsDB)];
                case 6:
                    allMessages = _a.sent();
                    allMessages.forEach(function (row) {
                        var handleId = row.handleId;
                        var _a = getTelAndNameByHandleId(allHandles_1, handleId), fullName = _a.fullName, tel = _a.tel;
                        if (fullName || tel) {
                            row.tel = tel;
                            row.fullName = fullName;
                        }
                    });
                    result = formatResult(allMessages);
                    exportAsCsv(result, outputExcelPath);
                    return [3, 8];
                case 7:
                    err_1 = _a.sent();
                    console.log('error');
                    console.log(err_1);
                    return [3, 8];
                case 8: return [2];
            }
        });
    });
}
main();
