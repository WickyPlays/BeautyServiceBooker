import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function SignupScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Sign Up</Text>
                <Text style={styles.loginText}>
                    Already have an Account?
                    <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                        <Text style={styles.loginLink}>Login</Text>
                    </TouchableOpacity>
                </Text>
            </View>
            <View style={styles.form}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder='John Doe'
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder='johndoe@gmail.com'
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder='Password'
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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
        marginTop: 10,
        fontSize: 14,
        color: '#ffff',
        flexDirection: 'column-reverse',
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
