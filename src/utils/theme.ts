export const Colors = {
    background: '#000000', // True black OLED
    surface: '#121212',
    surfaceLight: '#1E1E1E',
    gold: '#FFD700',
    goldDark: '#B8860B',
    goldLight: '#FFE55C',
    text: '#FFFFFF',
    textDim: '#A0A0A0',
    error: '#FF453A',
};

export const Typography = {
    fontFamily: 'System', // Will fall back to SF Pro on iOS and Roboto on Android
    h1: { fontSize: 32, fontWeight: '800' as const, color: Colors.text },
    h2: { fontSize: 24, fontWeight: '700' as const, color: Colors.text },
    h3: { fontSize: 20, fontWeight: '600' as const, color: Colors.text },
    body: { fontSize: 16, fontWeight: '400' as const, color: Colors.text },
    caption: { fontSize: 14, fontWeight: '400' as const, color: Colors.textDim },
};
