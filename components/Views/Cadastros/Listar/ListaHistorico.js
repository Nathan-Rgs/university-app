import React, { useEffect, useState } from "react";
import { List, Avatar, Card } from "react-native-paper";
import { View, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
// FIREBASE AND DB
import { db } from "../../../Firebase/firebase";
import { getDocs, setDoc, query, collection, doc } from "firebase/firestore";

export default function HistoricosList(props) {
  const [historicosList, setHistoricosList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get historicos list from Firestore by Firebase
  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      const loadData = async () => {
        setLoading(true);
        await getHistoricos();
        setLoading(false);
      };
      loadData();
    });

    return unsubscribe;
  }, [props.navigation]);

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
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  return (
                    <List.Item
                      title={item.cod_historico}
                      left={(props) => (
                        <List.Icon
                          {...props}
                          color="#3D43C6"
                          icon="clipboard-list"
                        />
                      )}
                      right={(props) => (
                        <List.Icon {...props} icon="book-edit" />
                      )}
                      onPress={() =>
                        props.navigation.navigate("Cadastro historicos")
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
