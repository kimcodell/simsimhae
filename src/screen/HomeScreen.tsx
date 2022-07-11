import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import StorageHelper from '../utils/StorageHelper';
import {Difficulty} from '../utils/types';

//@ts-ignore
function HomeScreen({navigation}: NativeStackNavigationProp<any>) {
  const [difficulty, setDifficulty] = useState(Difficulty.NORMAL);

  const onPressDifficulty = useCallback(
    (value: Difficulty) => () => {
      setDifficulty(value);
    },
    [],
  );

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
      navigation.navigate('Mosaic', {uri: image.assets[0].uri, difficulty});
    }
  }, [navigation, difficulty]);

  const onPressAlbum = useCallback(() => {
    navigation.navigate('Album');
  }, [navigation]);

  const onResetAlbum = useCallback(async () => {
    await StorageHelper.clearAll();
  }, []);

  return (
    <SafeAreaView style={styles.flex}>
      <View style={styles.container}>
        <Text style={styles.subTitle}>난이도</Text>
        <View style={styles.difficultyButtonContainer}>
          <Pressable
            onPress={onPressDifficulty(Difficulty.EASY)}
            style={[
              styles.difficultyButton,
              difficulty === Difficulty.EASY && {backgroundColor: '#414360'},
            ]}>
            <Text
              style={[
                styles.difficultyButtonDefaultText,
                difficulty === Difficulty.EASY && {color: '#FFFFFF'},
              ]}>
              쉬움
            </Text>
          </Pressable>
          <Pressable
            onPress={onPressDifficulty(Difficulty.NORMAL)}
            style={[
              styles.difficultyButton,
              difficulty === Difficulty.NORMAL && {backgroundColor: '#414360'},
            ]}>
            <Text
              style={[
                styles.difficultyButtonDefaultText,
                difficulty === Difficulty.NORMAL && {color: '#FFFFFF'},
              ]}>
              보통
            </Text>
          </Pressable>
        </View>
        <TouchableOpacity style={styles.uploadButton} onPress={onUploadImage}>
          <Text style={styles.buttonText}>이미지 파일 업로드</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.albumButton} onPress={onPressAlbum}>
          <Text style={styles.albumButtonText}>기록</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={onResetAlbum}>
          <Text style={styles.buttonText}>기록 삭제</Text>
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
  subTitle: {
    fontWeight: '700',
    fontSize: 16,
  },
  difficultyButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  difficultyButton: {
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#414360',
    paddingVertical: 10,
    marginHorizontal: 10,
    width: 60,
  },
  difficultyButtonDefaultText: {
    color: '#414360',
    fontWeight: '700',
  },
  uploadButton: {
    backgroundColor: '#414360',
    borderRadius: 8,
    paddingVertical: 12,
    width: 160,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  albumButton: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 12,
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
  deleteButton: {
    backgroundColor: '#FA6351',
    borderRadius: 8,
    paddingVertical: 12,
    width: 160,
    alignItems: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;
