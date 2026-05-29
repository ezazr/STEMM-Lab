import { View, Text, StyleSheet } from "react-native";

export default function HandFan() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hand Fan Challenge</Text>
      <Text style={styles.subtitle}>Physics – Air Movement</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center" },
  subtitle: { fontSize: 16, marginTop: 10, color: "#555" },
});