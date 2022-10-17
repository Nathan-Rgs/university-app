import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
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
        <Button
          title="3D Gradient"
          style={styles.buttonStyle}
          onPress={() => {
            setTheme("ImmersiveGradient");
          }}
        ></Button>
        <Button
          title="Purple Gradient"
          style={styles.buttonStyle}
          onPress={() => {
            setTheme("PurpleGradient");
          }}
        ></Button>
        <Button
          title="Rainbow Background"
          style={styles.buttonStyle}
          onPress={() => {
            setTheme("RainbowBackground");
          }}
        ></Button>
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
  buttonStyle: {
    width: 30,
  },
});
