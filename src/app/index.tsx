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
    padding: 24,
    backgroundColor: "#F5F7FA",
  },

  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#2563EB",
    marginBottom: 16,
  },

  subtitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 40,
  },

  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 12,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});