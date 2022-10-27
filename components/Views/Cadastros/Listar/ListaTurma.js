import React, { useEffect, useState } from "react";
import { List, Avatar, Card, FAB } from "react-native-paper";
import { View, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
// FIREBASE AND DB
import { db } from "../../../Firebase/firebase";
import { getDocs, query, collection } from "firebase/firestore";

export default function TurmasList(props) {
  const [turmasList, setTurmasList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get turmas list from Firestore by Firebase
  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      const loadData = async () => {
        setLoading(true);
        await getTurmas();
        setLoading(false);
      };
      loadData();
    });

    return unsubscribe;
  }, [props.navigation]);

  const getTurmas = async () => {
    try {
      const turmas = await getDocs(query(collection(db, "Turma")));

      const formattedTurmasList = [];
      turmas?.forEach((doc) => {
        formattedTurmasList.push({ ...doc.data() });
      });
      setTurmasList(formattedTurmasList);
    } catch (error) {
      window.alert(error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3D43C6" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Card.Title
            title="Turmas"
            titleStyle={styles.title}
            left={(props) => (
              <Avatar.Icon
                {...props}
                style={{ backgroundColor: "#3D43C6" }}
                icon="account-group"
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
                        <List.Icon {...props} icon="book-edit" />
                      )}
                      onPress={() =>
                        props.navigation.navigate("Insere Turma", {
                          action: "Editar",
                          turma: item,
                        })
                      }
                    ></List.Item>
                  );
                }}
              />
            </View>
          </ScrollView>
          <FAB
            icon="plus"
            color="#5b5b58"
            style={styles.fab}
            onPress={() =>
              props.navigation.navigate("Insere Turma", {
                action: "Inserir",
              })
            }
          />
        </View>
      </View>
    );
  }
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
