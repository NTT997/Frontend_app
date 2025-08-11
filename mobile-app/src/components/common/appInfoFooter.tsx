import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AppInfoFooter() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        App version 1.0.0
      </Text>
      <Text style={styles.footerText}>
        App developed by Your Company Name
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
  },
});
