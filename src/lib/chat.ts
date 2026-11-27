import {
  limitToLast,
  onValue,
  orderByChild,
  push,
  query,
  ref,
  serverTimestamp,
} from 'firebase/database';
import { auth, db } from './firebase';

export type ChatMessage = {
  id: string;
  uid: string;
  author: string;
  text: string;
  sentAt: number;
  deviceId: string;
};

export const DEVICE_ID = 'd-' + Math.random().toString(36).slice(2, 10);

export function sendMessage(eventId: number, text: string) {
  const user = auth.currentUser;
  if (!user || !user.email) {
    throw new Error('Sign in to chat');
  }
  return push(ref(db, `chats/${eventId}`), {
    uid: user.uid,
    author: user.email.split('@')[0],
    text,
    sentAt: serverTimestamp(),
    deviceId: DEVICE_ID,
  });
}

export function subscribeToChat(
  eventId: number,
  onMessages: (messages: ChatMessage[]) => void,
  onError: () => void,
) {
  const chatQuery = query(
    ref(db, `chats/${eventId}`),
    orderByChild('sentAt'),
    limitToLast(50),
  );
  return onValue(
    chatQuery,
    (snapshot) => {
      const messages: ChatMessage[] = [];
      snapshot.forEach((child) => {
        messages.push({ id: child.key!, ...child.val() });
      });
      onMessages(messages);
    },
    onError,
  );
}
