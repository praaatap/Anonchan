import { MaterialIcons } from '@expo/vector-icons';
import { useRouter , Href } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { LayoutAnimation, Platform, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import simplified components
import OnboardingOne from './onboarding/OnboardingOne';
import OnboardingThree from './onboarding/OnboardingThree';
import OnboardingTwo from './onboarding/OnboardingTwo';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function OnboardingScreen() {
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef<PagerView>(null);
  const router = useRouter();

  const totalPages = 3;

  const handleEnter = () => {
    router.replace('/(tabs)' as Href);
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      pagerRef.current?.setPage(currentPage + 1);
    } else {
      handleEnter();
    }
  };

  const handlePageSelected = (e: any) => {
    // Animate the dots transition
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCurrentPage(e.nativeEvent.position);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="light" />

      {/* HEADER: Skip Button */}
      <View style={styles.header}>
        {currentPage < totalPages - 1 && (
          <TouchableOpacity onPress={handleEnter} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* CONTENT: The Slider */}
      <PagerView
        style={styles.pager}
        initialPage={0}
        ref={pagerRef}
        onPageSelected={handlePageSelected}
      >
        <View key="1" style={styles.pageContent}>
          <OnboardingOne />
        </View>
        <View key="2" style={styles.pageContent}>
          <OnboardingTwo />
        </View>
        <View key="3" style={styles.pageContent}>
          <OnboardingThree />
        </View>
      </PagerView>

      {/* FOOTER: Static Controls */}
      <View style={styles.footer}>
        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {[...Array(totalPages)].map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentPage === index ? styles.dotActive : styles.dotInactive
              ]}
            />
          ))}
        </View>

        {/* Primary Action Button */}
        <TouchableOpacity
          style={[
            styles.button,
            currentPage === totalPages - 1 ? styles.buttonSuccess : styles.buttonPrimary
          ]}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            {currentPage === totalPages - 1 ? "START BROWSING" : "NEXT"}
          </Text>
          {currentPage !== totalPages - 1 && (
            <MaterialIcons name="arrow-forward" size={20} color="#111" />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
  },
  skipButton: {
    padding: 8,
  },
  skipText: {
    color: '#92adc9',
    fontSize: 14,
    fontWeight: '600',
  },
  pager: {
    flex: 1,
  },
  pageContent: {
    flex: 1,
    paddingHorizontal: 24, // Consistent padding for all pages
  },
  footer: {
    padding: 24,
    gap: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    height: 20,
  },
  dot: {
    borderRadius: 4,
    height: 8,
  },
  dotActive: {
    width: 24, // Elongated active dot
    backgroundColor: '#00FF41',
  },
  dotInactive: {
    width: 8,
    backgroundColor: '#333',
  },
  button: {
    height: 56,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttonPrimary: {
    backgroundColor: '#FFFFFF',
  },
  buttonSuccess: {
    backgroundColor: '#00FF41',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111111',
    letterSpacing: 1,
  },
});