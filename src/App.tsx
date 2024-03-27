import React from 'react';
import './App.css';
import {MyDocument} from "./MyDocument";
import {PDFViewer} from '@react-pdf/renderer';
import * as data from "./data/data_de.json";

function App() {
  return (
    <div style={{
      width: '99vw',
      height: '99vh',
    }}>
      <PDFViewer width={"100%"} height={"100%"}>
        <MyDocument message={JSON.stringify(data, null, 4).substring(0, 2000)} />
      </PDFViewer>
    </div>
  );
}

export default App;
