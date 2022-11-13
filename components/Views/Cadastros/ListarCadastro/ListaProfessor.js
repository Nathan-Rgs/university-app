import React, { useEffect, useState } from "react";
import { List, Avatar, Card, FAB } from "react-native-paper";
import { View, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
// FIREBASE AND DB
import { db } from "../../../Firebase/firebase";
import { getDocs, query, collection } from "firebase/firestore";

/*
responsável por consumir os documentos do firestore
e exibi-los de forma legivel ao usuário
*/
export default function ProfessoresList(props) {
  const [professoresList, setProfessoresList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get professores list from Firestore by Firebase
  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      const loadData = async () => {
        setLoading(true);
        await getProfessores();
        setLoading(false);
      };
      loadData();
    });

    return unsubscribe;
  }, [props.navigation]);

  const getProfessores = async () => {
    try {
      const professores = await getDocs(query(collection(db, "Professor")));

      const formattedProfessoresList = [];
      professores?.forEach((doc) => {
        formattedProfessoresList.push({ ...doc.data() });
      });
      setProfessoresList(formattedProfessoresList);
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
            title="Professores"
            titleStyle={styles.title}
            left={(props) => (
              <Avatar.Icon
                {...props}
                style={{ backgroundColor: "#3D43C6" }}
                icon="account-tie"
              />
            )}
          />
          <ScrollView>
            <View style={styles.cardContainerContent}>
              <FlatList
                data={professoresList}
                keyExtractor={(item) => item.cod_prof}
                renderItem={({ item }) => {
                  return (
                    <List.Item
                      title={item.nome}
                      left={(props) => (
                        <List.Icon
                          {...props}
                          color="#3D43C6"
                          icon="account-tie"
                        />
                      )}
                      right={(props) => (
                        <List.Icon {...props} icon="book-edit" />
                      )}
                      onPress={() =>
                        props.navigation.navigate("Insere Professor", {
                          action: "Editar",
                          professor: item,
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
              props.navigation.navigate("Insere Professor", {
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
