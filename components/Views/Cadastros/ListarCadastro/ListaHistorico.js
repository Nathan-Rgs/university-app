import React, { useEffect, useState } from "react";
import { List, Avatar, Card, FAB } from "react-native-paper";
import { View, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
// FIREBASE AND DB
import { db } from "../../../Firebase/firebase";
import { getDocs, query, collection, doc, deleteDoc } from "firebase/firestore";

export default function HistoricosList(props) {
  const [historicosList, setHistoricosList] = useState([]);
  const [alunosList, setAlunosList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editDeleteVisibility, setEditDeleteVisibility] = useState({
    isVisible: false,
    params: {},
  });

  // Get historicos list from Firestore by Firebase
  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", async () => {
      await loadData();
    });

    return unsubscribe;
  }, [props.navigation]);

  const loadData = async () => {
    setLoading(true);
    await getHistoricos();
    await getAlunos();
    setLoading(false);
  };

  const getHistoricos = async () => {
    try {
      const historicos = await getDocs(query(collection(db, "Historico")));

      const formattedHistoricosList = [];
      historicos?.forEach((doc) => {
        formattedHistoricosList.push({ ...doc.data() });
      });
      setHistoricosList(formattedHistoricosList);
    } catch (error) {
      window.alert(error.message);
    }
  };

  const getAlunos = async () => {
    try {
      const alunos = await getDocs(query(collection(db, "Aluno")));

      const formattedAlunosList = [];
      alunos?.forEach((doc) => {
        formattedAlunosList.push({ ...doc.data() });
      });
      setAlunosList(formattedAlunosList);
    } catch (error) {
      window.alert(error.message);
    }
  };

  const deleteHistorico = async (toDelete) => {
    const docRef = doc(db, "Historico", `${toDelete.cod_historico}`);
    await deleteDoc(docRef);
    setEditDeleteVisibility({ isVisible: false, params: {} });
    loadData();
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
            title="Históricos"
            titleStyle={styles.title}
            left={(props) => (
              <Avatar.Icon
                {...props}
                style={{ backgroundColor: "#3D43C6" }}
                icon="clipboard-list"
              />
            )}
          />
          <ScrollView>
            <View style={styles.cardContainerContent}>
              <FlatList
                data={historicosList}
                keyExtractor={(item) => item.cod_historico}
                renderItem={({ item }) => {
                  return (
                    <List.Item
                      title={`${
                        alunosList.find(
                          (aluno) => aluno.matricula == item.matricula
                        ).nome
                      }: ${item.nota} - ${item.frequencia}`}
                      left={(props) => (
                        <List.Icon
                          {...props}
                          color="#3D43C6"
                          icon="clipboard-list"
                        />
                      )}
                      onPress={() =>
                        setEditDeleteVisibility({
                          isVisible: true,
                          params: item,
                        })
                      }
                    ></List.Item>
                  );
                }}
              />
            </View>
          </ScrollView>
          <FAB
            visible={editDeleteVisibility.isVisible}
            icon="lead-pencil"
            color="#5b5b58"
            style={styles.fabEdit}
            onPress={() => {
              props.navigation.navigate("Insere Historico", {
                action: "Editar",
                historico: editDeleteVisibility.params,
              });
              setEditDeleteVisibility({ isVisible: false, params: {} });
            }}
          />
          <FAB
            visible={editDeleteVisibility.isVisible}
            icon="trash-can"
            color="#5b5b58"
            style={styles.fabDelete}
            onPress={() => {
              deleteHistorico(editDeleteVisibility.params);
            }}
          />
          <FAB
            icon="plus"
            color="#5b5b58"
            style={styles.fab}
            onPress={() =>
              props.navigation.navigate("Insere Historico", {
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
  fabEdit: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 140,
  },
  fabDelete: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 70,
  },
});
