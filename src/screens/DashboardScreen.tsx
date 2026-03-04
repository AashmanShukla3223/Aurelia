import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Shield, ScrollText, Heart } from 'lucide-react-native';
import { GlassCard } from '../components/GlassCard';
import { Colors, Typography } from '../utils/theme';
import { getVaultData, VaultItem } from '../utils/security';
import { AddItemModal } from './AddItemModal';

export const DashboardScreen = () => {
    const [items, setItems] = useState<VaultItem[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const loadData = async () => {
        const data = await getVaultData();
        setItems(data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const getIconForType = (type: string) => {
        switch (type) {
            case 'password': return <Shield color={Colors.gold} size={24} />;
            case 'wish': return <ScrollText color={Colors.gold} size={24} />;
            case 'heritage': return <Heart color={Colors.gold} size={24} />;
            default: return <Shield color={Colors.gold} size={24} />;
        }
    };

    const renderItem = ({ item }: { item: VaultItem }) => (
        <GlassCard style={styles.card}>
            <View style={styles.cardHeader}>
                {getIconForType(item.type)}
                <Text style={styles.cardTitle}>{item.title}</Text>
            </View>
            <Text style={styles.cardDate}>
                Added {new Date(item.createdAt).toLocaleDateString()}
            </Text>
        </GlassCard>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Aurelia Vault</Text>
                <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.addButton}>
                    <Plus color={Colors.background} size={24} />
                </TouchableOpacity>
            </View>

            {items.length === 0 ? (
                <View style={styles.emptyState}>
                    <Shield color={Colors.textDim} size={48} />
                    <Text style={styles.emptyText}>Your vault is empty.</Text>
                    <Text style={styles.emptySubtext}>Add a password or heritage message to begin securing your legacy.</Text>
                </View>
            ) : (
                <FlatList
                    data={items}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                />
            )}

            <Modal visible={isModalVisible} animationType="slide" transparent>
                <AddItemModal
                    onClose={() => setIsModalVisible(false)}
                    onSave={() => {
                        setIsModalVisible(false);
                        loadData();
                    }}
                />
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    title: {
        ...Typography.h1,
    },
    addButton: {
        backgroundColor: Colors.gold,
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.gold,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    list: {
        padding: 20,
        gap: 16,
    },
    card: {
        marginBottom: 16, // Fallback for gap
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 8,
    },
    cardTitle: {
        ...Typography.h3,
        flex: 1,
    },
    cardDate: {
        ...Typography.caption,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyText: {
        ...Typography.h2,
        color: Colors.textDim,
        marginTop: 16,
        marginBottom: 8,
    },
    emptySubtext: {
        ...Typography.body,
        color: Colors.textDim,
        textAlign: 'center',
    },
});
