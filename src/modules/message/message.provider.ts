import { Message } from 'src/models/message/message.model';

export const messageProviders = [
  {
    provide: 'MESSAGE_REPOSITORY',
    useValue: Message,
  },
];
