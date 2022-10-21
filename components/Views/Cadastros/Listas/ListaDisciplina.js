import React, { useEffect, useState } from "react";
import { List, Avatar, Card } from "react-native-paper";
import { View, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
// FIREBASE AND DB
import { db } from "../../../Firebase/firebase";
import { getDocs, setDoc, query, collection, doc } from "firebase/firestore";

export default function DisciplinasList(props) {
  const [disciplinasList, setDisciplinasList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get disciplinas list from Firestore by Firebase
  useEffect(() => {
    // wrap your async call here
    const loadData = async () => {
      setLoading(true);
      await getDisciplinas();
      setLoading(false);
    };
    loadData();
  }, []);

  const getDisciplinas = async () => {
    try {
      const disciplinas = await getDocs(query(collection(db, "Disciplina")));

      const formattedDisciplinasList = [];
      disciplinas?.forEach((doc) => {
        formattedDisciplinasList.push({ ...doc.data(), id: doc.id });
      });
      setDisciplinasList(formattedDisciplinasList);
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
            title="Disciplinas"
            titleStyle={styles.title}
            left={(props) => (
              <Avatar.Icon
                {...props}
                style={{ backgroundColor: "#3D43C6" }}
                icon="book-open-page-variant"
              />
            )}
          />
          <ScrollView>
            <View style={styles.cardContainerContent}>
              <FlatList
                data={disciplinasList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  return (
                    <List.Item
                      title={item.nome_disc}
                      right={(props) => (
                        <List.Icon {...props} icon="book-edit" />
                      )}
                      onPress={() =>
                        props.navigation.navigate("Cadastro disciplinas")
                      }
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
});
