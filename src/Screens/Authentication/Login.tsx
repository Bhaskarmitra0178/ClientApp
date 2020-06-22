import React, { useState, useEffect } from 'react'
import { Container, Content, Form, Item, Input,  Button, Toast, Icon,Text, Thumbnail, Grid, Row, Spinner, Card, CardItem } from 'native-base';
import { emptyFieldValidator, emailValidator, hasError, loginUser } from '../../Utils/Services/AuthService';
import {StyleSheet} from 'react-native';
import { initialiseImages } from '../../Utils/Services/ExpoService';
import { globalStyles } from '../../Utils/Data/Styles';
import { TouchableOpacity } from 'react-native-gesture-handler';



export const Login = (props: any) => {
    /**
     * Variable declaration
     */
    const [logo, setLogo] = useState<string>('');
    const [email, setEmail] = useState({ value: '', error: '', hasError: true, touched: false });
    const [password, setPassword] = useState({ value: '', error: '', hasError: true, touched: false });
    const [loading, setLoading] = useState<boolean>(false);
    const [eyePassword, setEyePassword] = useState<boolean>(false);
    
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
     * When login button is pressed
     */
    const onLoginPressed = () => {
      setLoading(true);
      const emailError = emailValidator(email.value);
      const passwordError = emptyFieldValidator(password.value);
      
    
      if (emailError || passwordError) {
        setEmail({ ...email, error: emailError, hasError: hasError('login.email', email.value) });
        setPassword({ ...password, error: passwordError, hasError: hasError('login.password', password.value) });
        return;
      }

      const payload = {
        email: email.value,
        password: password.value
      }

      loginUser(payload)
        .catch((error: any) => {
            Toast.show({
                text: error.message,
                position: "bottom",
                type: "danger",
                duration: 2000
            })
            setLoading(false);
            console.log(error);
        });

    };

    /**
     * Render Function
     */
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
                                        onChangeText={text => setEmail({ value: text, error: emailValidator(text), hasError: hasError('login.email',text), touched: true })}
                                    />
                                </Item>

                            <Item underline={false}>
                                <Text note={true} style={styles.errorText}>{email.error}</Text>
                            </Item>
                            
                                <Item success={password.value.length > 0 && !password.hasError}
                                    error={password.touched && password.hasError}
                                >

                                    {!eyePassword && <Icon  onPress={() => setEyePassword(true)} android='md-eye' ios='ios-eye'></Icon>}
                                    {eyePassword && <Icon  onPress={() => setEyePassword(false)}  android='md-eye-off' ios='ios-eye-off'></Icon>}
                                    
                                        <Input
                                            placeholder="Password (eg. Hello@123)"
                                            label="Password"
                                            returnKeyType="done"
                                            value={password.value}
                                            onChangeText={(text: string) => setPassword({ value: text, error: emptyFieldValidator(text), hasError: hasError('login.password',text), touched: true })}
                                            secureTextEntry={!eyePassword}
                                        /> 
                                
                                </Item>
                                <Item underline={false}>
                                    <Text note={true} style={styles.errorText}>{password.error}</Text>
                                </Item>
                            </Form>
                        </CardItem>
                        <CardItem style={{justifyContent: 'center'}}>
                            <Button 
                                // style={styles.alignButton}
                                dark={true}
                                iconLeft={true}
                                disabled={loading || email.hasError || password.hasError}
                                onPress={onLoginPressed}
                            >
                                <Icon  android='md-log-in' ios='ios-log-in'></Icon>
                                <Text>Login</Text>
                            </Button>    
                        </CardItem>
                        
                                <TouchableOpacity onPress={() => props.navigation.navigate('ForgotPassword')}>
                                <CardItem last style={{justifyContent:'center'}}>
                                    <Text note={true}
                                        // style={styles.alignButton}
                                        
                                    > Forgot Password ?</Text>  
                               </CardItem>
                                </TouchableOpacity>


                    </Card>
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
           alignItems: 'center',
        },
        alignButton: {
            marginTop: 20
        }
})