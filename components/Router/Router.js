import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";

import Tst1 from "../Views/Tst";
import Tst2 from "../Views/Tst2";
import NotFoundScreen from "../Views/NotFound";

const Stack = createNativeStackNavigator();

export default function Router() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Tst1">
      <Stack.Screen
        name="Tst1"
        component={Tst1}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Tst2" component={Tst2} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}
