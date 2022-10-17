import { View, Text, Button, StyleSheet } from "react-native";

export default function Tst1(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Test One Page 😎 </Text>
      <Button
        title="Ex 01"
        onPress={() => {
          props.navigation.navigate("Root");
        }}
      ></Button>
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
