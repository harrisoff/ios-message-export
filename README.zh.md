# ios-message-export

提取并整合 iOS 备份文件中的联系人和短信数据，导出为 CSV 文档。

## 使用方法

1. clone 项目，安装依赖
2. 用 iTunes 备份 iPhone，**不要设置密码**
3. 从备份的目录中找到以下两个文件，放到项目根目录，然后 `npm run start`
   - 3d0d7e5fb2ce288813306e4d4636395e047a3d28
   - 31bb7ba8914766d4ba40d6dfb6113c8b614be442

结果会输出到项目根目录：
- `message.csv`，原始的信息数据
- `person.csv`，原始的联系人数据
- `aggregated.csv`，在每条信息上加了对应的联系人（如果有的话）

## 兼容性

见[README.md#Compatibility](./README.md#Compatibility)

设备有限，欢迎测试后提 PR。

## 参考链接

- [iPhone backup database hashes: which filenames do they use?](https://www.iphonebackupextractor.com/blog/iphone-backup-location-all-files-extension/)
- [Messages - The iPhone Wiki](https://www.theiphonewiki.com/wiki/Messages#message)
- [Reverse Engineering the iOS Backup](https://www.richinfante.com/2017/3/16/reverse-engineering-the-ios-backup)
