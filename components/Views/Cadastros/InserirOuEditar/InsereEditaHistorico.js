import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Avatar,
  Card,
  Button,
  Portal,
  Dialog,
  Paragraph,
  Provider,
} from "react-native-paper";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import NumericInput from "react-native-numeric-input";
// FIREBASE, DB AND UTILS
import { db } from "../../../Firebase/firebase";
import {
  setDoc,
  doc,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";
import uuid from "react-native-uuid";

export default function InsereEditaHistorico(props) {
  const { register, setValue, handleSubmit, watch } = useForm();
  const [routeParams] = useState(props.route.params);
  const [loading, setLoading] = useState(false);
  const [alunos, setAlunos] = useState([]);
  const [turmas, setturmas] = useState([]);
  const [sucess, setSucess] = useState({
    modalVisible: false,
    modalMessage: "",
  });
  const [error, setError] = useState({ modalVisible: false, modalMessage: "" });
  const [inputError, setInputError] = useState({
    matricula: false,
    cod_turma: false,
    frequencia: false,
    nota: false,
  });

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      const loadData = async () => {
        setLoading(true);
        await getAlunos();
        await getTurmas();
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
        formattedAlunosList.push({ ...doc.data() });
      });
      setAlunos(formattedAlunosList);
    } catch (error) {
      window.alert(error.message);
    }
  };

  const getTurmas = async () => {
    try {
      const turmasResult = await getDocs(query(collection(db, "Turma")));

      const formattedturmasList = [];
      turmasResult?.forEach((doc) => {
        formattedturmasList.push({ ...doc.data() });
      });
      setturmas(formattedturmasList);
    } catch (error) {
      window.alert(error.message);
    }
  };

  useEffect(() => {
    register("matricula");
    register("cod_turma");
    register("frequencia");
    register("nota");

    if (routeParams.action == "Editar") {
      setValue("matricula", routeParams.historico.matricula);
      setValue("cod_turma", routeParams.historico.cod_turma);
      setValue("frequencia", routeParams.historico.frequencia);
      setValue("nota", routeParams.historico.nota);
    } else {
      setValue("matricula", "");
      setValue("cod_turma", "");
      setValue("frequencia", "");
      setValue("nota", "");
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

    const canInsert = await findAnotherEqualData(formData);
    if (!canInsert) {
      setError({
        modalVisible: true,
        modalMessage: `Não foi possível inserir este histórico, dados compatíveis com a mesma já foram cadastrados no banco de dados`,
      });
    }
    if (!errorFlag && canInsert) {
      sendForm(formData);
    }
  };

  const findAnotherEqualData = async (formData) => {
    try {
      const ref = await query(
        collection(db, "Historico"),
        where("matricula", "==", `${formData.matricula}`),
        where("cod_turma", "==", `${formData.cod_turma}`)
      );
      const snapshot = await getDocs(ref);
      return !(snapshot.docs.length != 0);
    } catch (error) {
      window.alert(error.message);
    }
  };

  const sendForm = async (validatedFormData) => {
    try {
      if (routeParams.action == "Inserir") {
        const historicoId = uuid.v4();
        validatedFormData = {
          ...validatedFormData,
          cod_historico: historicoId,
        };
        await setDoc(doc(db, "Historico", `${historicoId}`), validatedFormData);
      } else {
        await setDoc(
          doc(db, "Historico", `${routeParams.historico.cod_historico}`),
          validatedFormData,
          { merge: true }
        );
      }
      setSucess({
        modalVisible: true,
        modalMessage: `${
          routeParams.action == "Inserir"
            ? `Historico cadastrado com sucesso!`
            : `Historico atualizado com sucesso!`
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
      case "matricula":
        setInputError({
          matricula: true,
          cod_turma: false,
          frequencia: false,
          nota: false,
        });
        break;
      case "cod_turma":
        setInputError({
          matricula: false,
          cod_turma: true,
          frequencia: false,
          nota: false,
        });
        break;
      case "frequencia":
        setInputError({
          matricula: false,
          cod_turma: false,
          frequencia: true,
          nota: false,
        });
        break;
      case "nota":
        setInputError({
          matricula: false,
          cod_turma: false,
          frequencia: false,
          nota: true,
        });
        break;
    }

    setError({
      modalVisible: true,
      modalMessage: `Campo vazio: ${inputWithError.toUpperCase()}`,
    });
  };
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3D43C6" />
      </View>
    );
  } else {
    return (
      <Provider>
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            <Card.Title
              title={
                routeParams.action == "Inserir"
                  ? "Inserir Histórico"
                  : "Editar Histórico"
              }
              titleStyle={styles.title}
              left={(props) => (
                <Avatar.Icon
                  {...props}
                  style={{ backgroundColor: "#3D43C6" }}
                  icon="account-group"
                />
              )}
            />
            <View style={styles.formContainerContent}>
              <Picker
                selectedValue={`${watch("matricula")}`}
                style={{
                  backgroundColor: "#E7DFEC",
                  marginBottom: 10,
                }}
                placeholder="Teste"
                mode="dropdown"
                onValueChange={(value) =>
                  value != "" ? setValue("matricula", value) : ""
                }
              >
                <Picker.Item value="" label="Selecine o Aluno..." />
                {alunos.map((item, index) => {
                  return (
                    <Picker.Item
                      label={item.nome}
                      value={item.matricula}
                      key={index}
                    />
                  );
                })}
              </Picker>
              <Picker
                selectedValue={`${watch("cod_turma")}`}
                style={{
                  backgroundColor: "#E7DFEC",
                  marginBottom: 10,
                }}
                mode="dropdown"
                onValueChange={(value) => setValue("cod_turma", value)}
              >
                <Picker.Item value="" label="Selecione a Turma..." />
                {turmas.map((item, index) => {
                  return (
                    <Picker.Item
                      label={`${item.ano} - ${item.horario}`}
                      value={item.cod_turma}
                      key={index}
                    />
                  );
                })}
              </Picker>
              <Avatar.Text
                size={24}
                style={{
                  width: 60,
                  borderRadius: 5,
                  marginBottom: 10,
                  backgroundColor: "#3D43C6",
                }}
                label="Nota:"
              />
              <NumericInput
                value={Number(watch("nota"))}
                onChange={(value) => setValue("nota", value)}
                minValue={0}
                maxValue={10}
                totalWidth={240}
                totalHeight={50}
                iconSize={25}
                step={0.01}
                valueType="real"
                rounded
                textColor="#B59DFA"
                iconStyle={{ color: "white" }}
                rightButtonBackgroundColor="#592A9C"
                leftButtonBackgroundColor="#964ADB"
                containerStyle={{ marginBottom: 10, alignSelf: "center" }}
              />
              <Avatar.Text
                size={24}
                style={{
                  width: 85,
                  borderRadius: 5,
                  marginBottom: 10,
                  backgroundColor: "#3D43C6",
                }}
                label="Frequência:"
              />
              <NumericInput
                value={Number(watch("frequencia"))}
                onChange={(value) => setValue("frequencia", value)}
                minValue={0}
                maxValue={100}
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
                onDismiss={() => props.navigation.navigate("Lista Historico")}
              >
                <Dialog.Title>Sucess</Dialog.Title>
                <Dialog.Content>
                  <Paragraph>{sucess.modalMessage}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button
                    textColor="white"
                    buttonColor="green"
                    onPress={() => props.navigation.navigate("Lista Historico")}
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
