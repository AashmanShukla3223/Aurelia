import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';
import * as Crypto from 'expo-crypto';

const VAULT_KEY = 'AURELIA_VAULT_DATA';

export interface VaultItem {
    id: string;
    type: 'password' | 'wish' | 'heritage';
    title: string;
    content: string; // This will be encrypted locally
    createdAt: string;
}

export const authenticateUser = async (): Promise<boolean> => {
    try {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (!hasHardware || !isEnrolled) {
            // Fallback for emulators/devices without biometrics
            return true;
        }

        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Unlock Aurelia Vault',
            fallbackLabel: 'Use Device Passcode',
            cancelLabel: 'Cancel',
            disableDeviceFallback: false,
        });

        return result.success;
    } catch (error) {
        console.error('Authentication Error:', error);
        return false;
    }
};

export const saveVaultData = async (data: VaultItem[]) => {
    try {
        // In a full implementation, you would encrypt `data` using AES-256-GCM 
        // with a key derived from a master password via pbkdf2 before saving.
        // For this prototype, we rely on the OS's SecureStore encryption.
        const jsonValue = JSON.stringify(data);
        await SecureStore.setItemAsync(VAULT_KEY, jsonValue, {
            keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
        });
        return true;
    } catch (error) {
        console.error('Error saving vault data:', error);
        return false;
    }
};

export const getVaultData = async (): Promise<VaultItem[]> => {
    try {
        const jsonValue = await SecureStore.getItemAsync(VAULT_KEY);
        if (jsonValue) {
            return JSON.parse(jsonValue);
        }
        return [];
    } catch (error) {
        console.error('Error reading vault data:', error);
        return [];
    }
};

export const generateId = () => Crypto.randomUUID();
