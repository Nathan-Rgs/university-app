import { ScrollView, View, StyleSheet } from "react-native";
import React from "react";
import { List, Avatar, Card } from "react-native-paper";

export default function Menu(props) {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Card.Title
          title="Cadastros"
          titleStyle={styles.title}
          left={(props) => <Avatar.Icon {...props} icon="clipboard-list" />}
        />

        <ScrollView>
          <View style={styles.cardContainerContent}>
            <List.Item
              title="Alunos"
              left={(props) => (
                <List.Icon {...props} color="grey" icon="account-group" />
              )}
              right={(props) => <List.Icon {...props} icon="arrow-right" />}
              onPress={() => props.navigation.navigate("Cadastro Alunos")}
            ></List.Item>
            <List.Item
              title="Professores"
              left={(props) => (
                <List.Icon {...props} color="grey" icon="account-group" />
              )}
              right={(props) => <List.Icon {...props} icon="arrow-right" />}
              onPress={() => props.navigation.navigate("Cadastro Professor")}
            ></List.Item>
            <List.Item
              title="Disciplinas"
              left={(props) => (
                <List.Icon {...props} color="grey" icon="account-group" />
              )}
              right={(props) => <List.Icon {...props} icon="arrow-right" />}
              onPress={() => props.navigation.navigate("Cadastro Disciplina")}
            ></List.Item>
            <List.Item
              title="Turmas"
              left={(props) => (
                <List.Icon {...props} color="grey" icon="account-group" />
              )}
              right={(props) => <List.Icon {...props} icon="arrow-right" />}
              onPress={() => props.navigation.navigate("Cadastro Turma")}
            ></List.Item>
            <List.Item
              title="Históricos"
              left={(props) => (
                <List.Icon {...props} color="grey" icon="account-group" />
              )}
              right={(props) => <List.Icon {...props} icon="arrow-right" />}
              onPress={() => props.navigation.navigate("Cadastro Historico")}
            ></List.Item>
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
    marginLeft: 45,
    paddingTop: 10,
    color: "black",
    fontSize: 25,
    textAlignVertical: "bottom",
  },
});
