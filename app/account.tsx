import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '../src/context/AuthContext';
import { signOutUser } from '../src/lib/auth';
import { decodeTokenPayload } from '../src/lib/jwt';

export default function AccountScreen() {
  const { user, status } = useAuth();
  const [expiresIn, setExpiresIn] = useState<number | null>(null);

  useEffect(() => {
    if (!user) {
      setExpiresIn(null);
      return;
    }
    user.getIdToken().then((token) => {
      const payload = decodeTokenPayload(token);
      setExpiresIn(Math.round((payload.exp * 1000 - Date.now()) / 60000));
    });
  }, [user]);

  if (status === 'loading') {
    return (
      <View style={styles.center}>
        <Text style={styles.statusText}>Checking sign-in</Text>
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.email}>Signed in as {user.email}</Text>
      {expiresIn !== null && (
        <Text style={styles.meta}>Token expires in {expiresIn} min</Text>
      )}
      <Pressable
        onPress={() => signOutUser()}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  statusText: {
    fontSize: 16,
    color: '#4b5563',
  },
  email: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  meta: {
    fontSize: 15,
    color: '#4b5563',
    marginBottom: 16,
  },
  button: {
    minHeight: 44,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#1d4ed8',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  buttonPressed: {
    backgroundColor: '#1e40af',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
