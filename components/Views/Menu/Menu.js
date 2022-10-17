import { View, Button, StyleSheet } from "react-native";

export default function Menu(props) {
  return (
    <View style={styles.container}>
      <Button
        title="Ex 01"
        onPress={() => {
          props.navigation.navigate("Tst1");
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
