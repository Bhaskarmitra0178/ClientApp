import React from 'react'
import { useSelector } from 'react-redux';
import { View, SafeAreaView, Image } from 'react-native';
import { Card, CardItem, Left, Icon, Body, Text, Right,  Thumbnail } from 'native-base';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
import { globalStyles } from '../../Utils/Data/Styles';

export const renderEmptyContainer = (props: any) => {
    return (
            <View style={{backgroundColor: globalStyles.COLOR_SECONDARY, justifyContent: 'center', alignItems:'center'}}> 
                <Image source={require('../../../assets/Images/no_data.jpg')}/>
                <Card>
                    <CardItem>
                        <Text style={{color: 'red'}}> Oops! no item found. </Text>
                    </CardItem>
                </Card>
            </View>
    )
}

export const SearchDetails = (props: any) => {

    const materialList =  useSelector((state: any) => {
            let filteredData = state.applicationData.masterData;
            if (props.route.params.materials) {
                filteredData = filteredData.filter((material: any) => material.Material === Number(props.route.params.materials))
            }
            if (props.route.params.plants) {
                filteredData = filteredData.filter((material: any) => material.Plant === Number(props.route.params.plants))
            }
            if (props.route.params.storageLocations) {
                filteredData = filteredData.filter((material: any) => material['Storage Loc'] === Number(props.route.params.storageLocations));
            }

            if (!props.route.params.materials && !props.route.params.plants && !props.route.params.storageLocations) {
                filteredData = [];
            }

            const getMaterialMaster = filteredData.reduce((acc: any, curr: any) => {
                if (acc.some((data: any) => data.Material === curr.Material)) {
                    const existingMaterialObj = acc.find((data: any) => data.Material === curr.Material);
                    acc[acc.findIndex((data: any) => data.Material === curr.Material)] = {
                        ...existingMaterialObj,
                        QUANTITY: existingMaterialObj.QUANTITY + curr.QUANTITY
                    }
                } else {
                    acc = acc.concat(curr);
                }
                return acc;
            }, [])
            .sort((compA: any, compB: any) => {
                if (compA.Material > compB.Material) return 1;
                if (compA.Material < compB.Material) return -1;
                return 0;
            });
            
            return getMaterialMaster 
        } 
    )

    return (
        <View style={{flex: 1}}>
            <View style={{flex: 0.3}}>
                <Card>
                    <CardItem bordered>
                        <Left>
                            <Text>Material:</Text>
                        </Left>
                        <Right>
                            <Text>{props.route.params.materials || '-'}</Text>
                        </Right>
                    </CardItem>
                    <CardItem bordered>
                        <Left>
                            <Text>Plants:</Text>
                        </Left>
                        <Right>
                            <Text>{props.route.params.plants || '-'}</Text>
                        </Right>
                    </CardItem>
                    <CardItem last>
                        <Left>
                            <Text>Storage Locations:</Text>
                        </Left>
                        <Right>
                            <Text>{props.route.params.storageLocations || '-'}</Text>
                        </Right>
                    </CardItem>
                </Card>
            </View>
            <View style={{flex: 0.7}}>
                <SafeAreaView>
                    <FlatList 
                        contentContainerStyle={{ flexGrow: 1 }}
                        disableVirtualization={false}
                        keyExtractor={(item: any) => item.id}
                        data={materialList || []}
                        renderItem={({item, index}) => (
                            <TouchableHighlight underlayColor="#f17902" onPress={() => props.navigation.navigate('SearchPlant', { appName: props.route.params.appName, materials: item})}>
                                <CardItem last={index === materialList.length} bordered={index !== materialList.length} key={item.id}>
                                    <Left>
                                        <Text>{item.Material || ''}</Text>
                                    </Left>
                                    <Body>
                                        <Text style={{fontSize: 16}}>
                                            {item.Description || '0'} 
                                        </Text>
                                        <Text note numberOfLines={1}>Units : <Text style={{color: '#579fd4'}}> {item.QUANTITY || '0'}</Text> </Text>
                                    </Body>
                                    <Right style={{justifyContent: 'flex-end'}}>
                                        <Left>

                                            <Icon style={{justifyContent: "center", alignItems:'center'}} type='MaterialIcons' name='navigate-next'/>
                                        </Left>
                                    
                                       
                                       
                                    </Right>
                                </CardItem>
                            </TouchableHighlight>
                            
                        )}
                        ListEmptyComponent={renderEmptyContainer(props)}
                    />
                </SafeAreaView>
            </View>           
        </View>
    )
}

/**
 * Search by plant
 * @param props 
 */
