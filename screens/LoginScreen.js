import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.mainTitle}>Welcome Back!</Text>
                <Text style={styles.subtitle}>Don’t have an account? <Text style={styles.signup}>SignUp</Text></Text>
            </View>
            <Text style={styles.title}>Login</Text>
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
            <Text style={styles.forgotPassword}>Forgot your Password?</Text>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
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
        color: '#007BFF',
        textDecorationLine: 'underline',
    },
    forgotPassword: {
        color: '#007BFF',
        textDecorationLine: 'underline',
        marginTop: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
    input: {
        width: 250,
        padding: 9,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 4,
        alignItems: 'center',
        marginTop: 16,
        width: 250,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});