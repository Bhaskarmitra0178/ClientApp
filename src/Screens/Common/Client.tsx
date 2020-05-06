import React from 'react'
import {  StyleSheet, Modal, Image, Platform } from 'react-native'
import { Spinner, Text, View, Button, Card, CardItem, H3, Body, Container, Thumbnail } from 'native-base';
const picture = require('../../../assets/guest-user.jpg')

export const Client = (props: any) => {
    return (
        <Container style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.modalVisible}
                onRequestClose={() => {
                    props.setModalVisible(false)
                    props.setSelectedClient(null)
                }}
                >
                        <Card>
                        {!props.selectedClient ? 
                            <View />
                            :
                            (
                            <>
                            <CardItem header bordered>
                                    <Thumbnail square style={styles.modalImage} source={picture}  />
                                    <H3 style={styles.header}> 
                                        {`${props.selectedClient.first_name} ${props.selectedClient.last_name}`}
                                    </H3>
                            </CardItem>
                            <CardItem bordered>
                                <Body style={styles.centeredView}>
                                        <Text style={styles.margin} >
                                            Email: <Text style={styles.bold}>{props.selectedClient.email || ''}</Text>
                                        </Text>
                                        <Text style={styles.margin} >
                                            Gender: <Text style={styles.bold}>{props.selectedClient.gender || ''}</Text>
                                        </Text>
                                        <Text style={styles.margin} >
                                            Phone Number: <Text style={styles.bold}>{props.selectedClient.phone_number || ''}</Text>
                                        </Text>
                                        <Text style={styles.margin} >
                                            User Name: <Text style={styles.bold}>{props.selectedClient.username || ''}</Text>
                                        </Text>
                                        <Text>
                                            City: <Text style={styles.bold}>{props.selectedClient.location.city || ''}</Text>
                                        </Text>
                                </Body>
                                </CardItem >
                                <CardItem footer bordered>
                                    <Button danger style={{alignSelf: 'flex-end'}} onPress={() => {
                                            props.setModalVisible(false)
                                            props.setSelectedClient(null)
                                        }}>
                                        <Text>
                                        Go Back
                                        </Text>
                                    </Button>
                                </CardItem>
                            </>
                            )
                        }
                    </Card>
            </Modal>
        </Container>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
    header : {      
        color: '#5357b6',
        textTransform: 'capitalize',
        marginLeft: 20
    },
    modalImage: {
        resizeMode: 'contain',
        height: 100
    },
    bold: {
        fontWeight: '600'
    },
    margin: {
        marginBottom: 10,
        marginTop: 10,
        fontWeight: 'bold'
    }
});