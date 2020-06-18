import React, { useState, useEffect, useRef } from 'react'
import { Container, Content, Grid, Row, Form, Thumbnail, Item, Icon, Input, Button,Col,Text, Toast, Spinner, Card, CardItem } from 'native-base'
import { emptyFieldValidator, hasError, updateUsercontactInfo} from '../../../Utils/Services/AuthService'
import {StyleSheet} from 'react-native'
import { initialiseImages } from '../../../Utils/Services/ExpoService'
import { useSelector, useDispatch } from 'react-redux'
import { StoreModel } from '../../../Redux/Model/Store.model'
import { TextInputMask } from 'react-native-masked-text'
import { globalStyles } from '../../../Utils/Data/Styles'

export const ContactDetails = (props: any) => {
    /**
     * Variable declaration
     */
    const [name, setName] = useState({ value: '', error: '', hasError: true, touched: false });
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
        if (props.route && props.route.params && props.route.params.contactDetails) {
            console.log('here');
            setName({
                value: props.route.params.contactDetails[0] && props.route.params.contactDetails[0].Name || '',
                error: emptyFieldValidator(props.route.params.contactDetails[0] && props.route.params.contactDetails[0].Name),
                hasError: hasError('contactDetails.name',props.route.params.contactDetails[0] && props.route.params.contactDetails[0].Name),
                touched: true
            })
            setTelephone({
                value: props.route.params.contactDetails[0] && props.route.params.contactDetails[0].Telephone || '',
                error: (props.route.params.contactDetails[0] && props.route.params.contactDetails[0].Telephone.length > 0 && props.route.params.contactDetails[0].Telephone.length !== 10 ? 'Invalid Phone Number' : ''),
                hasError: false ,
                touched: true
            })
        }
    }, [])


    /**
     * Initialises the logo
     */
    const initialiseLogo = async () => {
        const imagePath = await initialiseImages(require('../../../../assets/logo.png'));
        setLogo(imagePath);
    }
    
    const onSubmitContactDetails = () => {
        if (props.route.params.contactDetails) {
            setLoading(true);
            console.log(user.userDetails.uid ,name.value);
            updateUsercontactInfo(
                user.userDetails.uid,
                props.route.params.contactDetails[0].id,
                {
                    name: name.value,
                    telephone: telephone.value
                }
            );
            setLoading(false);
            props.navigation.navigate('UserProfile');
        } else {
            setLoading(true);
            dispatch({
                type: 'SET_LOCAL_CONTACT_STORAGE',
                payload: {
                    name: name.value,
                    telephone: telephone.value
                }
            });
            setLoading(false);
            props.navigation.navigate('Application Fanout');
        }   
    }

    return (
        <Container style={{backgroundColor: globalStyles.COLOR_SECONDARY}}>
            <Content padder={true} contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
                <Card>
                    <CardItem>
                        <Row style={{alignItems:'center', justifyContent: 'center'}}>
                            {logo ? <Thumbnail square
                                large
                                source={{uri:logo}}
                            /> : <Spinner/>}
                        </Row>
                    </CardItem>
                    <CardItem>
                            <Form style={styles.center}>
                            
                            <Item 
                                success={name.value.length > 0 && !name.hasError}
                                error={name.touched && name.hasError}
                            >
                                <Icon android='md-person' ios='ios-person'/>
                                <Input 
                                    label="Name"
                                    placeholder="Name"
                                    returnKeyType="next"
                                    value={name.value}
                                    onChangeText={text => setName({ value: text, error: emptyFieldValidator(text), hasError: hasError('contactDetails.name',text), touched: true })}
                                />
                            </Item>
                            <Item underline={false}>
                                <Text note={true} style={styles.errorText}>{name.error}</Text>
                            </Item>
                                
                            
                            <Item style={{padding: 5}}>
                                <Icon android='md-phone-portrait' ios='ios-phone-portrait' />
                                <TextInputMask
                                    placeholder="Mobile"
                                    placeholderTextColor="#555"
                                    style={{ padding: 10, fontSize: 16, width: '100%'}}
                                    type={'custom'}
                                    options={{
                                        mask: '9999999999'
                                    }}
                                    value={telephone.value}
                                    onChangeText={(text: string) => setTelephone({ value: text, error: (text.length > 0 && text.length !== 10 ? 'Invalid Phone Number' : ''), hasError: false , touched: true })}
                                />
                            
                            </Item>

                            <Item underline={false}>
                                <Text note={true} style={styles.errorText}>{telephone.error}</Text>
                            </Item>
                        </Form>   
                    </CardItem>
                    <CardItem last style={{justifyContent:'center'}}>
                        <Button  
                            // style={styles.alignButton}
                            dark
                            iconRight
                            disabled={loading || name.hasError || (telephone.value.length > 0 && telephone.value.length !== 10)}
                            onPress={onSubmitContactDetails}
                        >
                            <Text>{props.route && props.route.params && props.route.params.contactDetails ? 'Submit' : 'Next'}</Text>
                            {!props.route.params.contactDetails && <Icon  android='md-arrow-forward' ios='ios-arrow-forward'></Icon>}
                        </Button>
                    </CardItem>
                
                </Card> 
                   
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

