import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '@/constants/colors';
import { WasteItem, WASTE_CATEGORIES } from '@/constants/mockData';
import { Trash, Recycle, Leaf, Cpu, TriangleAlert as AlertTriangle } from 'lucide-react-native';

interface WasteCardProps {
  item: WasteItem;
  onPress?: () => void;
}

export default function WasteCard({ item, onPress }: WasteCardProps) {
  const categoryInfo = WASTE_CATEGORIES[item.category];

  const renderIcon = () => {
    const iconProps = { size: 20, color: categoryInfo.color };
    
    switch (categoryInfo.icon) {
      case 'recycle':
        return <Recycle {...iconProps} />;
      case 'leaf':
        return <Leaf {...iconProps} />;
      case 'cpu':
        return <Cpu {...iconProps} />;
      case 'alert-triangle':
        return <AlertTriangle {...iconProps} />;
      case 'trash':
      default:
        return <Trash {...iconProps} />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const confidencePercentage = Math.round(item.confidence * 100);

  const CardComponent = onPress ? TouchableOpacity : View;
  
  return (
    <CardComponent 
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: item.imageUrl }} 
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        
        <View style={styles.categoryContainer}>
          <View style={[styles.categoryIcon, { backgroundColor: `${categoryInfo.color}20` }]}>
            {renderIcon()}
          </View>
          <View>
            <Text style={styles.categoryText}>{categoryInfo.name}</Text>
            <Text style={styles.confidence}>Confidence: {confidencePercentage}%</Text>
          </View>
        </View>
        
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        
        <Text style={styles.timestamp}>
          {formatDate(item.timestamp)}
        </Text>
      </View>
    </CardComponent>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 150,
    width: '100%',
    backgroundColor: COLORS.lightGray,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 16,
  },
  name: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: COLORS.text,
  },
  confidence: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  timestamp: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: COLORS.gray,
  },
});
