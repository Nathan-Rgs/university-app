import { View, Text, StyleSheet } from "react-native";

export default function Tst2() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Test Two Page 🤑 </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
  },
});
