import React, { useState, useEffect } from 'react'
import { Text,Button, Header, Container, Content, List, ListItem, Left, Thumbnail, Body, Right, Icon, Item, Input, Spinner } from 'native-base'
import { clients } from '../../Utils/Data/Clients.data'
import { Client } from './Client'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, StyleSheet } from 'react-native'
import { StoreModel } from '../../Redux/Model/Store.model'
const picture = require('../../../assets/application-default-icon.png')
import * as firebase from 'firebase';
import { userApplicationList } from '../../Utils/Services/FirebaseDBService'
import { Splash } from '../Splash'

export const GenericList = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [applicationList, setApplicationList] = useState([])
    const dispatch = useDispatch();

    const currentLoggedInUser = useSelector((store: StoreModel) => store.user);

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

    useEffect(() => {
        userApplicationList(currentLoggedInUser.userDetails.uid)
        .get()
        .then((appList: any) => {
            const appListArray = appList.docs.map((app: any) => app.data());
            setApplicationList(appListArray);
            console.log(appListArray);
        }).catch((error: any) => {
            console.log("Error getting document:", error);
            setApplicationList([]);
        });

        const userAppListSubscription = userApplicationList(currentLoggedInUser.userDetails.uid)
        .onSnapshot((appListSnapshot: any) => {
            const appListArray = appListSnapshot.docs.map((app: any) => app.data());
            setApplicationList(appListArray);
        }, (error: any) => console.log(error));

        return () => {
            userAppListSubscription();
        }
    }, [])


    return (
        <Container>
            <Header >
                <Right>
                    <Icon style={{color: '#FFFFFF'}} android='md-log-out' ios='ios-log-out' onPress={onLogout}/>
                </Right>
            </Header>
            <Content>
                <List dataArray={applicationList}
                    renderRow={(application:any) => (
                        loading ? <Splash/> :
                        <SafeAreaView >
               
                        <ListItem thumbnail={true}
                                key={application.Name} 
                        >
                            <Left>
                                {application.PictureUrl  ? <Thumbnail small={true} square 
                                    source={picture}
                                /> :
                                <Thumbnail small={true} square 
                                    source={picture}
                                />}
                            </Left>
                            <Body>
                                <Text>{application.Name || ''}</Text>
                                <Text note numberOfLines={1}>{application.Desription || ''}</Text>
                            </Body>
                            <Right>
                                <Icon android='md-arrow-forward' ios='ios-arrow-forward'/>
                            </Right>
                            
                        </ListItem>
                        </SafeAreaView>
                    )}>
                </List>
            </Content>
      </Container>
    )
}

const styles = StyleSheet.create({
    marginSearchBar: {
        marginLeft: 20
    }
})