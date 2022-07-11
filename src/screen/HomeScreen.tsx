import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import StorageHelper from '../utils/StorageHelper';

//@ts-ignore
function HomeScreen({navigation}: NativeStackNavigationProp<any>) {
  const onUploadImage = useCallback(async () => {
    const image = await launchImageLibrary({
      mediaType: 'photo',
      presentationStyle: 'fullScreen',
      selectionLimit: 1,
    });
    if (image.assets && image.assets?.length > 0) {
      const images = await StorageHelper.getObject('images');
      await StorageHelper.storeObject('images', [
        ...images,
        image.assets[0].uri as string,
      ]);
      navigation.navigate('Mosaic', {uri: image.assets[0].uri});
    }
  }, [navigation]);

  const onPressAlbum = useCallback(() => {
    navigation.navigate('Album');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.flex}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.uploadButton} onPress={onUploadImage}>
          <Text style={styles.uploadButtonText}>이미지 파일 업로드</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.albumButton} onPress={onPressAlbum}>
          <Text style={styles.albumButtonText}>기록</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButton: {
    backgroundColor: '#414360',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: 160,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  albumButton: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: 160,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#414360',
    marginTop: 20,
  },
  albumButtonText: {
    color: '#414360',
    fontWeight: '700',
  },
});

export default HomeScreen;
