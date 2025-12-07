import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Platform, SectionList, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// --- TYPE DEFINITIONS ---
interface Board {
  code: string;
  name: string;
  desc?: string; // Description
  isNsfw: boolean;
  pph: number; // Posts Per Hour (Mock metric)
}

interface BoardSection {
  title: string;
  data: Board[];
}

// --- EXTENSIVE 4CHAN DATA ---
const ALL_BOARDS: BoardSection[] = [
  {
    title: 'Japanese Culture',
    data: [
      { code: 'a', name: 'Anime & Manga', isNsfw: false, pph: 2400 },
      { code: 'c', name: 'Anime/Cute', isNsfw: false, pph: 120 },
      { code: 'w', name: 'Anime/Wallpapers', isNsfw: false, pph: 45 },
      { code: 'm', name: 'Mecha', isNsfw: false, pph: 300 },
      { code: 'jp', name: 'Otaku Culture', isNsfw: false, pph: 890 },
    ]
  },
  {
    title: 'Video Games',
    data: [
      { code: 'v', name: 'Video Games', isNsfw: false, pph: 15000 },
      { code: 'vg', name: 'Video Game Generals', isNsfw: false, pph: 22000 },
      { code: 'vr', name: 'Retro Games', isNsfw: false, pph: 600 },
      { code: 'vm', name: 'Multiplayer', isNsfw: false, pph: 150 },
    ]
  },
  {
    title: 'Interests',
    data: [
      { code: 'g', name: 'Technology', desc: 'Computers, Programming', isNsfw: false, pph: 3500 },
      { code: 'tv', name: 'Television & Film', isNsfw: false, pph: 4100 },
      { code: 'k', name: 'Weapons', isNsfw: false, pph: 800 },
      { code: 'o', name: 'Auto', desc: 'Cars & Vehicles', isNsfw: false, pph: 1200 },
      { code: 'an', name: 'Animals & Nature', isNsfw: false, pph: 400 },
      { code: 'fit', name: 'Fitness', desc: 'Health & Body', isNsfw: false, pph: 1500 },
      { code: 'biz', name: 'Business & Finance', desc: 'Crypto, Stocks', isNsfw: false, pph: 5600 },
    ]
  },
  {
    title: 'Creative',
    data: [
      { code: 'diy', name: 'Do It Yourself', isNsfw: false, pph: 300 },
      { code: 'ck', name: 'Food & Cooking', isNsfw: false, pph: 900 },
      { code: 'ic', name: 'Artwork & Critique', isNsfw: false, pph: 150 },
      { code: 'wg', name: 'Wallpapers/General', isNsfw: false, pph: 100 },
    ]
  },
  {
    title: 'Other',
    data: [
      { code: 'adv', name: 'Advice', isNsfw: false, pph: 1100 },
      { code: 'news', name: 'Current News', isNsfw: false, pph: 500 },
      { code: 'wsr', name: 'Worksafe Requests', isNsfw: false, pph: 50 },
    ]
  },
  {
    title: 'Misc (NSFW)',
    data: [
      { code: 'b', name: 'Random', desc: ' The stories you heard are true', isNsfw: true, pph: 45000 },
      { code: 'r9k', name: 'ROBOT9001', isNsfw: false, pph: 3200 },
      { code: 'pol', name: 'Politically Incorrect', isNsfw: true, pph: 38000 },
      { code: 'soc', name: 'Cams & Meetups', isNsfw: true, pph: 800 },
    ]
  }
];

