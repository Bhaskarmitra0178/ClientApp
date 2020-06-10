import React from 'react'
import { useSelector } from 'react-redux';
import { View, SafeAreaView } from 'react-native';
import { Card, CardItem, Left, Icon, Body, Text, Right } from 'native-base';
import { FlatList } from 'react-native-gesture-handler';

export const SearchDetails = (props: any) => {

    const materialList =  useSelector((state: any) => {
            let filteredData = state.applicationData.materials;
            if (props.route.params.materials) {
                filteredData = state.applicationData.materials.filter((material: any) => material.Material === Number(props.route.params.materials))
            }
            if (props.route.params.plants) {
                filteredData = state.applicationData.materials.filter((material: any) => material.Plant === Number(props.route.params.plants))
            }
            if (props.route.params.storageLocations) {
                filteredData = state.applicationData.materials.filter((material: any) => material['Storage Loc'] === Number(props.route.params.plants));
            }
            return filteredData 
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
                        keyExtractor={(item: any) => item.id}
                        data={materialList || []}
                        renderItem={({item, index}) => (
                            <CardItem last={index === materialList.length} bordered={index !== materialList.length} key={item.id}>
                                <Left>
                                    <Icon type='FontAwesome' style={{color: '#579fd4'}} name='play-circle-o'/>
                                    <Text>{item.Type || ''}</Text>
                                </Left>
                                <Body>
                                    <Text style={{color: '#579fd4'}}>{item.Material || ''}</Text>
                                    <Text note>{item.Unit || ''}</Text>
                                </Body>
                                <Right>
                                    <Right>
                                        <Icon type='MaterialIcons' name='navigate-next'/>
                                    </Right>
                                </Right>
                            </CardItem>
                        )}
                    />
                </SafeAreaView>
            </View>           
        </View>
    )
}

