import React, { useEffect, useState } from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";
// FIREBASE AND DB
import { db } from "../../Firebase/firebase";
import { getDocs, query, collection } from "firebase/firestore";

export default function Menu(props) {
  const [alunosList, setAlunosList] = useState([]);

  // Get Alunos list from Firestore by Firebase
  useEffect(() => {
    // wrap your async call here
    const loadData = async () => {
      await getAlunos();
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

  return (
    <View style={styles.container}>
      <Text>TESTE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
