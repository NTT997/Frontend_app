import React, { ReactNode } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Header from './Header/Header';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <View style={styles.container}>

            {/* Upper half with blue background and curved bottom corners */}
            <View style={styles.header}>
                <Header />
            </View>
            
            {/* Children content area (if any) */}
            <View style={styles.content}>
                {children}
            </View>

            {/* Bottom navigation bar */}
            {/* <View style={styles.navBar}>
                <NavButton icon="home" label="Overview" />
                <NavButton icon="clipboard" label="Prepare" />
                <NavButton icon="check-circle" label="Check-in" />
                <NavButton icon="list" label="Tasks" />
                <NavButton icon="more-horizontal" label="More" />
            </View> */}
        </View>
    );
};

interface NavButtonProps {
    icon: React.ComponentProps<typeof Feather>['name'];
    label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, label }) => (
    <TouchableOpacity style={styles.navButton} onPress={() => { /* TODO: navigation */ }}>
        <Feather name={icon} size={24} color="#0A3D91" />
        <Text style={styles.navButtonText}>{label}</Text>
    </TouchableOpacity>
);

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
    content: {
        flex: 0.45,
        backgroundColor: '#fff',
    },
    navBar: {
        height: 70,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#fff',
    },
    navButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navButtonText: {
        fontSize: 12,
        color: '#0A3D91',
        marginTop: 4,
    },
});

export default MainLayout;