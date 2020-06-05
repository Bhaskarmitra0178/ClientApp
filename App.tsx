import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import configureStore from './src/Redux/store';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { Root } from 'native-base';
import * as firebase from 'firebase';
import { navigationRef } from './src/Utils/Configurations/NavigationRef';
import { Core } from './src/Core';

const firebaseConfig =  {
  apiKey: "AIzaSyD4NZ1oc83NF5HswWXsWcJf3yN1Fcsx-Bg",
  authDomain: "entuber.firebaseapp.com",
  databaseURL: "https://entuber.firebaseio.com",
  projectId: "entuber",
  storageBucket: "entuber.appspot.com",
  messagingSenderId: "431966848925",
  appId: "1:431966848925:web:db6b793ad21b88da409174",
  measurementId: "G-CXP8MYBDVF"
};

try{
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);    
  }
} catch (error) {
  console.log(error);
}

export default class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    enableScreens();
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Root>
        <Provider store={configureStore()}>
          <NavigationContainer ref={navigationRef}>
            <Core/>
          </NavigationContainer>
        </Provider>
      </Root>
    );
  }
}