import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';

interface GlassCardProps {
    children: React.ReactNode;
    style?: ViewStyle;
}

export const GlassCard = ({ children, style }: GlassCardProps) => {
    return (
        <BlurView intensity={30} tint="dark" style={[styles.container, style]}>
            {children}
        </BlurView>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 24,
        overflow: 'hidden',
        padding: 20,
        backgroundColor: 'rgba(25, 25, 25, 0.5)',
        borderWidth: 1,
        borderColor: 'rgba(255, 215, 0, 0.1)', // Subtle gold border
    },
});
