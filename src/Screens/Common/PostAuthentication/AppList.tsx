import React, { useEffect, useState } from 'react'
import { Splash } from '../../Splash'
import { Thumbnail, Container, Content, List, ListItem, Left, CheckBox, Body, Text, Footer, Button, Icon, Toast, Right, View } from 'native-base'
import { fetchApplicationList, createUserMapping } from '../../../Utils/Services/FirebaseDBService'
import { createApplicationUserMapping } from '../../../Utils/Services/AuthService';
import { SafeAreaView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { StoreModel } from '../../../Redux/Model/Store.model'
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';

export const AppList = (props: any) => {

    const [applicationList, setApplicationList] = useState<Array<any>>([]);
    const [loading, setloading] = useState<boolean>(false);
    const [checkBoxLoading, setCheckBoxLoading] = useState<boolean>(false);

    const user = useSelector((store: StoreModel) => store.user)
    const dispatch = useDispatch();

    useEffect(() => {
        setloading(true)
        fetchApplicationList()
        .get()
        .then((appFanoutSnapShot: any) => {
            const apps = appFanoutSnapShot.docs.map((appFanout: any) => ({
                id: appFanout.id,
                ...appFanout.data(),
                selected: false
            }))
            setApplicationList(apps);
            setloading(false);
        })
        .catch((error: any) => {
            console.log(error);
            setApplicationList([])
            setloading(false)
        })
    }, [])


    const onCheckApplication = (applicationName: string) => {
        setCheckBoxLoading(true)
        const appList = [...applicationList].map((app:any) => ({
            ...app,
            ...(app.Name === applicationName ? {selected: app.selected ? false : true} : {})
        }));
        setApplicationList(appList); 
        setCheckBoxLoading(false)
    }
    
    const submit = () => {
        setloading(true);
        const selectedApps = applicationList.filter((appList: any) => appList.selected);
        createUserMapping(user.userDetails.uid,{
            applications: selectedApps,
            contactDetails: user.localContactDetails,
            billingDetails: user.localBillingDetails
        })
        .then(() => {
            dispatch({type: 'HAS_ADDITIONAL_DATA', payload: true})
            Toast.show({
                text: 'Profile created successfully!',
                position: "bottom",
                type: "success",
                duration: 2000
            })
            setloading(false);
            props.navigation.navigate('Home');
        })
        .catch((error) => {
            console.log(error);
            Toast.show({
                text: error.message,
                position: "bottom",
                type: "success",
                duration: 2000
            })
            setloading(false);
        })
    }
    return (
        <View style={{flex: 1}}>
            {
                loading ?
                <Splash/>  : 
                <>
                    <View style={{flex: 0.9}}>
                        <SafeAreaView>
                            <FlatList
                                pointerEvents={checkBoxLoading ? 'none' : 'box-only'}
                                data={applicationList || []}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => (
                                    <TouchableHighlight underlayColor="#ccc" onPress={() => onCheckApplication(item.Name)}>
                                        <ListItem key={item.id}>
                                            <Left>
                                                <Left>
                                                    <CheckBox checked={item.selected}/>
                                                </Left>
                                                <Body>
                                                    <Thumbnail source={{uri: item.PictureUrl || require('../../../../assets/application-default-icon.png').uri}}/> 
                                                </Body>
                                            </Left>
                                            <Body>
                                                <Text>{item.Name || ''}</Text>
                                                <Text style={{width: '100%', flexWrap: 'wrap'}} note numberOfLines={1}>{item.Description || ''}</Text>
                                            </Body>
                                            <Right/>
                                        </ListItem>
                                    </TouchableHighlight>
                                )}
                            />
                        </SafeAreaView>
                    </View>
                    <View style={{flex: 0.1}}> 
                        <Footer>
                            <Button dark onPress={submit}>
                                <Text>Submit</Text>
                            </Button>
                        </Footer>    
                    </View>    
                </>
            }    
        </View>
    )
}

