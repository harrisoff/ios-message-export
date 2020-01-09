# ios-message-export

## 功能

提取并整合 iOS 备份文件中的联系人和短信数据，导出为 CSV 文档。

包含以下数据：
- 短信 ID
- 接收到该短信时手机上登录的 Apple 账户的 ID
   > 不是 Apple 账户的邮箱地址，是 ID
- 文本内容
- 对方号码
- 对方姓名（如果对方号码保存到了通讯录）
- 收信号码（本机号码）
- 短信时间
- 短信已读时间
- 发送还是接收

## 使用方法

### I. 安装

1. clone 项目

2. 安装依赖

   ```shell
   npm i
   ```

### II. 备份手机数据

1. 使用 iTunes 备份手机数据到 PC/Mac

   **提示给备份加密时一定不要设置密码**

2. 备份完成后，从备份目录找到以下两个文件，并复制到 `dataset` 目录：

   - `3d0d7e5fb2ce288813306e4d4636395e047a3d28`
   - `31bb7ba8914766d4ba40d6dfb6113c8b614be442`

### III. 提取为 csv 文件

执行 `npm run start`，结果将会输出为 `output` 目录的 `result.csv` 文件。

## 兼容性

支持的 iPhone 型号、iOS 版本及执行备份的系统见下表。

| | Windows 10 | MacOS |
| - | - | - |
| iPhone 6s Plus iOS 12 | ✔️ | |
| iPhone 6s Plus iOS 13 | ✔️ | |

设备有限，欢迎测试后提 PR。

## 参考链接

- [iPhone backup database hashes: which filenames do they use?](https://www.iphonebackupextractor.com/blog/iphone-backup-location-all-files-extension/)
- [Messages - The iPhone Wiki](https://www.theiphonewiki.com/wiki/Messages#message)
- [Reverse Engineering the iOS Backup](https://www.richinfante.com/2017/3/16/reverse-engineering-the-ios-backup)
