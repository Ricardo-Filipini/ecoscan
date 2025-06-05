import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Camera, Image as ImageIcon } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

import Header from '@/components/Header';
import Button from '@/components/Button';
import { COLORS } from '@/constants/colors';

export default function HomeScreen() {
  const handleOpenCamera = () => {
    router.push('/camera');
  };

  const handleSelectImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert('É necessária permissão para acessar a galeria de fotos!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      router.push({
        pathname: '/result',
        params: { imageUri: result.assets[0].uri }
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header 
        title="EcoScan" 
        subtitle="Identifique resíduos para descarte adequado"
      />

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg' }}
            style={styles.heroImage}
          />
          <View style={styles.overlay}>
            <Text style={styles.heroTitle}>
              Escaneie resíduos para descarte correto
            </Text>
            <Text style={styles.heroSubtitle}>
              Tire uma foto ou envie uma imagem para identificar categorias de resíduos e obter instruções de descarte
            </Text>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>Começar</Text>
          <Text style={styles.sectionSubtitle}>
            Tire uma foto ou envie uma imagem existente
          </Text>

          <View style={styles.buttonContainer}>
            <Button
              title="Tirar Foto"
              icon={<Camera size={20} color={COLORS.white} />}
              onPress={handleOpenCamera}
              style={styles.actionButton}
            />
            <Button
              title="Enviar Imagem"
              icon={<ImageIcon size={20} color={COLORS.white} />}
              variant="secondary"
              onPress={handleSelectImage}
              style={styles.actionButton}
            />
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Como funciona</Text>
          <View style={styles.infoStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Tire uma foto ou envie uma imagem</Text>
              <Text style={styles.stepDescription}>
                Use sua câmera para fotografar o resíduo ou envie uma imagem existente da sua galeria.
              </Text>
            </View>
          </View>
          <View style={styles.infoStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Análise por IA</Text>
              <Text style={styles.stepDescription}>
                Nossa IA analisará a imagem e identificará a categoria do resíduo.
              </Text>
            </View>
          </View>
          <View style={styles.infoStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Descarte Corretamente</Text>
              <Text style={styles.stepDescription}>
                Siga as instruções fornecidas para descartar o resíduo adequadamente.
              </Text>
            </View>
          </View>
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
  },
  scrollContent: {
    paddingBottom: 24,
  },
  heroContainer: {
    position: 'relative',
    height: 200,
    width: '100%',
    marginBottom: 24,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
    justifyContent: 'flex-end',
  },
  heroTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: COLORS.white,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.white,
  },
  actionsContainer: {
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 24,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: COLORS.text,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  infoContainer: {
    padding: 16,
    marginHorizontal: 16,
  },
  infoTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: COLORS.text,
    marginBottom: 16,
  },
  infoStep: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: COLORS.white,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 4,
  },
  stepDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});
