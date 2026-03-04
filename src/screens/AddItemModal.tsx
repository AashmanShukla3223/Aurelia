import React, { useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { X } from 'lucide-react-native';
import { GlassCard } from '../components/GlassCard';
import { GoldenButton } from '../components/GoldenButton';
import { SecureInput } from '../components/SecureInput';
import { Colors, Typography } from '../utils/theme';
import { getVaultData, saveVaultData, VaultItem, generateId } from '../utils/security';
import { TouchableOpacity } from 'react-native';

interface AddItemModalProps {
    onClose: () => void;
    onSave: () => void;
}

export const AddItemModal = ({ onClose, onSave }: AddItemModalProps) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [type, setType] = useState<VaultItem['type']>('password');

    const handleSave = async () => {
        if (!title || !content) return;

        try {
            const existingData = await getVaultData();
            const newItem: VaultItem = {
                id: generateId(),
                type,
                title,
                content, // Re-emphasizing: In a full app, THIS is encrypted before passing to SecureStore
                createdAt: new Date().toISOString(),
            };

            await saveVaultData([...existingData, newItem]);
            onSave();
        } catch (error) {
            console.error('Failed to save item', error);
        }
    };

    const TypeSelector = ({ selectedType, label, value }: any) => (
        <TouchableOpacity
            style={[styles.typePill, selectedType === value && styles.typePillActive]}
            onPress={() => setType(value)}
        >
            <Text style={selectedType === value ? styles.typeTextActive : styles.typeText}>{label}</Text>
        </TouchableOpacity>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFillObject} />

            <View style={styles.modalContent}>
                <View style={styles.header}>
                    <Text style={styles.title}>Add to Vault</Text>
                    <TouchableOpacity onPress={onClose}>
                        <X color={Colors.text} size={24} />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.label}>Item Type</Text>
                    <View style={styles.typeSelector}>
                        <TypeSelector selectedType={type} label="Password" value="password" />
                        <TypeSelector selectedType={type} label="Wishes" value="wish" />
                        <TypeSelector selectedType={type} label="Heritage" value="heritage" />
                    </View>

                    <Text style={styles.label}>Title</Text>
                    <SecureInput
                        placeholder="e.g. Bank Account, Grandpa's Letter"
                        secureTextEntry={false}
                        value={title}
                        onChangeText={setTitle}
                        autoCorrect={false}
                    />

                    <Text style={styles.label}>Secure Content</Text>
                    <SecureInput
                        placeholder="The secret text..."
                        secureTextEntry={type === 'password'}
                        multiline={type !== 'password'}
                        style={[styles.input, type !== 'password' && styles.multiline]}
                        value={content}
                        onChangeText={setContent}
                        textAlignVertical={type === 'password' ? 'center' : 'top'}
                    />

                    <GoldenButton
                        title="Secure Item"
                        onPress={handleSave}
                        style={styles.saveButton}
                        disabled={!title || !content}
                    />
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: Colors.surface,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 24,
        height: '85%',
        shadowColor: Colors.gold,
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        ...Typography.h2,
    },
    label: {
        ...Typography.caption,
        marginTop: 20,
        marginBottom: 8,
    },
    typeSelector: {
        flexDirection: 'row',
        gap: 8,
    },
    typePill: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: Colors.surfaceLight,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    typePillActive: {
        backgroundColor: 'rgba(255, 215, 0, 0.1)',
        borderColor: Colors.gold,
    },
    typeText: {
        color: Colors.textDim,
        fontSize: 14,
        fontWeight: '600',
    },
    typeTextActive: {
        color: Colors.gold,
        fontSize: 14,
        fontWeight: '700',
    },
    input: {
        color: Colors.text,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
    },
    multiline: {
        height: 120,
    },
    saveButton: {
        marginTop: 32,
        marginBottom: 40,
    },
});
