import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { useEvents } from '../../src/hooks/useEvents';
import { useSavedIds } from '../../src/hooks/useSavedIds';
import { EventRow } from '../../src/components/EventRow';

export default function EventsScreen() {
  const { data, isPending, isError, error, refetch, isRefetching } = useEvents();
  const { savedIds, toggleSaved } = useSavedIds();
  const [query, setQuery] = useState('');

  if (isPending) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1d4ed8" />
        <Text style={styles.statusText}>Loading events</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Could not load events</Text>
        <Text style={styles.errorText}>{error.message}</Text>
        <Pressable onPress={() => refetch()} style={styles.button}>
          <Text style={styles.buttonText}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  const filtered = data.filter((e) =>
    e.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search events"
        value={query}
        onChangeText={setQuery}
      />
      <Text style={styles.hint}>
        Swipe or long-press an event to save it. Saved: {savedIds.length}
      </Text>
      <FlatList
        data={filtered}
        keyExtractor={(e) => String(e.id)}
        refreshing={isRefetching}
        onRefresh={() => refetch()}
        renderItem={({ item }) => (
          <EventRow
            event={item}
            saved={savedIds.includes(item.id)}
            onPress={() => router.push(`/events/${item.id}`)}
            onToggleSaved={() => toggleSaved(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No events match</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f3f4f6',
  },
  center: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
  },
  statusText: {
    fontSize: 16,
    color: '#4b5563',
    marginTop: 12,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#b91c1c',
    marginBottom: 16,
  },
  button: {
    minHeight: 44,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#1d4ed8',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    minHeight: 44,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  hint: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 12,
  },
  empty: {
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
    marginTop: 24,
  },
});
