// app/intro.tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

export default function IntroScreen() {
  const router = useRouter();

  const handleEnter = () => {
    router.replace('/onboarding'); // Navigate to main app
  };

  const handleSettings = () => {
    router.push('/onboarding'); // Navigate to settings modal
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="light" />
      
      {/* Main Content - Centered */}
      <View style={styles.centerContent}>
        <Text style={styles.title}>ANONCHAN</Text>
        <Text style={styles.subtitle}>Raw. Unfiltered. Anonymous.</Text>
      </View>

      {/* Footer Actions */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.enterButton}
          onPress={handleEnter}
          activeOpacity={0.8}
        >
          <Text style={styles.enterButtonText}>&gt; Enter</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleSettings}>
          <Text style={styles.settingsText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#00FF41',
    letterSpacing: 3,
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#E0E0E0',
    marginTop: 8,
  },
  footer: {
    width: '100%',
    paddingBottom: 16,
  },
  enterButton: {
    backgroundColor: '#00FF41',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
  },
  enterButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
    letterSpacing: 0.24,
  },
  settingsText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#888888',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 4,
  },
});
