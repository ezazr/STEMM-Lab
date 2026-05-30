import { View, Text, Button } from "react-native";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

export default function FirebaseTest() {
  async function testFirebase() {
    try {
      console.log("Testing Firebase...");
      await addDoc(collection(db, "test"), {
        message: "Firebase works",
        createdAt: new Date().toISOString(),
      });
      alert("Firebase test saved");
    } catch (error: any) {
      console.log("Firebase test error:", error);
      alert(error.message);
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Firebase Test</Text>
      <Button title="Test Firebase" onPress={testFirebase} />
    </View>
  );
}