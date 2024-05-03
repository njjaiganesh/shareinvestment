import React, { useState } from 'react';
import { signOut } from '@aws-amplify/auth';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Table, Row, Rows } from 'react-native-table-component';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Pressable,
    SafeAreaView,
    Image,
    Dimensions,
    Animated,
    StatusBar
    
  } from 'react-native'
  import Button from "../components/Button";
const UserLaunch = ({ navigation,route }) => {
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
        <SafeAreaView style={{ flex: 1,  marginTop:10 }}>            
            <View style={{ flex: 1, marginHorizontal: 22 }} onLayout={executeOnLoad}>
            <View style={{ flexDirection:"row" }}>
                <Text style={styles.accountText}>Hi 10000338893,</Text>
                <Button onPress={()=>{signOut();navigation.navigate("Login",{resetState:"reset"})}} style={styles.buttonStyle} title="Sign out"></Button>
    </View>            
      <TabViewExample/>

            </View>
        </SafeAreaView>
    )
}

export default UserLaunch
class TabViewExample extends React.Component {
    state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Investment 1' },
        { key: 'second', title: 'Investment 2' },
        { key: 'third', title: 'Investment 3' },
        { key: 'fourth', title: 'Investment 4' },
        { key: 'fifth', title: 'Investment 5' },
      ],
    };
  
    _handleIndexChange = (index) => this.setState({ index });
  
    _renderTabBar = (props) => {
      const inputRange = props.navigationState.routes.map((x, i) => i);
  
      return (
        <View style={styles.tabBar}>
          {props.navigationState.routes.map((route, i) => {
            const opacity = props.position.interpolate({
              inputRange,
              outputRange: inputRange.map((inputIndex) =>
                inputIndex === i ? 1 : 0.5
              ),
            });
  
            return (
              <TouchableOpacity
                style={styles.tabItem}
                onPress={() => this.setState({ index: i })}>
                <Animated.Text style={{ opacity }}>{route.title}</Animated.Text>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    };
  
    _renderScene = SceneMap({
      first: FirstRoute,
      second: SecondRoute,
      third: ThirdRoute,
      fourth: FourthRoute,
      fifth: FifthRoute
    });
  
    render() {
      return (
        <TabView
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._handleIndexChange}
        />
      );
    }
  }
  const FirstRoute = () => (
    <View style={styles.content}>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
          <Row data={sectionHead} style={styles.head}  />
            <Row data={section[0].tableHead} style={styles.head}  />
            <Rows data={section[0].tableData}  />
          </Table>
        </View>
  );
  const SecondRoute = () => (
    <View style={styles.content}>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
          <Row data={sectionHead} style={styles.head}  />
            <Row data={section[1].tableHead} style={styles.head}  />
            <Rows data={section[1].tableData}  />
          </Table>
        </View>
  );
  const ThirdRoute = () => (
    <View style={styles.content}>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
          <Row data={sectionHead} style={styles.head}  />
            <Row data={section[0].tableHead} style={styles.head}  />
            <Rows data={section[0].tableData}  />
          </Table>
        </View>
  );
  const FourthRoute = () => (
    <View style={styles.content}>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
          <Row data={sectionHead} style={styles.head}  />
            <Row data={section[1].tableHead} style={styles.head}  />
            <Rows data={section[1].tableData}  />
          </Table>
        </View>
  );
  const FifthRoute = () => (
    <View style={styles.content}>
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
          <Row data={sectionHead} style={styles.head}  />
            <Row data={section[1].tableHead} style={styles.head}  />
            <Rows data={section[1].tableData}  />
          </Table>
        </View>
  );
  const sectionHead=["Inv. date","Inv. Amt","Paid date","Pad Amt"]
const section = [
        {
          tableHead: ['23-Mar-2023',80000,'',''],
          tableData: [['','','24-Apr-2023', '5000'], ['','','24-May-2023', '5000'], ['','','24-Jun-2023', '5000'], ['','','24-Jul-2023', '5000'], ['','','24-Aug-2023', '5000'], ['','','24-Sep-2023', '5000'], ['','','24-Oct-2023', '5000'],['','','24-Nov-2023', '5000'],['','','24-Dec-2023', '5000'],['','','24-Jan-2024', '5000'],['','','24-Feb-2024', '5000'],['','','24-Mar-2024', '24600']],
        },
        {
          tableHead: ['26-Jan-2024',65000,'',''],
          tableData: [['','','24-Feb-2023', '5000'], ['','','24-Apr-2024', '5000'], ['','','24-May-2024', '5000'], ['','','24-Jun-2024', '5000']],
        }
      ]
      const styles = StyleSheet.create({
        container: { width: 400, flex: 1, padding: 20, alignSelf: 'center',    backgroundColor: 'white',
      },
        todo: { marginBottom: 15 },
        input: {
          backgroundColor: '#ddd',
          marginBottom: 10,
          padding: 8,
          fontSize: 18
        },
        todoName: { fontSize: 20, fontWeight: 'bold' },
        buttonContainer: {
          alignSelf: 'center',
          paddingHorizontal: 8
        },
        buttonText: { color: 'black', padding: 16, fontSize: 14 },
        accountText: { color: 'black',  fontSize: 14 },
        text: { padding: 6, color: 'black'},
        content: {
          
          marginTop: 0,
          width: '92%',
          borderTopColor: '#E9E9E9',
          borderTopWidth: 1,
          alignSelf: 'center',
           
        },
        buttonStyle:{
            width:'40%',
            height:40,
            marginLeft:150,
            borderWidth:0,
            marginTop:-10
        },
        header: {
          
          marginTop: 0,
          padding: 6,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '92%',
          borderWidth: 2,
          borderColor: '#c8e1ff',
          alignSelf: 'center',
        },
        head: {  backgroundColor: '#f1f8ff' },
        tableheader: {
          
          marginTop: 30,
          padding: 6,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '92%',
          borderWidth: 2,
          borderColor: '#c8e1ff',
          alignSelf: 'center',    
        },
        tabBar: {
          flexDirection: 'row',
          paddingTop: StatusBar.currentHeight,
        },
        tabItem: {
          flex: 1,
          alignItems: 'center',
          padding: 16,
        },
      });