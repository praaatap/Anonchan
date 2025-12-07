import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function OnboardingThree() {
  return (
    <View style={styles.container}>
      <View style={styles.iconHero}>
         {/* Large Shield Icon representing security/anonymity */}
        <MaterialIcons name="security" size={80} color="#00FF41" />
        <View style={styles.glow} />
      </View>

      <Text style={styles.title}>Total Anonymity</Text>
      
      <Text style={styles.description}>
        No accounts. No tracking.{"\n"}
        No personal data collection.
      </Text>

      <View style={styles.infoBox}>
        <View style={styles.infoRow}>
          <MaterialIcons name="check" size={20} color="#00FF41" />
          <Text style={styles.infoText}>Rich media support (GIFs, WebM)</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="check" size={20} color="#00FF41" />
          <Text style={styles.infoText}>Instant access to all boards</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="check" size={20} color="#00FF41" />
          <Text style={styles.infoText}>Saved threads locally</Text>
        </View>
      </View>

      <Text style={styles.terms}>
        By entering, you agree to our Community Guidelines.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  iconHero: {
    width: 120, height: 120,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#1a1a1a',
    borderRadius: 60,
    borderWidth: 1, borderColor: '#333'
  },
  glow: {
    position: 'absolute', width: 120, height: 120, borderRadius: 60,
    backgroundColor: '#00FF41', opacity: 0.1, zIndex: -1
  },
  title: { fontSize: 28, fontWeight: '700', color: '#FFFFFF', marginBottom: 12 },
  description: { 
    fontSize: 16, color: '#92adc9', textAlign: 'center', lineHeight: 24, marginBottom: 32 
  },
  infoBox: {
    width: '100%', backgroundColor: '#161616', padding: 20, borderRadius: 12, gap: 12
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  infoText: { color: '#FFF', fontSize: 14, fontWeight: '500' },
  terms: {
    position: 'absolute', bottom: 0,
    fontSize: 12, color: '#555', textAlign: 'center'
  }
});