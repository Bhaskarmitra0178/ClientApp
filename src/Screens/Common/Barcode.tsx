import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Spinner } from 'native-base';

export default class BarcodeScannerExample extends React.Component<any,any> {
  state = {
    hasCameraPermission: null,
    scanned: false,
    type: null,
    data: null
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  handleBarCodeScanned = ({ type, data }: any) => {
    this.setState({
        scanned: true,
        type: type,
        data: data
    }, () =>{
        if (this.state.type && this.state.data) {
            console.log(this.state.data);
            this.props.navigation.navigate('Search', {barcode: data})
        }
    });
  };
  
  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        {
            !scanned &&
            <BarCodeScanner
                onBarCodeScanned={this.handleBarCodeScanned} 
                style={StyleSheet.absoluteFillObject}
            />
        }
        {
            scanned && <Spinner/>
        }
      </View>
    );
  }
}
