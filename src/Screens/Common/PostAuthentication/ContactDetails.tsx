import React, { useState, useEffect } from 'react'
import { Container, Content, Grid, Row, Form, Thumbnail, Item, Icon, Input, Button,Col,Text, Toast, Spinner } from 'native-base'
import { emptyFieldValidator, hasError, emailValidator, confirmPasswordValidator, setContactDetails } from '../../../Utils/Services/AuthService'
import {StyleSheet} from 'react-native'
import { initialiseImages } from '../../../Utils/Services/ExpoService'
import { useSelector, useDispatch } from 'react-redux'
import { StoreModel } from '../../../Redux/Model/Store.model'

export const ContactDetails = (props: any) => {
    /**
     * Variable declaration
     */
    const [firstName, setFirstName] = useState({ value: '', error: '', hasError: true, touched: false });
    const [lastName, setLastName] = useState({ value: '', error: '', hasError: true, touched: false });
    const [telephone, setTelephone] = useState({ value: '', error: '', hasError: false, touched: false });
    const [logo, setLogo] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    

    const user = useSelector((store: StoreModel) => store.user)
    const dispatch = useDispatch();

   /**
     * component did mount lifecycle
     */
    useEffect(() => {
        initialiseLogo();
    }, [])

    /**
     * Initialises the logo
     */
    const initialiseLogo = async () => {
        const imagePath = await initialiseImages(require('../../../../assets/logo.png'));
        setLogo(imagePath);
    }
    
    const onSubmitContactDetails = () => {
        setLoading(true);
        dispatch({
            type: 'SET_LOCAL_CONTACT_STORAGE',
            payload: {
                firstName: firstName.value,
                lastName: lastName.value,
                telephone: telephone.value
            }
        });
        setLoading(false);
        props.navigation.navigate('Billing Details');
       /*  setContactDetails(user.userDetails.uid, {
            firstName: firstName.value,
            lastName: lastName.value,
            telephone: telephone.value
        })
        .then((querySnapshot: any) => {
            if (querySnapshot) {
                Toast.show({
                    text: 'Contact successfully saved!',
                    position: "bottom",
                    type: "success",
                    duration: 2000
                })
                setLoading(false);
                props.navigation.navigate('Billing Details');
            }
        })
        .catch((error: any) => {
            Toast.show({
                text: error.message,
                position: "bottom",
                type: "danger",
                duration: 2000
            })
            setLoading(false);
        }) */
    }

    return (
        <Container>
            <Content padder={true}>
                    <Form>
                        <Grid>
                            <Row style={{alignItems:'center', justifyContent: 'center'}}>
                                {logo ? <Thumbnail square
                                    large
                                    source={{uri:logo}}
                                /> : <Spinner/>}
                            </Row>
                        </Grid>

                        <Item 
                            success={firstName.value.length > 0 && !firstName.hasError}
                            error={firstName.touched && firstName.hasError}
                        >
                            <Icon android='md-person' ios='ios-person'/>
                            <Input 
                                label="First Name"
                                placeholder="First Name"
                                returnKeyType="next"
                                value={firstName.value}
                                onChangeText={text => setFirstName({ value: text, error: emptyFieldValidator(text), hasError: hasError('contactDetails.firstName',text), touched: true })}
                            />
                        </Item>
                        <Item underline={false}>
                            <Text note={true} style={styles.errorText}>{firstName.error}</Text>
                        </Item>
                        <Item 
                            success={lastName.value.length > 0 && !lastName.hasError}
                            error={lastName.touched && lastName.hasError}
                        >
                            <Icon android='md-person' ios='ios-person'/>
                            <Input 
                                label="Last Name"
                                placeholder="Last Name"
                                returnKeyType="next"
                                value={lastName.value}
                                onChangeText={text => setLastName({ value: text, error: emptyFieldValidator(text), hasError: false, touched: true })}
                            />
                        </Item>
                        <Item underline={false}>
                            <Text note={true} style={styles.errorText}>{lastName.error}</Text>
                        </Item>
                            
                        
                        <Item>
                            <Icon android='md-phone-portrait' ios='ios-phone-portrait' />
                            <Input
                                placeholder="Mobile"
                                label="Mobile"
                                returnKeyType="done"
                                value={telephone.value}
                                onChangeText={(text: string) => setTelephone({ value: text, error: '', hasError: false, touched: true })}
                            /> 
                        
                        </Item>

                        <Item underline={false}>
                            <Text note={true} style={styles.errorText}>{telephone.error}</Text>
                        </Item>

                        <Grid style={{alignItems:'center', justifyContent: 'center'}}>
                            <Row style={{alignItems:'center', justifyContent: 'center'}}>
                                <Button  
                                    dark
                                    iconRight
                                    disabled={loading || firstName.hasError || lastName.hasError }
                                    onPress={onSubmitContactDetails}
                                >
                                    <Text>Next</Text>
                                    <Icon  android='md-arrow-forward' ios='ios-arrow-forward'></Icon>
                                </Button>
                            </Row>
                        </Grid>
                    </Form>    
            </Content>
      </Container>
    )
}

/**
 * Styles of this page.
 */
const styles = StyleSheet.create({
    errorText: {
        color: 'red'
    },
    center: {
        flex: 1,
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    alignButton: {
        marginTop: 20
    }  
})