export default function BoardsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>(['g', 'v', 'biz']); // Default favs
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const router = useRouter();
  const handleBoardPress = (boardCode: string) => {
    router.push({ pathname: '/board/[code]', params: { code: boardCode } });
  };

  const toggleFavorite = (code: string) => {
    if (favorites.includes(code)) {
      setFavorites(favorites.filter(c => c !== code));
    } else {
      setFavorites([...favorites, code]);
    }
  };

  // --- FILTERING LOGIC ---
  const filteredData = useMemo(() => {
    // 1. If searching, flatten everything and filter
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      const allBoards = ALL_BOARDS.flatMap(section => section.data);
      const matches = allBoards.filter(
        b => b.code.includes(lowerQuery) || b.name.toLowerCase().includes(lowerQuery)
      );
      return [{ title: 'Search Results', data: matches }];
    }

    // 2. If not searching, build the "Favorites" section dynamically
    const favBoards = ALL_BOARDS.flatMap(section => section.data)
      .filter(b => favorites.includes(b.code));

    // Sort favorites alphabetically
    favBoards.sort((a, b) => a.code.localeCompare(b.code));

    const standardSections = ALL_BOARDS.map(section => ({
      ...section,
      // Optional: Filter out favs from main list to avoid duplicates? 
      // standard 4chan apps usually keep them in both places.
      data: section.data
    }));

    if (favBoards.length > 0) {
      return [{ title: '★ Favorites', data: favBoards }, ...standardSections];
    }

    return standardSections;
  }, [searchQuery, favorites]);


  // --- RENDERERS ---

  const renderSectionHeader = ({ section: { title } }: any) => (
    <View style={styles.sectionHeader}>
      <Text style={[
        styles.sectionHeaderText,
        title === '★ Favorites' && { color: '#FFD700' },
        title === 'Misc (NSFW)' && { color: '#FF4444' }
      ]}>
        {title.toUpperCase()}
      </Text>
    </View>
  );

  const renderItem = ({ item }: { item: Board }) => {
    const isFav = favorites.includes(item.code);

    return (
      <TouchableOpacity
        style={styles.boardItem}
        onPress={() => handleBoardPress(item.code)}
        activeOpacity={0.7}
      >
        {/* Left: Code Box */}
        <View style={[styles.codeBox, item.isNsfw && styles.codeBoxNsfw]}>
          <Text style={[styles.codeText, item.isNsfw && styles.codeTextNsfw]}>
            /{item.code}/
          </Text>
        </View>

        {/* Middle: Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.boardName}>{item.name}</Text>
          {item.desc && (
            <Text style={styles.boardDesc} numberOfLines={1}>{item.desc}</Text>
          )}
        </View>

        {/* Right: Meta & Actions */}
        <View style={styles.metaContainer}>
          <View style={styles.statBadge}>
            <Text style={styles.statText}>{item.pph > 1000 ? (item.pph / 1000).toFixed(1) + 'k' : item.pph}</Text>
            <Text style={styles.statLabel}>PPH</Text>
          </View>

          <TouchableOpacity onPress={() => toggleFavorite(item.code)} style={styles.favButton}>
            <MaterialIcons
              name={isFav ? "star" : "star-border"}
              size={24}
              color={isFav ? "#FFD700" : "#444"}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#111" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Boards</Text>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            setIsSearchVisible(!isSearchVisible);
            if (isSearchVisible) setSearchQuery(''); // Clear on close
          }}
        >
          <MaterialIcons name={isSearchVisible ? "close" : "search"} size={24} color="#00FF41" />
        </TouchableOpacity>
      </View>

      {/* SEARCH BAR (Expandable) */}
      {isSearchVisible && (
        <View style={styles.searchBarContainer}>
          <MaterialIcons name="search" size={20} color="#666" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Filter boards (e.g. 'tech', 'anime', 'g')..."
            placeholderTextColor="#666"
            autoFocus
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      )}

      {/* LIST */}
      <SectionList
        sections={filteredData}
        keyExtractor={(item, index) => item.code + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={true}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        initialNumToRender={20}
      />
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    backgroundColor: '#111111',
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#E0E0E0',
    letterSpacing: 0.5,
  },
  searchButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,255,65,0.05)',
  },
  // --- Search Bar ---
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 16,
    height: 24, // Fix layout shift
  },
  // --- Section Header ---
  sectionHeader: {
    backgroundColor: '#111111', // Opaque for sticky header
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    borderTopWidth: 1,
    borderTopColor: '#222',
  },
  sectionHeaderText: {
    color: '#00FF41',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.2,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  // --- List Item ---
  listContent: {
    paddingBottom: 100, // Space for Tabs
  },
  boardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#111111',
  },
  // 1. Code Box
  codeBox: {
    width: 48,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#333',
    marginRight: 16,
  },
  codeBoxNsfw: {
    borderColor: 'rgba(255, 68, 68, 0.3)',
    backgroundColor: 'rgba(255, 68, 68, 0.05)',
  },
  codeText: {
    color: '#00FF41',
    fontSize: 15,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  codeTextNsfw: {
    color: '#FF4444',
  },
  // 2. Info
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 8,
  },
  boardName: {
    color: '#E0E0E0',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  boardDesc: {
    color: '#888',
    fontSize: 12,
  },
  // 3. Meta
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  statBadge: {
    alignItems: 'flex-end',
  },
  statText: {
    color: '#666',
    fontSize: 12,
    fontWeight: '700',
  },
  statLabel: {
    color: '#444',
    fontSize: 10,
  },
  favButton: {
    padding: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#1a1a1a',
    marginLeft: 80, // Indent separator to match text alignment
  },
});