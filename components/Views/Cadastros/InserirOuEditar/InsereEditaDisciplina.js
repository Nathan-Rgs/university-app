import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Avatar, Card, TextInput, Button } from "react-native-paper";
import { View, StyleSheet, ActivityIndicator } from "react-native";
// FIREBASE AND DB
import { db } from "../../../Firebase/firebase";
import { setDoc, query, collection, doc } from "firebase/firestore";

export default function InsereDisciplina(props) {
  const { register, setValue, handleSubmit } = useForm();

  useEffect(() => {
    register("nome_disc");
    register("carga_hor");
  }, [register]);

  const onSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Card.Title
          title="Inserir Disciplina"
          titleStyle={styles.title}
          left={(props) => (
            <Avatar.Icon
              {...props}
              style={{ backgroundColor: "#3D43C6" }}
              icon="account-plus"
            />
          )}
        />
        <View style={styles.formContainerContent}>
          <TextInput
            style={styles.inputs}
            label={"Nome"}
            placeholder={"Digite o nome da Disciplina"}
            onChangeText={(text) => setValue("nome_disc", text)}
          />
          <TextInput
            style={styles.inputs}
            label={"Carga Horária"}
            placeholder={"Digite a carga horária (em horas)"}
            onChangeText={(text) => setValue("carga_hor", text)}
          />
          <Button
            style={styles.submitButton}
            icon="plus"
            mode="contained"
            buttonColor="#76ba1b"
            onPress={handleSubmit(onSubmit)}
          >
            Adicionar
          </Button>
        </View>
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
    backgroundColor: "white",
  },
  formContainerContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    marginLeft: 35,
    paddingTop: 10,
    color: "black",
    fontSize: 25,
    textAlignVertical: "bottom",
  },
  inputs: {
    marginVertical: 10,
  },
  submitButton: {
    width: 130,
    alignSelf: "flex-end",
  },
});
