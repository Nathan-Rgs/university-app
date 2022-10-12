import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Routes from "./components/Router/Router";

export default function App() {
  return (
    <SafeAreaProvider>
      <Routes />
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
    </SafeAreaProvider>
  );
}
