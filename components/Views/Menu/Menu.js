import { ScrollView, View, StyleSheet } from "react-native";
import React from "react";
import { List, Avatar, Card } from "react-native-paper";

export default function Menu(props) {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Card.Title
          title="Menu"
          titleStyle={styles.title}
          left={(props) => (
            <Avatar.Icon
              {...props}
              style={{ backgroundColor: "#3D43C6" }}
              icon="notebook"
            />
          )}
        />

        <ScrollView>
          <View style={styles.cardContainerContent}>
            <List.Item
              title="Alunos"
              left={(props) => (
                <List.Icon {...props} color="#3D43C6" icon="account" />
              )}
              right={(props) => <List.Icon {...props} icon="arrow-right" />}
              onPress={() => props.navigation.navigate("Lista Aluno")}
            ></List.Item>
            <List.Item
              title="Professores"
              left={(props) => (
                <List.Icon {...props} color="#3D43C6" icon="account-tie" />
              )}
              right={(props) => <List.Icon {...props} icon="arrow-right" />}
              onPress={() => props.navigation.navigate("Lista Professor")}
            ></List.Item>
            <List.Item
              title="Disciplinas"
              left={(props) => (
                <List.Icon
                  {...props}
                  color="#3D43C6"
                  icon="book-open-page-variant"
                />
              )}
              right={(props) => <List.Icon {...props} icon="arrow-right" />}
              onPress={() => props.navigation.navigate("Lista Disciplina")}
            ></List.Item>
            <List.Item
              title="Históricos"
              left={(props) => (
                <List.Icon {...props} color="#3D43C6" icon="clipboard-list" />
              )}
              right={(props) => <List.Icon {...props} icon="arrow-right" />}
              onPress={() => props.navigation.navigate("Lista Historico")}
            ></List.Item>
            <List.Accordion
              title="Turmas"
              style={{ backgroundColor: "white" }}
              left={(props) => (
                <List.Icon {...props} color="#3D43C6" icon="account-group" />
              )}
            >
              <List.Item
                style={{ width: "90%", marginLeft: 25 }}
                title="Inserir/Editar"
                left={(props) => (
                  <List.Icon {...props} color="#3D43C6" icon="book-edit" />
                )}
                right={(props) => <List.Icon {...props} icon="arrow-right" />}
                onPress={() => props.navigation.navigate("Lista Turma")}
              ></List.Item>
              <List.Item
                style={{ width: "90%", marginLeft: 25 }}
                title="Visualizar"
                left={(props) => (
                  <List.Icon {...props} color="#3D43C6" icon="eye" />
                )}
                right={(props) => <List.Icon {...props} icon="arrow-right" />}
                onPress={() => props.navigation.navigate("Visualizar Turma")}
              ></List.Item>
            </List.Accordion>
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
    marginLeft: 70,
    paddingTop: 10,
    color: "black",
    fontSize: 25,
    textAlignVertical: "bottom",
  },
});
