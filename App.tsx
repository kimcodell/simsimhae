import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screen/HomeScreen';
import MosaicScreen from './src/screen/MosaicScreen';
import AlbumScreen from './src/screen/AlbumScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Mosaic"
          component={MosaicScreen}
          options={{
            headerTitle: '화면 터치!',
          }}
        />
        <Stack.Screen
          name="Album"
          component={AlbumScreen}
          options={{headerTitle: '앨범'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
