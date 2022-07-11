import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useMemo} from 'react';
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Mosaic from '../components/Mosaic';
import {Difficulty} from '../utils/types';

const {width, height} = Dimensions.get('window');

function MosaicScreen({
  //@ts-ignore
  route: {
    params: {uri, difficulty},
  },
}: NativeStackNavigationProp<any>) {
  const number = useMemo(() => {
    return (
      Math.ceil(height / width) * (difficulty === Difficulty.NORMAL ? 100 : 25)
    );
  }, [difficulty]);

  return (
    <SafeAreaView style={styles.flex}>
      <ImageBackground
        source={{uri}}
        style={styles.container}
        resizeMode="contain">
        {Array(number)
          .fill(0)
          .map((_, i) => (
            <Mosaic key={i} difficulty={difficulty} />
          ))}
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default MosaicScreen;
