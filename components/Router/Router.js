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
// LISTAGENS E CADASTROS
import ListaAluno from "../Views/Cadastros/Listar/ListaAluno";
import ListaDisciplina from "../Views/Cadastros/Listar/ListaDisciplina";
import ListaProfessor from "../Views/Cadastros/Listar/ListaProfessor";
import ListaHistorico from "../Views/Cadastros/Listar/ListaHistorico";
import ListaTurma from "../Views/Cadastros/Listar/ListaTurma";
import InsereAluno from "../Views/Cadastros/InserirOuEditar/InsereEditaAluno";
import InsereDisciplina from "../Views/Cadastros/InserirOuEditar/InsereEditaDisciplina";
import InsereProfessor from "../Views/Cadastros/InserirOuEditar/InsereEditaProfessor";
import InsereHistorico from "../Views/Cadastros/InserirOuEditar/InsereEditaHistorico";
import InsereTurma from "../Views/Cadastros/InserirOuEditar/InsereEditaTurma";
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
        name="Lista Aluno"
        component={ListaAluno}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Lista Professor"
        component={ListaProfessor}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Lista Disciplina"
        component={ListaDisciplina}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Lista Turma"
        component={ListaTurma}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Lista Historico"
        component={ListaHistorico}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Insere Aluno"
        component={InsereAluno}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Insere Professor"
        component={InsereProfessor}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Insere Disciplina"
        component={InsereDisciplina}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Insere Turma"
        component={InsereTurma}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Insere Historico"
        component={InsereHistorico}
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
