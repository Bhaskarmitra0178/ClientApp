import React, { useState } from 'react'
import { Text,Button, Header, Container, Content, List, ListItem, Left, Thumbnail, Body, Right, Icon, Item, Input, Spinner } from 'native-base'
import { clients } from '../../Utils/Data/Clients.data'
import { Client } from './Client'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, StyleSheet } from 'react-native'
import { StoreModel } from '../../Redux/Model/Store.model'
const picture = require('../../../assets/guest-user.jpg')

export const Clients = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedClient, setSelectedClient] = useState(null)
    const [clienList, setClientList] = useState([...clients]);
    const dispatch = useDispatch();

    const currentLoggedInUser = useSelector((store: StoreModel) => store.user.userDetails);

    const onLogout = () => {
        dispatch({type: 'SIGN_OUT'});
    }

    /**
     * Global filter search.
     * @param text 
     */
    const globalFilter = (text: string) => {
        setLoading(true);
        if (text === '') {
            setClientList([...clients]);
        } else {
            const filteredClientList =clienList.filter((client: any) => 
                client.first_name.toLowerCase().includes(text.toLowerCase()) ||
                client.last_name.toLowerCase().includes(text.toLowerCase()) ||
                client.email.toLowerCase().includes(text.toLowerCase())
            );
            setClientList(filteredClientList);
        }
        setLoading(false);
    }

    return (
        <Container>
            <Header >
                <Left/>
                <Body>
                    <Item style={styles.marginSearchBar}
                    >
                        <Icon style={{color: '#ffffff'}} android='md-search' ios='ios-search'/>
                        <Input
                            placeholder='Search'
                            placeholderTextColor='#ffffff'
                            onChangeText={globalFilter}
                        />
                    </Item>
                </Body>
                <Right>
                    <Icon style={{color: '#FFFFFF'}} android='md-log-out' ios='ios-log-out' onPress={onLogout}/>
                </Right>
            </Header>
            <Content>
                <SafeAreaView >
                <List dataArray={clienList}
                    renderRow={(client:any) => (
                        loading ? <Spinner color="green"/> :
                        <ListItem thumbnail 
                                key={client.phone_number} 
                                onPress={() => {
                                    setModalVisible(true)
                                    setSelectedClient(client)
                                }}>
                            <Left>
                                <Thumbnail square 
                                    source={picture}
                                 />
                            </Left>
                            <Body>
                                <Text>{`${client.first_name} ${client.last_name}`}</Text>
                                <Text note numberOfLines={1}>{client.email}</Text>
                            </Body>
                            <Right>
                                <Button transparent onPress={() => {
                                        setModalVisible(true)
                                        setSelectedClient(client)
                                    }}>
                                    <Text>View</Text>
                                </Button>
                            </Right>
                        </ListItem>
                    )}>
                </List>
            </SafeAreaView>
            
            <Client modalVisible={modalVisible}
                    selectedClient={selectedClient}
                    setModalVisible={(event: boolean) => setModalVisible(event)}
                    setSelectedClient={(event:any) => setSelectedClient(event)}
            />
            </Content>
      </Container>
    )
}

const styles = StyleSheet.create({
    marginSearchBar: {
        marginLeft: 20
    }
})