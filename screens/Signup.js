/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  withAuthenticator,
  useAuthenticator
} from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import Button from "../components/Button";  
import COLORS from '../constants/colors';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Pressable,
  TextInput,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


import { signUp } from 'aws-amplify/auth';
import {  PasswordField, TextField } from '@aws-amplify/ui-react-native/dist/primitives';

type SignUpParameters = {
  username: string;
  password: string;
  email: string;
  phone_number: string;
  accHolderName:string;
  accountNo:string;
  bankName:string;
  ifscCode:string;
  branch:string;
};
async function handleSignUp({
  username,
  password,
  email,
  phone_number,
  accHolderName,
  accountNo,
  bankName,
  ifscCode,
  branch
}: SignUpParameters,navigation) {
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username:username,
      password:password,
      options: {
        userAttributes: {
          email:email,
          phone_number:phone_number, // E.164 number convention
          'custom:accHolderName':accHolderName,
          'custom:accountNo':accountNo,
          'custom:bankName':bankName,
          'custom:ifscCode':ifscCode
        },
        // optional
        autoSignIn: true // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
      }
    });

    console.log(userId);
    console.log(nextStep);
    console.log(isSignUpComplete)
    console.log(nextStep.signUpStep)
  
    if(!isSignUpComplete && nextStep!=null && nextStep.signUpStep== "CONFIRM_SIGN_UP")
    {
      navigation.navigate("Login",{signupMessage:"Registered Successfully. Once approved by admin (notified on registered email) you will be able tologin"})
    }
    
    
     
  } catch (error) {
    console.log('error signing up:', error);
  }
}

const org: SignUpParameters={username:"testuser",password:"Jai!22071980",email:"n_j_jaiganesh@yahoo.co.in",phone_number:"+918939927677",accHolderName:"jaiganesh",accountNo:"1234566",bankName:"hdfc",ifscCode:"hdfc00000101923",branch:"asfsdfsd"	}

function Signup({navigation,route}): React.JSX.Element {
    
  const[userName,setUserName]=useState("")
const[password,setPassword]=useState("")
const[email,setEmail]=useState("")
const[bankName,setBankName]=useState("")
const[phone_number,setPhoneNumber]=useState("")
const[accHolderName,setAccHolderName]=useState("")
const[accountNo,setAccountNo]=useState("")
const[ifscCode,setIfscCode]=useState("")
const[branch,setBranch]=useState("")


  
  
  return (
    
     
      
     <View style={styles.container}>    
     <StatusBar style="auto" />
     <View style={styles.inputView}>
      <TextInput style={styles.TextInput} placeholder='User name' placeholderTextColor="#8a7842" onChangeText={(uname)=>setUserName(uname)}/>
     </View>
     <View style={styles.inputView}>
      <TextInput style={styles.TextInput} onChangeText={(pwd)=>setPassword(pwd)} placeholder='Password' placeholderTextColor="#8a7842" secureTextEntry={true}></TextInput>
      </View>
      <View style={styles.inputView}>
      <TextInput style={styles.TextInput} onChangeText={(emailText)=>setEmail(emailText)} placeholder='Email' placeholderTextColor="#8a7842"/>
      </View><View style={styles.inputView}>
      <TextInput style={styles.TextInput} onChangeText={(text)=>setPhoneNumber(text)} placeholder='Phone' placeholderTextColor="#8a7842"/>
      </View><View style={styles.inputView}>
      <TextInput  id='holderName' style={styles.TextInput}  onChangeText={(text)=>setAccHolderName(text)} placeholder='Acc. Holder name' placeholderTextColor="#8a7842"/>
      </View><View style={styles.inputView}>
      <TextInput  id='accountNo' style={styles.TextInput} onChangeText={(text)=>setAccountNo(text)} placeholder='Acc. No.' placeholderTextColor="#8a7842"/>
      </View><View style={styles.inputView}>
      <TextInput  id='bankName' style={styles.TextInput} onChangeText={(text)=>setBankName(text)} placeholder='Bank' placeholderTextColor="#8a7842"/>
      </View><View style={styles.inputView}>
      <TextInput  id='ifscCode' style={styles.TextInput} onChangeText={(text)=>setIfscCode(text)} placeholder='IFSC code' placeholderTextColor="#8a7842"/>
      </View><View style={styles.inputView}>
      <TextInput  id='branch' style={styles.TextInput} onChangeText={(text)=>setBranch(text)} placeholder='Branch' placeholderTextColor="#8a7842"/>
      </View>
      <View style={{ flexDirection:"row" }}>
      <Button color="#000000"  
        title="Sign up" style={styles.button}
        onPress={() => { org.accHolderName=accHolderName;org.accountNo=accountNo;
          org.bankName=bankName;
          org.email=email;
          org.ifscCode=ifscCode;
          org.password=password;
          org.phone_number=phone_number;
          org.username=userName;
          org.branch=branch;
          console.log(org);     
          handleSignUp(org,navigation)
          }}           
      />
      <Button style={styles.button} title="Cancel" onPress={()=>navigation.navigate("Login",{signupMessage:""})}></Button>
      </View>
    </View>
      
    
  );
}

const styles = StyleSheet.create({
  
  inputView: {
    backgroundColor: "#225560",
    borderRadius: 35,
    width: "60%",
    height: 35,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 100,
    flex: 1,
    padding: 10,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "20%",
    borderRadius: 25,
    height: 42,
    marginLeft:20,
    
    fontWeight: "bold",
    
    marginTop: 40,
    
    
  },


});

export default Signup;
