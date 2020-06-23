import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { CardItem, Card, Left, Button, Text, Right, Icon, Body } from 'native-base'
import { globalStyles } from '../../Utils/Data/Styles'
import RNPickerSelect from 'react-native-picker-select';
import { fetchCollection, fetchDoc, fetchCollectionInstance, fetchDocInstance } from '../../Utils/Services/FirebaseDBService';
import { Splash } from '../Splash';
import { useDispatch, useSelector } from 'react-redux';


export const Search = (props: any) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [materials, setMaterials] = useState('');
    const [plants, setPlants] = useState('');
    const [storageLocations,setStorageLocations] = useState('');
    const [barcode, setBarcode] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.route && props.route.params && props.route.params.barcode) {
            setBarcode(!!props.route.params.barcode);
            setMaterials(props.route.params.barcode);
            setPlants('');
            setStorageLocations('');
        }
    }, [props.route && props.route.params && props.route.params.barcode])

    const applicationData = useSelector((state: any) => ({
        materials: state.applicationData.materials,
        plants: state.applicationData.plants,
        storageLocations: state.applicationData.storageLocations,
        barcode: state.applicationData.barcode
    }))

    useEffect(() => {
        setLoading(true)
        fetchMasterData();
        
        const listSubscriptionMaterials = fetchCollectionInstance('MaterialFanout')
            .onSnapshot((snapShotChanges: any) => {
                const viewData = snapShotChanges.docs.map((snapShot: any) => ({
                    id: snapShot.id,
                    ...snapShot.data()
                }));
                dispatch({type: 'SET_APPLICATION_DETAILS', payload: {
                    viewData: viewData,
                }})
            });

        const listSubscriptionLookup = fetchDocInstance('ValueLookups', 'ValueLookups')
            .onSnapshot((snapShotChanges: any) => {
                const plantsArr = snapShotChanges.data().Plants;
                const storageLocationArr = snapShotChanges.data().StorageLocation;
                const materialArr = snapShotChanges.data().Material;
                const barcodeArr = snapShotChanges.data().Barcode;
                dispatch({type: 'SET_APPLICATION_DETAILS', payload: {
                    materials: materialArr,
                    plants: plantsArr,
                    storageLocations: storageLocationArr,
                    barcode: barcodeArr
                }})   
            });    
        
        return () => {
            listSubscriptionMaterials();
            listSubscriptionLookup();
        }    
            
    }, [])
    
    /**
     * Fetches the master data
     */
    const fetchMasterData = () => {
        Promise.all([fetchCollection('MaterialFanout'),fetchDoc('ValueLookups', 'ValueLookups')])
        .then((SnapshotArr: any) => {
            const viewData = SnapshotArr[0].docs.map((snapShot: any) => ({
                id: snapShot.id,
                ...snapShot.data()
            }));
            const plantsArr = SnapshotArr[1].data().Plants;
            const storageLocationArr = SnapshotArr[1].data().StorageLocation;
            const materialArr = SnapshotArr[1].data().Material;
            const barcodeArr = SnapshotArr[1].data().Barcode;
            dispatch({type: 'SET_APPLICATION_DETAILS', payload: {
                viewData: viewData,
                materials: materialArr,
                plants: plantsArr,
                storageLocations: storageLocationArr,
                barcode: barcodeArr
            }})
            setLoading(false);  
        })
        .catch((error: any) => {
            console.log(error);
            setLoading(false);
        })
    }

    return (
        loading ? 
        <Splash/>
        :
        <View style={{flex: 1}}>
            <View style={{flex: 0.9, backgroundColor: globalStyles.COLOR_SECONDARY}}>
                <Card>
                    <CardItem bordered>
                        <Left>
                            <Left>
                                <Text>Material</Text>
                            </Left>
                        </Left>
                        <Right>
                            <RNPickerSelect
                                style={{
                                    inputIOS: {
                                        color: 'black',
                                    },
                                    inputAndroid: {
                                        color: 'black',
                                    },
                                }}
                                value={materials}
                                onValueChange={(value) => setMaterials(value)}
                                items={barcode? applicationData.barcode : applicationData.materials}
                            />
                        </Right>
                    </CardItem>
                    <CardItem bordered>
                        <Left>
                            <Text>Plant</Text>
                        </Left>
                        <Right>
                            <RNPickerSelect
                                style={{
                                    inputIOS: {
                                        color: 'black',
                                    },
                                    inputAndroid: {
                                        color: 'black',
                                    },
                                }}
                                value={plants}
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
                                style={{
                                    inputIOS: {
                                        color: 'black',
                                    },
                                    inputAndroid: {
                                        color: 'black',
                                    },
                                }}
                                value={storageLocations}
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
                            <Button iconLeft style={{backgroundColor: globalStyles.COLOR_FOOTER}} onPress={() => props.navigation.navigate('BarcodeSearch')}>
                                <Icon type="AntDesign" name="scan1"/>
                                <Text>Scan</Text>
                            </Button>
                        </Left>
                        <Right>
                            <Button onPress={() =>  props.navigation.navigate(barcode && materials ? 'SearchBarcode' : 'SearchDetails', { appName: props.route.params.details, materials: materials, plants: plants, storageLocations: storageLocations})} iconLeft style={{backgroundColor: globalStyles.COLOR_FOOTER}}>
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
