import sqlite3 from 'sqlite3'

import { getHandleList, getMessageList, getPersonList } from './db'
import { normalizeMessage, normalizePerson } from './normalizer'

export { initDatabase } from './db'

export const exportRawPersonList = (personDatabase: sqlite3.Database) => getPersonList(personDatabase)

export const exportRawMessageList = async (messageDatabase: sqlite3.Database) => {
  const messageList = await getMessageList(messageDatabase)
  return messageList.map(({ date, date_read, ...rest }) => ({
    ...rest,
    // those two values are very large numbers
    date: date.toString(),
    date_read: date_read.toString(),
  }))
}

export const exportAggregatedList = async (personDatabase: sqlite3.Database, messageDatabase: sqlite3.Database) => {
  const personList = (await getPersonList(personDatabase)).map(normalizePerson)
  const messageList = (await getMessageList(messageDatabase)).map(normalizeMessage)
  const handleList = await getHandleList(messageDatabase)

  const resultList: Result[] = messageList.map(message => {
    const { handle_id } = message
    const handle = handleList.find(h => h.ROWID === handle_id)
    if (handle) {
      const person = personList.find(p => p.c16Phone?.includes(handle.id))
      if (person) {
        const { c16Phone, ...rest } = person
        return {
          ...message,
          ...rest,
        }
      }
    }
    return {
      ...message,
      c0First: '',
      c1Last: '',
      c2Middle: '',
    }
  })

  return resultList
}
