import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomHeader from './Header/CustomHeader';

interface ChildLayoutProps {
  children: ReactNode;
  title: string;
  filterTarget?: string;
}

const ChildLayout: React.FC<ChildLayoutProps> = ({ children, title, filterTarget }) => {
  return (
    <View style={styles.container}>
      {/* Curved background with header */}
      <View style={styles.header}>
        <CustomHeader title={title} filterTarget={filterTarget} />
      </View>

      {/* Screen content */}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 90,
    backgroundColor: '#0A3D91',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingHorizontal: 0,
    paddingTop: 0, // for status bar padding (adjust as needed)
    justifyContent: 'center',
  },
  content: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 12 },
});

export default ChildLayout;
