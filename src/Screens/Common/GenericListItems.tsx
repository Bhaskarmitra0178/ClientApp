import React from 'react'
import { View, ListItem, Left, Thumbnail, Body, Right, Icon, Text, CardItem } from 'native-base'
import { SafeAreaView } from 'react-native'
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler'

const details = [
    {
        id: '1',
        name: 'Plant and Storage Loc. Stock',
        image: require('../../../assets/Images/IndustryIcon.jpg')
    },
    {
        id: '2',
        name: 'Warehouse Storage Bin Stock',
        image: require('../../../assets/Images/BoxesIcon.png')
    }
]
const GenericListItems = (props: any) => {

    return (
        <View>
            <SafeAreaView>
                <FlatList data={details}
                    keyExtractor={(item: any) => item.id}
                    renderItem={
                        ({item}) => (
                            <TouchableHighlight underlayColor='#ccc' onPress={() => props.navigation.navigate('Search', { details: item.name})}>
                                <CardItem key={item.id}>
                                    <Left>
                                        <Thumbnail source={item.image}/>
                                    </Left>
                                    <Body>
                                        <Text style={{width: '100%', flexWrap: 'wrap'}}>{item.name || ''}</Text>
                                    </Body>
                                    <Right>
                                        <Icon type='MaterialIcons' name='navigate-next'/>
                                    </Right>
                                </CardItem>
                            </TouchableHighlight>       
                        )
                    }
                />
            </SafeAreaView>
        </View>
    )
}

export default GenericListItems
