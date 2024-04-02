import {Link, StyleSheet, Text, View} from "@react-pdf/renderer";
import {Color, Font} from "./styles";

export function Footer() {
  return (
    <View fixed style={styles.footer}>
      <Text style={styles.bold}>Marco Sanfratello</Text>

      {/*<View style={styles.separator}/>*/}
      {/*<Text>Trottmattstrasse 22</Text>*/}

      {/*<View style={styles.separator}/>*/}
      {/*<Text>5242 Lupfig</Text>*/}

      <View style={styles.separator}/>
      <Text style={styles.icon}>T</Text>
      <Text>+41 78 837 05 06</Text>

      <View style={styles.separator}/>
      <Text style={styles.icon}>E</Text>
      <Text>sanfratello.m@gmail.com</Text>

      <View style={styles.separator}/>
      <Text style={styles.icon}>W</Text>
      <Link src={'https://genron.github.io'}>genron.github.io</Link>

      <Text style={styles.pageNr} render={({pageNumber, totalPages}) => (
        `${pageNumber}/${totalPages}`
      )}/>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    borderTop: `0.6px solid ${Color.primary}`,
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 60,
    right: 50,
    padding: '16px 0 30px',
  },
  bold: {
    fontFamily: Font.bold,
  },
  separator: {
    borderRight: `0.6px solid ${Color.primary}`,
    margin: '0 3px',
  },
  icon: {
    color: Color.secondary,
    margin: '0 1.5px 0 0',
  },
  pageNr: {
    flex: '1 1 0',
    textAlign: 'right',
  },
});
