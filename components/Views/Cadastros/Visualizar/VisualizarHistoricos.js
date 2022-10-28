import React from "react";
import { Avatar, Card, Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-virtualized-view";

export default function HistoricosList(props) {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Card.Title
          title="Visualizar Históricos"
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
            <Text>COLOCAR LISTA DE HISTORICOS AQ</Text>
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
