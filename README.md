# ios-message-export

[中文文档](./README.zh.md)

Extract contacts and messages from iTunes backup files and aggregate them into a csv file.

Data structure:

```ts
interface Result {
  id: string;
  text: string;
  myTel: string;
  // apple id of the phone when receiving this message
  appleId: string;
  time: number | string;
  readTime: number | string;
  fromMe: 1 | 0;
  tel?: string;
  // sender's name (if the tel is saved)
  fullName?: string;
}
```

## Usage

## 1. backup

   1. backup your iphone with iTunes

      **DO NOT SET PASSWORD**

   2. find those two files from backup files, we'll use it later:

      - `3d0d7e5fb2ce288813306e4d4636395e047a3d28`
      - `31bb7ba8914766d4ba40d6dfb6113c8b614be442`

## 2. extract

   1. clone project

   2. install dependencies `npm i`

   3. put two files above to project root folder

   4. `npm start`, then the data will be exported to `ios-message-export.csv`

## Compatibility

| | Windows 10 | MacOS |
| - | - | - |
| iPhone 6s Plus iOS 12 | ✔️ | |
| iPhone 6s Plus iOS 13 | ✔️ | |
| iPhone XS iOS 14 | | ✔️ |
| iPhone XR iOS 15.1 | | ✔️ |
| iPhone 11 iOS 13.7 | ✔️ | |
| iPhone 11 iOS 14 | ✔️ | |

I only tested it with my own devices, welcome to create PRs with your test result.

## References

- [iPhone backup database hashes: which filenames do they use?](https://www.iphonebackupextractor.com/blog/iphone-backup-location-all-files-extension/)
- [Messages - The iPhone Wiki](https://www.theiphonewiki.com/wiki/Messages#message)
- [Reverse Engineering the iOS Backup](https://www.richinfante.com/2017/3/16/reverse-engineering-the-ios-backup)
