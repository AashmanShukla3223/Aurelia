import React from 'react';
import { StyleSheet, TextInput, View, TextInputProps } from 'react-native';
import { Colors } from '../utils/theme';

export const SecureInput = (props: TextInputProps) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholderTextColor={Colors.textDim}
                secureTextEntry
                {...props}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
    },
    input: {
        color: Colors.text,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
    },
});
