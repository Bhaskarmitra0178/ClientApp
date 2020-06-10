import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { View,  CardItem, Left, Right, Text,Icon, Segment, Button, Thumbnail, Body, Card, Footer } from 'native-base'
import { globalStyles } from '../../Utils/Data/Styles'
import SegmentedControlTab from "react-native-segmented-control-tab";
import { TouchableHighlight } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import { useDispatch } from 'react-redux';

export const UserProfile = () => {
    /**
    * Variable declaration
    */
   const dispatch = useDispatch();
   const [loading, setLoading] = useState<boolean>(false);
   const [selectedIndex,setSelectedIndex] = useState<number>(0);

   const onLogout = () => {
        setLoading(true);
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            dispatch({type: 'SIGN_OUT'});
            setLoading(false);
        }).catch((error: any) => {
            setLoading(false);
            // An error happened.
            console.log(error);
        });
   }
  
    /**
    * Render Function
    */
   return (
        <View style={{flex: 1}}>
            <View style={{flex: 0.3, backgroundColor: globalStyles.COLOR_PRIMARY, justifyContent: 'center', alignItems: 'center'}}>
                <Icon style={{color: '#fff', fontSize: 100}} type='Entypo' name='user' />
            </View>
            <View style={{flex: 0.7, backgroundColor: globalStyles.COLOR_SECONDARY}}>
                <Card style={{position: "absolute", width: '100%', padding: 0, top: 20, zIndex: 1}}>
                    <CardItem bordered>
                        <Left>
                            <Text style={{flexWrap: 'wrap'}}>Default Settings</Text>
                        </Left>
                        <Right>
                            <Icon name='arrow-forward'/>
                        </Right>
                    </CardItem>
                    <Text style={{marginLeft: 25, marginTop: 10}}>Work Mode:</Text>
                    <CardItem>
                        <SegmentedControlTab
                            values={["Offline", "Online"]}
                            onTabPress={console.log}
                        />
                    </CardItem>
                </Card>
                <Text style={{position: 'absolute', color: '#b5b5ba', top: 160, flexWrap: 'wrap', fontSize: 12, padding:5}}>
                    Offline mode cannot be toggled when offline sync is in progress. Once toggled,
                    you'll remain offline until turned off.
                </Text>
                <View style={{position: "absolute", width: '100%', padding: 0, bottom: 140, zIndex: 1}}>
                    <Card transparent={false}>
                        <TouchableHighlight onPress={onLogout}>
                            <CardItem style={{justifyContent: 'center'}}>
                                <Text style={{color: '#ee919a', fontSize: 16}}>Sign Out</Text>
                            </CardItem>
                        </TouchableHighlight>
                    </Card>
                </View>
                <View style={{position: "absolute", width: '100%', padding: 0, bottom: 80, zIndex: 1, justifyContent:'center', alignItems: 'center'}}>
                    <Thumbnail source={require('../../../assets/logo.png')}/>
                </View>
                <Button style={{position: "absolute", bottom: 30, width:'100%', justifyContent: 'center', backgroundColor: globalStyles.COLOR_FOOTER}}>
                    <Text style={{color: '#fff', fontSize: 22, textTransform:'capitalize'}}>Entuber</Text>
                </Button>
            </View>
               
           
        </View>       
   )
}

/**
 * Styles of this page.
 */
const styles = StyleSheet.create({
   errorText: {
       color: 'red'
   },
   center: {
       flex: 1,
       justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center'
   },
   container: {
       flex: 1,
       backgroundColor: '#fff',
       alignItems: 'center',
       justifyContent: 'center',
   },
   alignButton: {
       marginTop: 30
   }  
})