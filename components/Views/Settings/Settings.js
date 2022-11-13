import { ScrollView, View, StyleSheet, Pressable, Text } from "react-native";
import React, { useContext } from "react";
import { Avatar, Card } from "react-native-paper";
// THEME AND CONTEXT
import ThemeContext from "../../Theme/ThemeContext";
import AppTheme from "../../Theme/Theme";

export default function Settings() {

  /*
  foi utilizado um usecontext para sinalizar para toda a aplicação 
  a modificação de background, assim o usuário clicando em umas das
  três opções ele modifica a imagem de todas as telas do app
  */
  const [theme, setTheme] = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Card.Title
          title="Settings"
          titleStyle={styles.title}
          left={(props) => (
            <Avatar.Icon
              {...props}
              style={{ backgroundColor: "#3D43C6" }}
              icon="cog"
            />
          )}
        />

        <ScrollView>
          <View style={styles.cardContainerContent}>
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
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  cardContainer: {
    marginHorizontal: 20,
    borderRadius: 10,
    height: "auto",
    backgroundColor: "white",
  },
  cardContainerContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    marginLeft: 55,
    paddingTop: 10,
    color: "black",
    fontSize: 25,
    textAlignVertical: "bottom",
  },
  pressableStyle: {
    width: "auto",
    height: "auto",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "#3D43C6",
  },
});
