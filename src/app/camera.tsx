import { View, Text, Pressable, StyleSheet, Image, Platform } from "react-native";
import { useRef, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

export default function CameraScreen() {
  const videoRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);

  const [image, setImage] = useState<string | null>(null);
  const [message, setMessage] = useState("No image selected or captured yet.");
  const [webcamStarted, setWebcamStarted] = useState(false);

  async function startWebcam() {
    if (Platform.OS !== "web") {
      setMessage("Live webcam preview is for browser only.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      setWebcamStarted(true);
      setMessage("Live webcam started.");
    } catch (error: any) {
      setMessage(`Webcam error: ${error.message}`);
    }
  }

  async function captureWebcamPhoto() {
    if (!videoRef.current || !canvasRef.current) {
      setMessage("Webcam is not ready.");
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/png");
    setImage(imageData);

    await addDoc(collection(db, "deviceLogs"), {
      feature: "Camera",
      method: "Live Webcam Capture",
      imageCaptured: true,
      platform: Platform.OS,
      createdAt: serverTimestamp(),
    });

    setMessage("Webcam photo captured and logged to Firebase.");
  }

  async function pickImageFromFiles() {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        setMessage("File/gallery permission denied.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 0.7,
        allowsEditing: true,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);

        await addDoc(collection(db, "deviceLogs"), {
          feature: "Camera",
          method: "Image Picker / File Upload",
          imageCaptured: true,
          platform: Platform.OS,
          createdAt: serverTimestamp(),
        });

        setMessage("Image selected and logged to Firebase.");
      }
    } catch (error: any) {
      setMessage(`Image picker error: ${error.message}`);
    }
  }

  async function takeMobilePhoto() {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();

      if (!permission.granted) {
        setMessage("Camera permission denied.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        quality: 0.7,
        allowsEditing: true,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);

        await addDoc(collection(db, "deviceLogs"), {
          feature: "Camera",
          method: "Mobile Camera Capture",
          imageCaptured: true,
          platform: Platform.OS,
          createdAt: serverTimestamp(),
        });

        setMessage("Mobile camera photo captured and logged to Firebase.");
      }
    } catch (error: any) {
      setMessage(`Camera error: ${error.message}`);
    }
  }

  function clearImage() {
    setImage(null);
    setMessage("Image preview cleared.");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Camera Feature</Text>
      <Text style={styles.subtitle}>Live Camera + Image Picker</Text>

      {Platform.OS === "web" && (
        <>
          <video
            ref={videoRef}
            style={{
              width: "100%",
              height: 240,
              backgroundColor: "black",
              borderRadius: 12,
              marginBottom: 12,
            }}
          />

          <canvas ref={canvasRef} style={{ display: "none" }} />

          <Pressable style={styles.button} onPress={startWebcam}>
            <Text style={styles.buttonText}>Start Live Webcam</Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={captureWebcamPhoto}
            disabled={!webcamStarted}
          >
            <Text style={styles.buttonText}>Capture Live Photo</Text>
          </Pressable>
        </>
      )}

      {Platform.OS !== "web" && (
        <Pressable style={styles.button} onPress={takeMobilePhoto}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </Pressable>
      )}

      <Pressable style={styles.secondaryButton} onPress={pickImageFromFiles}>
        <Text style={styles.buttonText}>Pick Image from Files</Text>
      </Pressable>

      {image && <Image source={{ uri: image }} style={styles.image} />}

      {image && (
        <Pressable style={styles.clearButton} onPress={clearImage}>
          <Text style={styles.buttonText}>Clear Image</Text>
        </Pressable>
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
    marginBottom: 20,
    marginTop: 6,
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: "#111827",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  clearButton: {
    backgroundColor: "#DC2626",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    resizeMode: "cover",
    marginTop: 10,
  },
  messageBox: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 12,
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  messageText: {
    textAlign: "center",
    color: "#111827",
  },
});