import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Camera, History, Info } from 'lucide-react-native';
import { COLORS } from '@/constants/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarLabelStyle: styles.tabBarLabel,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Escanear',
          tabBarIcon: ({ color, size }) => (
            <Camera size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'Histórico',
          tabBarIcon: ({ color, size }) => (
            <History size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="info"
        options={{
          title: 'Info',
          tabBarIcon: ({ color, size }) => (
            <Info size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    paddingBottom: 8,
    paddingTop: 8,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    elevation: 0,
    shadowOpacity: 0,
  },
  tabBarLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  }
});