export const SearchPlant = (props: any) => {
    const materialList = useSelector((state: any) => {
        let filteredData = state.applicationData.masterData;
        if (props.route.params.materials) {
            filteredData = filteredData.filter((material: any) => material.Material === Number(props.route.params.materials.Material))
        }
        const getPlantMaster = filteredData.reduce((acc: any, curr: any) => {
            if (acc.some((data: any) => data.Plant == curr.Plant)) {
                const existingMaterialObj = acc.find((data: any) => data.Plant == curr.Plant);
                acc[acc.findIndex((data: any) => data.Plant == curr.Plant)] = {
                    ...existingMaterialObj,
                    QUANTITY: existingMaterialObj.QUANTITY + curr.QUANTITY
                }
            } else {
                acc = acc.concat(curr);
            }
            return acc;
        }, [])
        .sort((compA: any, compB: any) => {
            if (compA.Plant > compB.Plant) return 1;
            if (compA.Plant < compB.Plant) return -1;
            return 0;
        });
        
        return getPlantMaster
    })

    return(
         <View style={{flex: 1}}>
            <View style={{flex: 0.4}}>
                <Card>
                    <CardItem bordered>
                        <Left>
                            <Text>Material:</Text>
                        </Left>
                        <Right>
                            <Text>{props.route.params.materials.Material || '-'}</Text>
                        </Right>
                    </CardItem>
                    <CardItem bordered>
                        <Left>
                            <Text>Description:</Text>
                        </Left>
                        <Right>
                            <Text>{props.route.params.materials.Description || '-'}</Text>
                        </Right>
                    </CardItem>
                    <CardItem bordered>
                        <Left>
                            <Text>Material Type:</Text>
                        </Left>
                        <Right>
                            <Text>{props.route.params.materials.Type || '-'}</Text>
                        </Right>
                    </CardItem>
                    <CardItem last>
                        <Left>
                            <Text>Base UOM:</Text>
                        </Left>
                        <Right>
                            <Text>{props.route.params.materials.UNIT || '-'}</Text>
                        </Right>
                    </CardItem>
                </Card>
            </View>
            <View style={{flex: 0.6}}>
                <Card>
                    <CardItem style={{backgroundColor: '#97d3f5'}}>
                        <Right style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                            <Text>Total</Text>
                        </Right>
                        <Body/>
                        <Left style={{justifyContent: 'flex-end'}}>
                            <Text>
                                {materialList.reduce((acc: any, curr: any) => acc += curr.QUANTITY,0)}
                            </Text>
                        </Left>
                    </CardItem>
                </Card>
                <SafeAreaView>
                    <FlatList 
                        contentContainerStyle={{ flexGrow: 1 }}
                        disableVirtualization={false}
                        keyExtractor={(item: any) => item.id}
                        data={materialList || []}
                        renderItem={({item, index}) => (
                            <TouchableHighlight underlayColor="#fbbd7e" onPress={() => props.navigation.navigate('SearchStorageLoc', { appName: props.route.params.appName, materials: item })}>
                                <CardItem last={index === materialList.length} bordered={index !== materialList.length} key={item.id}>
                                    <Left>
                                        <Text>Plant</Text>
                                        <Text note style={{color: "#000"}}>{item.Plant || ''}</Text>
                                    </Left>
                                   
                                    <Body>
                                        <Text note numberOfLines={1}>Units : <Text style={{color: '#579fd4'}}> {item.QUANTITY || '0'}</Text> </Text>
                                    </Body>
                                    <Right>
                                        <Icon type='MaterialIcons' name='navigate-next'/>
                                    </Right>
                                       
                                </CardItem>
                            </TouchableHighlight>
                            
                        )}
                        ListEmptyComponent={renderEmptyContainer(props)}
                    />
                </SafeAreaView>
            </View>           
        </View>
    )
}

/**
 * Search by storage location.
 * @param props 
 */
