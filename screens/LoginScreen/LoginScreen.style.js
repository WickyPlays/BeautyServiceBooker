import { StyleSheet } from 'react-native';
import { commonStyles } from '../../commons/common_style';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 16,
	},
	header: {
		position: 'absolute',
		top: 150,
		alignItems: 'left',
		width: '100%',
		justifyContent: 'flex-start',
		paddingHorizontal: 20
	},
	mainTitle: {
		fontSize: 32,
		fontWeight: 'bold',
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
		marginBottom: 16,
	},
	signup: {
		color: commonStyles.primary,
		textDecorationLine: 'underline',
	},
	forgotPassword: {
		color: '#007BFF',
		textDecorationLine: 'underline',
		marginTop: 16,
	},
    inputContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
	input: {
		width: '100%',
		padding: 9,
		marginVertical: 8,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 4
	},
	button: {
        width: '100%',
		backgroundColor: commonStyles.primary,
		padding: 10,
		borderRadius: 4,
		alignItems: 'center',
		marginTop: 16,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
	},
    forgotPassword: {
        color: commonStyles.primary,
        textDecorationLine: 'underline',
        marginTop: 16,
    }
});