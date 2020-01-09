"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function hasRequiredFiles(fileList) {
    return new Promise(function (resolve, reject) {
        var lackingFiles = fileList.filter(function (filePath) {
            return !fs.existsSync(filePath);
        });
        if (lackingFiles.length) {
            reject(lackingFiles);
        }
        else {
            resolve([]);
        }
    });
}
exports.hasRequiredFiles = hasRequiredFiles;
