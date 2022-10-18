import React, { useContext } from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";
// THEME AND CONTEXT
import ThemeContext from "../../Theme/ThemeContext";
import AppTheme from "../../Theme/Theme";

export default function Menu(props) {
  const [theme] = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.menuButtonsStyle}
        onPress={() => {
          props.navigation.navigate("Cadastros");
        }}
      >
        <Text
          style={{
            color: AppTheme[theme + "Container"].texts.textColor,
          }}
        >
          Cadastros
        </Text>
      </Pressable>
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
  menuButtonsStyle: {
    width: "auto",
    height: "auto",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "#00a7df",
  },
});
