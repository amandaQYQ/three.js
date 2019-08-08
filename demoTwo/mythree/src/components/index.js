import React from 'react';
// import Cube from './cube';
import FinalMaterial from './texture/material';
import Texture from './texture/texture';
import Light from './light/light';

/**坐标轴 */
import Coordinate from './coordinate';

/**相机 */
import OrthographicCamera from './camera/orthographicCamera';
import PerspectiveCamera from './camera/perspectiveCamera';

/**点、线、面 */
import { Line, GridLine } from './line';

/** 基本几何形状*/
import { Cube, Plane } from './cube';

/**字体 */
import { Text } from './text/text';

function App() {
  return (
    <>
      {/* <FinalMaterial />
      <Texture />
      <Light /> */}
      {/* <Coordinate /> */}
      {/* <OrthographicCamera /> */}
      {/* <PerspectiveCamera /> */}
      {/* <Line /> */}
      {/* <GridLine /> */}
      {/* <Cube /> */}
      {/* <Plane /> */}
      <Text />
    </>
  );
}

export default App;
