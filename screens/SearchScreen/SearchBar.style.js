import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    searchContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    searchIcon: {
        marginRight: 5,
    },
    textInput: {
        fontSize: 16,
        color: '#333',
        flexGrow: 1,
    },
    searchButton: {
       marginLeft: 5,
    },
});