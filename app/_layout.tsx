import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  // Ensure that reloading on any screen keeps the router stable
  initialRouteName: 'intro',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // 1. Create a "Force Dark" background object
  // This overrides the system theme. Even if the user is in "Light Mode",
  // the navigation container behind the screens will be black (#111111).
  const NavTheme = {
    ...(colorScheme === 'dark' ? DarkTheme : DefaultTheme),
    colors: {
      ...(colorScheme === 'dark' ? DarkTheme.colors : DefaultTheme.colors),
      primary: '#00FF41',    // Your app's main Green color
      background: '#111111', // <--- THIS FIXES THE WHITE FLASH
      card: '#1a1a1a',       // Default color for headers/tabs
      text: '#ffffff',       // Default text color
      border: '#333333',     // Default border color
    },
  };

  return (
    // 2. Pass your custom NavTheme here
    <ThemeProvider value={NavTheme}>
      <Stack 
        screenOptions={{ 
          headerShown: false,      // Hide default headers
          animation: 'fade',       // Fade is smoother than slide for dark apps
          // 3. Double safety: Set the container background to match your theme
          contentStyle: { backgroundColor: '#111111' },
        }}
      >
        {/* 1. Intro Screen (Splash) */}
        <Stack.Screen name="intro" />

        {/* 2. Onboarding Flow */}
        <Stack.Screen name="onboarding" />

        {/* 3. Main App Tabs */}
        <Stack.Screen name="(tabs)" />

        {/* 4. Dynamic Board Page (The new catalog screen) */}
        <Stack.Screen name="board/[code]" />
      </Stack>
      
      {/* Force status bar to light (white text) */}
      <StatusBar style="light" backgroundColor="#111111" />
    </ThemeProvider>
  );
}