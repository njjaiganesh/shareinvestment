import { View, Text, Image , Pressable, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from '../constants/colors';
import { signIn,signOut,getCurrentUser } from '@aws-amplify/auth';

import Button from "../components/Button";

const Login = ({ navigation,route }) => {
    const [signInMessage, setSignInMessage] = React.useState('');
    const executeOnLoad= async ()=>{
        try {
            signOut()   
          } catch (err) {
            console.log(err);
          }
    }

      
    async function handleSignIn({ userName, password }) {
        try {       
            route.params=null
          const { isSignedIn, nextStep } = await signIn({ username:userName, password:password });
          console.log(isSignedIn)
          console.log(nextStep)
          
          if(!isSignedIn && nextStep!=null && nextStep.signInStep== "CONFIRM_SIGN_UP")
        {
           setSignInMessage("Your registration is yet to be approved. Please contact administrator")
        }
        else if(isSignedIn)
        {
            navigation.navigate("UserLaunch")
        }
        } catch (error) {
            setSignInMessage(error.message)
        }
      }
      
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const[userName, setUserName]=useState("")
    const[password,setPassword]=useState("")
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white, marginTop:180 }}  >            
            
            <View style={{ flex: 1, marginHorizontal: 22 }} onLayout={executeOnLoad} >
            <Text style={{color:'red'}}>{route.params==null?"":route.params.signupMessage}</Text>
            <Text style={{color:'red'}}>{route.params==null?signInMessage:route.params.resetState==null?signInMessage:""}</Text>
                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>User name</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your user name'
                            placeholderTextColor={COLORS.black}
                            onChangeText={(text)=>setUserName(text)}
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        marginVertical: 8
                    }}>Password</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            placeholder='Enter your password'
                            placeholderTextColor={COLORS.black}
                            secureTextEntry={true}
                            onChangeText={(text)=>setPassword(text)}
                            style={{
                                width: "100%"
                            }}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            

                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginVertical: 6
                }}>
                    

                  
                </View>

                <Button
                    title="Login"
                    filled
                    onPress={()=>{console.log(userName); handleSignIn({userName,password})}}
                    style={{
                        marginTop: 18,
                        marginBottom: 4,
                    }}
                />

                
                
                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Don't have an account ? </Text>
                    <Pressable
                        onPress={() => navigation.navigate("Signup")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.primary,
                            fontWeight: "bold",
                            marginLeft: 6
                        }}>Sign up</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Login