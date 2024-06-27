import { Keyboard, Platform, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView } from 'react-native';
import Task from './Task';
import axios from 'axios';

export default function HomeScreen() {
    const [task, setTask] = useState('');
    const [taskItems, setTaskItems] = useState([]);
  
    const handleAddTask = async () => {
      Keyboard.dismiss();
      setTaskItems([...taskItems, task]);
      setTask('');
      const response = await axios.post('http://192.168.55.105:5000/tasks', { task });
      const newTask = response.data;
      // Update taskItems state with the new task
    };
  
  
    const completeTask = async (index) => {
      let itemsCopy = [...taskItems];
      
      const taskToDelete = itemsCopy[index];
      id=itemsCopy.splice(index, 1);
      console.log(id);
      setTaskItems(itemsCopy);
      try {
        // Delete the task from the database
        await axios.delete('http://192.168.55.105:5000/tasks', { data: { task: taskToDelete } });
    } catch (error) {
        console.error('Error deleting task:', error);
        // Handle error here if needed
    }
    };
  
    return (
      
      <View style={styles.container}>
        <StatusBar style="auto" />
        {/* Today's tasks */}
        <View style={styles.taskWrapper}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>
          <View style={styles.items}>
            {/* This where the tasks will go */}
            {taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task text={item} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        {/* Write a Task */}
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.writeTaskWrapper}>
          <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={(text) => setTask(text)} />
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E8EAED',
    },
    taskWrapper: {
      paddingTop: 50,
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    items: {
      marginTop: 30,
    },
    writeTaskWrapper: {
      position: 'absolute',
      bottom: 60,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    input: {
      paddingVertical: 15,
      paddingHorizontal: 15,
      backgroundColor: '#FFF',
      borderRadius: 60,
      borderColor: '#C0C0C0',
      borderWidth: 1,
      width: 250,
    },
    addWrapper: {
      width: 60,
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#C0C0C0',
      borderWidth: 1,
    },
    addText: {},
  });