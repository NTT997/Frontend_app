import React, { useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useLoginViewModel } from '../viewModels/LoginViewModel';

export default function LoginScreen() {
  const { username, setUsername, password, setPassword, loading, handleLogin } = useLoginViewModel();
  const passwordInputRef = useRef<TextInput>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
        editable={!loading}
        returnKeyType="next"
        onSubmitEditing={() => {
          passwordInputRef.current?.focus();
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        editable={!loading}
        returnKeyType="done"
        onSubmitEditing={handleLogin}
        ref={passwordInputRef} // ✅ Now properly typed
      />

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
});
