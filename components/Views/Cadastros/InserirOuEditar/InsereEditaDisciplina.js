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
import NumericInput from "react-native-numeric-input";
// FIREBASE, DB AND UTILS
import { db } from "../../../Firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import uuid from "react-native-uuid";

export default function InsereEditaDisciplina(props) {
  const { register, setValue, handleSubmit, watch } = useForm();
  const [routeParams] = useState(props.route.params);
  const [sucess, setSucess] = useState({
    modalVisible: false,
    modalMessage: "",
  });
  const [error, setError] = useState({ modalVisible: false, modalMessage: "" });
  const [inputError, setInputError] = useState({
    nome_disc: false,
    cod_disc: false,
  });

  useEffect(() => {
    register("nome_disc");
    register("carga_hor");

    if (routeParams.action == "Editar") {
      setValue("nome_disc", routeParams.disciplina.nome_disc);
      setValue("carga_hor", routeParams.disciplina.carga_hor);
    } else {
      setValue("nome_disc", "");
      setValue("carga_hor", "");
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
        const discId = uuid.v4();
        validatedFormData = { ...validatedFormData, cod_disc: discId };
        await setDoc(doc(db, "Disciplina", `${discId}`), validatedFormData);
      } else {
        await setDoc(
          doc(db, "Disciplina", `${routeParams.disciplina.cod_disc}`),
          validatedFormData,
          { merge: true }
        );
      }
      setSucess({
        modalVisible: true,
        modalMessage: `${
          routeParams.action == "Inserir"
            ? `Disciplina ${validatedFormData.nome_disc} cadastrada com sucesso!`
            : `Disciplina ${validatedFormData.nome_disc} atualizada com sucesso!`
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
      case "nome_disc":
        setInputError({
          nome_disc: true,
          carga_hor: false,
        });
        break;
      case "carga_hor":
        setInputError({
          nome_disc: false,
          carga_hor: true,
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
                ? "Inserir Disciplina"
                : "Editar Disciplina"
            }
            titleStyle={styles.title}
            left={(props) => (
              <Avatar.Icon
                {...props}
                style={{ backgroundColor: "#3D43C6" }}
                icon="book-open-page-variant"
              />
            )}
          />
          <View style={styles.formContainerContent}>
            <TextInput
              style={styles.inputs}
              label={"Nome"}
              placeholder={"Nome da Disciplina"}
              error={inputError.nome_disc}
              value={`${watch("nome_disc")}`}
              onChangeText={(text) => setValue("nome_disc", text)}
            />
            <Avatar.Text
              size={24}
              style={{
                width: 95,
                borderRadius: 5,
                marginBottom: 10,
                backgroundColor: "#3D43C6",
              }}
              label="Carga Horária:"
            />
            <NumericInput
              value={Number(watch("carga_hor"))}
              initValue={watch("carga_hor")}
              onChange={(value) => setValue("carga_hor", value)}
              minValue={1}
              maxValue={1000}
              totalWidth={240}
              totalHeight={50}
              iconSize={25}
              step={1}
              valueType="real"
              rounded
              textColor="#B59DFA"
              iconStyle={{ color: "white" }}
              rightButtonBackgroundColor="#592A9C"
              leftButtonBackgroundColor="#964ADB"
              containerStyle={{ marginBottom: 10, alignSelf: "center" }}
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
              onDismiss={() => props.navigation.navigate("Lista Disciplina")}
            >
              <Dialog.Title>Sucess</Dialog.Title>
              <Dialog.Content>
                <Paragraph>{sucess.modalMessage}</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  textColor="white"
                  buttonColor="green"
                  onPress={() => props.navigation.navigate("Lista Disciplina")}
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
