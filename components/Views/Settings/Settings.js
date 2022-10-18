import React, { useContext } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
// THEME AND CONTEXT
import ThemeContext from "../../Theme/ThemeContext";
import AppTheme from "../../Theme/Theme";

export default function Settings() {
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontSize: 30 }]}> Settings Page </Text>
      <Text style={[styles.text, { fontSize: 15 }]}>
        Change the app Background
      </Text>
      <View style={{ marginTop: 50 }}>
        <Pressable
          style={styles.pressableStyle}
          onPress={() => {
            setTheme("ImmersiveGradient");
          }}
        >
          <Text
            style={{
              color: AppTheme[theme + "Container"].texts.textColor,
            }}
          >
            3D Gradient
          </Text>
        </Pressable>
        <Pressable
          style={styles.pressableStyle}
          onPress={() => {
            setTheme("PurpleGradient");
          }}
        >
          <Text
            style={{
              color: AppTheme[theme + "Container"].texts.textColor,
            }}
          >
            Purple Gradient
          </Text>
        </Pressable>
        <Pressable
          style={styles.pressableStyle}
          onPress={() => {
            setTheme("RainbowBackground");
          }}
        >
          <Text
            style={{
              color: AppTheme[theme + "Container"].texts.textColor,
            }}
          >
            Rainbow Background
          </Text>
        </Pressable>
      </View>
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
  pressableStyle: {
    width: "auto",
    height: "auto",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "#00a7df",
  },
});
