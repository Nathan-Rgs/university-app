import React, { useEffect, useState } from "react";
import { List, Avatar, Card, FAB } from "react-native-paper";
import { View, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
// FIREBASE AND DB
import { db } from "../../../Firebase/firebase";
import { getDocs, query, collection } from "firebase/firestore";

export default function AlunosList(props) {
  const [alunosList, setAlunosList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get Alunos list from Firestore by Firebase
  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      const loadData = async () => {
        setLoading(true);
        await getAlunos();
        setLoading(false);
      };
      loadData();
    });

    return unsubscribe;
  }, [props.navigation]);

  const getAlunos = async () => {
    try {
      const alunos = await getDocs(query(collection(db, "Aluno")));

      const formattedAlunosList = [];
      alunos?.forEach((doc) => {
        formattedAlunosList.push({ ...doc.data(), id: doc.id });
      });
      setAlunosList(formattedAlunosList);
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
            title="Alunos"
            titleStyle={styles.title}
            left={(props) => (
              <Avatar.Icon
                {...props}
                style={{ backgroundColor: "#3D43C6" }}
                icon="account"
              />
            )}
          />
          <ScrollView>
            <View style={styles.cardContainerContent}>
              <FlatList
                data={alunosList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  return (
                    <List.Item
                      title={item.nome}
                      left={(props) => (
                        <List.Icon {...props} color="#3D43C6" icon="account" />
                      )}
                      right={(props) => (
                        <List.Icon {...props} icon="arrow-right" />
                      )}
                      onPress={() =>
                        props.navigation.navigate("Insere Aluno", {
                          action: "Editar",
                          aluno: item,
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
              props.navigation.navigate("Insere Aluno", { action: "Inserir" })
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
