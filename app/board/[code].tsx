// app/board/[code].tsx
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { BlurView } from 'expo-blur'; // Ensure you have this or remove visual blur effect

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width / 2) - 12; // 2 columns with padding

// --- MOCK DATA: What a real 4chan thread looks like ---
const MOCK_THREADS = [
  {
    id: '1',
    subject: 'Daily Programming Thread',
    comment: 'What are you working on today, /g/? Post your side projects.',
    imgColor: '#2C3E50', // Placeholder for image
    replies: 402,
    images: 12,
    isSticky: true,
    time: '2m ago'
  },
  {
    id: '2',
    subject: 'Desktop Thread',
    comment: 'Post your rices. No default wallpapers allowed.',
    imgColor: '#8E44AD',
    replies: 124,
    images: 89,
    isSticky: false,
    time: '5m ago'
  },
  {
    id: '3',
    subject: '', // Often threads have no subject, just a comment
    comment: '>be me\n>install gentoo\n>compile kernel for 3 days\n>forget to enable wifi driver\n\nWhy is Linux like this bros?',
    imgColor: '#16A085',
    replies: 892,
    images: 14,
    isSticky: false,
    time: '12m ago'
  },
  {
    id: '4',
    subject: 'ThinkPad General',
    comment: 'T480 is still the king. Change my mind.',
    imgColor: '#C0392B',
    replies: 56,
    images: 22,
    isSticky: false,
    time: '1h ago'
  },
  {
    id: '5',
    subject: 'Mechanical Keyboards',
    comment: 'Just bought a Keychron. Did I do good?',
    imgColor: '#D35400',
    replies: 231,
    images: 45,
    isSticky: false,
    time: '2h ago'
  },
  {
    id: '6',
    subject: 'Terry Davis Appreciation',
    comment: 'RIP King. TempleOS was ahead of its time.',
    imgColor: '#7F8C8D',
    replies: 1004,
    images: 102,
    isSticky: false,
    time: '4h ago'
  },
];

export default function BoardCatalogScreen() {
  const { code } = useLocalSearchParams(); // Gets 'g', 'v', etc.
  const router = useRouter();
  const [headerTitle, setHeaderTitle] = useState(`/${code}/`);

  const handleThreadPress = (threadId: string) => {
    // Navigate to the Thread Screen we just created
    router.push(`/thread/${threadId}`);
  };

  // Update title based on code (Simulated)
  useEffect(() => {
    if (code === 'g') setHeaderTitle('/g/ - Technology');
    else if (code === 'v') setHeaderTitle('/v/ - Video Games');
    else setHeaderTitle(`/${code}/ - Board`);
  }, [code]);

  const renderThreadCard = ({ item }: any) => (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.8}
      onPress={() => handleThreadPress(item.id)}
    >
      {/* 1. Thumbnail Image */}
      <View style={[styles.cardImage, { backgroundColor: item.imgColor }]}>
         {/* In a real app, <Image source={{uri: ...}} /> goes here */}
         <MaterialIcons name="image" size={32} color="rgba(255,255,255,0.2)" />
         
         {/* Sticky Icon Overlay */}
         {item.isSticky && (
           <View style={styles.stickyBadge}>
             <FontAwesome5 name="thumbtack" size={10} color="#111" />
           </View>
         )}
      </View>

      {/* 2. Thread Info */}
      <View style={styles.cardContent}>
        {item.subject ? (
            <Text style={styles.subject} numberOfLines={2}>{item.subject}</Text>
        ) : null}
        
        <Text style={styles.comment} numberOfLines={3}>
            {item.comment}
        </Text>

        {/* 3. Meta Stats */}
        <View style={styles.metaRow}>
            <View style={styles.stat}>
                <Text style={styles.statText}>R: <Text style={styles.bold}>{item.replies}</Text></Text>
            </View>
            <View style={styles.stat}>
                <Text style={styles.statText}>I: <Text style={styles.bold}>{item.images}</Text></Text>
            </View>
            <Text style={styles.timeText}>{item.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Override generic header with custom one */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* Custom Navigation Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>{headerTitle}</Text>
        </View>

        <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionButton}>
                <MaterialIcons name="refresh" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
                <MaterialIcons name="filter-list" size={24} color="#FFF" />
            </TouchableOpacity>
        </View>
      </View>

      {/* The Catalog Grid */}
      <FlatList
        data={MOCK_THREADS}
        renderItem={renderThreadCard}
        keyExtractor={item => item.id}
        numColumns={2} // Grid Layout
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* FAB: Create New Thread Button */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <MaterialIcons name="add" size={32} color="#000" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
  // --- Header ---
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    backgroundColor: '#161616',
  },
  backButton: {
    padding: 12,
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#E0E0E0',
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 12,
  },
  // --- Grid & Cards ---
  listContent: {
    padding: 8,
    paddingBottom: 100,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#1a1a1a',
    borderRadius: 4,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#333',
    overflow: 'hidden',
  },
  cardImage: {
    height: 110,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  stickyBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#00FF41',
    padding: 4,
    borderRadius: 2,
  },
  cardContent: {
    padding: 10,
  },
  subject: {
    color: '#00FF41', // Traditional 4chan Subject Color (or sometimes dark blue)
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
    lineHeight: 18,
  },
  comment: {
    color: '#BBB',
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 8,
  },
  // --- Meta Data ---
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#2a2a2a',
    paddingTop: 6,
  },
  stat: {
    flexDirection: 'row',
  },
  statText: {
    color: '#666',
    fontSize: 10,
  },
  bold: {
    color: '#888',
    fontWeight: '700',
  },
  timeText: {
    color: '#555',
    fontSize: 10,
  },
  // --- Floating Action Button ---
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#00FF41',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#00FF41',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});