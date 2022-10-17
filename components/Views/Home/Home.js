import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
// THEME AND CONTEXT
import ThemeContext from "../../Theme/ThemeContext";
import AppTheme from "../../Theme/Theme";

export default function Home() {
  const theme = useContext(ThemeContext)[0];

  return (
    <View style={AppTheme[theme + "Container"]}>
      <Text
        style={{
          color: AppTheme[theme + "Container"].texts.textColor,
          fontSize: 30,
        }}
      >
        Home
      </Text>
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
