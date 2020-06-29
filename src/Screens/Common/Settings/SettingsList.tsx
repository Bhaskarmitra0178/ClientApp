import React, { useEffect, useState } from 'react'
import { CardItem, View, Card, Left, Icon, Right, Text, Body } from 'native-base'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux';
import { StoreModel } from '../../../Redux/Model/Store.model';
import { fetchUserSettings } from '../../../Utils/Services/FirebaseDBService';
import { Splash } from '../../Splash';

export const SettingsList = (props: any) => {
    const currentLoggedInUser = useSelector((store: StoreModel) => store.user);
    const contactDetails = useSelector((store: any) =>  store.user.localContactDetails);
    const applicationFanout = useSelector((store: any) =>  store.applicationData.applicationList);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    
    useEffect(() => {
       setLoading(true);
       fetchUserSettings(currentLoggedInUser.userDetails.uid)
       .then((snapShots: any) => {
            const contactData = snapShots[0].docs.map((data:any)=> ({
                id: data.id,
                ...data.data()
            }));
            const applicationData = snapShots[1].docs.map((app: any) => ({
                id: app.id,
                ...app.data()
            }));
            dispatch({type: 'SET_LOCAL_CONTACT_STORAGE', payload: contactData});
            dispatch({type: 'SET_USER_APPLICATIONS', payload: applicationData});
            setLoading(false);
       }).catch((error: any) => {
           console.log(error);
           setLoading(false);
       })
    }, [])

    return (
        <>
        {!loading ? <View>
            <Card>
                <TouchableHighlight underlayColor='#555' onPress={() => props.navigation.navigate('ContactDetailsSettings', {contactDetails: contactDetails })}>
                    <CardItem bordered>
                        <Left>
                            <Icon android='md-person' ios='ios-person'/>
                        </Left>
                        <Body>
                            <Text>Contact Information</Text>
                        </Body>
                        <Right>
                            <Icon type='MaterialIcons' name='navigate-next'/>
                        </Right>
                    </CardItem>
                </TouchableHighlight>
              
                <TouchableHighlight underlayColor='#555' onPress={() => props.navigation.navigate('ApplicationFanoutSettings', {applications: applicationFanout })}>
                    <CardItem last>
                        <Left>
                            <Icon type='MaterialIcons' name='settings-applications'/>
                        </Left>
                        <Body>
                          <Text>App List</Text>
                        </Body>
                        <Right>
                            <Icon type='MaterialIcons' name='navigate-next'/>
                        </Right>
                    </CardItem>
                </TouchableHighlight>
            </Card>
        </View> : <Splash/>}
        </>
    )
}
