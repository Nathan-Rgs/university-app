// LIBS AND UTILS
import React, { useContext } from "react";
import { ImageBackground } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
// ICONS AND IMAGES
import MenuIcon from "../assets/icons/Menu";
import HomeIcon from "../assets/icons/Home";
import SettingsIcon from "../assets/icons/Settings";
// THEME AND CONTEXT
import ThemeContext from "../Theme/ThemeContext";
import AppTheme from "../Theme/Theme";
// PAGES
import Settings from "../Views/Settings/Settings";
import Home from "../Views/Home/Home";
import Menu from "../Views/Menu/Menu";
// CADASTROS
import CadastrosAlunos from "../Views/Cadastros/CadastroAlunos";
import CadastrosDisciplina from "../Views/Cadastros/CadastroDisciplina";
import CadastrosProfessor from "../Views/Cadastros/CadastroProfessor";
import CadastrosHistorico from "../Views/Cadastros/CadastroHistorico";
import CadastrosTurma from "../Views/Cadastros/CadastroTurma";
import NotFoundScreen from "../Views/NotFound";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

const Stack = createNativeStackNavigator();

export default function Router() {
  const theme = useContext(ThemeContext)[0];

  return (
    <ImageBackground
      source={AppTheme[theme].backgroundImage}
      style={{ width: "100%", height: "100%" }}
    >
      <NavigationContainer theme={MyTheme}>
        <RootNavigator />
      </NavigationContainer>
    </ImageBackground>
  );
}

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Root">
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cadastro Alunos"
        component={CadastrosAlunos}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cadastro Professor"
        component={CadastrosProfessor}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cadastro Disciplina"
        component={CadastrosDisciplina}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cadastro Turma"
        component={CadastrosTurma}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cadastro Historico"
        component={CadastrosHistorico}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 60,
          paddingTop: 5,
          paddingBottom: 5,
          backgroundColor: "#3D43C6",
          borderTopColor: "transparent",
        },
        tabBarHideOnKeyboard: true, // TODO hide bottom navigation when typing
        tabBarActiveTintColor: "#FFF",
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.6)",
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <HomeIcon name="home" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarLabel: "Menu",
          tabBarIcon: ({ color, size }) => (
            <MenuIcon name="menu" color={color} size={size} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <SettingsIcon name="settings" color={color} size={size} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
