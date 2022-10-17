import { View, Text, StyleSheet, TextInput } from "react-native";

export default function Cadastros() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Cadastros e Cadastre-se </Text>
      <TextInput style={styles.input}></TextInput>
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
  input: {
    backgroundColor: "white",
    height: 35,
    width: "auto",
  },
});
