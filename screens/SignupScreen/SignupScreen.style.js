import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	backButton: {
		position: 'absolute',
		top: 55,
		left: 25,
		zIndex: 2
	},
  errorMessage: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
	header: {
		paddingTop: 120,
		paddingHorizontal: 40,
		paddingBottom: 40,
		backgroundColor: '#6440FE',
		marginBottom: 20,
		width: '100%',
		justifyContent: 'center',
	},
	headerText: {
		fontSize: 24,
		fontWeight: '600',
		color: 'white',
		width: '100%',
		paddingVertical: 10,
	},
	loginContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	loginText: {
		color: '#ffff',
	},
	loginTextContainer: {
		marginTop: 10,
		fontSize: 14,
		color: '#ffff',
		flexDirection: 'row',
		gap: 5,
	},
	loginLink: {
		color: '#ffff',
		textDecorationLine: 'underline',
		fontWeight: '600',
	},
	form: {
		width: '80%',
	},
	label: {
		fontSize: 14,
		color: '#4b5563',
		marginBottom: 5,
	},
	input: {
		width: '100%',
		padding: 10,
		borderWidth: 1,
		borderColor: '#d1d5db',
		borderRadius: 5,
		marginBottom: 15,
	},
	button: {
		backgroundColor: '#6440FE',
		padding: 15,
		borderRadius: 5,
		alignItems: 'center',
	},
	buttonText: {
		color: 'white',
		fontWeight: '600',
		fontSize: 16
	},
	dividerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 20,
		paddingHorizontal: 40,
	},
	divider: {
		flex: 1,
		height: 1,
		backgroundColor: '#d1d5db',
	},
	dividerText: {
		marginHorizontal: 10,
		fontSize: 14,
		color: 'black',
	},
	socialContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '80%',
	},
	socialButton: {
		alignItems: 'center',
	},
	socialIcon: {
		width: 60,
		height: 60,
		marginBottom: 5,
	},
	socialText: {
		fontSize: 14,
		fontWeight: '600',
		color: '#4b5563',
	},
});
