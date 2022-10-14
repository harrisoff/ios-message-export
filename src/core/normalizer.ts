import { formatTime } from './utils'

export const normalizePerson = (person: { [key: string]: any }): Person => {
  const { c0First, c1Last, c2Middle, c16Phone } = person
  return {
    c0First,
    c1Last,
    c2Middle,
    // person.c16Phone can be null.
    // For example, Telegram contacts may have person.c20URL instead.
    c16Phone: c16Phone?.trim().split(' '),
  }
}

export const normalizeMessage = (message: { [key: string]: any }): Message => {
  const { guid, text, handle_id, account, account_guid, date, date_read, is_from_me } = message
  return {
    guid,
    text,
    handle_id,
    // message.account can be null
    account: account?.toLowerCase(),
    account_guid,
    date: formatTime(date),
    date_read: formatTime(date_read),
    is_from_me: is_from_me === '1',
  }
}
