import React, { useEffect, useState,Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  SafeAreaView,
  Image,
  Dimensions
  
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
      <ExampleOne/>
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
});