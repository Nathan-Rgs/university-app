import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Avatar,
  Card,
  TextInput,
  Button,
  Portal,
  Dialog,
  Paragraph,
  Provider,
} from "react-native-paper";
import { View, StyleSheet } from "react-native";
// FIREBASE, DB AND UTILS
import { db } from "../../../Firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import uuid from "react-native-uuid";

export default function InsereEditaProfessor(props) {
  const { register, setValue, handleSubmit, watch } = useForm();
  const [routeParams] = useState(props.route.params);
  const [sucess, setSucess] = useState({
    modalVisible: false,
    modalMessage: "",
  });
  const [error, setError] = useState({ modalVisible: false, modalMessage: "" });
  const [inputError, setInputError] = useState({
    nome: false,
    endereco: false,
    cidade: false,
  });

  useEffect(() => {
    register("nome");
    register("endereco");
    register("cidade");

    if (routeParams.action == "Editar") {
      setValue("nome", routeParams.professor.nome);
      setValue("endereco", routeParams.professor.endereco);
      setValue("cidade", routeParams.professor.cidade);
    } else {
      setValue("nome", "");
      setValue("endereco", "");
      setValue("cidade", "");
    }
  }, [register]);

  const validateSubmit = async (formData) => {
    let errorFlag = false;
    for (let input in formData) {
      if (formData[input] == undefined || formData[input] == "") {
        errorSubmit(input);
        errorFlag = true;
        return;
      }
    }
    if (!errorFlag) {
      sendForm(formData);
    }
  };

  const sendForm = async (validatedFormData) => {
    try {
      if (routeParams.action == "Inserir") {
        const profId = uuid.v4();
        validatedFormData = { ...validatedFormData, cod_prof: profId };
        await setDoc(doc(db, "Professor", `${profId}`), validatedFormData);
      } else {
        await setDoc(
          doc(db, "Professor", `${routeParams.professor.cod_prof}`),
          validatedFormData,
          { merge: true }
        );
      }
      setSucess({
        modalVisible: true,
        modalMessage: `${
          routeParams.action == "Inserir"
            ? `Professor ${validatedFormData.nome} cadastrado com sucesso!`
            : `Professor ${validatedFormData.nome} teve seu cadastro atualizado com sucesso!`
        } `,
      });
    } catch (error) {
      setError({
        modalVisible: true,
        modalMessage: `${error}`,
      });
    }
  };

  const errorSubmit = (inputWithError) => {
    switch (inputWithError) {
      case "nome":
        setInputError({
          nome: true,
          endereco: false,
          cidade: false,
        });
        break;
      case "endereco":
        setInputError({
          nome: false,
          endereco: true,
          cidade: false,
        });
        break;
      case "cidade":
        setInputError({
          nome: false,
          endereco: false,
          cidade: true,
        });
        break;
    }

    setError({
      modalVisible: true,
      modalMessage: `Campo vazio: ${inputWithError.toUpperCase()}`,
    });
  };

  return (
    <Provider>
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Card.Title
            title={
              routeParams.action == "Inserir"
                ? "Inserir Professor"
                : "Editar Professor"
            }
            titleStyle={styles.title}
            left={(props) => (
              <Avatar.Icon
                {...props}
                style={{ backgroundColor: "#3D43C6" }}
                icon="account-tie"
              />
            )}
          />
          <View style={styles.formContainerContent}>
            <TextInput
              style={styles.inputs}
              label={"Nome"}
              placeholder={"Digite seu nome"}
              error={inputError.nome}
              value={`${watch("nome")}`}
              onChangeText={(text) => setValue("nome", text)}
            />
            <TextInput
              style={styles.inputs}
              label={"Endereço"}
              placeholder={"Digite seu endereço"}
              error={inputError.endereco}
              value={`${watch("endereco")}`}
              onChangeText={(text) => setValue("endereco", text)}
            />
            <TextInput
              style={styles.inputs}
              label={"Cidade"}
              placeholder={"Insira a cidade de origem"}
              error={inputError.cidade}
              value={`${watch("cidade")}`}
              onChangeText={(text) => setValue("cidade", text)}
            />
            <Button
              style={styles.submitButton}
              icon={routeParams.action == "Inserir" ? "plus" : "lead-pencil"}
              mode="contained"
              buttonColor="#76ba1b"
              onPress={handleSubmit(validateSubmit)}
            >
              {routeParams.action == "Inserir" ? "Adicionar" : "Editar"}
            </Button>
          </View>
          <Portal>
            <Dialog
              style={{ backgroundColor: "#abf7b1", textColor: "white" }}
              visible={sucess.modalVisible}
              onDismiss={() => props.navigation.navigate("Lista Professor")}
            >
              <Dialog.Title>Sucess</Dialog.Title>
              <Dialog.Content>
                <Paragraph>{sucess.modalMessage}</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  textColor="white"
                  buttonColor="green"
                  onPress={() => props.navigation.navigate("Lista Professor")}
                >
                  OK
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <Portal>
            <Dialog
              style={{ backgroundColor: "#ff9e99", textColor: "white" }}
              visible={error.modalVisible}
              onDismiss={() => setError({ visible: false, message: "" })}
            >
              <Dialog.Title>Alert</Dialog.Title>
              <Dialog.Content>
                <Paragraph>{error.modalMessage}</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  textColor="white"
                  buttonColor="red"
                  onPress={() => setError({ visible: false, message: "" })}
                >
                  OK
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </View>
    </Provider>
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
    marginLeft: 15,
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
