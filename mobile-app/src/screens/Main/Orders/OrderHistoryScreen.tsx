import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ChildLayout from '@/components/layout/ChildLayout';

const HistoryScreen = () => (
  <ChildLayout title="History">
    <View style={styles.container}>
      <Text style={styles.text}>Order History Screen</Text>
    </View>
  </ChildLayout>
);

export default HistoryScreen;

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
