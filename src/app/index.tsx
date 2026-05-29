import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>STEMM Lab</Text>
      <Text style={styles.subtitle}>
        STEMM Activity Challenge Platform
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/team-setup")}
      >
        <Text style={styles.buttonText}>Start</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#2563EB",
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});