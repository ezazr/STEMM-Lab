import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";

export default function Home() {
  const activities = [
    { title: "Parachute Challenge", route: "/parachute" },
    { title: "Sound Pollution Hunter", route: "/sound-hunter" },
    { title: "Hand Fan Challenge", route: "/hand-fan" },
    { title: "Earthquake Structure", route: "/earthquake" },
    { title: "Human Performance Lab", route: "/human-performance" },
    { title: "Reaction Board", route: "/reaction-board" },
    { title: "Breathing Trainer", route: "/breathing-trainer" },
    { title: "Leaderboard", route: "/leaderboard" },
    { title: "Results", route: "/results" },
    { title: "Battery Status", route: "/battery" },
    { title: "GPS Location", route: "/location" },
    { title: "Notifications", route: "/notifications" },
    { title: "Camera Feature", route: "/camera" },
    { title: "Settings", route: "/settings" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>STEMM Lab</Text>

      {activities.map((item, index) => (
        <Pressable
          key={index}
          style={styles.button}
          onPress={() => router.push(item.route as any)}
        >
          <Text style={styles.buttonText}>{item.title}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2563EB",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});