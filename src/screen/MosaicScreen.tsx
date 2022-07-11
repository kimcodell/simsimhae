import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useMemo} from 'react';
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Mosaic from '../components/Mosaic';

const {width, height} = Dimensions.get('window');

function MosaicScreen({
  //@ts-ignore
  route: {
    params: {uri},
  },
}: NativeStackNavigationProp<any>) {
  const number = useMemo(() => {
    return Math.ceil(height / width) * 100;
  }, []);
  console.log(number, height, width);
  return (
    <SafeAreaView style={styles.flex}>
      <ImageBackground
        source={{uri}}
        style={styles.container}
        resizeMode="contain">
        {Array(number)
          .fill(0)
          .map((_, i) => (
            <Mosaic key={i} />
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
