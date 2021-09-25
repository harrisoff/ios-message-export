# ios-message-export

提取并整合 iOS 备份文件中的联系人和短信数据，导出为 CSV 文档。

数据结构：

```ts
interface Result {
  id: string;
  text: string;
  myTel: string;
  // 接收到该短信时手机上登录的 Apple 账户的 ID
  appleId: string;
  time: number | string;
  readTime: number | string;
  fromMe: 1 | 0;
  tel?: string;
  // 对方姓名（如果对方号码保存到了通讯录）
  fullName?: string;
}
```

## 使用方法

## 1. 备份手机数据

1.1. 使用 iTunes 备份手机数据到 PC/Mac

   **提示给备份加密时一定不要设置密码**

1.2. 备份完成后，从备份目录找到以下两个文件备用：

   - `3d0d7e5fb2ce288813306e4d4636395e047a3d28`
   - `31bb7ba8914766d4ba40d6dfb6113c8b614be442`

## 2. 提取

2.1. clone 项目

2.2. 安装依赖 `npm i`

2.3. 把上面的两个文件放到项目根目录

2.3. `npm start`，结果将输出为 `ios-message-export.csv`

## 兼容性

支持的 iPhone 型号、iOS 版本及执行备份的系统见下表。

| | Windows 10 | MacOS |
| - | - | - |
| iPhone 6s Plus iOS 12 | ✔️ | |
| iPhone 6s Plus iOS 13 | ✔️ | |
| iPhone 11 iOS 13.7 | ✔️ | |
| iPhone 11 iOS 14 | ✔️ | |

设备有限，欢迎测试后提 PR。

## 参考链接

- [iPhone backup database hashes: which filenames do they use?](https://www.iphonebackupextractor.com/blog/iphone-backup-location-all-files-extension/)
- [Messages - The iPhone Wiki](https://www.theiphonewiki.com/wiki/Messages#message)
- [Reverse Engineering the iOS Backup](https://www.richinfante.com/2017/3/16/reverse-engineering-the-ios-backup)
