import { View, Text, StyleSheet } from "react-native";

export default function Tst1() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Test One Page 😎 </Text>
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
