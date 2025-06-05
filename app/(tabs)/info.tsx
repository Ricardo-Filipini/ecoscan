import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { COLORS } from '@/constants/colors';
import { WASTE_CATEGORIES } from '@/constants/mockData';
import Header from '@/components/Header';
import { Trash, Recycle, Leaf, Cpu, TriangleAlert as AlertTriangle } from 'lucide-react-native';

export default function InfoScreen() {
  const renderIcon = (iconName: string, color: string) => {
    const iconProps = { size: 24, color };
    
    switch (iconName) {
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

  const renderCategoryItem = ({ item }: { item: [string, any] }) => {
    const [key, category] = item;
    return (
      <View style={styles.categoryCard}>
        <View style={[styles.iconContainer, { backgroundColor: `${category.color}20` }]}>
          {renderIcon(category.icon, category.color)}
        </View>
        <Text style={styles.categoryName}>{category.name}</Text>
        <Text style={styles.categoryDescription}>{category.description}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Informações" 
        subtitle="Aprenda sobre categorias de resíduos"
      />

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categorias de Resíduos</Text>
          <Text style={styles.sectionDescription}>
            Entender as diferentes categorias de resíduos é essencial para o descarte adequado.
            Cada categoria requer um tratamento específico para minimizar o impacto ambiental.
          </Text>
        </View>

        <FlatList
          data={Object.entries(WASTE_CATEGORIES)}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item[0]}
          scrollEnabled={false}
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Por que o Descarte Correto é Importante</Text>
          <Text style={styles.sectionDescription}>
            O descarte adequado de resíduos ajuda a proteger o meio ambiente, conservar recursos
            e reduzir a poluição. Ao separar corretamente os resíduos, podemos:
          </Text>
          
          <View style={styles.bulletPoint}>
            <View style={styles.bullet} />
            <Text style={styles.bulletText}>
              Reduzir o lixo em aterros e as emissões de gases de efeito estufa
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <View style={styles.bullet} />
            <Text style={styles.bulletText}>
              Conservar recursos naturais através da reciclagem e reutilização
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <View style={styles.bullet} />
            <Text style={styles.bulletText}>
              Prevenir a contaminação do solo e da água por materiais perigosos
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <View style={styles.bullet} />
            <Text style={styles.bulletText}>
              Apoiar a economia circular e práticas sustentáveis
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre o EcoScan</Text>
          <Text style={styles.sectionDescription}>
            O EcoScan usa tecnologia de reconhecimento de imagem para ajudar você a identificar
            e descartar resíduos corretamente. Nosso objetivo é tornar a reciclagem e a gestão
            de resíduos mais fácil e acessível para todos.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: COLORS.text,
    marginBottom: 8,
  },
  sectionDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  categoryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 8,
  },
  categoryDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginTop: 6,
    marginRight: 8,
  },
  bulletText: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
});
