import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 4,
    },
    iconScroll: {
        marginVertical: 16,
    },
    iconItem: {
        width: 72,
        height: 72,
        borderWidth: 2,
        borderRadius: 36,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    iconLabel: {
        marginTop: 4,
        fontSize: 12,
        textAlign: 'center',
    },
    sectionTitle: {
        fontWeight: '700',
        fontSize: 16,
        marginVertical: 12,
    },
    chart: {
        borderRadius: 8,
    },
    totals: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 16,
    },
    totalBox: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        padding: 12,
        marginHorizontal: 4,
        borderRadius: 8,
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 12,
        color: '#999',
    },
    totalValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#0A3D91',
        marginTop: 4,
    },
    orderItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: '#EEE',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    orderInfo: {
        flex: 1,
        marginLeft: 12,
    },
    productName: {
        fontWeight: '600',
    },
    customerInfo: {
        fontSize: 12,
        color: '#999',
        marginTop: 2,
    },
    price: {
        fontWeight: '600',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 24,
        borderRadius: 8,
        minWidth: 250,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 16,
    },
    closeButton: {
        backgroundColor: '#0A3D91',
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 4,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: '600',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});