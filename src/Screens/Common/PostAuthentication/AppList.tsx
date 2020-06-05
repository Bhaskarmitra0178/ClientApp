import React, { useEffect, useState } from 'react'
import { Splash } from '../../Splash'
import { Thumbnail, Container, Content, List, ListItem, Left, CheckBox, Body, Text, Footer, Button, Icon, Toast, Right } from 'native-base'
import { fetchApplicationList, createUserMapping } from '../../../Utils/Services/FirebaseDBService'
import { createApplicationUserMapping } from '../../../Utils/Services/AuthService';
import { SafeAreaView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { StoreModel } from '../../../Redux/Model/Store.model'

export const AppList = (props: any) => {

    const [applicationList, setApplicationList] = useState<Array<any>>([]);
    const [loading, setloading] = useState<boolean>(false);

    const user = useSelector((store: StoreModel) => store.user)
    const dispatch = useDispatch();

    useEffect(() => {
        setloading(true)
        fetchApplicationList()
        .get()
        .then((appFanoutSnapShot: any) => {
            const apps = appFanoutSnapShot.docs.map((appFanout: any) => ({
                ...appFanout.data(),
                selected: false
            }))
            console.log(apps)
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
        const appList = [...applicationList].map((app:any) => ({
            ...app,
            ...(app.Name === applicationName ? {selected: true} : {})
        }));
        setApplicationList(appList); 
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
        <Container>
            <Content padder={true}>
                { loading ? <Splash/> :
                    <List dataArray={applicationList || []}
                        renderRow={(application: any) => (
                            <SafeAreaView >
                                <ListItem key={application.Name} >
                                    <Left>
                                        <CheckBox checked={application.selected} onPress={() => onCheckApplication(application.Name)} />
                                        <Thumbnail source={{uri: application.PictureUrl || require('../../../../assets/application-default-icon.png')}}/>
                                    </Left>
                                    <Body>
                                        <Text>{application.Name || ''}</Text>
                                        <Text note numberOfLines={1}>{application.Description || ''}</Text>
                                    </Body>
                                    <Right/>
                                </ListItem>
                            </SafeAreaView>
                        )}>
                    </List>
                }   
            </Content>
            <Footer>
                <Button>
                    <Icon android='md-checkmark-circle' ios='ios-checkmark-circle'/>
                    <Text onPress={submit}>Submit</Text>
                </Button>
            </Footer>
        </Container>
    )
}

