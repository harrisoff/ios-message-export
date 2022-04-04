type Handle = {
  /**
   * Message['handle_id']
   */
  ROWID: string;
  /**
   * Person['c16Phone'][number]
   */
  id: string;
  service: 'SMS' | 'iMessage';
};

type Person = {
  c0First: string;
  c1Last: string;
  c2Middle: string;
  /**
   * Handle['id'][]
   */
  c16Phone: string[];
};

type Message = {
  /**
   * id
   */
  guid: string;
  text: string;
  /**
   * Handle['ROWID']
   */
  handle_id: string;
  /**
   * your phone number (or email address?).
   * it seems that accounts always start
   * with prefixes "e:"/"E:"/"p:"/"P:"
   */
  account: string;
  /**
   * apple account
   */
  account_guid: string;
  date: string;
  date_read: string;
  is_from_me: boolean;
};

type Result = Omit<Message, 'handle_id'> & Omit<Person, 'c16Phone'>;
