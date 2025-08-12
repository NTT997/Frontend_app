import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Header = () => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.header, { paddingTop: insets.top }]}>
            <View style={styles.headerRow}>
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => { /* TODO: open menu */ }}
                    accessibilityLabel="Open menu"
                    accessibilityRole="button">
                    <Feather name="menu" size={24} color="white" />
                </TouchableOpacity>

                <Text style={styles.appName}>BTM-app</Text>

                <View style={styles.rightIcons}>
                    <TouchableOpacity style={styles.iconButton} onPress={() => { /* TODO: open filter */ }}>
                        <Feather name="sliders" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={() => { /* TODO: open notifications */ }}>
                        <Feather name="bell" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 90,
        backgroundColor: '#0A3D91',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        paddingHorizontal: 16,
        paddingTop: 48,
        justifyContent: 'center',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconButton: {
        padding: 8,
    },
    appName: {
        flex: 1,
        marginLeft: 12,
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
    },
    rightIcons: {
        flexDirection: 'row',
    },
});

export default Header;
