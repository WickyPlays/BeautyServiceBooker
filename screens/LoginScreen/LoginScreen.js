import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './LoginScreen.style.js'
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({navigation}) {

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.backButton}
				onPress={() => navigation.navigate('IntroScreen')}
			>
				<Ionicons name="arrow-back-outline" size={24} color="black" />
			</TouchableOpacity>
			<View style={styles.header}>
				<Text style={styles.mainTitle}>Welcome Back!</Text>
				<View style={styles.mainTitleContainer}>
					<Text style={styles.subtitle}>Don't have an account?</Text>
					<Text style={styles.signup}
						onPress={() => navigation.navigate('SignupScreen')}>Sign Up</Text>
				</View>

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
					onPress={() => navigation.navigate('PrimaryScreen')}
				>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>

				<Text style={styles.forgotPassword}>Forgot your Password?</Text>
			</View>
			<StatusBar style="auto" />
		</View>
	);
}