import React, { useEffect, useState, useRef } from "react";
import { Avatar, Card, Text, List } from "react-native-paper";
import { View, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, Pressable} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
// FIREBASE AND DB
import { db } from "../../../Firebase/firebase";
import { getDocs, query, collection, doc, deleteDoc, where } from "firebase/firestore";

//reponsavél por exibir a lista de históricos de um aluno especifico 
export default function TurmasList(props) {

    const [routeParams] = useState(props.route.params);
    const [loading, setLoading] = useState(true);
    const [historicoList, setHistoricoList] = useState([]);
    
    const historicosDoc = [];
    const turmasDoc = [];

    useEffect(() => {


      const unsubscribe = props.navigation.addListener("focus", () => {
          const loadData = async () => {
            await getHistorico();
            await getTurmas();
            buildList();
          };
          loadData();
      });

      return unsubscribe;
    }, [props.navigation]);

  const getHistorico = async () => {
    try {
        const collecRef = collection(db, "Historico");
        //console.log(routeParams.turma.cod_turma)
        getDocs(query(collecRef, where("matricula", "==", routeParams.aluno.matricula)))
        .then( (documents)=> {
            documents?.forEach((doc) => {
                historicosDoc.push({ ...doc.data() });
            });         
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
    let historicoFinal = [];

    historicosDoc.map((historicoDoc, index) => {
      let historico = {
        num: index,
        nota: historicoDoc.nota,
        frequencia: historicoDoc.frequencia,
        turma:`${turmasDoc.find((turma) => turma.cod_turma == historicoDoc.cod_turma).ano} - ${turmasDoc.find((turma) => turma.cod_turma == historicoDoc.cod_turma).horario}`
      }
      historicoFinal.push(historico);
    })

    setHistoricoList(historicoFinal);
    setLoading(false);
    //console.log(historicoFinal);
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
        <View style={styles.cardContainer}>
          <Card.Title
            title="Visualizar Histórico Individual"
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
                    data={historicoList}
                    keyExtractor={(item) => item.index}
                    renderItem={({ item }) => {
                    return (
                        <List.Item
                        title={`${item.turma}`}
                        description={`Nota: ${item.nota} | Freq.: ${item.frequencia}`}
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
    paddingBottom: 20
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
  avatarImage:{
    height: 80,
    width: 80,
    margin: 5
  },
  cardAluno:{
    display: "flex",
    flexDirection: "column",
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "40%"
  },
  reload:{
    display: "flex",
    backgroundColor: "#3D43C6",
    padding: 7,
    margin: 10,
    borderRadius: 10
    
  },
  reloadText:{
    fontSize: 18,
    color: "white",
    width: "auto",
    textAlign: "center"
  },
  reloadWarn:{
    fontSize: 18,
    color: "black",
    width: "auto",
    textAlign: "center",
    margin: 10
  },
  card: {
    margin: 15,
    padding: 5,
    borderRadius: 10,
    height: "auto",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column"
  },
});
