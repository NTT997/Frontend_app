import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        paddingVertical: 20,
        gap: 16,
        alignItems: 'center',
    },
    flexContainer: {
        flex: 1,
    },
    scrollContentContainer: {
        paddingVertical: 20,
        gap: 16,
        alignItems: 'center',
        paddingBottom: 100, // space for the fixed button so content won't be hidden
    },
    card: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        justifyContent: 'space-between',
    },
    cardTitle: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 8, // spacing for top-left title
    },
    customerCard: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        borderWidth: 1,
        borderColor: '#ddd',
    },
    customerName: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#0A3D91',
        marginBottom: 4,
    },
    customerInfo: {
        fontSize: 14,
        color: '#555',
    },
    selectedProductText: {
        color: 'white',
        fontWeight: '600',
    },
    cartBadge: {
        position: 'absolute',
        top: -5,
        right: -8,
        backgroundColor: 'red',
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    cartBadgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    selectedProductBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0A3D91',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 20,
        marginRight: 8,
    },
    selectedProductImage: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: 4,
    },
    imagePlaceholder: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 4,
    },
    imagePlaceholderText: {
        fontSize: 8,
        color: '#666',
    },

    selectionCard: {
        width: width * 0.8,
        height: 140,
        borderRadius: 12,
        backgroundColor: '#fff',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        marginVertical: 12,
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'row', // default horizontal layout
        alignItems: 'center',
        paddingHorizontal: 16,
        position: 'relative',
    },

    // ========================
    // NEW: vertical stack for payment method card
    paymentCard: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        height: undefined,
        paddingVertical: 16,
    },

    createOrderButton: {
        position: 'absolute',
        bottom: 16,
        left: '50%',
        transform: [{ translateX: -0.5 * width * 0.8 }],
        width: width * 0.8,
        backgroundColor: '#0A3D91',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        zIndex: 999,
    },
    createOrderButtonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 18,
    },

    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },

    chevronTouchable: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
    },

    productListScroll: {
        maxHeight: 140,
        width: '100%',
        marginTop: 8,
    },

    productRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
        paddingHorizontal: 8,
    },

    productImageQty: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    productPrice: {
        fontWeight: '600',
        color: '#333',
        fontSize: 16,
    },

    radioRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
    },
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#0A3D91',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#0A3D91',
    },
    radioLabel: {
        fontSize: 16,
    },
    radioGroupVertical: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },

    // ========================
    // Stripe Modal Adjustments
    stripeModalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stripeModalContent: {
        width: '90%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        flexDirection: 'column', // NEW: stack vertically
        alignItems: 'stretch',   // stretch children to full width
    },
    modalButton: {
        marginTop: 16,
        backgroundColor: '#0A3D91',
        paddingVertical: 12,
        borderRadius: 8,
    },
    modalButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
