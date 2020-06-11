import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Form, Item, Icon, Input, Button, Text, Toast,Grid, Row, Thumbnail, Spinner, CardItem, Card } from 'native-base'
import { emailValidator, hasError, emptyFieldValidator, confirmPasswordValidator, registerUser, setUserAdditionalDetails } from '../../Utils/Services/AuthService'
import { initialiseImages } from '../../Utils/Services/ExpoService'
import { globalStyles } from '../../Utils/Data/Styles'


export const Signup = () => {
     /**
     * Variable declaration
     */
    const [company, setCompany] = useState({ value: '', error: '', hasError: true, touched: false });
    const [email, setEmail] = useState({ value: '', error: '', hasError: true, touched: false });
    const [password, setPassword] = useState({ value: '', error: '', hasError: true, touched: false });
    const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '', hasError: true, touched: false });
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
     * On sign up triggered.
     */
    const onSignUp = () => {
        setLoading(true);
        registerUser({email: email.value, password: password.value})
        .then((userSnapshot: any) => {
            setUserAdditionalDetails({company: company.value, userUID: userSnapshot.user.uid})
        })
        .catch((error: any) => {
          // Handle Errors here.
          Toast.show({
            text: error.message,
            buttonText: "Okay",
            position: "bottom",
            type: "danger",
            duration: 2000
          })
          setLoading(false);
          console.log(error);
          // [END_EXCLUDE]
        });
    }
     /**
     * Render Function
     */
    return (
        <Container style={{backgroundColor: globalStyles.COLOR_SECONDARY}}>
            <Content padder={true} contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
                
                <Card>
                    <CardItem>
                        <Row style={{alignItems:'center', justifyContent: 'center'}}>
                            {logo ? <Thumbnail square={true}
                                large={true}
                                source={{uri:logo}}
                            /> : <Spinner/>}
                        </Row>
                    </CardItem>
                    <CardItem >
                        
                    <Form style={styles.center}>
                        

                            <Item 
                                success={company.value.length > 0 && !company.hasError}
                                error={company.touched && company.hasError}
                            >
                                <Icon  android='md-person' ios='ios-person' />
                                <Input 
                                    label="Company"
                                    placeholder="Company"
                                    returnKeyType="next"
                                    value={company.value}
                                    onChangeText={text => setCompany({ value: text, error: emptyFieldValidator(text), hasError: hasError('signup.company',text), touched: true })}
                                />
                            </Item>

                            <Item underline={false}>
                                <Text note={true} style={styles.errorText}>{company.error}</Text>
                            </Item>

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
                                    keyboardType='email-address'
                                    textContentType='emailAddress'
                                    onChangeText={text => setEmail({ value: text, error: emailValidator(text), hasError: hasError('signup.email',text), touched: true })}
                                />
                            </Item>

                            <Item underline={false}>
                                <Text note={true} style={styles.errorText}>{email.error}</Text>
                            </Item>

                            <Item success={password.value.length > 0 && !password.hasError}
                                error={password.touched && password.hasError}
                            >
                                    <Icon android='md-key' ios='ios-key' />
                                    <Input
                                        placeholder="Password (eg. Hello@123)"
                                        label="Password"
                                        returnKeyType="done"
                                        value={password.value}
                                        onChangeText={(text: string) => setPassword({ value: text, error: emptyFieldValidator(text), hasError: hasError('signup.password',text), touched: true })}
                                        secureTextEntry
                                    /> 

                            </Item>

                            <Item underline={false}>
                                <Text note={true} style={styles.errorText}>{password.error}</Text>
                            </Item>

                            <Item success={confirmPassword.value.length > 0 && !confirmPassword.hasError}
                                error={confirmPassword.touched && confirmPassword.hasError}
                            >
                                    <Icon android='md-key' ios='ios-key' />
                                    <Input
                                        placeholder="Confirm Password"
                                        label="Confirm Password"
                                        returnKeyType="done"
                                        value={confirmPassword.value}
                                        onChangeText={(text: string) => setConfirmPassword({ value: text, error: confirmPasswordValidator(password.value, text), hasError: hasError('signup.confirm_password',text), touched: true })}
                                        secureTextEntry
                                    /> 

                            </Item>

                            <Item underline={false}>
                                <Text note={true} style={styles.errorText}>{confirmPassword.error}</Text>
                            </Item>
                        </Form>  
                    </CardItem>
                    <CardItem last>
                        <Row style={{alignItems:'center', justifyContent: 'center'}}>
                            <Button  
                                // style={styles.alignButton}
                                dark={true}
                                iconLeft={true}
                                disabled={loading || company.hasError || email.hasError || password.hasError || confirmPassword.hasError}
                                onPress={onSignUp}
                            >
                                <Icon  android='md-log-in' ios='ios-log-in'></Icon>
                                <Text>Register</Text>
                            </Button>
                        </Row>
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