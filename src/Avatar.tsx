import {Image, StyleSheet, View} from '@react-pdf/renderer';
import {Color} from './styles';
import React from 'react';

interface Props {
  image: string;
  size: number;
  border: number;
}

export function Avatar(props: Props) {
  const styles = getStyles(props);
  return (
    <View style={styles.border}>
      <View style={styles.innerCircle}>
        <Image src={props.image} style={styles.image}/>
      </View>
    </View>
  );
}

function getStyles({size, border}: Props) {
  return StyleSheet.create({
    border: {
      border: `${border}px solid ${Color.primary}`,
      width: size + 2 * border,
      height: size + 2 * border,
      borderRadius: '50%',
    },
    innerCircle: {
      overflow: 'hidden',
      borderRadius: '50%',
      width: size,
      height: size,
    },
    image: {
      position: 'absolute',
      width: size,
      height: size * 1.5,
      top: size / -7.5,
    },
  });
}