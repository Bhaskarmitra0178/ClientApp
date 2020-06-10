import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { CardItem, Card, Left, Button, Text, Right, Icon } from 'native-base'
import { globalStyles } from '../../Utils/Data/Styles'
import RNPickerSelect from 'react-native-picker-select';
import { fetchCollection, fetchDoc } from '../../Utils/Services/FirebaseDBService';
import { Splash } from '../Splash';
import { useDispatch, useSelector } from 'react-redux';

export const Search = (props: any) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [materials, setMaterials] = useState('');
    const [plants, setPlants] = useState('');
    const [storageLocations,setStorageLocations] = useState('');
    const dispatch = useDispatch();

    const applicationData = useSelector((state: any) => ({
        materials: state.applicationData.materials,
        plants: state.applicationData.plants,
        storageLocations: state.applicationData.storageLocations,
    }))

    useEffect(() => {
        setLoading(true)
        Promise.all([fetchCollection('Material'),fetchDoc('ValueLookups', 'ValueLookups')])
            .then((SnapshotArr: any) => {
                const materialArr = SnapshotArr[0].docs.map((snapShot: any) => ({
                    id: snapShot.id,
                    ...snapShot.data()
                }));
                const plantsArr = SnapshotArr[1].data().Plants;
                const storageLocationArr = SnapshotArr[1].data().StorageLocation;
                dispatch({type: 'SET_APPLICATION_DETAILS', payload: {
                    materials: materialArr,
                    plants: plantsArr,
                    storageLocations: storageLocationArr
                }})
                setLoading(false);  
            })
            .catch((error: any) => {
                console.log(error);
                setLoading(false);
            })
    }, [])
    
    return (
        loading ? 
        <Splash/>
        :
        <View style={{flex: 1}}>
            <View style={{flex: 0.9, backgroundColor: globalStyles.COLOR_SECONDARY}}>
                <Card>
                    <CardItem bordered>
                        <Left>
                            <Text>Material</Text>
                        </Left>
                        <Right>
                            <RNPickerSelect
                                onValueChange={(value) => setMaterials(value)}
                                items={applicationData.materials.map((data: any) => ({
                                    label: String(data.Material),
                                    value: data.Material
                                }))}
                            />
                        </Right>
                    </CardItem>
                    <CardItem bordered>
                        <Left>
                            <Text>Plant</Text>
                        </Left>
                        <Right>
                            <RNPickerSelect
                                onValueChange={(value) => setPlants(value)}
                                items={applicationData.plants.map((data: string) => ({
                                    label: data,
                                    value: data
                                }))}
                            />
                        </Right>
                    </CardItem>
                    <CardItem bordered>
                        <Left>
                            <Text>Storage Loc</Text>
                        </Left>
                        <Right>
                            <RNPickerSelect
                                onValueChange={(value) => setStorageLocations(value)}
                                items={applicationData.storageLocations.map((data: string) => ({
                                    label: data,
                                    value: data
                                }))}
                            />
                        </Right>
                    </CardItem>

                </Card>
            </View>
            <View style={{flex: 0.1, marginBottom: 20}}>
                <Card>
                    <CardItem>
                        <Left>
                            <Button iconLeft style={{backgroundColor: globalStyles.COLOR_FOOTER}}>
                                <Icon type="AntDesign" name="scan1"/>
                                <Text>Scan</Text>
                            </Button>
                        </Left>
                        <Right>
                            <Button onPress={() => props.navigation.navigate('SearchDetails', { appName: props.route.params.details, materials: materials, plants: plants, storageLocations: storageLocations})} iconLeft style={{backgroundColor: globalStyles.COLOR_FOOTER}}>
                                <Icon type="MaterialIcons" name="search"/>
                                <Text>Search</Text>
                            </Button>
                        </Right>
                    </CardItem>
                </Card>
               
            </View>
        </View>
    )
}
