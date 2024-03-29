import React from 'react';
import {Document, Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import cv_de from "./data/cv_de.json";
import {CV} from "./types/types";
import {Header} from "./Header";

import me from './data/me.jpg';
import {Color, Font, Size} from "./styles";
import {Footer} from "./Footer";

const cv: CV = cv_de;

// Create Document Component
export function MyDocument() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Header image={me} title={cv.title} subtitle={cv.subtitle}/>
        {cv.categories.map((c) => (
          <View key={c.title} style={styles.category}>
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>{c.title}</Text>
              <View style={styles.separator} />
            </View>
            {c.entries.map((e) => (
              <View key={e.title} style={styles.entry}>
                <View style={styles.entryLeft}>
                  <Text style={styles.entryDescription}>{e.title}</Text>
                </View>
                <View style={styles.entryRight}>
                  {e.content.title && <Text style={styles.entryTitle}>{e.content.title}</Text>}
                  <Text style={styles.entryContent}>{e.content.__html}</Text>
                </View>
              </View>
            ))}
          </View>
        ))}
        <Footer />
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  page: {
    fontFamily: Font.regular,
    color: Color.fontColor,
    backgroundColor: 'white',
    padding: '60px 50px',
    fontSize: Size.p,
  },
  category: {
    padding: '18px 0px',
  },
  categoryContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '0 0 20px',
  },
  categoryTitle: {
    color: Color.primary,
    fontSize: Size.H2,
  },
  separator: {
    borderBottom: `0.6px solid ${Color.primary}`,
    flex: '1 1 0',
    margin: '2px 0 0 3px',
  },
  entry: {
    padding: '0px 0px 10px',
    display: 'flex',
    flexDirection: 'row',
  },
  entryLeft: {
    width: '80px',
  },
  entryRight: {},
  entryDescription: {},
  entryTitle: {
    fontFamily: Font.bold,
  },
  entryContent: {},
});
