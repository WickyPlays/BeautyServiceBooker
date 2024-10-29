import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 40,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 40,
        backgroundColor: '#fff',
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        fontSize: 18,
        fontWeight: '600',
    },
    profileDetails: {
        color: '#6b7280',
        fontSize: 14,
    },
    editBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    editText: {
        color: '#3b82f6',
        fontSize: 14,
    },
    menuContainer: {
        width: '100%',
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingVertical: 24,
        backgroundColor: '#fff',
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIcon: {
        fontSize: 32,
        color: '#374151',
        marginRight: 16,
    },
    menuTitle: {
        fontSize: 16,
        color: '#1f2937',
    },
    menuDescription: {
        color: '#6b7280',
        fontSize: 14,
    },
    chevronIcon: {
        color: '#9ca3af',
    },
    logoutText: {
        color: '#ef4444',
    },
    logoutIcon: {
        color: '#ef4444',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#fff',
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
    },
    footerItem: {
        alignItems: 'center',
    },
    footerIcon: {
        fontSize: 24,
        color: '#6b7280',
    },
    footerText: {
        fontSize: 12,
        color: '#6b7280',
    },
    activeFooterIcon: {
        color: '#8b5cf6',
    },
    activeFooterText: {
        color: '#8b5cf6',
    },
});