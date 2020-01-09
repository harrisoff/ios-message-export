"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var moment = require("moment");
var xlsx = require("xlsx");
var _ = require("lodash");
function exportAsJson(data, filePath) {
    filePath = _.endsWith('.json') ? filePath : filePath + ".json";
    fs.writeFile(filePath, JSON.stringify(data), 'utf8', function (err) {
        if (err)
            console.log(err);
    });
}
exports.exportAsJson = exportAsJson;
function exportAsCsv(result, filePath) {
    var header = Object.keys(result[0]);
    return new Promise(function (resolve, reject) {
        try {
            var workBook = xlsx.utils.book_new();
            var workSheet = xlsx.utils.json_to_sheet(result, { header: header });
            xlsx.utils.book_append_sheet(workBook, workSheet, 'sheet1');
            xlsx.writeFile(workBook, filePath);
            resolve(true);
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.exportAsCsv = exportAsCsv;
function formatTimestamp(timestamp) {
    if (timestamp) {
        return moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
    }
    return '';
}
exports.formatTimestamp = formatTimestamp;
function formatSwiftTime(rawTime) {
    return rawTime ? rawTime / 1000000 + 978307200000 : 0;
}
exports.formatSwiftTime = formatSwiftTime;
