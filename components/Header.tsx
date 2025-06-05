import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { COLORS } from '@/constants/colors';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.white,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: COLORS.text,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});
