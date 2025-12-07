import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1a1a1a',
          borderTopColor: '#333',
          borderTopWidth: 1,
          
          // --- THE FIX ---
          // 1. We ALWAYS add insets.bottom, regardless of the OS.
          //    If the navbar is opaque, this adds 0.
          //    If the navbar is transparent/overlaying, this adds ~48px.
          height: 60 + insets.bottom, 
          
          // 2. We pad the bottom so the icons sit above the system bar
          paddingBottom: insets.bottom, 
          
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#00FF41',
        tabBarInactiveTintColor: '#666666',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
          // 3. Remove the extra margin hack, the padding handles it now
          marginBottom: 0, 
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Boards',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="grid-view" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="popular"
        options={{
          title: 'Popular',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="whatshot" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="watched"
        options={{
          title: 'Watched',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="bookmark" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Options',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="settings" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}