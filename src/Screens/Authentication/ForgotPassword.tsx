import React, { useState, useEffect } from 'react'
import { Container, Content, Form, Item, Icon, Input, Button, Text, Row, Grid, Thumbnail, Spinner, Toast } from 'native-base'
import { emailValidator, hasError, resetPassword } from '../../Utils/Services/AuthService'
import { StyleSheet } from 'react-native';
import { initialiseImages } from '../../Utils/Services/ExpoService';

export const ForgotPassword = (props: any) => {

    /**
     * Variable declaration
     */
    const [email, setEmail] = useState({ value: '', error: '', hasError: true, touched: false });
    const [logo, setLogo] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

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
        const imagePath = await initialiseImages(require('../../../assets/logo.png'));
        setLogo(imagePath);
    }
    
    /**
     * Forgot password
     */
    const forgotPassword = () => {
        setLoading(true);
        resetPassword({email: email.value})
        .then(() => {
            // Email sent.
            Toast.show({
                text: 'Email sent successfully!',
                position: "bottom",
                type: "success",
                duration: 2000
            })
            setLoading(false);
          }).catch((error: any) => {
            Toast.show({
                text: error.message,
                position: "bottom",
                type: "danger",
                duration: 2000
            })
            setLoading(false);
            console.log(error);
            // An error happened.
          });
    }
     /**
     * Render Function
     */
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
                            success={email.value.length > 0 && !email.hasError}
                            error={email.touched && email.hasError}
                        >
                            <Icon   android='md-mail' ios='ios-mail' />
                            <Input 
                                label="Email"
                                placeholder="Email (eg. abc@xyz.com)"
                                returnKeyType="next"
                                value={email.value}
                                autoCompleteType="email"
                                keyboardType='email-address'
                                textContentType='emailAddress'
                                onChangeText={text => setEmail({ value: text, error: emailValidator(text), hasError: hasError('forget_password.email',text), touched: true })}
                            />
                        </Item>

                        <Item underline={false}>
                            <Text note style={styles.errorText}>{email.error}</Text>
                        </Item>
                        
                        <Grid style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Row style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Button  
                                    style={styles.alignButton}
                                    dark={true}
                                    iconLeft={true}
                                    disabled={loading || email.hasError}
                                    onPress={forgotPassword}
                                >
                                    <Icon  android='md-log-in' ios='ios-log-in'></Icon>
                                    <Text>Forgot Password</Text>
                                </Button>   
                            </Row>
                            <Row>
                                <Text note={true}
                                    style={styles.alignButton}
                                    onPress={() => props.navigation.navigate('SignIn')}
                                > Already a user ? Login </Text>
                            </Row>
                        </Grid>
                    
                    </Form>
            </Content>
      </Container>
    )
}

const styles = StyleSheet.create({
    errorText: {
        color: 'red'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
       alignItems: 'center',
       alignSelf: 'center'
    },
    alignButton: {
        marginTop: 20
    }
})