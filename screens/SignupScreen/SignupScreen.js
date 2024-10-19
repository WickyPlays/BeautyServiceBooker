import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { styles } from './SignupScreen.style';
import {apost} from '../../commons/util_axios';

export default function SignupScreen({ navigation }) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const handleSignup = async () => {
		if (!name || !email || !phone || !password) {
			setErrorMessage('All fields are required');
			return;
		}

		try {
			const response = await apost('/auth/register', {name: name, phone: phone, email: email, password: password });

			setErrorMessage('');
			navigation.navigate('LoginScreen')

		} catch (error) {
			setErrorMessage('Error attempting to sign up');
		}
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.backButton}
				onPress={() => navigation.navigate('IntroScreen')}
			>
				<Ionicons name="arrow-back-outline" size={24} color="white" />
			</TouchableOpacity>
			<View style={styles.header}>
				<Text style={styles.headerText}>Sign Up</Text>
				<View style={styles.loginTextContainer}>
					<Text style={styles.loginText}>Already have an Account?</Text>
					<TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
						<Text style={styles.loginLink}>Login</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={styles.form}>
				<Text style={styles.label}>Name</Text>
				<TextInput
					style={styles.input}
					value={name}
					onChangeText={setName}
					placeholder="user123"
				/>
				<Text style={styles.label}>Email</Text>
				<TextInput
					style={styles.input}
					value={email}
					onChangeText={setEmail}
					placeholder="example@gmail.com"
					keyboardType="email-address"
					autoCapitalize="none"
				/>
				<Text style={styles.label}>Phone</Text>
				<TextInput
					style={styles.input}
					value={phone}
					onChangeText={setPhone}
					placeholder="123-456-7890"
					keyboardType="phone-pad"
				/>
				<Text style={styles.label}>Password</Text>
				<TextInput
					style={styles.input}
					value={password}
					onChangeText={setPassword}
					placeholder="Password"
					secureTextEntry={true}
				/>

				{/* Display error message if any */}
				{errorMessage ? (
					<Text style={styles.errorMessage}>{errorMessage}</Text>
				) : null}

				<TouchableOpacity style={styles.button} onPress={handleSignup}>
					<Text style={styles.buttonText}>Sign Up</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.dividerContainer}>
				<View style={styles.divider} />
				<Text style={styles.dividerText}>Or Sign Up using</Text>
				<View style={styles.divider} />
			</View>
			<View style={styles.socialContainer}>
				<TouchableOpacity style={styles.socialButton}>
					<Image source={require('../../assets/twitter.png')} style={styles.socialIcon} />
					<Text style={styles.socialText}>Twitter</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.socialButton}>
					<Image source={require('../../assets/google.png')} style={styles.socialIcon} />
					<Text style={styles.socialText}>Google</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.socialButton}>
					<Image source={require('../../assets/facebook.png')} style={styles.socialIcon} />
					<Text style={styles.socialText}>Facebook</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
