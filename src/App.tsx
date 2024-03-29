import React from 'react';
import './App.css';
import {MyDocument} from "./MyDocument";
import {PDFViewer, PDFDownloadLink} from '@react-pdf/renderer';

function App() {
  return (
    <div style={{
      height: '100vh'
    }}>
      <PDFViewer width={"99.5%"} height={"99%"}>
        <MyDocument />
      </PDFViewer>
    </div>
  );
}

export default App;