export const SearchStorageLocation = (props: any) => {
    const materialList = useSelector((state: any) => {
        let filteredData = state.applicationData.masterData;
        if (props.route.params.materials) {
            filteredData = filteredData.filter((material: any) => 
                material.Material === Number(props.route.params.materials.Material) &&
                material.Plant === Number(props.route.params.materials.Plant)
            );
        }
       
        const getStorageLocMaster = filteredData.reduce((acc: any, curr: any) => {
            if (acc.some((data: any) => data['Storage Loc'] == curr['Storage Loc'])) {
                const existingMaterialObj = acc.find((data: any) => data['Storage Loc'] == curr['Storage Loc']);
                acc[acc.findIndex((data: any) => data['Storage Loc'] == curr['Storage Loc'])] = {
                    ...existingMaterialObj,
                    QUANTITY: existingMaterialObj.QUANTITY + curr.QUANTITY
                }
            } else {
                acc = acc.concat(curr);
            }
            return acc;
        }, [])
        .sort((compA: any, compB: any) => {
            if (compA['Storage Loc'] > compB['Storage Loc']) return 1;
            if (compA['Storage Loc'] < compB['Storage Loc']) return -1;
            return 0;
        });
        
        return getStorageLocMaster
    })

    return (
        <View style={{flex: 1}}>
            <View style={{flex: 0.5}}>
                <Card>
                    <CardItem bordered>
                        <Left>
                            <Text>Material:</Text>
                        </Left>
                        <Right>
                            <Text>{props.route.params.materials.Material || '-'}</Text>
                        </Right>
                    </CardItem>
                    <CardItem bordered>
                        <Left>
                            <Text>Description:</Text>
                        </Left>
                        <Right>
                            <Text>{props.route.params.materials.Description || '-'}</Text>
                        </Right>
                    </CardItem>
                    <CardItem bordered>
                        <Left>
                            <Text>Plant:</Text>
                        </Left>
                        <Right>
                            <Text>{props.route.params.materials.Plant || '-'}</Text>
                        </Right>
                    </CardItem>
                    <CardItem bordered>
                        <Left>
                            <Text>Material Type:</Text>
                        </Left>
                        <Right>
                            <Text>{props.route.params.materials.Type || '-'}</Text>
                        </Right>
                    </CardItem>
                    <CardItem last>
                        <Left>
                            <Text>Base UOM:</Text>
                        </Left>
                        <Right>
                            <Text>{props.route.params.materials.UNIT || '-'}</Text>
                        </Right>
                    </CardItem>
                </Card>
            </View>
            <View style={{flex: 0.5}}>
                <Card>
                    <CardItem >
                        <Right style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                            <Text>Plant</Text>
                            <Text note numberOfLines={1}>{props.route.params.materials.Plant}</Text>
                        </Right>
                        <Body/>
                        <Left style={{justifyContent: 'flex-end'}}>
                            <Text>
                                {materialList.reduce((acc: any, curr: any) => acc += curr.QUANTITY,0)}
                            </Text>
                        </Left>
                    </CardItem>
                </Card>
                <SafeAreaView>
                    <FlatList 
                        contentContainerStyle={{ flexGrow: 1 }}
                        disableVirtualization={false}
                        keyExtractor={(item: any) => item.id}
                        data={materialList || []}
                        renderItem={({item, index}) => (
                            <TouchableHighlight underlayColor="#fbbd7e">
                                <CardItem last={index === materialList.length} bordered={index !== materialList.length} key={item.id}>
                                    <Left>
                                        <Icon style={{color: '#579fd4'}} type='FontAwesome' name='play-circle-o'/>
                                        <Body>
                                            <Text style={{fontSize: 10}}>Storage Location</Text>
                                        </Body>
                                        <Left>
                                            <Text note style={{color: "#000"}}>{item['Storage Loc'] || ''}</Text>
                                        </Left>
                                    </Left>
                                
                                    <Body>
                                        <Text note numberOfLines={1}>Units : <Text style={{color: '#579fd4'}}> {item.QUANTITY || '0'}</Text> </Text>
                                    </Body>
                                    <Right>
                                        <Icon type='MaterialIcons' name='navigate-next'/>
                                    </Right>
                                    
                                </CardItem>
                            </TouchableHighlight>
                        )}
                        ListEmptyComponent={renderEmptyContainer(props)}
                    />
                </SafeAreaView>
            </View>           
        </View>
    )
}

