import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ChildLayout from '@/components/layout/ChildLayout';

const PendingScreen = () => (
  <ChildLayout title="Pending">
    <View style={styles.container}>
      <Text style={styles.text}>Pending Orders Screen</Text>
    </View>
  </ChildLayout>
);

export default PendingScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  text: { 
    fontSize: 18 
  },
});
