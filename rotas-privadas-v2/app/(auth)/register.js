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
    ScrollView,
} from 'react-native';
import { useAuth } from '../../contextes/AuthContext';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { signUp } = useAuth();
    const router = useRouter();

    const handleRegister = async () => {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Erro', 'Preencha todos os campos');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Erro', 'As senhas não coincidem');
            return;
        }

        //Validação básica de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Erro', 'Email inválido');
            return;
        }

        setLoading(true);
        try {
            const result = await signUp(name, email, password);

            if (result.sucess) {
                Alert.alert('Sucesso', 'Conta criada com sucesso!', [
                    { text: 'OK'}
                ]);
                //O AuthContext já redireciona automaticamente 
            } else {
                Alert.alert('Erro', result.message || 'Falha ao criar conta');
            }
            } catch (error) {
                Alert.alert('Erro', 'Falha ao criar conta');
            } finally {
                setLoading(false);
            }
                        
        };
    }

    return (
        <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView 
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            >
                <View style={styles.content}>
                    <Text style={styles.emoji}>🌟</Text>
                    <Text style={styles.title}>Criar Conta</Text>
                    <Text style={styles.subtitle}>Preencha os dados abaixo </Text>

                    <TextInput 
                    style={styles.input}
                    placeholder='Nome Completo'
                    value={name}
                    onChangeText={setName}
                    autoCapitalize='word'
                    editable={!loading}
                    />

                    <TextInput
                    style={styles.input}
                    placeholder='Confirmar senha'
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    autoCapitalize='none'
                    editable={!loading}
                    />

                    <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleRegister}
                    disabled={loading}
                    >
                        
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
