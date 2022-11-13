import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
// THEME AND CONTEXT
import ThemeContext from "../../Theme/ThemeContext";
import AppTheme from "../../Theme/Theme";

export default function Home(props) {
  const theme = useContext(ThemeContext)[0];
  const [devList, setDevList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flagImages, setflagImages] = useState(false);


  useEffect(() => {
    
    const unsubscribe = props.navigation.addListener("focus", () => {
      const loadData = async () => {
        getDevs();    
      };
      loadData();
    });

    return unsubscribe;
  }, [props.navigation]);

  /*
  metodo responsavel por capturar as imagens das API atrvés de um get
  a randomuser e montar a lista de devs, além de gerenciar a os erros de
  requisição capturando imagens defaults
  */
  const getDevs = async () => {
    try {
      let devs = [
        {
          avatar: "",
          nome: "Matheus Henrique Santos Zacarias",
          ra: "200064"
        },
        {
          avatar: "",
          nome: "Nathan Roberto Gonçalves dos Santos",
          ra: "200065"
        },
        {
          avatar: "",
          nome: "Lucas Marinelli Maciel",
          ra: "200285"
        }
      ]

      fetch('http://randomuser.me/api/?results=3')
        .then((response) => response.json())
          .then((result) => {

            if (result.results.length >= 3){
              //console.log("temos as imagens");
              devs[0].avatar = result.results[0].picture.large;
              devs[1].avatar = result.results[1].picture.large;
              devs[2].avatar = result.results[2].picture.large;
              setflagImages(true);
            }
            else{
              setflagImages(false);
            }

            //console.log(devs);
            setDevList(devs);
            setLoading(false);  
          })
          .catch((error) => {
            setflagImages(false);
          });

    } catch (error) {
      window.alert(error);
      setflagImages(false);
      throw error;
    }
  };

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
            <View style={styles.card}>
              <Image source={flagImages? {uri: devList[0].avatar} : require('../../../assets/imgs/unnamed.jpg')} style={styles.avatarImage}/>
              <View style={styles.infosContainer}>
                <Text style={styles.text}><Text style={styles.bold}>Nome:</Text> {devList[0].nome}</Text>
                <Text style={styles.text}><Text style={styles.bold}>RA:</Text> {devList[0].ra}</Text>
              </View>
            </View>

            <View style={styles.card}>
              <Image source={flagImages? {uri: devList[1].avatar} : require('../../../assets/imgs/photo.jpg')} style={styles.avatarImage}/>
              <View style={styles.infosContainer}>
                <Text style={styles.text}><Text style={styles.bold}>Nome:</Text> {devList[1].nome}</Text>
                <Text style={styles.text}><Text style={styles.bold}>RA:</Text> {devList[1].ra}</Text>
              </View>
            </View>

            <View style={styles.card}>
              <Image source={flagImages? {uri: devList[2].avatar} : require('../../../assets/imgs/photo2.jpg')} style={styles.avatarImage}/>
              <View style={styles.infosContainer}>
                <Text style={styles.text}><Text style={styles.bold}>Nome:</Text> {devList[2].nome}</Text>
                <Text style={styles.text}><Text style={styles.bold}>RA:</Text> {devList[2].ra}</Text>
              </View>
            </View>
          </View>
      );
    }
  }

  return (
    <View style={AppTheme[theme + "Container"]}>
      {getContent()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    margin: 10,
    padding: 5,
    borderRadius: 10,
    maxWidth: "90%",
    height: "auto",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  avatarImage:{
    height: 120,
    width: 120,
    margin: 5
  },
  bold: {
    fontWeight: 'bold'
  },
  text:{
    textAlign: "left",
    flexWrap: "wrap",
    fontSize: 17
  },
  infosContainer:{
    margin: 5,
    flex: 1,
    flexDirection: "column"
  }
});
