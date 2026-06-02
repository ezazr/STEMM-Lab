import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

export default function CameraScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  async function takePhoto() {
    try {
      const permission =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!permission.granted) {
        setMessage("Camera permission denied.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        quality: 0.7,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);

        await addDoc(collection(db, "deviceLogs"), {
          feature: "Camera",
          imageCaptured: true,
          createdAt: serverTimestamp(),
        });

        setMessage("Photo captured and logged to Firebase.");
      }
    } catch (error: any) {
      setMessage(error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Camera Feature</Text>
      <Text style={styles.subtitle}>Device Capability Feature</Text>

      <Pressable style={styles.button} onPress={takePhoto}>
        <Text style={styles.buttonText}>Take Photo</Text>
      </Pressable>

      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      )}

      {message !== "" && (
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#F5F7FA",
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#2563EB",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: "#555",
    marginBottom: 24,
    marginTop: 6,
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    resizeMode: "cover",
  },
  messageBox: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  messageText: {
    textAlign: "center",
  },
});