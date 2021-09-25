interface Handle {
  tel: string;
  service: string;
  handleId: number;
  // getHandleNameByTel()
  fullName?: string;
}

interface Message {
  id: string;
  text: string;
  handleId: number;
  myTel: string;
  appleId: string;
  time: number | string;
  readTime: number | string;
  fromMe: 1 | 0;
  // getTelAndNameByHandleId()
  tel?: string;
  fullName?: string;
}

interface HandleNames {
  c0First: string;
  c1Last: string;
}

interface NameTel {
  name: string;
  telList: string[];
}

interface Contact {
  c0First: string;
  c1Last: string;
  c16Phone: string;
}

interface Result {
  id: string;
  text: string;
  myTel: string;
  appleId: string;
  time: number | string;
  readTime: number | string;
  fromMe: 1 | 0;
  tel?: string;
  fullName?: string;
}
