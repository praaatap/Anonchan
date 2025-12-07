import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const WATCHED_THREADS = [
  { id: '1', board: 'g', title: 'Daily Programming Thread', newReplies: 5, totalReplies: 102 },
  { id: '2', board: 'diy', title: 'Home Server Rack Build', newReplies: 0, totalReplies: 45 },
  { id: '3', board: 'ck', title: 'Cast Iron Pan restoration', newReplies: 12, totalReplies: 330 },
];

export default function WatchedScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Watched</Text>
        <TouchableOpacity>
           <Text style={styles.clearText}>Clear All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={WATCHED_THREADS}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} activeOpacity={0.7}>
            <View style={styles.itemLeft}>
              <View style={styles.boardBadge}>
                <Text style={styles.boardText}>/{item.board}/</Text>
              </View>
              <View>
                <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.itemSub}>R: {item.totalReplies} • I: 14</Text>
              </View>
            </View>

            {item.newReplies > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>+{item.newReplies}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111' },
  header: {
    paddingHorizontal: 20, paddingVertical: 16,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderBottomWidth: 1, borderBottomColor: '#222'
  },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#FFF' },
  clearText: { color: '#666', fontSize: 14 },
  
  item: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 16, backgroundColor: '#111'
  },
  itemLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  boardBadge: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#1a1a1a', borderWidth: 1, borderColor: '#333',
    justifyContent: 'center', alignItems: 'center'
  },
  boardText: { color: '#00FF41', fontWeight: 'bold' },
  itemTitle: { color: '#FFF', fontSize: 16, fontWeight: '500', marginBottom: 2 },
  itemSub: { color: '#666', fontSize: 12 },
  
  badge: { backgroundColor: '#00FF41', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  badgeText: { color: '#000', fontSize: 12, fontWeight: 'bold' },
  separator: { height: 1, backgroundColor: '#222' }
});