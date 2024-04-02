import React, {useState} from 'react';
import './App.css';
import {MyDocument} from "./MyDocument";
import {pdf, PDFViewer} from '@react-pdf/renderer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export interface Lang {
  lang: string;
  fileName: string;
}

export const Language: { [key: string]: Lang } = {
  DE: {
    lang: 'Deutsch',
    fileName: 'cv_sanfratello_de.pdf',
  },
  EN: {
    lang: 'English',
    fileName: 'cv_sanfratello_en.pdf',
  },
}

function downloadCV(selectedLanguage: Lang) {
  return () => {
    pdf(<MyDocument lang={selectedLanguage}/>)
      .toBlob()
      .then(blob => {
        console.log('blob');
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = selectedLanguage.fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      });
  };
}

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<Lang>(Language.EN);
  return (
    <Container fluid>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Marco Sanfratello</Navbar.Brand>
          <Navbar.Toggle/>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link onClick={downloadCV(selectedLanguage)}>Download CV</Nav.Link>
              <NavDropdown title={selectedLanguage.lang}>
                <NavDropdown.Item onClick={() => setSelectedLanguage(Language.DE)}>{Language.DE.lang}</NavDropdown.Item>
                <NavDropdown.Item onClick={() => setSelectedLanguage(Language.EN)}>{Language.EN.lang}</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col>
            <div style={{height: 'calc(100vh - 62px)'}}>
              <PDFViewer width={"100%"} height={"100%"}>
                <MyDocument lang={selectedLanguage}/>
              </PDFViewer>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default App;
