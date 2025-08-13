import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type CustomHeaderProps = {
  title: string;
  filterTarget?: string;
};

const CustomHeader: React.FC<CustomHeaderProps> = ({ title, filterTarget }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <View style={styles.headerRow}>
        {/* Back button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconButton}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>{title}</Text>

        {/* Filter button */}
        <TouchableOpacity
          onPress={() => navigation.navigate(filterTarget as never)}
          style={styles.iconButton}
          accessibilityLabel="Open filter"
          accessibilityRole="button"
        >
          <Feather name="filter" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0A3D91',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingHorizontal: 16,
    paddingBottom: 12, // space under row
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButton: {
    padding: 8,
  },
  title: {
    flex: 1,
    marginHorizontal: 12,
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default CustomHeader;
