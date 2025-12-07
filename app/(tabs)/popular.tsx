import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = width / 2 - 24; // Calculate card width

const MOCK_THREADS = [
  { id: '1', board: 'v', title: 'Video Game Generals', replies: 402, imgColor: '#4A148C' },
  { id: '2', board: 'g', title: 'Desktop Thread', replies: 124, imgColor: '#1A237E' },
  { id: '3', board: 'a', title: 'What are you watching?', replies: 892, imgColor: '#B71C1C' },
  { id: '4', board: 'fit', title: 'Post physique', replies: 56, imgColor: '#004D40' },
  { id: '5', board: 'biz', title: 'Crypto crash thread', replies: 2301, imgColor: '#F57F17' },
  { id: '6', board: 'adv', title: 'TFW no gf', replies: 12, imgColor: '#3E2723' },
];

export default function PopularScreen() {
  
  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      {/* Mock Image Placeholder */}
      <View style={[styles.imagePlaceholder, { backgroundColor: item.imgColor }]}>
        <MaterialIcons name="image" size={32} color="rgba(255,255,255,0.5)" />
      </View>
      
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.boardBadge}>
            <Text style={styles.boardText}>/{item.board}/</Text>
          </View>
          <View style={styles.stats}>
             <MaterialIcons name="chat-bubble-outline" size={12} color="#999" />
             <Text style={styles.statsText}>{item.replies}</Text>
          </View>
        </View>
        <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Catalog</Text>
        <MaterialIcons name="filter-list" size={24} color="#00FF41" />
      </View>

      <FlatList
        data={MOCK_THREADS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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
  listContent: { padding: 16, paddingBottom: 100 },
  columnWrapper: { justifyContent: 'space-between' },
  
  // Card Styles
  card: {
    width: COLUMN_WIDTH,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1, borderColor: '#333'
  },
  imagePlaceholder: {
    height: 120,
    justifyContent: 'center', alignItems: 'center'
  },
  cardContent: { padding: 12 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  boardBadge: { backgroundColor: '#333', paddingHorizontal: 6, borderRadius: 4 },
  boardText: { color: '#00FF41', fontSize: 12, fontWeight: 'bold' },
  stats: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statsText: { color: '#999', fontSize: 12 },
  cardTitle: { color: '#FFF', fontSize: 14, fontWeight: '500' },
});