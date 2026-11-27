import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { sendMessage } from '../lib/chat';
import { askNotificationPermission } from '../lib/notifications';
import { useChat } from '../hooks/useChat';

type ChatPanelProps = {
  eventId: number;
  eventTitle: string;
};

export function ChatPanel({ eventId, eventTitle }: ChatPanelProps) {
  const { user } = useAuth();
  const { messages, status } = useChat(eventId, eventTitle);
  const [text, setText] = useState('');

  useEffect(() => {
    askNotificationPermission();
  }, []);

  const trimmed = text.trim();

  function handleSend() {
    if (!trimmed) {
      return;
    }
    sendMessage(eventId, trimmed);
    setText('');
  }

  const newestFirst = [...messages].reverse();

  return (
    <View style={styles.panel}>
      <Text style={styles.heading}>Live chat</Text>
      {user ? (
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Write a message"
            value={text}
            onChangeText={setText}
            maxLength={200}
            returnKeyType="send"
            onSubmitEditing={handleSend}
          />
          <Pressable
            onPress={handleSend}
            disabled={!trimmed}
            style={({ pressed }) => [
              styles.sendButton,
              !trimmed && styles.sendButtonDisabled,
              pressed && trimmed ? styles.sendButtonPressed : null,
            ]}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </Pressable>
        </View>
      ) : (
        <Pressable
          onPress={() => router.push('/login')}
          style={({ pressed }) => [
            styles.signInButton,
            pressed && styles.sendButtonPressed,
          ]}
        >
          <Text style={styles.sendButtonText}>Sign in to chat</Text>
        </Pressable>
      )}

      {status === 'connecting' && (
        <Text style={styles.statusText}>Connecting</Text>
      )}
      {status === 'error' && (
        <Text style={styles.errorText}>Chat unavailable</Text>
      )}
      {status === 'live' && newestFirst.length === 0 && (
        <Text style={styles.statusText}>No messages yet</Text>
      )}
      {status === 'live' &&
        newestFirst.map((m) => (
          <View key={m.id} style={styles.messageBubble}>
            <Text style={styles.messageText}>
              {m.author}: {m.text}
            </Text>
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    minHeight: 44,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#111827',
  },
  sendButton: {
    minHeight: 44,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#1d4ed8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInButton: {
    minHeight: 44,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#1d4ed8',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  sendButtonPressed: {
    backgroundColor: '#1e40af',
  },
  sendButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statusText: {
    fontSize: 15,
    color: '#4b5563',
    marginTop: 4,
  },
  errorText: {
    fontSize: 15,
    color: '#b91c1c',
    marginTop: 4,
  },
  messageBubble: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    marginBottom: 8,
  },
  messageText: {
    fontSize: 15,
    color: '#111827',
  },
});
