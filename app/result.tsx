import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Platform,
  StatusBar
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Share2 } from 'lucide-react-native';
import { COLORS } from '@/constants/colors';
import Button from '@/components/Button';
import { MOCK_HISTORY_ITEMS, WASTE_CATEGORIES, WasteItem } from '@/constants/mockData';

export default function ResultScreen() {
  const { imageUri, id, fromHistory } = useLocalSearchParams();
  const [result, setResult] = useState<WasteItem | null>(null);
  const [isLoading, setIsLoading] = useState(!fromHistory);

  useEffect(() => {
    // If coming from history, find the item by id
    if (fromHistory && id) {
      const historyItem = MOCK_HISTORY_ITEMS.find(item => item.id === id);
      if (historyItem) {
        setResult(historyItem);
      }
      return;
    }

    // Mock AI analysis with a delay if not from history
    if (imageUri) {
      // Simulate API call delay
      const timer = setTimeout(() => {
        // Randomly select a mock result for demo purposes
        const randomIndex = Math.floor(Math.random() * MOCK_HISTORY_ITEMS.length);
        const mockResult = {
          ...MOCK_HISTORY_ITEMS[randomIndex],
          id: Date.now().toString(),
          imageUrl: imageUri as string,
          timestamp: new Date().toISOString()
        };
        setResult(mockResult);
        setIsLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [imageUri, id, fromHistory]);

  const handleBack = () => {
    router.back();
  };

  const handleShare = () => {
    // Mock share functionality
    alert('Sharing functionality will be implemented with the AI integration.');
  };

  const goToHome = () => {
    router.replace('/(tabs)');
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBack}
          >
            <ArrowLeft size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.loadingContent}>
          <Text style={styles.loadingTitle}>Analyzing Image...</Text>
          <Text style={styles.loadingText}>
            Our AI is identifying the waste category and generating disposal recommendations.
          </Text>
          {imageUri ? (
            <Image 
              source={{ uri: imageUri as string }}
              style={styles.previewImage}
              resizeMode="cover"
            />
          ) : null}
        </View>
      </SafeAreaView>
    );
  }

  if (!result) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBack}
          >
            <ArrowLeft size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Something went wrong</Text>
          <Text style={styles.errorMessage}>
            We couldn't analyze this image. Please try again with a clearer photo.
          </Text>
          <Button 
            title="Go Back" 
            onPress={goToHome}
            style={styles.errorButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  const categoryInfo = WASTE_CATEGORIES[result.category];
  const confidencePercentage = Math.round(result.confidence * 100);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBack}
        >
          <ArrowLeft size={24} color={COLORS.text} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Scan Result</Text>
        
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={handleShare}
        >
          <Share2 size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: result.imageUrl }} 
            style={styles.resultImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>{result.name}</Text>
          
          <View style={[styles.categoryBadge, { backgroundColor: `${categoryInfo.color}20` }]}>
            <Text style={[styles.categoryText, { color: categoryInfo.color }]}>
              {categoryInfo.name}
            </Text>
          </View>
          
          <Text style={styles.confidenceText}>
            Confidence: {confidencePercentage}%
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.sectionText}>{result.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Disposal Instructions</Text>
            <Text style={styles.sectionText}>{result.disposalInstructions}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Category Information</Text>
            <Text style={styles.sectionText}>{categoryInfo.description}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button 
          title="Scan New Item" 
          onPress={goToHome}
          style={styles.footerButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: COLORS.text,
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    backgroundColor: COLORS.lightGray,
  },
  resultImage: {
    width: '100%',
    height: '100%',
  },
  resultContainer: {
    padding: 16,
  },
  resultTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: COLORS.text,
    marginBottom: 12,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  confidenceText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 8,
  },
  sectionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  footerButton: {
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  loadingContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: COLORS.text,
    marginBottom: 12,
  },
  loadingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginTop: 24,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: COLORS.text,
    marginBottom: 12,
  },
  errorMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  errorButton: {
    width: '100%',
  },
});
