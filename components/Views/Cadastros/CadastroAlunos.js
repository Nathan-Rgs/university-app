import React, { useEffect, useState } from "react";
import {
  View,
  Pressable,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
// FIREBASE AND DB
import { db } from "../../Firebase/firebase";
import { getDocs, query, collection } from "firebase/firestore";

export default function CadastroAlunos(props) {
  const [alunosList, setAlunosList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get Alunos list from Firestore by Firebase
  useEffect(() => {
    // wrap your async call here
    const loadData = async () => {
      setLoading(true);
      await getAlunos();
      setLoading(false);
    };
    loadData();
  }, []);

  const getAlunos = async () => {
    try {
      const alunos = await getDocs(query(collection(db, "Aluno")));

      const formattedAlunosList = [];
      alunos?.forEach((doc) => {
        formattedAlunosList.push({ ...doc.data(), id: doc.id });
      });
      console.log(JSON.stringify(formattedAlunosList));
      setAlunosList(formattedAlunosList);
    } catch (error) {
      window.alert(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3D43C6" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>O Brabo tem nome</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
