import React, { useState, useEffect } from 'react'
import { TextInputMask } from 'react-native-masked-text'
import { Container, Content, Grid, Row, Form, Thumbnail, Item, Icon, Input, Button, Text, Toast, Spinner } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { StoreModel } from '../../../Redux/Model/Store.model';
import {StyleSheet} from 'react-native';
import { initialiseImages } from '../../../Utils/Services/ExpoService';


export const BillingDetails = (props: any) => {
        /**
     * Variable declaration
     */
    const [billingAddress, setBillingAddress] = useState({ value: '', error: '', hasError: false, touched: false });
    const [ccNumber, setCCNumber] = useState({ value: '', error: '', hasError: false, touched: false });
    const [cvvNumber, setCVVNumber] = useState({ value: '', error: '', hasError: false, touched: false });
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

    useEffect(() => {
        setCVVNumber({ 
            ...cvvNumber,
            error: (cvvNumber.value.length > 0 && cvvNumber.value.length !== 3 ? 'Invalid Card Number' : ccNumber.value && !ccNumber.hasError ? 'Please enter CVV' : ''),
            hasError: ccNumber.value && !ccNumber.hasError ? true : cvvNumber.value.length > 0 && cvvNumber.value.length !== 3 ? true : false,
            touched: true
        })
    }, [ccNumber])

    // useEffect(() => {
    //     setCCNumber({
    //         ...ccNumber,
    //         error: (ccNumber.value.length > 0 && ccNumber.value.length !== 19 ? 'Invalid Card Number' : ''),
    //         hasError: ccNumber.value.length > 0 && ccNumber.value.length !== 19,
    //         touched: true
    //     })
    // }, [cvvNumber])

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
                cvvNumber: cvvNumber.value
            }
        });
        setLoading(false);
        props.navigation.navigate('Application Fanout');
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
                                    onChangeText={text => setBillingAddress({ value: text, error: '', hasError: false, touched: true })}
                                />
                            </Item>
                            <Item underline={false}>
                                <Text note={true} style={styles.errorText}>{billingAddress.error}</Text>
                            </Item>
                        
                            <Item>
                                <Icon android='md-card' ios='ios-card'/>
                                <TextInputMask
                                     style={{ padding: 10, fontSize: 16, width: '100%'}}
                                     placeholder="Card Number"
                                     placeholderTextColor="#555"
                                    type={'custom'}
                                    options={{
                                        mask: '9999 9999 9999 9999'
                                    }}
                                    value={ccNumber.value}
                                    onChangeText={text => setCCNumber({ value: text, error: (text.length > 0 && text.length !== 19 ? 'Invalid Card Number' : ''), hasError: text.length > 0 && text.length !== 19, touched: true })}
                                />
                            </Item>

                            <Item underline={false}>
                                <Text note={true} style={styles.errorText}>{ccNumber.error}</Text>
                            </Item>

                            <Item>
                                <Icon android='md-card' ios='ios-card'/>
                                <TextInputMask
                                      placeholder="CVV"
                                      placeholderTextColor="#555"
                                    style={{ padding: 10, fontSize: 16, width: '100%'}}
                                    type={'custom'}
                                    options={{
                                        mask: '999'
                                    }}
                                    value={cvvNumber.value}
                                    onChangeText={text => setCVVNumber({ value: text,
                                        error: (text.length > 0 && text.length !== 3 ? 'Invalid CVV Number' : ''),
                                        hasError: text.length > 0 && text.length !== 3 ? true : ccNumber.value && ccNumber.hasError ? true  : false,
                                        touched: true
                                    })}
                                />
                            </Item>

                            <Item underline={false}>
                                <Text note={true} style={styles.errorText}>{cvvNumber.error}</Text>
                            </Item>

                            <Grid style={{alignItems:'center', justifyContent: 'center'}}>
                                <Row style={{alignItems:'center', justifyContent: 'center'}}>
                                    <Button  
                                        style={styles.alignButton}
                                        dark
                                        iconRight
                                        disabled={loading || billingAddress.hasError || (ccNumber.value.length > 0 && ccNumber.value.length !== 19) || cvvNumber.hasError }
                                        onPress={onSubmitBillingDetails}
                                    >
                                        <Text>Next </Text>
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