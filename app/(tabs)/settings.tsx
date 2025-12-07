import { View, Text, StyleSheet, SectionList, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';

const SECTIONS = [
  {
    title: 'Content',
    data: [
      { id: 'nsfw', label: 'Show NSFW Content', type: 'toggle', value: false },
      { id: 'spoiler', label: 'Reveal Spoilers', type: 'toggle', value: true },
    ]
  },
  {
    title: 'Appearance',
    data: [
      { id: 'theme', label: 'Dark Mode', type: 'toggle', value: true },
      { id: 'font', label: 'Font Size', type: 'link', value: 'Medium' },
    ]
  },
  {
    title: 'Data',
    data: [
      { id: 'clear', label: 'Clear Cache', type: 'link', value: '24 MB' },
      { id: 'history', label: 'Clear History', type: 'link', value: '' },
    ]
  }
];

export default function SettingsScreen() {
  const [toggles, setToggles] = useState<any>({});

  const toggleSwitch = (id: string) => {
    setToggles((prev: any) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
       <View style={styles.header}>
        <Text style={styles.headerTitle}>Options</Text>
      </View>

      <SectionList
        sections={SECTIONS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title.toUpperCase()}</Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.rowLabel}>{item.label}</Text>
            
            {item.type === 'toggle' ? (
              <Switch
                trackColor={{ false: "#333", true: "rgba(0, 255, 65, 0.3)" }}
                thumbColor={toggles[item.id] ?? item.value ? "#00FF41" : "#f4f3f4"}
                onValueChange={() => toggleSwitch(item.id)}
                value={toggles[item.id] ?? item.value}
              />
            ) : (
              <View style={styles.linkContainer}>
                {item.value ? <Text style={styles.valueText}>{item.value}</Text> : null}
                <MaterialIcons name="chevron-right" size={24} color="#666" />
              </View>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111' },
  header: {
    paddingHorizontal: 20, paddingVertical: 16,
    borderBottomWidth: 1, borderBottomColor: '#222'
  },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#FFF' },
  
  sectionHeader: {
    paddingHorizontal: 20, paddingVertical: 12,
    color: '#00FF41', fontSize: 12, fontWeight: '700', letterSpacing: 1,
    backgroundColor: '#1a1a1a'
  },
  row: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 20, borderBottomWidth: 1, borderBottomColor: '#1a1a1a'
  },
  rowLabel: { color: '#FFF', fontSize: 16 },
  linkContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  valueText: { color: '#666', fontSize: 14 }
});