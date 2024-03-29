# ios-message-export

Export contacts and messages from iTunes backup files as csv/json files.

[中文文档](./README.zh.md)

## Usage

1. clone project and install dependencies

2. backup your iPhone with iTunes, **DO NOT SET PASSWORD**

3. find those two files from backup folder, put them in the root directory of the project then run `npm run cli`:

   - 3d0d7e5fb2ce288813306e4d4636395e047a3d28
   - 31bb7ba8914766d4ba40d6dfb6113c8b614be442

Results will be saved in the root directory of the project:

- `message.csv`, original message data
- `person.csv`, original contact data
- `aggregated.csv`, add contact info for each message (if there is such a contact)

Passing `--format=json` to get results in json format.

## Compatibility

| | Windows 10 | MacOS |
| - | - | - |
| iPhone 6s Plus iOS 12 | ✔️ | |
| iPhone 6s Plus iOS 13 | ✔️ | |
| iPhone XS iOS 14 | | ✔️ |
| iPhone XR iOS 15.1 | | ✔️ |
| iPhone 11 iOS 13.7 | ✔️ | |
| iPhone 11 iOS 14 | ✔️ | |
| iPhone 11 iOS 15 | ✔️ | |

I only tested it with my own devices, welcome to create PRs with your test results.

## References

- [iPhone backup database hashes: which filenames do they use?](https://www.iphonebackupextractor.com/blog/iphone-backup-location-all-files-extension/)
- [Messages - The iPhone Wiki](https://www.theiphonewiki.com/wiki/Messages#message)
- [Reverse Engineering the iOS Backup](https://www.richinfante.com/2017/3/16/reverse-engineering-the-ios-backup)
