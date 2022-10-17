import React, { useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemeContext from "./components/Theme/ThemeContext";
import Router from "./components/Router/Router";

export default function App() {
  const themeHook = useState("ImmersiveGradient");

  return (
    <SafeAreaView>
      <ThemeContext.Provider value={themeHook}>
        <Router />
      </ThemeContext.Provider>
      <StatusBar barStyle="light-content" backgroundColor="black" translucent />
    </SafeAreaView>
  );
}
