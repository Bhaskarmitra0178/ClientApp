import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { View, Container, Content, Form, Item, Icon, Input, Header, Button, Text, Toast } from 'native-base'
import { emailValidator, hasError, emptyFieldValidator, confirmPasswordValidator, registerUser } from '../../Utils/Services/AuthService'


export const UserProfile = () => {
    /**
    * Variable declaration
    */
   const [userName, setUserName] = useState({ value: '', error: '', hasError: true, touched: false });
   const [email, setEmail] = useState({ value: '', error: '', hasError: true, touched: false });
   const [password, setPassword] = useState({ value: '', error: '', hasError: true, touched: false });
   const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '', hasError: true, touched: false });
   const [loading, setLoading] = useState<boolean>(false);

   /**
    * On sign up triggered.
    */
   const onSignUp = () => {
       registerUser({email: email.value, password: password.value})
       .then(console.log)
       .catch((error: any) => {
         // Handle Errors here.
         Toast.show({
           text: error.message,
           buttonText: "Okay",
           position: "bottom",
           type: "danger",
           duration: 2000
         })

         console.log(error);
         // [END_EXCLUDE]
       });
   }
    /**
    * Render Function
    */
   return (
       <Container>
           <Header />
           <Content>
               <Form>
                   <Item 
                       success={userName.value.length > 0 && !userName.hasError}
                       error={userName.touched && userName.hasError}
                   >
                       <Icon  android='md-person' ios='ios-person' />
                       <Input 
                           label="Username"
                           placeholder="Username"
                           returnKeyType="next"
                           value={userName.value}
                           onChangeText={text => setUserName({ value: text, error: emptyFieldValidator(text), hasError: hasError('signup.username',text), touched: true })}
                       />
                   </Item>

                   <Item underline={false}>
                           <Text note style={styles.errorText}>{email.error}</Text>
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
                               autoCompleteType="email"
                               keyboardType='email-address'
                               textContentType='emailAddress'
                               onChangeText={text => setEmail({ value: text, error: emailValidator(text), hasError: hasError('signup.email',text), touched: true })}
                           />
                       </Item>

                   <Item underline={false}>
                           <Text note style={styles.errorText}>{email.error}</Text>
                   </Item>
                   
                       <Item success={password.value.length > 0 && !password.hasError}
                           error={password.touched && password.hasError}
                       >
          
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
                           <Text note style={styles.errorText}>{password.error}</Text>
                       </Item>

                       <Item success={confirmPassword.value.length > 0 && !confirmPassword.hasError}
                           error={confirmPassword.touched && confirmPassword.hasError}
                       >
          
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
                           <Text note style={styles.errorText}>{confirmPassword.error}</Text>
                       </Item>
                   </Form>

                   <Button  
                       style={[styles.center,styles.alignButton]}
                       dark
                       iconLeft
                       disabled={loading || userName.hasError || email.hasError || password.hasError || confirmPassword.hasError}
                       onPress={onSignUp}
                   >
                       <Icon  android='md-log-in' ios='ios-log-in'></Icon>
                       <Text>Register</Text>
               </Button>    
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
       justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center'
   },
   container: {
       flex: 1,
       backgroundColor: '#fff',
       alignItems: 'center',
       justifyContent: 'center',
   },
   alignButton: {
       marginTop: 30
   }  
})