import React, { useEffect, useState } from "react";
import { Avatar, Card, Text, List } from "react-native-paper";
import { View, StyleSheet, FlatList} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
// FIREBASE AND DB
import { db } from "../../../Firebase/firebase";
import { getDocs, query, collection, doc, deleteDoc } from "firebase/firestore";

export default function TurmasList(props) {

  const [turmasList, setTurmasList] = useState([]);

  useEffect(() => {
    
    const unsubscribe = props.navigation.addListener("focus", () => {
      const loadData = async () => {
        await getTurmas();
      };
      loadData();
    });

    return unsubscribe;
  }, [props.navigation]);

  const getTurmas = async () => {
    try {
      const documents = await getDocs(query(collection(db, "Turma")));

      let turmasDoc = [];
      documents?.forEach((doc) => {
        turmasDoc.push({ ...doc.data() });
      });
      setTurmasList(turmasDoc);
    } catch (error) {
      window.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Card.Title
          title="Visualizar Turmas"
          left={(props) => (
            <Avatar.Icon
              {...props}
              style={{ backgroundColor: "#3D43C6" }}
              icon="eye"
            />
          )}
        />
        <ScrollView>
            <View style={styles.cardContainerContent}>
              <FlatList
                data={turmasList}
                keyExtractor={(item) => item.cod_turma}
                renderItem={({ item }) => {
                  return (
                    <List.Item
                      title={`${item.ano} - ${item.horario}`}
                      left={(props) => (
                        <List.Icon
                          {...props}
                          color="#3D43C6"
                          icon="account-group"
                        />
                      )}
                      right={(props) => (
                        <List.Icon {...props} icon="arrow-right" />
                      )}
                      onPress={() => props.navigation.navigate("Visualizar Alunos Turma", {
                        turma: item
                      })}
                    ></List.Item>
                  );
                }}
              />
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
    margin: 20,
    borderRadius: 10,
    height: 700,
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
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
