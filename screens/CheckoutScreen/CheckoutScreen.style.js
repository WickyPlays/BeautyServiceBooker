
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
        padding: 16,
        paddingBottom: 40
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: 20,
        fontWeight: '600',
    },
    errorText: {
        color: '#ff4d4f',
        marginBottom: 8,
    },
    section: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    rowText: {
        marginLeft: 8,
        fontSize: 16,
    },
    discountText: {
        color: '#ff4d4f',
        fontWeight: '500',
    },
    amountPayableText: {
        fontWeight: '700',
        fontSize: 16,
        color: '#333',
    },
    appointmentDate: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e7c6ff',
        borderColor: '#b54eff',
        borderWidth: 2,
        borderRadius: 8,
        padding: 5
    },
    appointmentDateNon: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffc6c6',
        borderColor: '#ff4e4e',
        borderWidth: 2,
        borderRadius: 8,
        padding: 5
    },
    priceText: {
        color: '#6B7280',
    },
    counter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    counterButton: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        padding: 4,
    },
    counterText: {
        marginHorizontal: 8,
    },
    itemPrice: {
        marginLeft: 16,
    },
    viewOffers: {
        marginLeft: 'auto',
        color: '#6D28D9',
    },
    imageRow: {
        flexDirection: 'row',
        marginTop: 8,
    },
    imageContainer: {
        width: 96,
        height: 96,
        backgroundColor: '#E5E7EB',
        marginRight: 8,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageText: {
        textAlign: 'center',
    },
    totalSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#6D28D9',
        padding: 16,
        borderRadius: 8,
        marginTop: 16,
    },
    totalText: {
        fontSize: 18,
        color: '#FFFFFF',
    },
    totalSubText: {
        fontSize: 14,
        color: '#FFFFFF',
    },
    totalButton: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    totalButtonText: {
        color: '#6D28D9',
    },
    discountText: {
        color: '#10B981',
    },
    amountPayableText: {
        fontWeight: '600',
    },

    footerSummary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 15
    },
    totalCountText: {
        fontSize: 14,
        width: 25,
        height: 25,
        color: '#FFFFFF',
        borderWidth: 2,
        borderColor: '#FFFFFF',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    totalPrice: {
        fontSize: 22,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    taxText: {
        fontSize: 14,
        color: '#FFFFFF'
    }
});
