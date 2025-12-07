import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function OnboardingOne() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Anonchan</Text>
        <Text style={styles.subtitle}>The anonymous imageboard, optimized for mobile.</Text>
      </View>

      <View style={styles.features}>
        {/* Feature 1 */}
        <View style={styles.featureItem}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="grid-view" size={24} color="#00FF41" />
          </View>
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>Browse Boards</Text>
            <Text style={styles.featureDescription}>Discover and navigate different communities.</Text>
          </View>
        </View>

        {/* Feature 2 */}
        <View style={styles.featureItem}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="visibility-off" size={24} color="#00FF41" />
          </View>
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>Post Anonymously</Text>
            <Text style={styles.featureDescription}>Post without revealing your identity.</Text>
          </View>
        </View>

        {/* Feature 3 */}
        <View style={styles.featureItem}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="bookmark" size={24} color="#00FF41" />
          </View>
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>Follow Threads</Text>
            <Text style={styles.featureDescription}>Keep track of conversations that interest you.</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  header: { marginBottom: 40, alignItems: 'center' },
  title: { fontSize: 32, fontWeight: '700', color: '#FFFFFF', letterSpacing: 1 },
  subtitle: { fontSize: 16, color: '#92adc9', marginTop: 8, textAlign: 'center' },
  features: { gap: 24 },
  featureItem: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  iconContainer: {
    width: 48, height: 48,
    backgroundColor: 'rgba(0, 255, 65, 0.1)',
    borderRadius: 12, // Softer corners
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(0, 255, 65, 0.2)'
  },
  featureText: { flex: 1 },
  featureTitle: { fontSize: 16, fontWeight: '600', color: '#FFFFFF', marginBottom: 2 },
  featureDescription: { fontSize: 14, color: '#92adc9' },
});