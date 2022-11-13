import React, { useEffect, useState, useRef } from "react";
import { Avatar, Card, Text, List } from "react-native-paper";
import { View, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, Pressable} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
// FIREBASE AND DB
import { db } from "../../../Firebase/firebase";
import { getDocs, query, collection, doc, deleteDoc, where } from "firebase/firestore";

/*
responsável por exibir os alunos atrelados a uma turma específica
*/
export default function TurmasList(props) {

    const [routeParams] = useState(props.route.params);
    const [matriculasList, setMatriculasList] = useState([]);
    const [loading, setLoading] = useState(2);
    const loadingRef = useRef();
    loadingRef.current = loading;

    let alunosDoc = [];
    let matriculasDoc = [];

    useEffect(() => {
      const timer = setTimeout(() =>{
        if (loadingRef.current != 0){
          setLoading(1); 
        }
      }, 3000);

      const unsubscribe = props.navigation.addListener("focus", () => {
          const loadData = async () => {
              await getAlunos();
              await getMatriculas();
          };
          loadData();
      });

      return unsubscribe;
    }, [props.navigation]);

  const getMatriculas = async () => {
    try {
        matriculasDoc = [];
        const collecRef = collection(db, "Historico");
        //console.log(routeParams.turma.cod_turma)
        getDocs(query(collecRef, where("cod_turma", "==", routeParams.turma.cod_turma)))
        .then( (documents)=> {
            documents?.forEach((doc) => {
                matriculasDoc.push({ ...doc.data() });
            }); 
            filtraAlunos();
        });
    } catch (error) {
      window.alert(error.message);
    }
  };

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

  const filtraAlunos = () => {
    let alunosTurma = [];

    matriculasDoc.map(matriculaDoc => {
        let aluno = alunosDoc.find((aluno) => aluno.matricula == matriculaDoc.matricula);
        let matricula = {
          foto: aluno.foto,
          nome: aluno.nome,
          matricula: aluno.matricula
        }
        matricula.flagFoto = verificaFoto(matricula.foto);

        alunosTurma.push(matricula);
        //console.log(matricula);
    })

    setMatriculasList(alunosTurma);
    setLoading(0);  
  }

  const verificaFoto = (foto) => {

    let imagemValida = new RegExp('.(jpg|jpeg|png|webp|avif|gif|svg)$');

    if (imagemValida.test(foto) && (foto.indexOf("http:") != -1 || foto.indexOf("https:") != -1)){
      return true;
    }
    else{
      return false;
    }
  }

  const getContent = () => {
    if (loading == 2) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#3D43C6" />
        </View>
      );
    } else if (loading == 0){
      return (
        <View style={styles.cardContainer}>
          <Card.Title
            title="Visualizar Turma"
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
                <FlatList
                  numColumns={2}
                  data={matriculasList}
                  keyExtractor={(item) => item.nome}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity style={styles.cardAluno} 
                          onPress={() => props.navigation.navigate("Visualizar Historico Aluno", {
                            aluno: item
                          })}>

                          <Image 
                            source={item.flagFoto? {uri: item.foto} : require('../../../../assets/imgs/default-avatar.png')} 
                            style={styles.avatarImage}
                            onError={() =>{
                              item.flagFoto = false; 
                            }}
                          />
                          <Text>{item.nome}</Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
          </ScrollView>
        </View>
      );
    }
    else {
      return (
        <View style={styles.card}>
          <Text style={styles.reloadWarn}>Infelizmente não consegui carregar a Lista... clique no Botão Abaixo pra Recarrega-lá</Text>
          <Pressable 
            style={styles.reload}
            onPress={ async () => {
              setLoading(2); 

              const timer = setTimeout(() =>{
                if (loadingRef.current != 0){
                  setLoading(1); 
                }
              }, 3000);

              await getAlunos();
              await getMatriculas();
            }}
          >
            <Text style={styles.reloadText}>Recarregar Página</Text>
          </Pressable>
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