export const SearchBarcode = (props: any) => {
    const materialList = useSelector((state: any) => {
        let filteredData = state.applicationData.masterData;
        if (props.route.params.materials) {
            filteredData = filteredData.filter((material: any) => 
                material.Barcode === Number(props.route.params.materials)
            );
        }
        if (props.route.params.plants) {
            filteredData = filteredData.filter((material: any) => 
                material.Plant === Number(props.route.params.plants)
            );
        }
        if (props.route.params.storageLocations) {
            filteredData = filteredData.filter((material: any) => 
                material['Storage Loc'] == props.route.params.storageLocations
            );
        }
       
        const getStorageLocMaster = filteredData.reduce((acc: any, curr: any) => {
            if (acc.some((data: any) => data['Storage Loc'] == curr['Storage Loc'])) {
                const existingMaterialObj = acc.find((data: any) => data['Storage Loc'] == curr['Storage Loc']);
                acc[acc.findIndex((data: any) => data['Storage Loc'] == curr['Storage Loc'])] = {
                    ...existingMaterialObj,
                    QUANTITY: existingMaterialObj.QUANTITY + curr.QUANTITY
                }
            } else {
                acc = acc.concat(curr);
            }
            return acc;
        }, [])
        .sort((compA: any, compB: any) => {
            if (compA['Storage Loc'] > compB['Storage Loc']) return 1;
            if (compA['Storage Loc'] < compB['Storage Loc']) return -1;
            return 0;
        });
        
        return getStorageLocMaster
    })

    return (
        <View style={{flex: 1}}>
            <View style={{flex: 0.5}}>
                <Card>
                    <CardItem bordered>
                        <Left>
                            <Text>Material:</Text>
                        </Left>
                        <Right>
                            <Text>{materialList.find((data: any) => data.Barcode == props.route.params.materials) && materialList.find((data: any) => data.Barcode == props.route.params.materials)!.Material || '-'}</Text>
                        </Right>
                    </CardItem>
                    <CardItem bordered>
                        <Left>
                            <Text>Description:</Text>
                        </Left>
                        <Right>
                            <Text>{materialList.find((data: any) => data.Barcode == props.route.params.materials) && materialList.find((data: any) => data.Barcode == props.route.params.materials)!.Description || '-'}</Text>
                        </Right>
                    </CardItem>
                    <CardItem bordered>
                        <Left>
                            <Text>Plant:</Text>
                        </Left>
                        <Right>
                            <Text>{materialList.find((data: any) => data.Barcode == props.route.params.materials) && materialList.find((data: any) => data.Barcode == props.route.params.materials)!.Plant  || '-'}</Text>
                        </Right>
                    </CardItem>
                    <CardItem bordered>
                        <Left>
                            <Text>Material Type:</Text>
                        </Left>
                        <Right>
                            <Text>{materialList.find((data: any) => data.Barcode == props.route.params.materials) && materialList.find((data: any) => data.Barcode == props.route.params.materials)!.Type || '-'}</Text>
                        </Right>
                    </CardItem>
                    <CardItem last>
                        <Left>
                            <Text>Base UOM:</Text>
                        </Left>
                        <Right>
                            <Text>{materialList.find((data: any) => data.Barcode == props.route.params.materials) && materialList.find((data: any) => data.Barcode == props.route.params.materials)!.UNIT || '-'}</Text>
                        </Right>
                    </CardItem>
                </Card>
            </View>
            <View style={{flex: 0.5}}>
                <Card>
                    <CardItem >
                        <Right style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                            <Text>Plant</Text>
                            <Text note numberOfLines={1}>{materialList.find((data: any) => data.Barcode == props.route.params.materials) && materialList.find((data: any) => data.Barcode == props.route.params.materials)!.Plant || ''}</Text>
                        </Right>
                        <Body/>
                        <Left style={{justifyContent: 'flex-end'}}>
                            <Text>
                                {materialList.reduce((acc: any, curr: any) => acc += curr.QUANTITY,0)}
                            </Text>
                        </Left>
                    </CardItem>
                </Card>
                <SafeAreaView>
                    <FlatList 
                        contentContainerStyle={{ flexGrow: 1 }}
                        disableVirtualization={false}
                        keyExtractor={(item: any) => item.id}
                        data={materialList || []}
                        renderItem={({item, index}) => (
                            <TouchableHighlight underlayColor="#fbbd7e">
                                <CardItem last={index === materialList.length} bordered={index !== materialList.length} key={item.id}>
                                    <Left>
                                        <Icon style={{color: '#579fd4'}} type='FontAwesome' name='play-circle-o'/>
                                        <Body>
                                            <Text style={{fontSize: 10}}>Storage Location</Text>
                                        </Body>
                                        <Left>
                                            <Text note style={{color: "#000"}}>{item['Storage Loc'] || ''}</Text>
                                        </Left>
                                    </Left>
                                
                                    <Body>
                                        <Text note numberOfLines={1}>Units : <Text style={{color: '#579fd4'}}> {item.QUANTITY || '0'}</Text> </Text>
                                    </Body>
                                    <Right>
                                        <Icon type='MaterialIcons' name='navigate-next'/>
                                    </Right>
                                    
                                </CardItem>
                            </TouchableHighlight>
                        )}
                        ListEmptyComponent={renderEmptyContainer(props)}
                    />
                </SafeAreaView>
            </View>           
        </View>
    )
}