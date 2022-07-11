import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import StorageHelper from '../utils/StorageHelper';

function AlbumScreen() {
  const [images, setImages] = useState<Array<string>>([]);

  useEffect(() => {
    (async () => {
      const results = await StorageHelper.getObject('images');
      setImages(results);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.flex}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        {images.map((image, i) => (
          <View style={styles.iamgeContainer} key={i}>
            <Image
              source={{uri: image}}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  iamgeContainer: {
    width: '50%',
    height: '50%',
    aspectRatio: 1,
  },
  image: {
    flex: 1,
    aspectRatio: 1,
  },
});

export default AlbumScreen;
