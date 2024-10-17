import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './LoginScreen.style.js'

export default function LoginScreen() {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.mainTitle}>Welcome Back!</Text>
				<Text style={styles.subtitle}>Don't have an account? <Text style={styles.signup}>Sign Up</Text></Text>
			</View>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder="Username"
				/>
				<TextInput
					style={styles.input}
					placeholder="Password"
					secureTextEntry
				/>
				<TouchableOpacity
					style={styles.button}
					onPress={() => navigation.navigate('BookingScreen')}
				>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>
			</View>

			<Text style={styles.forgotPassword}>Forgot your Password?</Text>
			<StatusBar style="auto" />
		</View>
	);
}