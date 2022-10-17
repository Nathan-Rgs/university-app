import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 64 64"
      xmlSpace="preserve"
      enableBackground="new 0 0 64 64"
      {...props}
    >
      <G id="Clipboard_1_">
        <Path
          d="M11 7L28 7 28 10 36 10 36 7 53 7 53 61 11 61z"
          fill="#acbdc5"
        />
        <Path
          d="M12 10c0-1.1.9-2 2-2h14V4H14c-3.3 0-6 2.7-6 6v48c0 3.3 2.7 6 6 6h34v-3h5V26h-1c0 4.3-1.5 8.3-4 11.7V56H16v-9.8c-2.5-1.1-4-2.6-4-4.2V10z"
          fill="#597380"
        />
        <Path
          d="M22 30c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2h-4zm22 6H32v-4h12v4zm0-12H32v-4h12v4zM16 12v34.2c1.1.5 2.5.9 4 1.2V44c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v3.9c1.4-.1 2.8-.3 4-.5V44h9c2.8-1.7 5.2-3.8 7-6.3V12H16z"
          fillRule="evenodd"
          clipRule="evenodd"
          fill="#fff"
        />
        <Path
          d="M34 6c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-7.7-2c.8-2.3 3-4 5.7-4 2.6 0 4.8 1.7 5.7 4H48c4.4 0 8 3.6 8 8v44c0 4.4-3.6 8-8 8h-4v-4h4c2.2 0 4-1.8 4-4V12c0-2.2-1.8-4-4-4h-4.1c.1.3.1.7.1 1v3H20V9c0-2.8 2.2-5 5-5h1.3z"
          fillRule="evenodd"
          clipRule="evenodd"
          fill="#314a52"
        />
        <Path
          d="M32 18.8L22.8 28 18 23.2 20.8 20.4 22.8 22.5 29.2 16z"
          fillRule="evenodd"
          clipRule="evenodd"
          fill="#0c907d"
        />
      </G>
    </Svg>
  );
}

export default SvgComponent;
