import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'expo-router';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLOgin = async () => {
        if (!email || !password) {
            Alert.alert('Erro', 'Preencha todos os campos');
            return;
        }

        setLoading(true);
        try {
            const result = await SpringAnimation(email, password);

            if (!result.success) {
                Alert.alert('Erro', result.message || 'Falha ao fazer login');

            }
        } catch (error) {
            Alert.alert('Erro', 'Falha ao fazer login');       
    } finally {
        setLoading(false);
    }
};

return (
    <KeyboardAvoidingView
    style={StyleSheet.conatiner}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

    <View style={StyleSheet.content}>
        <Text style={StyleSheet.emoji}>🔒</Text>
        <Text style={StyleSheet.title}>Bem Vindo!</Text>
        <Text style={StyleSheet.subtitle}>Faça login para continuar</Text>

    <TextInput
    style={StyleSheet.input}
    placeholder="Email"
    value={email}
    onChangeText={setEmail}
    keyboardType="email-address"
    autoCapitalize="none"
    autoCorrect={false}
    editable={!loading}
    />

    <TextInput
    style={StyleSheet.input}
    placeholder="Senha"
    value={password}
    onChangeText={setPassword}
    secureTextEntry
    autoCapitalize="none"
    editable={!loading}
    />

    <TouchableOpacity
    style={[StyleSheet.button, loading && StyleSheet.buttonDisabled]}
    onPresss={handleLogin}
    disabled={loading}
    >
        {loading ? (
            <ActivityIndicator color="#fff" />
        ) : (
            <Text style={StyleSheet.buttonText}>Entrar</Text>
        )}
    </TouchableOpacity>

    <View style={StyleSheet.registerContainer}>
        <Text style={StyleSheet.registerText}>Não tem conta?</Text>
        <Link href="/(auth)/register" asChild>
        <TouchableOpacity disabled={loading}>
            <Text style={StyleSheet.registerLink}>Cadastre-se</Text>
        </TouchableOpacity>
        </Link>
    </View>

    <Text style={StyleSheet.infoText}>
        Dica: Se não tiver conta, crie uma nova!
    </Text>


    </View>

</KeyboardAvoidingView>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    emoji: {
        fontSize: 60,
        textAlign: 'center',
        marginBotom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 40,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 40,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 40,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        marginTop: 10,
        minHeight: 50,
        justifyContent: 'center',
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        alignItems: 'center',
    },
    registerText: {
        color: '#666',
        fontSize: 14,
    },
    registerLink: {
        color: '#007AFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
    infoText: {
        marginTop: 30,
        textAlign: 'center',
        color: '#888',
        fontSize: 14,
        paddingHorizontal: 20,
    },
});