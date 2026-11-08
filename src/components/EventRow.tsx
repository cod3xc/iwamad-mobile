import { Pressable, StyleSheet, Text } from 'react-native';
import type { CampusEvent } from '../data/events';

type EventRowProps = {
  event: CampusEvent;
  saved?: boolean;
  onPress: () => void;
  onLongPress: () => void;
};

export function EventRow({ event, saved, onPress, onLongPress }: EventRowProps) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.meta}>
        {event.date} · {event.place}
      </Text>
      {saved && <Text style={styles.saved}>★ Saved</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 44,
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
  },
  cardPressed: {
    backgroundColor: '#eff6ff',
    borderColor: '#1d4ed8',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  meta: {
    fontSize: 14,
    color: '#4b5563',
    marginTop: 4,
  },
  saved: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1d4ed8',
    marginTop: 6,
  },
});
