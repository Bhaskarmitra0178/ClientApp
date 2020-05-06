import React, { useState } from 'react'
import { Container, Header, Content, Form, Item, Input,  Button, Toast, Icon,Text, View } from 'native-base';
import { emptyFieldValidator, emailValidator, hasError } from '../../Utils/Services/AuthService';
import { useDispatch } from 'react-redux';
import * as authenticatedUsers from '../../Utils/Data/LoginForm.data';
import { authenticatedUserDetails } from '../../Utils/Data/AuthenticatedUsers';
import {StyleSheet} from 'react-native';


export const Login = (props: any) => {
    /**
     * Variable declaration
     */
    const [email, setEmail] = useState({ value: '', error: '', hasError: true, touched: false });
    const [password, setPassword] = useState({ value: '', error: '', hasError: true, touched: false });
    const [loading, setLoading] = useState<boolean>(false);
    const [eyePassword, setEyePassword] = useState<boolean>(false);
    const dispatch = useDispatch();
  
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

      if (
          authenticatedUsers.users.filter((user: {email: string, password: string}) => JSON.stringify(user) === JSON.stringify(payload)).length > 0
        ) {
            const userDetail = authenticatedUserDetails
            .find((user: {email: string, userName: string}) => user.email === payload.email);
            const dispatchData = {
                accessToken: 'dummy-token',
                userDetails: {
                    email: email.value,
                    userName: userDetail && userDetail.userName || ''
                }
            }
          
            dispatch({type: 'SIGN_IN', payload: dispatchData})
            setLoading(false);
            Toast.show({
                text: `Logged In Successfully! Welcome ${dispatchData.userDetails.userName}`,
                buttonText: "x",
                position: "bottom",
                type: "success",
                duration: 2000
              })
        
        } else {
            setLoading(false);
            Toast.show({
                text: "Wrong Credentials! Please try again.",
                buttonText: "Okay",
                position: "bottom",
                type: "danger",
                duration: 2000
            })

        }
    };

    /**
     * Render Function
     */
    return (
        <Container>
            <Header />
            <Content>
                <Form>
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
                                onChangeText={text => setEmail({ value: text, error: emailValidator(text), hasError: hasError('login.email',text), touched: true })}
                            />
                        </Item>

                    <Item underline={false}>
                            <Text note style={styles.errorText}>{email.error}</Text>
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
                            <Text note style={styles.errorText}>{password.error}</Text>
                        </Item>
                    </Form>

                    <Button  
                        style={[styles.center,styles.alignButton]}
                        dark
                        iconLeft
                        disabled={loading || email.hasError || password.hasError}
                        onPress={onLoginPressed}
                    >
                        <Icon  android='md-log-in' ios='ios-log-in'></Icon>
                        <Text>Login</Text>
                </Button>    
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
            marginTop: 30
        }
})