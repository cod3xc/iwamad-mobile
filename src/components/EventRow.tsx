import { Pressable, StyleSheet, Text } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  ZoomIn,
} from 'react-native-reanimated';
import type { CampusEvent } from '../data/events';

type EventRowProps = {
  event: CampusEvent;
  saved?: boolean;
  onPress: () => void;
  onToggleSaved: () => void;
};

export function EventRow({ event, saved, onPress, onToggleSaved }: EventRowProps) {
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      layout={LinearTransition}
      style={styles.row}
    >
      <Swipeable
        friction={2}
        rightThreshold={60}
        renderRightActions={(_progress, _translation, swipeable) => (
          <Pressable
            onPress={() => {
              onToggleSaved();
              swipeable.close();
            }}
            style={styles.action}
          >
            <Text style={styles.actionText}>{saved ? 'Unsave' : 'Save'}</Text>
          </Pressable>
        )}
      >
        <Pressable
          onPress={onPress}
          onLongPress={onToggleSaved}
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        >
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.meta}>
            {event.date} · {event.place}
          </Text>
          {saved && (
            <Animated.Text entering={ZoomIn} style={styles.saved}>
              ★ Saved
            </Animated.Text>
          )}
        </Pressable>
      </Swipeable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginBottom: 12,
  },
  card: {
    minHeight: 44,
    padding: 16,
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
  action: {
    minHeight: 44,
    width: 88,
    marginLeft: 8,
    borderRadius: 10,
    backgroundColor: '#1d4ed8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
