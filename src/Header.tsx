import {StyleSheet, Text, View} from "@react-pdf/renderer";
import {Font, Size} from "./styles";
import {Avatar} from "./Avatar";
import React from "react";

interface Props {
  image: string;
  title: string;
  subtitle: string;
}

export function Header(props: Props) {
  const styles = getStyles(props);
  return (
    <View style={styles.header}>
      <Avatar image={props.image} size={84} border={0.5}/>
      <View style={styles.headerDetails}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.subtitle}>{props.subtitle}</Text>
      </View>
    </View>
  );
}

function getStyles(props: Props) {
  return StyleSheet.create({
    header: {
      display: 'flex',
      flexDirection: 'row',
    },
    headerDetails: {
      padding: '0 0 0 25px',
      display: 'flex',
      justifyContent: 'center',
    },
    title: {
      fontFamily: Font.bold,
      fontSize: Size.H1,
      margin: '0 0 5px',
    },
    subtitle: {
      fontSize: Size.H2,
    },
  });
}