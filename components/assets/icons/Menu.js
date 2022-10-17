import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={26}
      height={26}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...props}
    >
      <G data-name="2.Menu">
        <Path
          d="M12 24a12 12 0 1112-12 12.013 12.013 0 01-12 12zm0-22a10 10 0 1010 10A10.011 10.011 0 0012 2z"
          fill={props.color}
        />
        <Path d="M8 7h8v2H8zm0 4h8v2H8zm0 4h8v2H8z" fill={props.color} />
      </G>
    </Svg>
  );
}

export default SvgComponent;
