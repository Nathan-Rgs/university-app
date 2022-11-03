import React, { useEffect, useState } from "react";
import { Avatar, Card, List, Text } from "react-native-paper";
import { View, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ScrollView } from "react-native-virtualized-view";
// FIREBASE AND DB
import { db } from "../../../Firebase/firebase";
import { getDocs, query, collection, doc, deleteDoc } from "firebase/firestore";

export default function HistoricosList(props) {
  const historicosDoc = [];
  const alunosDoc = [];
  const turmasDoc = [];

  const [historicosList, setHistoricosList] = useState([]);
  const [historicoCompleto, setHistoricoCompleto] = useState([]);
  const [loading, setLoading] = useState(true);
  const [turmasList, setTurmasList] = useState([]);
  const [turmasSelecionada, setTurmasSelecionada] = useState();

  useEffect(() => {
    
    const unsubscribe = props.navigation.addListener("focus", () => {
      const loadData = async () => {
        await getHistoricos();  
        await getAlunos();
        await getTurmas();
        buildList();
      };
      loadData();
    });

    return unsubscribe;
  }, [props.navigation]);

  const getHistoricos = async () => {
    try {
      const documents = await getDocs(query(collection(db, "Historico")));

      documents?.forEach((doc) => {
        historicosDoc.push({ ...doc.data() });
      }); 
      //console.log(historicosDoc);
    } catch (error) {
      window.alert(error.message);
    }
  }

  const getAlunos = async () => {
    try {
      const documents = await getDocs(query(collection(db, "Aluno")));

      documents?.forEach((doc) => {
        alunosDoc.push({ ...doc.data() });
      });      
    } catch (error) {
      window.alert(error.message);
    }
  };

  const getTurmas = async () => {
    try {
      const documents = await getDocs(query(collection(db, "Turma")));

      documents?.forEach((doc) => {
        turmasDoc.push({ ...doc.data() });
      });
    } catch (error) {
      window.alert(error.message);
    }
  };

  const buildList = () => {
    let turmas = [];
    let historicos = [];

    historicosDoc.map((historicoDoc, index) => {
      let historico = {
        num: index,
        aluno: alunosDoc.find((aluno) => aluno.matricula == historicoDoc.matricula).nome,
        nota: historicoDoc.nota,
        frequencia: historicoDoc.frequencia,
        turma:`${turmasDoc.find((turma) => turma.cod_turma == historicoDoc.cod_turma).ano} - ${turmasDoc.find((turma) => turma.cod_turma == historicoDoc.cod_turma).horario}`
      }

      if (turmas.indexOf(historico.turma) == -1){
        turmas.push(historico.turma)
      }
      historicos.push(historico);
    })
    
    setTurmasList(turmas);
    let historicosOrdenados = ordenaHistorico(historicos);
    setHistoricoCompleto(historicosOrdenados);
    setHistoricosList(historicosOrdenados);
    setLoading(false);
    //console.log(turmas);
  }

  const filtraTurma = (turma) => {
    setTurmasSelecionada(turma);

    if (turma == "*"){
      //console.log("todos os historicos disponiveis");
      setHistoricosList(historicoCompleto);
    }
    else {
      let historicoFiltrado = historicoCompleto.filter((historico) => historico.turma == turma);
      //console.log(historicoFiltrado);
      let historicosOrdenados = ordenaHistorico(historicoFiltrado);
      setHistoricosList(historicosOrdenados);
    }

    //console.log(historicosList);
  }

  const ordenaHistorico = (historicos) => {
    return historicos.sort((a, b) => (a.nota > b.nota) ? -1 : 1);
  }



  const getContent = () => {
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
            title="Visualizar Históricos"
            left={(props) => (
              <Avatar.Icon
                {...props}
                style={{ backgroundColor: "#3D43C6" }}
                icon="clipboard-list"
              />
            )}
          />
          <View>
            <Text>Filtrar por turma: </Text>
            <Picker
                selectedValue={turmasSelecionada}
                style={styles.picker}
                mode="dropdown"
                onValueChange={(value) => filtraTurma(value)}
              >
                <Picker.Item value="*" label="Todas as Turmas" />
                {turmasList.map((item, index) => {
                  return (
                    <Picker.Item
                      label={`${item}`}
                      value={item}
                      key={index}
                    />
                  );
                })}
              </Picker>
          </View>
   
          <ScrollView>
            <View style={styles.cardContainerContent}>
              <FlatList
                data={historicosList}
                keyExtractor={(item) => item.num}
                renderItem={({ item }) => {
                  return (
                    <List.Item
                      title={`${item.aluno}`}
                      description={`${item.nota} | ${item.frequencia} -- ${item.turma}`}
                      left={(props) => (
                        <List.Icon
                          {...props}
                          color="#3D43C6"
                          icon="clipboard-list"
                        />
                      )}
                    >
                    <Text>teste</Text>
                    </List.Item>
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

  return (
    <View style={styles.container}>
      {getContent()}
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
  picker: {
    backgroundColor: "#E7DFEC",
    marginBottom: 10,
  },
  listItem: {
    display: "flex",
    flexDirection: "column",
    margin: 7,
    borderBottomColor: 'black',
    borderBottomWidth: 0.3,
  },
  nome:{
    fontSize: 18,
    fontWeight: 'bold'
  },
  dadosAluno:{
    fontSize: 15
  }
});
