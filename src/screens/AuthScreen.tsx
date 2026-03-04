import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeIn } from 'react-native-reanimated';
import { GoldenButton } from '../components/GoldenButton';
import { Colors, Typography } from '../utils/theme';
import { authenticateUser } from '../utils/security';

export const AuthScreen = ({ navigation }: any) => {
    const [error, setError] = useState('');

    const handleUnlock = async () => {
        setError('');
        const success = await authenticateUser();
        if (success) {
            navigation.replace('Dashboard');
        } else {
            setError('Authentication failed. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={[Colors.background, '#1a1a1a', Colors.background]}
                style={styles.gradient}
            />

            <Animated.View entering={FadeInUp.delay(300).duration(1000)} style={styles.logoContainer}>
                <Text style={styles.logo}>Aurelia</Text>
                <Text style={styles.subtitle}>Your Enduring Digital Vault</Text>
            </Animated.View>

            <Animated.View entering={FadeIn.delay(800).duration(1000)} style={styles.actionContainer}>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <GoldenButton title="Unlock Vault" onPress={handleUnlock} />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.8,
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },
    logo: {
        fontSize: 48,
        fontFamily: Typography.fontFamily,
        fontWeight: '300',
        color: Colors.gold,
        letterSpacing: 4,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.textDim,
        letterSpacing: 1,
        fontFamily: Typography.fontFamily,
    },
    actionContainer: {
        width: '100%',
        paddingHorizontal: 40,
        paddingBottom: 80,
    },
    errorText: {
        color: Colors.error,
        textAlign: 'center',
        marginBottom: 16,
        fontFamily: Typography.fontFamily,
    },
});
