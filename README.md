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

## 1. 备份手机数据

1.1. 使用 iTunes 备份手机数据到 PC/Mac

   **提示给备份加密时一定不要设置密码**

1.2. 备份完成后，从备份目录找到以下两个文件备用：

   - `3d0d7e5fb2ce288813306e4d4636395e047a3d28`
   - `31bb7ba8914766d4ba40d6dfb6113c8b614be442`

## 2. 提取

两种方式都可以：
- 直接使用编译后的可执行文件
   > 暂时只有 Windows 版本
- 运行源码

### 运行可执行文件

下载 [release](https://github.com/harrisoff/ios-message-export/releases) 中的可执行文件，放到与步骤 `1.2.` 中的两个文件相同的目录后运行。

结果将输出为同目录下的 `ios-message-export.csv` 文件。

### 运行源码

1. `clone` 项目

2. 安装依赖

   ```shell
   npm i
   ```
3. 复制备份数据

   把步骤 `1.2.` 中的两个文件复制到项目根目录

4. 运行

   执行 `npm run start`，结果将输出为项目根目录下的 `ios-message-export.csv` 文件。

## 兼容性

支持的 iPhone 型号、iOS 版本及执行备份的系统见下表。

| | Windows 10 | MacOS |
| - | - | - |
| iPhone 6s Plus iOS 12 | ✔️ | |
| iPhone 6s Plus iOS 13 | ✔️ | |
| iPhone 11 iOS 13.7 | ✔️ | |

设备有限，欢迎测试后提 PR。

## 参考链接

- [iPhone backup database hashes: which filenames do they use?](https://www.iphonebackupextractor.com/blog/iphone-backup-location-all-files-extension/)
- [Messages - The iPhone Wiki](https://www.theiphonewiki.com/wiki/Messages#message)
- [Reverse Engineering the iOS Backup](https://www.richinfante.com/2017/3/16/reverse-engineering-the-ios-backup)
