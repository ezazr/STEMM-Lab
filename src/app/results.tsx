import { View, Text, StyleSheet } from "react-native";

export default function Results() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Results</Text>
      <Text style={styles.subtitle}>Activity records and reflections will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center" },
  subtitle: { fontSize: 16, marginTop: 10, color: "#555" },
});