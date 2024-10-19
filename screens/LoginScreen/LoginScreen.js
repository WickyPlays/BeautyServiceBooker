import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './LoginScreen.style.js';
import { Ionicons } from '@expo/vector-icons';
import { saveToken } from '../../commons/store.js';
import { apost } from '../../commons/util_axios.js';

export default function LoginScreen({ navigation }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const handleLogin = async () => {
		try {
			const response = await apost('/auth/login', { email: email, password: password });
			const data = await response.data

			if (response.status !== 200 || !data.token) {
				setErrorMessage('Something went wrong. Try again later');
				return;
			}

			await saveToken(data.token);
			setErrorMessage('');
			navigation.navigate('PrimaryScreen');

		} catch (error) {
				let status = error.status
				if (status == 401) {
					setErrorMessage('Invalid credentials');
				} else {
					setErrorMessage('Something went wrong. Try again later');
				}
		}
	};

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
					<Text
						style={styles.signup}
						onPress={() => navigation.navigate('SignupScreen')}
					>
						Sign Up
					</Text>
				</View>
			</View>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder="Email"
					value={email}
					onChangeText={(text) => setEmail(text)}
					keyboardType="email-address"
					autoCapitalize="none"
				/>
				<TextInput
					style={styles.input}
					placeholder="Password"
					secureTextEntry
					value={password}
					onChangeText={(text) => setPassword(text)}
				/>

				{/* Display error message if any */}
				{errorMessage ? (
					<Text style={styles.errorMessage}>{errorMessage}</Text>
				) : null}

				<TouchableOpacity style={styles.button} onPress={handleLogin}>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>

				<Text style={styles.forgotPassword}>Forgot your Password?</Text>
			</View>
		</View>
	);
}
