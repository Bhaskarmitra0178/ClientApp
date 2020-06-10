import React, { useState, useEffect } from 'react'
import { Text, ListItem, Left, Thumbnail, Body, Right, Icon, CardItem } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, StyleSheet, View, TouchableHighlight } from 'react-native'
import { StoreModel } from '../../Redux/Model/Store.model'
const picture = require('../../../assets/application-default-icon.png')
import * as firebase from 'firebase';
import { userApplicationList } from '../../Utils/Services/FirebaseDBService'
import { Splash } from '../Splash'
import { FlatList } from 'react-native-gesture-handler'

export const GenericList = (props: any) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [applicationList, setApplicationList] = useState([])
    const dispatch = useDispatch();

    const currentLoggedInUser = useSelector((store: StoreModel) => store.user);


    useEffect(() => {
        userApplicationList(currentLoggedInUser.userDetails.uid)
        .then((appList: any) => {
            const appListArray = appList.docs.map((app: any) => ({
                id: app.id,
                ...app.data()
            }));
            setApplicationList(appListArray);
        }).catch((error: any) => {
            console.log("Error getting document:", error);
            setApplicationList([]);
        });
    }, [])


    return (
        <View>
            {
            loading ? <Splash/> :
            <SafeAreaView>
                <FlatList data={applicationList || []}
                    pointerEvents='box-only'
                    keyExtractor={(item: any) => item.id}
                    renderItem={({ item }: any) => (
                        
                        <TouchableHighlight underlayColor="#ccc" onPress={() => props.navigation.navigate('ApplicationDetails', { application: item})}>
                            <CardItem  key={item.Name}>
                                <Left>
                                    <Body>
                                        {item.PictureUrl  ? <Thumbnail small={true} square 
                                            source={{uri: item.PictureUrl}}
                                        /> :
                                        <Thumbnail small={true} square 
                                            source={picture}
                                        />}
                                    </Body>
                                </Left>
                                <Body>
                                    <Text>{item.Name || ''}</Text>
                                    <Text note numberOfLines={1}>{item.Desription || ''}</Text>
                                </Body>
                                <Right>
                                    <Icon type='MaterialIcons' name='navigate-next'/>
                                </Right>
                                
                            </CardItem>
                        </TouchableHighlight>
                    )}>
                </FlatList>
            </SafeAreaView>
        }
      </View>
    )
}

const styles = StyleSheet.create({
    marginSearchBar: {
        marginLeft: 20
    }
})