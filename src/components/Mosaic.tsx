import React, {useCallback, useMemo, useState} from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {Difficulty} from '../utils/types';

function Mosaic({difficulty = Difficulty.NORMAL}: {difficulty?: Difficulty}) {
  const [opacity, setOpacity] = useState<number>(1);
  const style: StyleProp<ViewStyle> = useMemo(
    () => ({
      ...styles.mosaic,
      ...(difficulty === Difficulty.EASY ? {width: '20%', height: '20%'} : {}),
      opacity,
    }),
    [opacity, difficulty],
  );

  const onPress = useCallback(() => {
    if (opacity <= 0) {
      return;
    }
    setOpacity(prev => prev - 0.5);
  }, [opacity]);

  return (
    <TouchableOpacity
      activeOpacity={opacity <= 0 ? 0 : 0.8}
      style={style}
      onPressIn={onPress}
    />
  );
}

const styles = StyleSheet.create({
  mosaic: {
    width: '10%',
    height: '10%',
    aspectRatio: 1,
    backgroundColor: 'white',
  },
});

export default Mosaic;
