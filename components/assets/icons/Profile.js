import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SvgComponent = (props) => (
  <Svg
    width={30}
    height={30}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M14.5 1C7.048 1 1 7.048 1 14.5S7.048 28 14.5 28 28 21.952 28 14.5 21.952 1 14.5 1Zm0 4.05a4.045 4.045 0 0 1 4.05 4.05 4.045 4.045 0 0 1-4.05 4.05 4.045 4.045 0 0 1-4.05-4.05 4.045 4.045 0 0 1 4.05-4.05Zm0 19.17a9.72 9.72 0 0 1-8.1-4.347c.04-2.687 5.4-4.158 8.1-4.158 2.686 0 8.06 1.471 8.1 4.158a9.72 9.72 0 0 1-8.1 4.347Z"
      fill={props.color}
    />
  </Svg>
);

export default SvgComponent;
