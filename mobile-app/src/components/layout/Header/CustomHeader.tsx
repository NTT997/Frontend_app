import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';

type CustomHeaderProps = {
  title: string;
  filterTarget?: string;
};

const CustomHeader: React.FC<CustomHeaderProps> = ({ title, filterTarget }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const extraPaddingTop = Platform.OS === 'ios' ? 10 : 0;

  return (
    <View style={[styles.header, { paddingTop: insets.top + extraPaddingTop }]}>
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
        <View style={styles.rightIcons}>

          <TouchableOpacity
            // onPress={() => navigation.navigate(filterTarget as never)}
            style={styles.iconButton}
            accessibilityLabel="Open filter"
            accessibilityRole="button"
          >
            <Feather name="filter" size={24} color="white" />
          </TouchableOpacity>
        </View>
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
    paddingBottom: 16,
    minHeight: 100,
    justifyContent: 'flex-end',  // aligns row lower for notch
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButton: {
    padding: 8,
    width: 40,
    alignItems: 'center',
  },
  title: {
    flex: 1,
    marginHorizontal: 12,
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomHeader;
