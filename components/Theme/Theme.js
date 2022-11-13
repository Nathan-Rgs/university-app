/*
O arquivo Theme.js e ThemeContext.js estabele um "tema" comum para 
todo o aplicativo, no caso, um background.
*/

// BACKGROUNDS
import ImmersiveGradient from "../../assets/imgs/3dGradientBackground.png";
import PurpleGradient from "../../assets/imgs/purpleGradientBackgroung.png";
import RainbowBackground from "../../assets/imgs/rainbowBackground.png";

const AppTheme = {
  ImmersiveGradient: {
    backgroundImage: ImmersiveGradient,
  },
  PurpleGradient: {
    backgroundImage: PurpleGradient,
  },
  RainbowBackground: {
    backgroundImage: RainbowBackground,
  },
  ImmersiveGradientContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "none",
    texts: {
      textColor: "white",
    },
  },
  PurpleGradientContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "none",
    texts: {
      textColor: "white",
    },
  },
  RainbowBackgroundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "none",
    texts: {
      textColor: "white",
    },
  },
};

export default AppTheme;
