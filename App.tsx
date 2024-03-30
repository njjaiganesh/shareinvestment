import React, { useEffect, useState,Component } from 'react';
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
import { Table, Row, Rows } from 'react-native-table-component';
import Accordion from 'react-native-collapsible/Accordion';
import {
  withAuthenticator,
  useAuthenticator
} from '@aws-amplify/ui-react-native';
import { generateClient } from 'aws-amplify/api';
import { createTodo } from './src/graphql/mutations';
import { listTodos } from './src/graphql/queries';
import { TabView, SceneMap } from 'react-native-tab-view';

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
            
class ExampleOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSections: [],
      section: [
        {
          tableHead: ['23-Mar-2023',80000],
          tableData: [['','','24-Apr-2023', '5000'], ['','','24-May-2023', '5000'], ['','','24-Jun-2023', '5000'], ['','','24-Jul-2023', '5000'], ['','','24-Aug-2023', '5000'], ['','','24-Sep-2023', '5000'], ['','','24-Oct-2023', '5000'],['','','24-Nov-2023', '5000'],['','','24-Dec-2023', '5000'],['','','24-Jan-2024', '5000'],['','','24-Feb-2024', '5000'],['','','24-Mar-2024', '24600']],
        },
        {
          tableHead: ['26-Jan-2024',65000],
          tableData: [['','','24-Feb-2023', '5000'], ['','','24-Apr-2024', '5000'], ['','','24-May-2024', '5000'], ['','','24-Jun-2024', '5000']],
        }
      ],
    };
  }

  renderHeader = section => {
    console.log('state', section);
    let index = this.state.activeSections[0];
    let currentObj = this.state.section[index];
    return (
      <View style={styles.header}>
        <Text style={{color:'black'}}>{section.tableHead[0]}    {section.tableHead[1]}</Text>
        
        <Image
          style={{ height: 25, width: 25 }}
          source={
            currentObj == section
              ? {
                  uri:
                    'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-down-512.png',
                }
              : {
                  uri:
                    'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-right-512.png',
                }
          }
        />
      </View>
    );
  };

  renderContent = section => {
    return (
      <View style={styles.content}>
        <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
          <Rows data={section.tableData} textStyle={styles.text}  />
        </Table>
      </View>
    );
  };

  updateSections = activeSections => {
    this.setState({ activeSections });
  };

  render() {
    return (
      <View>
      <View style={styles.tableheader}>
      <Text style={{fontWeight: 'bold',color: 'black'}}>Inv. date</Text>
      <Text style={{fontWeight: 'bold',color: 'black'}}>Inv. Amt.</Text>
<Text style={{fontWeight: 'bold',color: 'black'}}>Paid Date</Text>
<Text style={{fontWeight: 'bold',color: 'black'}}>Paid Amount</Text>
</View>
<View>
 <Accordion
        sections={this.state.section}
        activeSections={this.state.activeSections}
        renderHeader={this.renderHeader}
        renderContent={this.renderContent}
        onChange={this.updateSections}
        duration={500}
        underlayColor="#fff"
      />
      </View>
      <View>
 
      </View>
</View>
     
    );
  }
}
const initialState = { name: '', description: '' };
const client = generateClient();

const userSelector = (context) => [context.user];

const SignOutButton = () => {
  const { user, signOut } = useAuthenticator(userSelector);
  return (
    <Pressable onPress={signOut} style={styles.buttonContainer}>
      <Text style={styles.buttonText}>
        Hello, 5611345599900
      </Text>
    </Pressable>
  );
};
const App = () => {
  const [formState, setFormState] = useState(initialState);
  const [todos, setTodos] = useState([]);

  
  useEffect(() => {
    fetchTodos();
  }, []);

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function fetchTodos() {
    try {
      // const todoData = await client.graphql({
      //   query: listTodos
      // });
      const todoData={ data: { listTodos: { items:[]}}}
      const todos = todoData.data.listTodos.items;
      setTodos(todos);
    } catch (err) {
      console.log('error fetching todos');
    }
  }

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return;
      const todo = { ...formState };
      setTodos([...todos, todo]);
      setFormState(initialState);
      await client.graphql({
        query: createTodo,
        variables: {
          input: todo
        }
      });
    } catch (err) {
      console.log('error creating todo:', err);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <SignOutButton />
      <TabViewExample/>
    </View>
  </SafeAreaView>
  );
};

export default withAuthenticator(App);

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
  text: { padding: 6, color: 'black'},
  content: {
    
    marginTop: 0,
    width: '92%',
    borderTopColor: '#E9E9E9',
    borderTopWidth: 1,
    alignSelf: 'center',
     
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