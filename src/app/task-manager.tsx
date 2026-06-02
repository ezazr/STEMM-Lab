import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  FlatList,
} from "react-native";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../services/firebaseConfig";

export default function TaskManager() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const snapshot = await getDocs(collection(db, "tasks"));

    const loadedTasks = snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));

    setTasks(loadedTasks);
  }

  async function addTask() {
    if (task.trim() === "") return;

    await addDoc(collection(db, "tasks"), {
      title: task,
      status: "Pending",
      createdAt: new Date().toISOString(),
    });

    setTask("");
    loadTasks();
  }

  async function deleteTask(id: string) {
    await deleteDoc(doc(db, "tasks", id));
    loadTasks();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Manager</Text>

      <TextInput
        placeholder="Enter task"
        value={task}
        onChangeText={setTask}
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={addTask}>
        <Text style={styles.buttonText}>Add Task</Text>
      </Pressable>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Text style={styles.taskTitle}>{item.title}</Text>

            <Text>{item.status}</Text>

            <Pressable
              style={styles.deleteButton}
              onPress={() => deleteTask(item.id)}
            >
              <Text style={{ color: "white" }}>Delete</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F7FA",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2563EB",
    textAlign: "center",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

  taskCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  taskTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 6,
  },

  deleteButton: {
    backgroundColor: "#DC2626",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
});