import React from 'react';
import Svg, { Path } from 'react-native-svg';

function Plus() {
  return (
    <Svg width='100%' height='100%' viewBox='0 0 24 24' fill='none'>
      <Path
        d='M3.75 12H20.25'
        stroke='#170F2B'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M12 3.75V20.25'
        stroke='#170F2B'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  );
}

export default Plus;
