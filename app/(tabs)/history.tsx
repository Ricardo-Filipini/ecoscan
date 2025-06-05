import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { router } from 'expo-router';
import Header from '@/components/Header';
import WasteCard from '@/components/WasteCard';
import { MOCK_HISTORY_ITEMS, WasteItem } from '@/constants/mockData';
import { COLORS } from '@/constants/colors';

export default function HistoryScreen() {
  const navigateToDetails = (item: WasteItem) => {
    router.push({
      pathname: '/result',
      params: { 
        id: item.id,
        fromHistory: 'true'
      }
    });
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Histórico de Análises" 
        subtitle="Suas análises anteriores"
      />
      
      <FlatList
        data={MOCK_HISTORY_ITEMS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <WasteCard 
            item={item}
            onPress={() => navigateToDetails(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    padding: 16,
  },
});
