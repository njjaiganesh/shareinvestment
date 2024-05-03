import { View, Text, Image , Pressable, TextInput, TouchableOpacity,SafeAreaView } from 'react-native'
import { getCurrentUser } from 'aws-amplify/auth';
import Button from "../components/Button";

import { signOut } from '@aws-amplify/auth';
const LandingPage = ({ navigation,route }) => {
    const executeOnLoad= async ()=>{
        try {
            const { username, userId, signInDetails } = await getCurrentUser();
            console.log(`The username: ${username}`);
            console.log(`The userId: ${userId}`);
            console.log(`The signInDetails: ${signInDetails}`);
          } catch (err) {
            console.log(err);
          }
    }

    return (
        <SafeAreaView style={{ flex: 1,  marginTop:180 }}>            
            <View style={{ flex: 1, marginHorizontal: 22 }} onLayout={executeOnLoad}>
                <Text>Hi User</Text>
                <Button onPress={()=>{signOut();navigation.navigate("Login",{resetState:"reset"})}} title="Sign out"></Button>
            </View>
        </SafeAreaView>
    )
}

export default LandingPage