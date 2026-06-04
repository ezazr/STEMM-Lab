import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

export default function CameraScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [message, setMessage] = useState("No image selected.");

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
        allowsEditing: true,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;

        setImage(imageUri);

        await addDoc(collection(db, "deviceLogs"), {
          feature: "Camera",
          method: "Mobile Camera",
          imageCaptured: true,
          createdAt: serverTimestamp(),
        });

        setMessage("Photo captured successfully.");
      }
    } catch (error: any) {
      setMessage(error.message);
    }
  }

  async function pickImage() {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        setMessage("Gallery permission denied.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 0.7,
        allowsEditing: true,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;

        setImage(imageUri);

        await addDoc(collection(db, "deviceLogs"), {
          feature: "Camera",
          method: "Image Picker",
          imageCaptured: true,
          createdAt: serverTimestamp(),
        });

        setMessage("Image selected successfully.");
      }
    } catch (error: any) {
      setMessage(error.message);
    }
  }

  function clearImage() {
    setImage(null);
    setMessage("Image cleared.");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Camera Feature</Text>

      <Text style={styles.subtitle}>
        Camera + Image Picker + Firebase
      </Text>

      <Pressable style={styles.button} onPress={takePhoto}>
        <Text style={styles.buttonText}>Take Photo</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick Image from Gallery</Text>
      </Pressable>

      {image && (
        <>
          <Image source={{ uri: image }} style={styles.image} />

          <Pressable style={styles.clearButton} onPress={clearImage}>
            <Text style={styles.buttonText}>Clear Image</Text>
          </Pressable>
        </>
      )}

      <View style={styles.messageBox}>
        <Text style={styles.messageText}>{message}</Text>
      </View>
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
    marginTop: 6,
    marginBottom: 24,
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },

  secondaryButton: {
    backgroundColor: "#111827",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },

  clearButton: {
    backgroundColor: "#DC2626",
    padding: 15,
    borderRadius: 10,
    marginTop: 12,
  },

  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },

  image: {
    width: "100%",
    height: 260,
    borderRadius: 12,
    resizeMode: "cover",
    marginTop: 12,
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