// components/onboarding/OnboardingTwo.tsx
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';
export default function OnboardingTwo() {
  return (
    <View style={styles.container}>
      {/* 1. Visual: Abstract Stack of Cards/Content */}
      <View style={styles.illustration}>
        {/* Background Card */}
        <View style={[styles.card, styles.cardBack]} />
        {/* Middle Card */}
        <View style={[styles.card, styles.cardMiddle]} />
        {/* Front Card with Icon */}
        <View style={[styles.card, styles.cardFront]}>
          <MaterialIcons name="dynamic-feed" size={64} color="#00FF41" />
        </View>
      </View>

      {/* 2. Text Content */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Unfiltered Content</Text>
        
        <Text style={styles.description}>
          Experience raw expression in a mobile-first environment. Dive into discussions without limits.
        </Text>

        {/* 3. Decoration: Board Tags */}
        <View style={styles.tagsRow}>
            <View style={styles.tag}>
                <Text style={styles.tagText}>/tech/</Text>
            </View>
            <View style={styles.tag}>
                <Text style={styles.tagText}>/news/</Text>
            </View>
            <View style={styles.tag}>
                <Text style={styles.tagText}>/biz/</Text>
            </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // --- Illustration Styles ---
  illustration: {
    height: 180,
    width: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  card: {
    position: 'absolute',
    borderRadius: 16,
    borderWidth: 1,
  },
  cardBack: {
    width: 120, height: 120,
    backgroundColor: '#1a1a1a',
    borderColor: '#333',
    transform: [{ rotate: '-12deg' }, { scale: 0.9 }],
    zIndex: 1,
  },
  cardMiddle: {
    width: 130, height: 130,
    backgroundColor: '#222',
    borderColor: '#444',
    transform: [{ rotate: '6deg' }],
    zIndex: 2,
  },
  cardFront: {
    width: 140, height: 140,
    backgroundColor: '#111',
    borderColor: '#00FF41', // Green border for the main card
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
    shadowColor: '#00FF41',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },
  // --- Text Styles ---
  textContainer: {
    maxWidth: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#92adc9',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  // --- Tag Styles ---
  tagsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  tag: {
    backgroundColor: 'rgba(0, 255, 65, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 65, 0.2)',
  },
  tagText: {
    color: '#00FF41',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace', // Gives it that "board" feel
  },
});