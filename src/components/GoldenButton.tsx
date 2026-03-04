import React from 'react';
import { StyleSheet, Text, Pressable, ViewStyle, TextStyle } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import { Colors } from '../utils/theme';

interface GoldenButtonProps {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    disabled?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const GoldenButton = ({
    title,
    onPress,
    style,
    textStyle,
    disabled,
}: GoldenButtonProps) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    const handlePressIn = () => {
        scale.value = withSpring(0.95);
    };

    const handlePressOut = () => {
        scale.value = withSpring(1);
    };

    return (
        <AnimatedPressable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={disabled}
            style={[
                styles.button,
                style,
                disabled && styles.disabled,
                animatedStyle,
            ]}
        >
            <Text style={[styles.text, textStyle, disabled && styles.textDisabled]}>
                {title}
            </Text>
        </AnimatedPressable>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.gold,
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 32,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.gold,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    text: {
        color: '#000',
        fontSize: 18,
        fontWeight: '700',
    },
    disabled: {
        backgroundColor: Colors.surfaceLight,
        shadowOpacity: 0,
        elevation: 0,
    },
    textDisabled: {
        color: Colors.textDim,
    },
});
