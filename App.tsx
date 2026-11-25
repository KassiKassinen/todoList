import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import { Task } from './types/task';
import Row from './components/Row';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'TODO_LIST_KEY'

export default function App() {

  const [input, setInput] = useState<string>("")
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY)
        if (json) setTasks(JSON.parse(json))
      } catch (e) {
      }
    })()
  }, [])

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])


  const addTask = async () => {
    if (!input.trim()) return
    const id = tasks.length + 1
    const task: Task = { id, text: input, completed: 0 }
    setTasks([...tasks, task])
    setInput("")
  }

  const toggleTodo = (id: number) => {
    setTasks(prevTasks => //päivittää task-listan. prevTask = nykyiset arvot ennen päivitystä
      prevTasks.map(task => //käydään lista läpi
        task.id === id //vertaa annettua id:tä tehtävän id:hen. jos löytyy oikea id, suoritetaan  alempi koodi
          ? {
            ...task, //kopioi tiedot uuteen olioon
            completed: task.completed === 1 ? 0 : 1 //jos 1, vaihdetaan 0, muuten 1
          }
          : task //palauttaa muut tehtävät sellaisenaan
      )
    )
  }


  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder='Add task'
          onSubmitEditing={addTask}
        />
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Row
            item={item}
            toggleTodo={toggleTodo}
          />
        )}
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
