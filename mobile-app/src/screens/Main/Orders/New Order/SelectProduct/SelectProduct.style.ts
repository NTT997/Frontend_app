import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 6,
        marginRight: 12,
        resizeMode: 'cover',
    },
    imagePlaceholder: {
        width: 60,
        height: 60,
        borderRadius: 6,
        marginRight: 12,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePlaceholderText: {
        color: '#888',
        fontSize: 12,
    },
    productInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    quantity: {
        fontSize: 14,
        color: '#333',
        marginTop: 4,
    },
    selectedQuantity: {
        fontSize: 14,
        color: '#0A3D91',
        marginTop: 2,
        fontWeight: '600',
    },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    sku: {
        fontSize: 14,
        color: '#777',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
    },
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
        width: '100%',
        maxWidth: 400,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 12,
        textAlign: 'center',
    },
    quantityInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    qtyButton: {
        backgroundColor: '#0A3D91',
        borderRadius: 6,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginHorizontal: 8,
    },
    qtyButtonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: '600',
        lineHeight: 24,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 16,
        width: 80,
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 6,
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#ccc',
    },
    okButton: {
        backgroundColor: '#0A3D91',
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        textAlign: 'center',
    },
    selectionSummary: {
        marginVertical: 12,
    },
    selectionSummaryTitle: {
        fontWeight: '600',
        marginBottom: 6,
        fontSize: 16,
        color: '#0A3D91',
        paddingLeft: 10,
    },
    selectedProductBadge: {
        backgroundColor: '#0A3D91',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 8,
    },
    selectedProductText: {
        color: 'white',
        fontWeight: '600',
    },
    doneButton: {
        backgroundColor: '#0A3D91',
        borderRadius: 8,
        paddingVertical: 14,
        marginHorizontal: 20,
        marginBottom: 20,
    },
    doneButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
    },
    bottomSheet: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        maxHeight: '50%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    bottomSheetContent: {
        padding: 10,
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    totalPrice: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#E53935', // red tone for emphasis
    },
});