import React, { ReactNode } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import AppInfoFooter from '../common/appInfoFooter';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Main content fills space above footer */}
      <View style={styles.content}>
        {children}
      </View>

      {/* Footer always at bottom */}
      <View style={styles.footer}>
        <AppInfoFooter />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  content: {
    flex: 1, // full height for content
  },
  footer: {
    paddingBottom: 10,
    backgroundColor: '#0A3D91', // match lower section so no gap
  },
});

export default AuthLayout;
