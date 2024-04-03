import React from 'react';
import {Document, Link, Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import {CV} from "./types/types";
import {Header} from "./Header";

import {Color, Font, Size} from "./styles";
import {Footer} from "./Footer";
import {Lang} from "./App";

interface Props {
  lang: Lang;
  cv: CV;
  avatar: string;
}

export function MyDocument({cv, lang, avatar}: Props) {
  return (
    <Document title={lang.filename} author={'Marco Sanfratello'}>
      <Page size="A4" style={styles.page}>
        <Header image={avatar} title={cv.title} subtitle={cv.subtitle}/>
        {cv.categories.map((c) => (
          <View key={c.title} style={styles.category}>
            <View style={styles.categoryHeader} wrap={false}>
              <Text style={styles.categoryTitle}>{c.title}</Text>
              <View style={styles.separator}/>
            </View>
            {c.entries.map((e) => (
              <View key={e.title} style={styles.entry} wrap={false}>
                <View style={styles.entryLeft}>
                  <Text style={styles.entryDescription}>{e.title}</Text>
                </View>
                <View style={styles.entryRight}>
                  {e.content.title && (
                    <Text style={styles.entryTitle}>{e.content.title}</Text>
                  )}
                  {e.content.__html.map(t => {
                    if (t.startsWith('<a')) {
                      const match = t.match(/^<a href='(.+)'>(.*)<\/a>$/) as string[];
                      return <Link key={t} src={match[1]} style={styles.entryContent}>{match[2]}</Link>;
                    } else {
                      return <Text key={t} style={styles.entryContent}>{t}</Text>;
                    }
                  })}
                </View>
              </View>
            ))}
          </View>
        ))}
        <Footer/>
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  page: {
    fontFamily: Font.regular,
    color: Color.fontColor,
    backgroundColor: 'white',
    padding: '50px 50px 70px 60px',
    fontSize: Size.p,
  },
  category: {
    margin: '0 0 20px',
  },
  categoryHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: '0 0 14px',
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
    margin: '0px 0px 10px',
    display: 'flex',
    flexDirection: 'row',
  },
  entryLeft: {
    width: '90px',
  },
  entryRight: {
    flex: '1 1 0'
  },
  entryDescription: {},
  entryTitle: {
    fontFamily: Font.bold,
  },
  entryContent: {},
});
