import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { FirebaseError } from 'firebase/app';
import { router } from 'expo-router';
import { authErrorMessage, signIn, signUp } from '../src/lib/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(action: typeof signIn) {
    setError('');
    setBusy(true);
    try {
      await action(email, password);
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace('/account');
      }
    } catch (e) {
      setError(authErrorMessage(e instanceof FirebaseError ? e.code : ''));
    } finally {
      setBusy(false);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Pressable
        onPress={() => submit(signIn)}
        disabled={busy}
        style={({ pressed }) => [
          styles.button,
          busy && styles.buttonDisabled,
          pressed && !busy ? styles.buttonPressed : null,
        ]}
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
      <Pressable
        onPress={() => submit(signUp)}
        disabled={busy}
        style={({ pressed }) => [
          styles.secondaryButton,
          busy && styles.buttonDisabled,
          pressed && !busy ? styles.secondaryButtonPressed : null,
        ]}
      >
        <Text style={styles.secondaryButtonText}>Create account</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    minHeight: 44,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 12,
  },
  error: {
    fontSize: 15,
    color: '#dc2626',
    marginBottom: 12,
  },
  button: {
    minHeight: 44,
    borderRadius: 8,
    backgroundColor: '#1d4ed8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonPressed: {
    backgroundColor: '#1e40af',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    minHeight: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1d4ed8',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonPressed: {
    backgroundColor: '#eff6ff',
  },
  secondaryButtonText: {
    color: '#1d4ed8',
    fontSize: 16,
    fontWeight: '600',
  },
});
