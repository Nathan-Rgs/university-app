import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      width={38}
      height={38}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      {...props}
    >
      <Path
        d="M256 73.825a182.18 182.18 0 00-182.18 182.18c0 100.617 81.567 182.17 182.18 182.17a182.175 182.175 0 100-364.35zm76.636 161.579h-12.037v91.503a18.908 18.908 0 01-18.896 18.904h-26.78v-53.56a6.299 6.299 0 00-6.297-6.294H232.4a6.3 6.3 0 00-6.302 6.294v53.56h-26.771a18.91 18.91 0 01-18.906-18.904v-91.503h-11.97a7.879 7.879 0 01-5.071-13.905l82.055-69.039a7.89 7.89 0 0110.142 0l81.479 68.547a7.88 7.88 0 01-4.421 14.396z"
        data-name="Home"
        fill={props.color}
      />
    </Svg>
  );
}

export default SvgComponent;
