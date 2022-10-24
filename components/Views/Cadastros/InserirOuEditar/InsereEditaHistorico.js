import React, { useEffect, useState } from "react";
import { List, Avatar, Card, FAB } from "react-native-paper";
import { View, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
// FIREBASE AND DB
import { db } from "../../../Firebase/firebase";
import { setDoc, query, collection, doc } from "firebase/firestore";

export default function InsereHistorico(props) {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Card.Title
          title="Inserir Historico"
          titleStyle={styles.title}
          left={(props) => (
            <Avatar.Icon
              {...props}
              style={{ backgroundColor: "#3D43C6" }}
              icon="account-plus"
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
                    onPress={() => props.navigation.navigate("Cadastro Alunos")}
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
});
