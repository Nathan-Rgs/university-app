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
import { View, StyleSheet, ActivityIndicator } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
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

export default function InsereEditaTurma(props) {
  const { register, setValue, handleSubmit, watch } = useForm();
  const [routeParams] = useState(props.route.params);
  const [loading, setLoading] = useState(false);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [disciplinas, setDisciplinas] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [sucess, setSucess] = useState({
    modalVisible: false,
    modalMessage: "",
  });
  const [error, setError] = useState({ modalVisible: false, modalMessage: "" });
  const [inputError, setInputError] = useState({
    cod_disc: false,
    cod_prof: false,
    ano: false,
    horario: false,
  });

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      const loadData = async () => {
        setLoading(true);
        await getDisciplinas();
        await getProfessores();
        setLoading(false);
      };
      loadData();
    });

    return unsubscribe;
  }, [props.navigation]);

  const getDisciplinas = async () => {
    try {
      const disciplinas = await getDocs(query(collection(db, "Disciplina")));

      const formattedDisciplinasList = [];
      disciplinas?.forEach((doc) => {
        formattedDisciplinasList.push({ ...doc.data() });
      });
      setDisciplinas(formattedDisciplinasList);
    } catch (error) {
      window.alert(error.message);
    }
  };

  const getProfessores = async () => {
    try {
      const professoresResult = await getDocs(
        query(collection(db, "Professor"))
      );

      const formattedProfessoresList = [];
      professoresResult?.forEach((doc) => {
        formattedProfessoresList.push({ ...doc.data() });
      });
      setProfessores(formattedProfessoresList);
    } catch (error) {
      window.alert(error.message);
    }
  };

  useEffect(() => {
    register("cod_disc");
    register("cod_prof");
    register("ano");
    register("horario");

    if (routeParams.action == "Editar") {
      setValue("cod_disc", routeParams.turma.cod_disc);
      setValue("cod_prof", routeParams.turma.cod_prof);
      setValue("ano", routeParams.turma.ano);
      setValue("horario", routeParams.turma.horario);
    } else {
      setValue("cod_disc", "");
      setValue("cod_prof", "");
      setValue("ano", "");
      setValue("horario", "");
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
        modalMessage: `Não foi possível inserir esta turma, dados compatíveis com a mesma já foram cadastrados no banco de dados`,
      });
    }
    if (!errorFlag && canInsert) {
      sendForm(formData);
    }
  };

  const findAnotherEqualData = async (formData) => {
    try {
      const ref = await query(
        collection(db, "Turma"),
        where("ano", "==", `${formData.ano}`),
        where("cod_disc", "==", `${formData.cod_disc}`),
        where("cod_prof", "==", `${formData.cod_prof}`)
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
        const turmaId = uuid.v4();
        validatedFormData = { ...validatedFormData, cod_turma: turmaId };
        await setDoc(doc(db, "Turma", `${turmaId}`), validatedFormData);
      } else {
        await setDoc(
          doc(db, "Turma", `${routeParams.turma.cod_turma}`),
          validatedFormData,
          { merge: true }
        );
      }
      setSucess({
        modalVisible: true,
        modalMessage: `${
          routeParams.action == "Inserir"
            ? `Turma ${validatedFormData.ano}, dás ${validatedFormData.horario} cadastrada com sucesso!`
            : `Turma ${validatedFormData.nome_disc}, dás ${validatedFormData.horario} atualizada com sucesso!`
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
      case "cod_disc":
        setInputError({
          cod_disc: true,
          cod_prof: false,
          ano: false,
          horario: false,
        });
        break;
      case "cod_prof":
        setInputError({
          cod_disc: false,
          cod_prof: true,
          ano: false,
          horario: false,
        });
        break;
      case "ano":
        setInputError({
          cod_disc: false,
          cod_prof: false,
          ano: true,
          horario: false,
        });
        break;
      case "horario":
        setInputError({
          cod_disc: false,
          cod_prof: false,
          ano: false,
          horario: true,
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
                  ? "Inserir Turma"
                  : "Editar Turma"
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
              <TextInput
                style={styles.inputs}
                label={"Ano"}
                placeholder={"Ano da Turma"}
                error={inputError.ano}
                value={`${watch("ano")}`}
                onChangeText={(text) => setValue("ano", text)}
              />
              <Picker
                selectedValue={`${watch("cod_disc")}`}
                style={{
                  backgroundColor: "#E7DFEC",
                  marginBottom: 10,
                }}
                placeholder="Teste"
                mode="dropdown"
                onValueChange={(value) =>
                  value != "" ? setValue("cod_disc", value) : ""
                }
              >
                <Picker.Item value="" label="Selecine a Disciplina..." />
                {disciplinas.map((item, index) => {
                  return (
                    <Picker.Item
                      label={item.nome_disc}
                      value={item.cod_disc}
                      key={index}
                    />
                  );
                })}
              </Picker>
              <Picker
                selectedValue={`${watch("cod_prof")}`}
                style={{
                  backgroundColor: "#E7DFEC",
                }}
                mode="dropdown"
                onValueChange={(value) => setValue("cod_prof", value)}
              >
                <Picker.Item value="" label="Selecione o Professor..." />
                {professores.map((item, index) => {
                  return (
                    <Picker.Item
                      label={item.nome}
                      value={item.cod_prof}
                      key={index}
                    />
                  );
                })}
              </Picker>
              <Button
                mode="contained"
                onPress={() => setShowDateTimePicker(true)}
                style={{
                  width: 200,
                  backgroundColor: "#3D43C6",
                  marginVertical: 10,
                  alignSelf: "center",
                  borderRadius: 5,
                }}
              >
                {watch("horario") != ""
                  ? watch("horario")
                  : "Selecione o Horário"}
              </Button>
              {showDateTimePicker && (
                <DateTimePicker
                  value={new Date()}
                  mode={"time"}
                  is24Hour={true}
                  onChange={(event, time) => {
                    let formattedTime = `${time
                      .getHours()
                      .toString()
                      .padStart(2, "0")}:${time
                      .getMinutes()
                      .toString()
                      .padStart(2, "0")}`;

                    setShowDateTimePicker(false);
                    setValue("horario", formattedTime);
                  }}
                />
              )}
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
                onDismiss={() => props.navigation.navigate("Lista Turma")}
              >
                <Dialog.Title>Sucess</Dialog.Title>
                <Dialog.Content>
                  <Paragraph>{sucess.modalMessage}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button
                    textColor="white"
                    buttonColor="green"
                    onPress={() => props.navigation.navigate("Lista Turma")}
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
