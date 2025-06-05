import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView, Platform, StatusBar } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { ArrowLeft, Camera as FlipCamera, Camera } from 'lucide-react-native';
import { COLORS } from '@/constants/colors';

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionTitle}>Camera Permission Required</Text>
          <Text style={styles.permissionText}>
            We need your permission to use the camera to scan waste items.
          </Text>
          <TouchableOpacity 
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const handleClose = () => {
    router.back();
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        router.push({
          pathname: '/result',
          params: { imageUri: photo.uri }
        });
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera} 
        facing={facing}
        ref={cameraRef}
        onMountError={(error) => {
          console.error('Camera mount error:', error);
        }}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={handleClose}
            >
              <ArrowLeft size={24} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          <View style={styles.cameraControlsContainer}>
            <View style={styles.cameraControls}>
              <TouchableOpacity 
                style={styles.flipButton}
                onPress={toggleCameraFacing}
              >
                <FlipCamera size={24} color={COLORS.white} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.captureButton}
                onPress={takePicture}
              >
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
              
              <View style={styles.spacer} />
            </View>
            
            <Text style={styles.cameraText}>
              Position the waste item in the frame
            </Text>
          </View>
        </SafeAreaView>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  camera: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraControlsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  flipButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.white,
  },
  spacer: {
    width: 50,
  },
  cameraText: {
    textAlign: 'center',
    color: COLORS.white,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginBottom: 40,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  permissionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: COLORS.text,
    marginBottom: 12,
  },
  permissionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  permissionButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  permissionButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: COLORS.white,
  },
});
