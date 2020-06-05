import React, { useState, useEffect } from 'react'
import { TextInputMask } from 'react-native-masked-text'
import { Container, Content, Grid, Row, Form, Thumbnail, Item, Icon, Input, Button, Text, Toast, Spinner } from 'native-base';
import { emptyFieldValidator, hasError, setBillingDetails } from '../../../Utils/Services/AuthService';
import { useSelector, useDispatch } from 'react-redux';
import { StoreModel } from '../../../Redux/Model/Store.model';
import {StyleSheet} from 'react-native';
import { initialiseImages } from '../../../Utils/Services/ExpoService';


export const BillingDetails = (props: any) => {
        /**
     * Variable declaration
     */
    const [billingAddress, setBillingAddress] = useState({ value: '', error: '', hasError: true, touched: false });
    const [ccNumber, setCCNumber] = useState({ value: '', error: '', hasError: true, touched: false });
    const [loading, setLoading] = useState<boolean>(false);
    const [logo, setLogo] = useState<string>('');

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
    
    /**
     * When submit billing details is selected
     */
    const onSubmitBillingDetails = () => {
        setLoading(true);
        dispatch({
            type: 'SET_LOCAL_BILLING_STORAGE',
            payload: {
                billingAddress: billingAddress.value,
                ccNumber: ccNumber.value,
            }
        });
        setLoading(false);
        props.navigation.navigate('Application Fanout');
        /* setBillingDetails(user.userDetails.uid, {
            billingAddress: billingAddress.value,
            ccNumber: ccNumber.value,
        })
        .then((querySnapshot: any) => {
            if (querySnapshot) {
                Toast.show({
                    text: 'Billing successfully saved!',
                    position: "bottom",
                    type: "success",
                    duration: 2000
                })
                setLoading(false);
                props.navigation.navigate('Application Fanout');
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
                                    { logo ? <Thumbnail square
                                        large
                                        source={{uri:logo}}
                                    /> : <Spinner/> }
                                </Row>
                            </Grid>

                            <Item 
                                success={billingAddress.value.length > 0 && !billingAddress.hasError}
                                error={billingAddress.touched && billingAddress.hasError}
                            >
                                <Icon android='md-home' ios='ios-home'/>
                                <Input 
                                    label="Address"
                                    placeholder="Billing Address"
                                    returnKeyType="next"
                                    value={billingAddress.value}
                                    onChangeText={text => setBillingAddress({ value: text, error: emptyFieldValidator(text), hasError: hasError('billingDetails.billingAddress',text), touched: true })}
                                />
                            </Item>
                            <Item underline={false}>
                                <Text note={true} style={styles.errorText}>{billingAddress.error}</Text>
                            </Item>
                            
                            
                        
                            <Item>
                                <Icon android='md-card' ios='ios-card'/>
                                <TextInputMask
                                    style={{padding: 20}}
                                    type={'custom'}
                                    options={{
                                        mask: '9999-9999-9999-9999'
                                    }}
                                    value={ccNumber.value}
                                    onChangeText={text => setCCNumber({ value: text, error: emptyFieldValidator(text), hasError: hasError('billingDetails.ccNumber',text), touched: true })}
                                />
                            </Item>

                            <Item underline={false}>
                                <Text note={true} style={styles.errorText}>{ccNumber.error}</Text>
                            </Item>

                            <Grid style={{alignItems:'center', justifyContent: 'center'}}>
                                <Row style={{alignItems:'center', justifyContent: 'center'}}>
                                    <Button  
                                        dark
                                        iconRight
                                        disabled={loading || billingAddress.hasError || ccNumber.hasError }
                                        onPress={onSubmitBillingDetails}
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