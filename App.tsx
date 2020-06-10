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
import { navigationRef } from './src/Utils/Configurations/NavigationRef';
import { Core } from './src/Core';
import './src/Utils/Configurations/TimerHandler';

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