import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    list: {
        paddingVertical: 8,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0A3D91',
        marginBottom: 6,
    },
    info: {
        fontSize: 14,
        color: '#555',
        marginBottom: 2,
    },
    addButton: {
        backgroundColor: '#0A3D91',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    detailCard: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    detailName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    detailInfo: {
        fontSize: 16,
        marginBottom: 6,
    },
    selectButton: {
        marginTop: 20,
        backgroundColor: '#0A3D91',
        padding: 12,
        borderRadius: 8,
    },
    selectButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    backButton: {
        padding: 14,
        backgroundColor: '#ccc',
        alignItems: 'center',
    },
    backButtonText: {
        fontSize: 16,
        color: '#000',
    },
});
