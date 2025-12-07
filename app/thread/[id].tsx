import { useState, useRef } from 'react';
import { 
  View, Text, StyleSheet, FlatList, TouchableOpacity, 
  Modal, TextInput, KeyboardAvoidingView, Platform, 
  Dimensions, StatusBar as RNStatusBar 
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// --- MOCK DATA ---
const MOCK_POSTS = [
  {
    no: '12345678',
    name: 'Anonymous',
    time: '12/07/25(Sun)20:15:33',
    content: 'What are you working on today /g/?\n\n>inb4 nothing\n\nI am trying to build a 4chan client in React Native.',
    imgColor: '#2C3E50', 
    filename: 'code_screenshot.png',
    filesize: '1.2 MB',
    isOp: true,
  },
  {
    no: '12345679',
    name: 'Anonymous',
    time: '12/07/25(Sun)20:16:12',
    content: '>learning react native\n\nIt is actually pretty fun once you get used to Flexbox.',
    isOp: false,
  },
  {
    no: '12345680',
    name: 'Anonymous',
    time: '12/07/25(Sun)20:18:45',
    content: '>>12345679\nbased. post repo.',
    isOp: false,
  },
  {
    no: '12345681',
    name: 'Anonymous',
    time: '12/07/25(Sun)20:22:01',
    content: 'Is it possible to use C++ with React Native? I want max performance.',
    imgColor: '#C0392B',
    filename: 'cpp_logo.jpg',
    filesize: '45 KB',
    isOp: false,
  }
];

export default function ThreadScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);

  // --- STATE ---
  const [selectedImage, setSelectedImage] = useState<any>(null); // For Image Viewer
  const [isReplyOpen, setReplyOpen] = useState(false);           // For Reply Modal
  const [replyText, setReplyText] = useState('');

  // --- ACTIONS ---
  
  const handleReplyPress = (postNo?: string) => {
    if (postNo) {
      setReplyText((prev) => prev + `>>${postNo}\n`);
    }
    setReplyOpen(true);
  };

  const handleLinkPress = (link: string) => {
    // Scroll to post logic would go here
    console.log("Jumping to:", link);
    // flatListRef.current?.scrollToIndex(...) // requires complex index mapping
  };

  // --- RENDERERS ---

  const renderComment = (text: string) => {
    return text.split('\n').map((line, index) => {
      const trimmed = line.trim();
      
      // Green Text (>text)
      if (trimmed.startsWith('>')) {
        // Check if it's a link (>>12345678)
        if (trimmed.startsWith('>>')) {
           return (
             <TouchableOpacity key={index} onPress={() => handleLinkPress(trimmed)}>
               <Text style={styles.linkText}>{line}</Text>
             </TouchableOpacity>
           );
        }
        return <Text key={index} style={styles.greenText}>{line}</Text>;
      }
      return <Text key={index} style={styles.commentText}>{line}</Text>;
    });
  };

  const renderPost = ({ item }: any) => (
    <View style={[styles.postContainer, item.isOp && styles.opContainer]}>
      {/* Header Line */}
      <View style={styles.postHeader}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.time}>{item.time}</Text>
        <TouchableOpacity onPress={() => handleReplyPress(item.no)}>
           <Text style={styles.postNo}>No.{item.no}</Text>
        </TouchableOpacity>
      </View>

      {/* Image Attachment */}
      {item.imgColor && (
        <View style={styles.fileContainer}>
             <Text style={styles.fileInfo}>{item.filename} ({item.filesize})</Text>
             <TouchableOpacity 
                style={[styles.thumbnail, { backgroundColor: item.imgColor }]} 
                activeOpacity={0.9}
                onPress={() => setSelectedImage(item)}
             >
                <MaterialIcons name="image" size={40} color="rgba(255,255,255,0.3)" />
             </TouchableOpacity>
        </View>
      )}

      {/* Post Content */}
      <View style={styles.commentBody}>
        {renderComment(item.content)}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* 1. HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        
        <View>
            <Text style={styles.headerTitle}>Thread /{id}/</Text>
            <Text style={styles.headerSubtitle}>{MOCK_POSTS.length} Replies • 2 Images</Text>
        </View>

        <TouchableOpacity style={styles.refreshButton}>
          <MaterialIcons name="refresh" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* 2. THREAD LIST */}
      <FlatList
        ref={flatListRef}
        data={MOCK_POSTS}
        renderItem={renderPost}
        keyExtractor={item => item.no}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {/* 3. FAB (Quick Reply) */}
      <TouchableOpacity 
        style={styles.fab} 
        activeOpacity={0.8} 
        onPress={() => handleReplyPress()}
      >
        <MaterialIcons name="create" size={24} color="#000" />
      </TouchableOpacity>

      {/* --- MODALS --- */}

      {/* A. FULL SCREEN IMAGE VIEWER */}
      <Modal visible={!!selectedImage} transparent={true} animationType="fade">
        <View style={styles.imageModal}>
            <TouchableOpacity 
                style={styles.closeImageButton} 
                onPress={() => setSelectedImage(null)}
            >
                <MaterialIcons name="close" size={30} color="#FFF" />
            </TouchableOpacity>
            
            {selectedImage && (
                <View style={[styles.fullImage, { backgroundColor: selectedImage.imgColor }]}>
                     <MaterialIcons name="image" size={100} color="rgba(255,255,255,0.5)" />
                     <Text style={{color: '#fff', marginTop: 20}}>
                        {selectedImage.filename}
                     </Text>
                </View>
            )}
        </View>
      </Modal>

      {/* B. REPLY MODAL */}
      <Modal visible={isReplyOpen} transparent={true} animationType="slide">
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.replyModalContainer}
        >
            <View style={styles.replyBox}>
                <View style={styles.replyHeader}>
                    <Text style={styles.replyTitle}>Reply to Thread</Text>
                    <TouchableOpacity onPress={() => setReplyOpen(false)}>
                        <MaterialIcons name="close" size={24} color="#FFF" />
                    </TouchableOpacity>
                </View>
                
                <TextInput 
                    style={styles.replyInput}
                    multiline
                    placeholder="Comment"
                    placeholderTextColor="#666"
                    value={replyText}
                    onChangeText={setReplyText}
                    autoFocus
                />
                
                <View style={styles.replyFooter}>
                    <TouchableOpacity style={styles.attachButton}>
                        <MaterialIcons name="attach-file" size={24} color="#00FF41" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.postButton}>
                        <Text style={styles.postButtonText}>POST</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111111' },
  
  // Header
  header: {
    height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, backgroundColor: '#161616', borderBottomWidth: 1, borderBottomColor: '#333'
  },
  headerTitle: { color: '#E0E0E0', fontSize: 16, fontWeight: '700' },
  headerSubtitle: { color: '#666', fontSize: 10 },
  backButton: { padding: 8 },
  refreshButton: { padding: 8 },
  
  // List
  listContent: { padding: 12, paddingBottom: 100 },
  separator: { height: 12 },

  // Post Card
  postContainer: {
    backgroundColor: '#1d1f21', padding: 12, borderRadius: 2,
    borderRightWidth: 1, borderBottomWidth: 1, borderColor: '#2b2b2b'
  },
  opContainer: {
    borderLeftWidth: 3, borderLeftColor: '#00FF41'
  },
  postHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' },
  name: { color: '#117743', fontWeight: '700', fontSize: 13 }, // 4chan "Anonymous" Green
  time: { color: '#666', fontSize: 12 },
  postNo: { color: '#666', fontSize: 12 },

  // Files
  fileContainer: { marginBottom: 12 },
  fileInfo: { color: '#888', fontSize: 11, marginBottom: 4 },
  thumbnail: {
    width: 120, height: 120, borderRadius: 2,
    justifyContent: 'center', alignItems: 'center'
  },

  // Comments & Green Text
  commentBody: { gap: 2 },
  commentText: { color: '#DDD', fontSize: 14, lineHeight: 20 },
  greenText: { color: '#789922', fontSize: 14, lineHeight: 20 }, // Authentic 4chan Green
  linkText: { color: '#DD0000', fontSize: 14, lineHeight: 20, textDecorationLine: 'underline' }, // Red link for Quotes

  // FAB
  fab: {
    position: 'absolute', bottom: 24, right: 24, width: 56, height: 56, borderRadius: 28,
    backgroundColor: '#00FF41', justifyContent: 'center', alignItems: 'center', elevation: 8
  },

  // --- IMAGE MODAL STYLES ---
  imageModal: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center', alignItems: 'center'
  },
  closeImageButton: {
    position: 'absolute', top: 50, right: 20, zIndex: 10,
    padding: 10, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 20
  },
  fullImage: {
    width: width, height: 400, justifyContent: 'center', alignItems: 'center'
  },

  // --- REPLY MODAL STYLES ---
  replyModalContainer: {
    flex: 1, justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  replyBox: {
    backgroundColor: '#222', borderTopLeftRadius: 16, borderTopRightRadius: 16,
    padding: 16, minHeight: 300,
  },
  replyHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16
  },
  replyTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  replyInput: {
    flex: 1, backgroundColor: '#111', color: '#fff', 
    borderRadius: 8, padding: 12, textAlignVertical: 'top', fontSize: 16
  },
  replyFooter: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16
  },
  attachButton: {
    padding: 12, backgroundColor: '#333', borderRadius: 8
  },
  postButton: {
    backgroundColor: '#00FF41', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8
  },
  postButtonText: { color: '#000', fontWeight: '800' }
});